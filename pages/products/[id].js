import React, { useEffect, useState, useRef } from 'react'
import Stripe from 'stripe'
import Select from '../../components/Select'
import { useCart } from '../../context/CartContext'
import { useCurrency } from '../../context/CurrencyContext'
import 'react-image-gallery/styles/css/image-gallery.css'
import ProductGallery from '../../components/ProductGallery'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber'
import SplitPad from '../../components/SplitPad'
import useWindowDimensions from '../../hooks/useWindowDimensions'

export async function getStaticPaths() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const products = await stripe.products.list()

  const paths = products.data.map(el => {
    const name = el.name.replace(/\s+/g, '-').toLowerCase()
    return {
      params: { id: name, locale: 'pl' },
      params: { id: name, locale: 'en' }
    }
  })
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async context => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const id = context.params.id
  const prices = await stripe.prices.list({
    active: true,
    limit: 80,
    expand: ['data.product']
  })
  if (id === 'pad-test-2') {
    return { notFound: true }
  }
  return {
    props: {
      prices,
      id
    },
    notFound: false
  }
}

const ProductDetails = ({ prices, id }) => {
  const { currency } = useCurrency()
  const data = prices?.data.filter(
    item => item.product.name.replace(/\s+/g, '-').toLowerCase() === id
  )
  const [currencyData, setCurrencyData] = useState(data)
  const [selected, setSelected] = useState(currencyData?.[0].product)
  const { items, addItem } = useCart()
  const [error, setError] = useState('')
  const { width } = useWindowDimensions()

  const firstWord = selected?.name?.split(' ')[0].toLowerCase()

  useEffect(() => {
    const filteredData = data?.filter(el => {
      return el.currency === currency
    })
    setCurrencyData(filteredData)
    setSelected(filteredData?.[0].product)
  }, [currency, prices])

  const addItemToCart = price => {
    addItem(price)
  }

  useEffect(() => {
    const timeout = setTimeout(() => setError(''), 3000)
    return () => clearTimeout(timeout)
  }, [error])

  const itemToCard = currencyData?.find(el => el.product?.id === selected?.id)
  const selectedPrice =
    currencyData?.find(el => el.product?.id === selected?.id) ||
    currencyData?.[0]

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
        enableZoom={true}
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
      <div className=' aspect-square cursor-grab bg-bg mx-auto max-w-[700px] '>
        <Canvas
          orthographic
          camera={{
            position: [0, 0, 0.25],
            left: -2,
            right: 2,
            top: 2,
            bottom: -2,
            zoom: width > 1535 ? 2500 : 2000
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
          <SplitPad name={selected?.name} color={selected?.unit_label} />
        </Canvas>
      </div>
    )
  }

  const testImages = [1, 2].map((el, i) => {
    return {
      original: `/assets/images/${firstWord}/${selected?.unit_label}-${
        i + 1
      }.jpg`,
      thumbnail: `/assets/images/${firstWord}/${selected?.unit_label}-${
        i + 1
      }.jpg`
    }
  })

  const images = [
    ...testImages,
    {
      original: `/assets/images/${firstWord}/${selected?.unit_label}-${2}.jpg`,
      thumbnail: `/assets/images/${firstWord}/${selected?.unit_label}-${2}.jpg`,
      renderItem: renderItem.bind(this)
    }
  ]

  return (
    <div className='container mx-auto  flex  gap-24 items-center pt-10'>
      <ProductGallery images={images} />
      <div className='w-2/5 flex flex-col items-center'>
        <div className='max-w-[300px]'>
          <h2 className='text-5xl font-bold mb-2 '>{selected?.name}</h2>
          <p className='font-semibold text-gray-400 mb-10'>Devon Pads</p>

          <p className='mb-4'>{selectedPrice?.product.description}</p>
          <Select
            data={currencyData}
            selected={selected}
            setSelected={setSelected}
          />
          <p className='relative text-3xl text-black group-hover:text-black mb-4 font-light mt-10'>
            {(selectedPrice?.unit_amount / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: currency
            })}
          </p>
          <button
            onClick={() => addItemToCart(itemToCard)}
            className='flex mt-8 items-center justify-center rounded-md border border-transparent  bg-main px-6 py-3 text-base font-medium text-white shadow-sm hover:border hover:border-secondary hover:bg-white hover:text-secondary'
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
