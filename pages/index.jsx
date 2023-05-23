import React, { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {
  Canvas,
  extend,
  useThree,
  useFrame,
  ReactThreeFiber
} from 'react-three-fiber'
import { useSpring, animated } from '@react-spring/three'
import CameraControls from 'camera-controls'

extend({ OrbitControls })
CameraControls.install({ THREE })
extend({ CameraControls })

const FrontPad = () => {
  const [model, setModel] = useState()
  useEffect(() => {
    new GLTFLoader().load('/assets/hinge-pads.gltf', setModel)
  }, [])

  return (
    <mesh rotation={[0, -0.0, 0]} position={[0.015, -0.1, 0.0]} receiveShadow>
      {model ? <primitive object={model.scene} /> : null}
    </mesh>
  )
}

const Control = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()

  useFrame(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls
      args={[camera, gl.domElement]}
      enableZoom={false}
      autoRotate={true}
      autoRotateSpeed={0.2}
      enableDamping={true}
      ref={orbitRef}
    />
  )
}

function Controls() {
  const ref = useRef()
  const camera = useThree(state => state.camera)
  const gl = useThree(state => state.gl)

  useFrame((state, delta) => {
    // update camera angles according to mouse position
    ref.current.azimuthAngle = -state.mouse.x / 15
    ref.current.polarAngle = Math.PI / 2 + state.mouse.y / 15
    ref.current.dollySpeed = 0
    ref.current.truckSpeed = 0
    ref.current.disconnect()
    ref.current.update(delta)
    // console.log(state);
  })

  return <cameraControls ref={ref} args={[camera, gl.domElement]} />
}

const Home = () => {
  return (
    <section className=' flex justify-center items-center flex-grow container mx-auto h-[calc(100vh-65px)]'>
      <div className='w-2/6 min-w-[500px]'>
        <div className='text-5xl font-bold font-mukta mb-10 leading-tight'>
          Build with comfort and <br /> customizability in mind
        </div>
        <button className='bg-main px-14 py-4 rounded-full text-2xl font-bold text-white transition-all duration-200 hover:bg-dark'>
          Shop now
        </button>
      </div>

      <div className=' w-4/6 h-full cursor-grab	'>
        <Canvas
          orthographic
          camera={{
            position: [0, 0, 0.25],
            left: -2,
            right: 2,
            top: 2,
            bottom: -2,
            zoom: 2500
          }}
        >
          <ambientLight intensity={0.8} />
          <spotLight
            position={[-5, 0, 5]}
            intensity={1}
            castShadow
            angle={Math.PI}
          />
          <spotLight position={[5, 0, 0]} penumbra={1} castShadow />

          <Control />
          <FrontPad />
        </Canvas>
      </div>
    </section>
  )
}

export default Home
