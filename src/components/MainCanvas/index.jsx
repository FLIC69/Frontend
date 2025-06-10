import { Canvas } from '@react-three/fiber'
import React from 'react'
import Experience from '../Experience'

const MainCanvas = () => {
  return (
    <div className="absolute top-0 left-0 z-0 h-screen w-screen bg-gradient-to-b from-green-200 via-green-100 to-green-50">
      <Canvas
        shadows
        style={{ background: 'transparent' }}
      >
        <Experience />
      </Canvas>
    </div>
  )
}

export default MainCanvas
