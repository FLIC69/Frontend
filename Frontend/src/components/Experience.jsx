import { useEffect, useState, useRef } from 'react'
import { Html, OrbitControls, useAnimations } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

export default function Experience() {
  // 1) Cargo los GLTF: planta y suelo
  const potatoGltf = useLoader(GLTFLoader, '/models/planta.glb')
  const soilGltf   = useLoader(GLTFLoader, '/models/suelo.glb')

  // 2) Hook para manejar las animaciones de la planta
  const { ref: potatoRef, actions } = useAnimations(potatoGltf.animations, potatoGltf.scene)

  // 3) Estados para los inputs del “crop recommendation”
  const [N, setN] = useState(10)
  const [P, setP] = useState(5)
  const [K, setK] = useState(10)
  const [temperature, setTemperature] = useState(20)
  const [humidity, setHumidity] = useState(50)
  const [ph, setPh] = useState(6.5)
  const [rainfall, setRainfall] = useState(100)

  // 4) Estado para disparar la animación de crecimiento de la planta
  const [playGrow, setPlayGrow] = useState(false)
  const playedRef = useRef(false)

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

  // 6) Reproducir animación "Grow" una sola vez al hacer click en Send
  useEffect(() => {
    if (playGrow && !playedRef.current) {
      const growAction = actions['GrowingPlant'] || Object.values(actions)[0]
      if (growAction) {
        growAction.reset()
        growAction.setLoop(THREE.LoopOnce, 1)
        growAction.clampWhenFinished = true
        growAction.play()
        playedRef.current = true
      }
    }
  }, [playGrow, actions])

  return (
    <>
      {/* -------------------- PERF (rendimiento) -------------------- */}
      <Perf position="top-left" />

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

      {/* -------------------- ORBIT CONTROLS -------------------- */}
      <OrbitControls makeDefault />

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
        <Html position={[0, 3, 15]} center distanceFactor={5} occlude>
          <div className="bg-white/90 p-2 rounded-md shadow-lg text-sm w-48">
            {/* Campo N */}
            <label className="flex items-center space-x-1">
              <span className="text-gray-700">↑ N:</span>
              <input
                type="number"
                value={N}
                onChange={(e) => setN(+e.target.value)}
                className="
                  w-12
                  px-1
                  py-0.5
                  border
                  border-gray-300
                  rounded
                  focus:outline-none
                  focus:ring-1
                  focus:ring-green-400
                  text-sm
                "
              />
            </label>

            {/* Campo P */}
            <label className="flex items-center space-x-1 mt-1">
              <span className="text-gray-700">↑ P:</span>
              <input
                type="number"
                value={P}
                onChange={(e) => setP(+e.target.value)}
                className="
                  w-12
                  px-1
                  py-0.5
                  border
                  border-gray-300
                  rounded
                  focus:outline-none
                  focus:ring-1
                  focus:ring-green-400
                  text-sm
                "
              />
            </label>

            {/* Campo K */}
            <label className="flex items-center space-x-1 mt-1">
              <span className="text-gray-700">↑ K:</span>
              <input
                type="number"
                value={K}
                onChange={(e) => setK(+e.target.value)}
                className="
                  w-12
                  px-1
                  py-0.5
                  border
                  border-gray-300
                  rounded
                  focus:outline-none
                  focus:ring-1
                  focus:ring-green-400
                  text-sm
                "
              />
            </label>

            {/* Campo Temp */}
            <label className="flex items-center space-x-1 mt-1">
              <span className="text-gray-700">↑ Temp (°C):</span>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(+e.target.value)}
                className="
                  w-12
                  px-1
                  py-0.5
                  border
                  border-gray-300
                  rounded
                  focus:outline-none
                  focus:ring-1
                  focus:ring-green-400
                  text-sm
                "
              />
            </label>

            {/* Campo Hum */}
            <label className="flex items-center space-x-1 mt-1">
              <span className="text-gray-700">↑ Hum (%):</span>
              <input
                type="number"
                value={humidity}
                onChange={(e) => setHumidity(+e.target.value)}
                className="
                  w-12
                  px-1
                  py-0.5
                  border
                  border-gray-300
                  rounded
                  focus:outline-none
                  focus:ring-1
                  focus:ring-green-400
                  text-sm
                "
              />
            </label>

            {/* Campo pH */}
            <label className="flex items-center space-x-1 mt-1">
              <span className="text-gray-700">↑ pH:</span>
              <input
                type="number"
                step="0.1"
                value={ph}
                onChange={(e) => setPh(+e.target.value)}
                className="
                  w-12
                  px-1
                  py-0.5
                  border
                  border-gray-300
                  rounded
                  focus:outline-none
                  focus:ring-1
                  focus:ring-green-400
                  text-sm
                "
              />
            </label>

            {/* Campo Lluvia */}
            <label className="flex items-center space-x-1 mt-1">
              <span className="text-gray-700">↑ Lluvia:</span>
              <input
                type="number"
                value={rainfall}
                onChange={(e) => setRainfall(+e.target.value)}
                className="
                  w-12
                  px-1
                  py-0.5
                  border
                  border-gray-300
                  rounded
                  focus:outline-none
                  focus:ring-1
                  focus:ring-green-400
                  text-sm
                "
              />
            </label>

            {/* Botón Send */}
            <button
              onClick={() => setPlayGrow(true)}
              className="
                mt-2
                w-full
                bg-green-500
                text-white
                text-sm
                py-1
                rounded
                hover:bg-green-600
                transition-colors
              "
            >
              Send
            </button>
          </div>
        </Html>
      </group>
    </>
  )
}