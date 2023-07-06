import React from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

const ProductGallery = ({ images }) => {
  const LeftNav = ({ onClick }) => (
    <button
      className='text-white absolute bg-transprent appearance-none border-none cursor-pointer outline-none z-10 hover:text-gray-200 image-gallery-left-nav'
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-12 h-12 block align-middle '
      >
        <path
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='m15.5 5-7 7 7 7'
        />
      </svg>
    </button>
  )

  const RightNav = ({ onClick }) => (
    <button
      className='text-white absolute bg-transprent appearance-none border-none cursor-pointer outline-none z-10 hover:scale-200 right-0 image-gallery-right-nav '
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-12 h-12 block align-middle hover:scale-200'
      >
        <path
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='m9 5 7 7-7 7'
        />
      </svg>
    </button>
  )

  return (
    <div className='w-1/2 cursor-grab aspect-video'>
      <ImageGallery
        items={images}
        showPlayButton={false}
        renderLeftNav={(onClick, disabled) => <LeftNav onClick={onClick} />}
        renderRightNav={(onClick, disabled) => <RightNav onClick={onClick} />}
      />
    </div>
  )
}

export default ProductGallery
