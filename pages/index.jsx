import React, { useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import FrontPad from '../components/SplitPad'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

extend({ OrbitControls })
CameraControls.install({ THREE })
extend({ CameraControls })

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
      autoRotate={false}
      autoRotateSpeed={0.1}
      enableDamping={true}
      ref={orbitRef}
      enablePan={false}
    />
  )
}

const Home = () => {
  const { t } = useTranslation()

  return (
    <section className=' flex justify-center items-center flex-grow container mx-auto h-[calc(100vh-65px)]'>
      <div className='w-2/6 min-w-[500px]'>
        <div className='text-5xl font-bold font-mukta mb-10 leading-tight'>
          {t('home_h1')}
        </div>
        <button className=' bg-main px-14 py-4 rounded-full text-secondary border border-main text-2xl leading-normal font-bold transition-all duration-200 hover:border hover:border-secondary hover:bg-white'>
          Shop now
        </button>
      </div>

      <div className=' w-4/6 h-full cursor-grab active:cursor-grabbing	'>
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
