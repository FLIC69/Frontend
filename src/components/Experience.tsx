import { useEffect, useState } from 'react'
import { PresentationControls, Html } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import potato from '../models/potato.glb?url'
import suelo from '../models/potato.glb?url'

// Importa react-spring para R3F
import { a, useSpring } from '@react-spring/three'

export default function Experience() {
  // 1) Cargo los GLTF: planta y suelo
  const potatoModel = useLoader(GLTFLoader, potato)
  const sueloModel = useLoader(GLTFLoader, suelo)

  // 2) Estados para los inputs del “crop recommendation”
  const [N, setN] = useState(10)
  const [P, setP] = useState(5)
  const [K, setK] = useState(10)
  const [temperature, setTemperature] = useState(20)
  const [humidity, setHumidity] = useState(50)
  const [ph, setPh] = useState(6.5)
  const [rainfall, setRainfall] = useState(100)

  // 3) Estado para disparar la animación de escala de la planta
  const [animatePlant, setAnimatePlant] = useState(false)

  // 4) Configuro la animación (react-spring) para la escala de la planta
  //    Cuando `animatePlant === false` → escala [0,0,0].
  //    Al hacer clic en “Send”, `animatePlant` pasará a true → escala [0.16,0.16,0.16].
  const { scale } = useSpring({
    scale: animatePlant ? [0.16, 0.16, 0.16] : [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 },
  })

  const AnimatedPrimitive = a.primitive as unknown as React.FC<any>

  // 5) Habilito sombras para cada mesh de la planta y el suelo
  useEffect(() => {
    potatoModel.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = false
      }
    })
    sueloModel.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.receiveShadow = true
        child.castShadow = false
      }
    })
  }, [potatoModel, sueloModel])

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

      {/* 
        NOTA: Ya no usamos <color> aquí porque el fondo lo controla
        el gradiente CSS que pusimos en el contenedor padre (App.jsx). 
      */}

      {/* -------------------- PRESENTATION CONTROLS -------------------- */}
      <PresentationControls
        global
        cursor
        snap
        speed={1.5}
        rotation={[0, 0, 0]}
        polar={[-0.2, 0.2]}
        azimuth={[-0.2, 0.2]}
        // config={{ mass: 0.5, tension: 200, friction: 40 }}
      >
        {/* 
          6) Planta animada: 
             - Usamos  <a.primitive>  para que react-spring maneje la escala 
             - scale viene de useSpring()
        */}
        <AnimatedPrimitive
          object={potatoModel.scene}
          scale={scale} // escala animada
          position-y={-1}
        />

        {/* 
          7) Suelo: 
             - dentro de un <group> para poder insertar el <Html> encima 
        */}
        <group position-y={-1} scale={0.6}>
          <primitive object={sueloModel.scene} />

          {/*
            8) Panel HTML “flotando” sobre el suelo:
               - position: [0, 0.05, 0] (un poco arriba del suelo)
               - `center`: para centrar el div en esas coordenadas 3D
               - `distanceFactor={8}`: reduce el tamaño en función de la distancia
               - Sin `transform`, para que siempre “mire” a la cámara (billboard)
          */}
          <Html position={[1.5, 2.5, 4.5]} center distanceFactor={6} occlude>
            {/*
              9) Div con el formulario: 
                 - Usamos clases Tailwind para spacing y tamaño
                 - Incluimos un botón “Send” al final
            */}
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

              {/* Campo Temperature */}
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

              {/* Campo Humidity */}
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

              {/* Campo Rainfall */}
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
                onClick={() => setAnimatePlant(true)}
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
      </PresentationControls>
    </>
  )
}
