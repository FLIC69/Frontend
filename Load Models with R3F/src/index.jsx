import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <div className="
        w-screen 
        h-screen 
        bg-gradient-to-b 
        from-green-200 
        via-green-100 
        to-green-50
    ">
        <Canvas
            shadows
            camera={ {
                fov: 50,
                near: 0.1,
                far: 200,
                position: [ - 4, 3, 6 ]
            } }
            style={{ background: 'transparent' }}
            >
            <Experience />
        </Canvas>
    </div>  
)