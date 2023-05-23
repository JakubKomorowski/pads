import React, { useEffect, useState } from 'react'
import Stripe from 'stripe'
import Select from '../../components/Select'
import { useCart } from '../../context/CartContext'
import { useCurrency } from '../../context/CurrencyContext'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

export async function getStaticPaths() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const products = await stripe.products.list()

  const paths = products.data.map(el => {
    const name = el.name.replace(/\s+/g, '-').toLowerCase()
    return {
      params: { id: name }
    }
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async context => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const id = context.params.id
  const prices = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ['data.product']
  })
  return {
    props: {
      prices,
      id
    }
  }
}

const ProductDetails = ({ prices, id }) => {
  const { currency } = useCurrency()
  const data = prices?.data.filter(
    item => item.product.name.replace(/\s+/g, '-').toLowerCase() === id
  )
  const [currencyData, setCurrencyData] = useState(data)

  useEffect(() => {
    const filteredData = data?.filter(el => {
      return el.currency === currency
    })
    setCurrencyData(filteredData)
  }, [currency])

  const [selected, setSelected] = useState(currencyData[0].product)
  const { items, addItem } = useCart()
  const [error, setError] = useState('')

  const addItemToCart = price => {
    addItem(price)
  }

  console.log('first', currencyData)

  useEffect(() => {
    const timeout = setTimeout(() => setError(''), 3000)
    return () => clearTimeout(timeout)
  }, [error])

  const itemToCard = currencyData?.find(el => el.product?.id === selected?.id)

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
    <div>
      <div>
        <Select
          data={currencyData}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <button onClick={() => addItemToCart(itemToCard)}>add</button>
      <ImageGallery
        items={images}
        showPlayButton={false}
        renderLeftNav={(onClick, disabled) => <LeftNav onClick={onClick} />}
      />
    </div>
  )
}

export default ProductDetails
