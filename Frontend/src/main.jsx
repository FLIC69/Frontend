import './style.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { Canvas } from '@react-three/fiber'
import { StrictMode } from 'react';
import Experience from './components/Experience.jsx'

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
                position: [ - 2, 4, 5 ]
            } }
            style={{ background: 'transparent' }}
            >
            <Experience />
        </Canvas>
    </div>  
)