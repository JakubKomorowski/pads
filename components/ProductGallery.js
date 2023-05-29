import React, { useRef } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, useThree, useFrame, extend } from 'react-three-fiber'
import FrontPad from './SplitPad'

const ProductGallery = () => {
  extend({ OrbitControls })

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
        autoRotateSpeed={0.2}
        enableDamping={true}
        ref={orbitRef}
        enablePan={false}
      />
    )
  }

  const renderItem = () => {
    return (
      <div class='h-screen cursor-grab'>
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
    )
  }

  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
      renderItem: renderItem.bind(this)
    }
  ]

  const LeftNav = ({ onClick }) => (
    <button
      className='image-gallery-icon image-gallery-left-nav'
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6 block align-middle'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15.75 19.5L8.25 12l7.5-7.5'
        />
      </svg>
    </button>
  )

  return (
    <ImageGallery
      items={images}
      showPlayButton={false}
      renderLeftNav={(onClick, disabled) => <LeftNav onClick={onClick} />}
    />
  )
}

export default ProductGallery
