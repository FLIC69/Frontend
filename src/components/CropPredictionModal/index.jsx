'use client'

import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CameraControls, Html, useGLTF } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
}

// Mock: all your crop models should be mapped here (use your real URLs/ids)
const cropModels = {
  apple: '/models/crops/apple.glb',
  banana: '/models/crops/banana.glb',
  chickpea: '/models/crops/bowl_chickpeas.glb',
  kidneybeans: '/models/crops/bowl_kidneybeans.glb',
  blackgram: '/models/crops/bowl_kidneybeans.glb',
  mungbeans: '/models/crops/bowl_kidneybeans.glb',
  mothbeans: '/models/crops/bowl_mothbeans.glb',
  pigeonpeas: '/models/crops/bowl_pigeonpeas.glb',
  lentil: '/models/crops/bowl_pigeonpeas.glb',
  rice: '/models/crops/bowl_rice.glb',
  coconut: '/models/crops/coconut.glb',
  coffee: '/models/crops/coffee.glb',
  maize: '/models/crops/corn.glb',
  cotton: '/models/crops/cotton.glb',
  grapes: '/models/crops/grapes.glb',
  jute: '/models/crops/jute.glb',
  mango: '/models/crops/mango.glb',
  muskmelon: '/models/crops/muskmelon.glb',
  orange: '/models/crops/orange.glb',
  papaya: '/models/crops/papaya.glb',
  pomegranate: '/models/crops/pomegranate.glb',
  watermelon: '/models/crops/watermelon.glb',
  // ...etc
}

function CenteredAndFittedModel({ url, maxDimension = 2, ...props }) {
  const { scene } = useGLTF(url)
  const group = useRef()
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    if (!scene || !group.current) return

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(scene)
    const center = new THREE.Vector3()
    box.getCenter(center)

    // Move model so center is at origin
    group.current.position.set(-center.x, -center.y, -center.z)

    // Compute the size of the box in each dimension
    const size = new THREE.Vector3()
    box.getSize(size)
    // Find the largest dimension (width, height, or depth)
    const largestDim = Math.max(size.x, size.y, size.z)
    // Compute scale to fit the maxDimension
    setScale(largestDim > 0 ? maxDimension / largestDim : 1)
  }, [scene, maxDimension])

  // Group lets us move the loaded model to origin
  return (
    <group ref={group} scale={scale} {...props}>
      <primitive object={scene} />
    </group>
  )
}

// Camera animation
// For each modal open, reset to fly-in
function ModalCameraFly({ target = [0, 0, 0] }) {
  const cameraControlsRef = useRef()
  const [controlsEnabled, setControlsEnabled] = useState(false)
  const userInteracting = useRef(false)
  const resumeTimeout = useRef()

  // Start/end positions
  const startPos = new THREE.Vector3(10, 7, 7)
  const endPos = new THREE.Vector3(-2, 2, 4)
  const _target = new THREE.Vector3(...target)

  useEffect(() => {
    const cc = cameraControlsRef.current
    if (!cc) return

    // 1. Teleport instantly
    cc.setLookAt(
      startPos.x,
      startPos.y,
      startPos.z,
      _target.x,
      _target.y,
      _target.z,
      false
    )

    // 2. Smoothly fly to end position
    cc.setLookAt(
      endPos.x,
      endPos.y,
      endPos.z,
      _target.x,
      _target.y,
      _target.z,
      true // animate!
    )

    // 3. Enable controls after the fly-in (~1.2s)
    const t = setTimeout(() => setControlsEnabled(true), 1200)
    return () => clearTimeout(t)
  }, []) // on mount

  // Pause auto-rotate on user interaction
  useEffect(() => {
    const cc = cameraControlsRef.current
    if (!cc) return
    function onControlStart() {
      userInteracting.current = true
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    }
    function onControlEnd() {
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
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    }
  }, [controlsEnabled])

  // Auto-rotate when not interacting
  useFrame((_, delta) => {
    if (controlsEnabled && !userInteracting.current) {
      cameraControlsRef.current?.rotate(-0.2 * delta, 0, false)
    }
  })

  return (
    <CameraControls
      ref={cameraControlsRef}
      makeDefault
      enabled={controlsEnabled}
      minDistance={2}
      maxDistance={20}
      // More options as needed!
    />
  )
}

// Crop Model Loader
function CropModel({ cropId }) {
  const { scene } = useGLTF(cropModels[cropId])
  return <primitive object={scene} scale={1.5} />
}

// Main Modal
export default function CropPredictionModal({ open, cropId, onClose }) {
  // Optionally preload model
  useEffect(() => {
    if (open && cropId && cropModels[cropId]) {
      useGLTF.preload(cropModels[cropId])
    }
  }, [open, cropId])

  // ESC to close
  useEffect(() => {
    if (!open) return
    const handle = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && cropId && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-[2px]"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="relative h-full w-full"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.22 }}
          >
            {/* Canvas 3D */}
            <Canvas camera={{ position: [0, 2, 5], fov: 40 }}>
              <ambientLight intensity={0.9} />
              <directionalLight position={[3, 5, 3]} intensity={0.8} />
              <React.Suspense
                fallback={
                  <Html center style={{ color: '#fff' }}>
                    Loading...
                  </Html>
                }
              >
                <ModalCameraFly />
                <CenteredAndFittedModel
                  url={cropModels[cropId]}
                  maxDimension={2}
                />
              </React.Suspense>
            </Canvas>
            {/* Absolute header */}
            <div className="absolute top-8 left-1/2 z-10 -translate-x-1/2 text-3xl font-bold text-white drop-shadow-lg select-none">
              Crop Predicted:{' '}
              <span className="text-green-400 capitalize">{cropId}</span>
            </div>
            {/* Absolute close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-8 z-10 text-3xl font-bold text-white hover:text-green-300"
              aria-label="Close"
            >
              ×
            </button>
            {/* Close on click backdrop */}
            {/* <div
                className="absolute inset-0"
                style={{ zIndex: 1, cursor: 'pointer' }}
                onClick={onClose}
              /> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
