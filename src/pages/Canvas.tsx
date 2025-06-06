import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import Experience from '../components/Experience'
import { pageTransition } from '../utils/animations'

const CanvasComponent = () => {
  return (
    <motion.div
      className="
        w-screen
        h-screen
        bg-gradient-to-b
        from-green-200
        via-green-100
        to-green-50
    "
      variants={pageTransition}
    >
      <Canvas
        shadows
        camera={{
          fov: 50,
          near: 0.1,
          far: 200,
          position: [-4, 2, 2],
        }}
        style={{ background: 'transparent' }}
      >
        <Experience />
      </Canvas>
    </motion.div>
  )
}

export default CanvasComponent
