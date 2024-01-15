import React, { useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import FrontPad from '../components/Pad'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { ROUTES } from '../routes'
import Link from 'next/link'

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
      autoRotate={true}
      autoRotateSpeed={0.1}
      enableDamping={true}
      ref={orbitRef}
      enablePan={false}
    />
  )
}

const Home = () => {
  const { t } = useTranslation()
  const { width } = useWindowDimensions()

  return (
    <section>
      <div className=' flex justify-center items-center flex-grow container mx-auto h-auto flex-col-reverse lg:flex-row lg:h-[calc(100vh-65px)]'>
        <div className=' w-full lg:w-2/6'>
          <div className=' font-bold font-mukta mb-10 leading-tight'>
            <h1>{t('home_h1')}</h1>
          </div>
          <Link href={ROUTES['products']}>
            <button className=' bg-main px-14 py-4 rounded-lg text-white border border-main text-2xl leading-normal font-bold transition-all duration-200 hover:border hover:border-secondary hover:text-secondary hover:bg-white'>
              {t('shop_now')}
            </button>
          </Link>
        </div>

        <div className=' w-full h-[400px] cursor-grab active:cursor-grabbing lg:h-full lg:w-4/6'>
          <Canvas
            orthographic
            camera={{
              position: [0, 0, 0.25],
              left: -2,
              right: 2,
              top: 2,
              bottom: -2,
              zoom: width > 1535 ? 2500 : width < 600 ? 1200 : 1800
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
      </div>
    </section>
  )
}

export default Home
