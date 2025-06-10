import React, { useEffect, useState, useRef } from 'react'
import { CameraControls, Html, Line, useAnimations } from '@react-three/drei'
// import { Perf } from 'r3f-perf'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import { useParametersContext } from '@Providers/index'
import { cropsInfo } from '@/data/cropInfo'

export default function Experience() {
  // 1) Cargo los GLTF: planta y suelo
  const potatoGltf = useLoader(GLTFLoader, '/models/planta.glb')
  const soilGltf = useLoader(GLTFLoader, '/models/suelo.glb')

  // 2) Hook para manejar las animaciones de la planta
  const { ref: potatoRef, actions } = useAnimations(
    potatoGltf.animations,
    potatoGltf.scene
  )

  // 4) Estado para disparar la animación de crecimiento de la planta
  const { playGrow, setGrowFinished, playedRef, setPlayGrow, predictedCropP } =
    useParametersContext()
  const handlerRef = useRef(null)
  const cropData = predictedCropP ? cropsInfo[predictedCropP] : null

  // 5) Configuro sombras para planta y suelo
  useEffect(() => {
    potatoGltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = false
      }
    })
    soilGltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true
        child.castShadow = false
      }
    })
  }, [potatoGltf, soilGltf])

  useEffect(() => {
    if (playGrow && !playedRef.current) {
      const growAction = actions['GrowingPlant'] || Object.values(actions)[0]
      if (growAction) {
        growAction.reset()
        growAction.setLoop(THREE.LoopOnce, 1)
        growAction.clampWhenFinished = true
        growAction.play()

        const mixer = growAction.getMixer()
        handlerRef.current = (e) => {
          if (e.action === growAction) {
            setGrowFinished(true)
            setPlayGrow(false) // reset playGrow so you can trigger again
          }
        }
        mixer.addEventListener('finished', handlerRef.current)
        playedRef.current = true

        return () => {
          mixer.removeEventListener('finished', handlerRef.current)
        }
      }
    }
  }, [playGrow, actions, setGrowFinished, setPlayGrow])

  // ───────────── 6) CameraControls logic ──────────────────────────────
  const cameraControlsRef = useRef()
  const [controlsEnabled, setControlsEnabled] = useState(false)

  // Define absolute start & end positions and the target
  const startPos = new THREE.Vector3(10, 7, 7)
  const endPos = new THREE.Vector3(-2, 0.5, 4)
  const target = new THREE.Vector3(0, 0, 0) // plant is at world origin

  // Ref to track if the user is currently interacting (drag/zoom)
  const userInteracting = useRef(false)
  // Ref to hold the “resume auto-rotate” timeout
  const resumeTimeout = useRef()

  // 6A) Fly-in animation effect
  useEffect(() => {
    const cc = cameraControlsRef.current
    if (!cc) return

    // 1) Teleport camera to startPos, looking at target (instant)
    cc.setLookAt(
      startPos.x,
      startPos.y,
      startPos.z,
      target.x,
      target.y,
      target.z,
      false // no transition
    )

    // 2) Smoothly “fly” to endPos, still looking at target (~1s)
    cc.setLookAt(
      endPos.x,
      endPos.y,
      endPos.z,
      target.x,
      target.y,
      target.z,
      true // enable transition
    )

    // 3) After ~1200ms, enable user controls & begin auto-rotation
    const t = setTimeout(() => {
      setControlsEnabled(true)
    }, 1200)

    return () => clearTimeout(t)
  }, [])

  // 6B) Listen for user interaction start/end so we can pause/resume auto-rotate
  useEffect(() => {
    const cc = cameraControlsRef.current
    if (!cc) return

    function onControlStart() {
      // When user starts dragging/zooming, pause auto-rotate immediately
      userInteracting.current = true
      if (resumeTimeout.current) {
        clearTimeout(resumeTimeout.current)
        resumeTimeout.current = null
      }
    }

    function onControlEnd() {
      // When user releases, wait 3s, then resume auto-rotate
      userInteracting.current = true
      resumeTimeout.current = setTimeout(() => {
        userInteracting.current = false
      }, 3000)
    }

    cc.addEventListener('controlstart', onControlStart)
    cc.addEventListener('controlend', onControlEnd)

    return () => {
      cc.removeEventListener('controlstart', onControlStart)
      cc.removeEventListener('controlend', onControlEnd)
      if (resumeTimeout.current) {
        clearTimeout(resumeTimeout.current)
      }
    }
  }, [controlsEnabled])

  // 6C) Auto-rotate loop: run each frame if controlsEnabled && not interacting
  useFrame((_, delta) => {
    if (controlsEnabled && !userInteracting.current) {
      // Rotate around target by a small azimuthal angle each frame
      // Adjust `autoRotateSpeed` to taste (radians per second)
      const autoRotateSpeed = 0.2 // ~0.2 rad/sec → ~11°/sec
      cameraControlsRef.current.rotate(
        -autoRotateSpeed * delta, // yaw (around Y)
        0, // pitch
        false // do not animate (this is per-frame)
      )
      // Ensure the control's internal update is called automatically
    }
  })

  return (
    <>
      {/* -------------------- PERF (rendimiento) -------------------- */}
      {/* <Perf position="top-left" /> */}

      {/* -------------------- LUCES CON SOMBRAS -------------------- */}
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={4.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={10}
        shadow-camera-left={-2}
        shadow-camera-right={2}
        shadow-camera-top={2}
        shadow-camera-bottom={-2}
      />
      <ambientLight intensity={1.5} />

      {/* ─── CameraControls como única cámara (makeDefault) ─────────────── */}
      <CameraControls
        ref={cameraControlsRef}
        makeDefault
        enabled={controlsEnabled}
        minDistance={0.5}
        maxDistance={20}

        // Opciones adicionales si quieres limitar rueda/arrastre:
        // minDistance={0}, verticalDragToForward={false}, etc.
      />

      {/* -------------------- PLANTA -------------------- */}
      <primitive
        ref={potatoRef}
        object={potatoGltf.scene}
        scale={[1, 1, 1]}
        position={[0, -1, 0]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
      />

      {/* -------------------- SUELO REDUCIDO -------------------- */}
      <group position={[0, -1, 0]} scale={[0.1, 0.1, 0.1]}>
        <primitive object={soilGltf.scene} />

        {/* -------------------- PANEL HTML -------------------- */}
        {/* Posición: justo encima del suelo, centrado en X-Z */}
        {cropData &&
          cropData.cards.map((card, i) => (
            <React.Fragment key={card.label}>
              <Html
                position={card.position.map((v) => v * 12)}
                center
                distanceFactor={7}
                occlude
                zIndexRange={[10, 0]}
              >
                <div className="min-w-32 rounded-lg border border-green-500 bg-white/90 p-2 shadow-xl">
                  <div className="font-semibold text-green-700">
                    {card.label}
                  </div>
                  <div className="text-xs text-gray-700">{card.value}</div>
                </div>
              </Html>
            </React.Fragment>
          ))}
      </group>
    </>
  )
}
