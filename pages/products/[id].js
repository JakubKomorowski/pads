import React, { useEffect, useState, useRef } from 'react'
import Stripe from 'stripe'
import Select from '../../components/Select'
import { useCart } from '../../context/CartContext'
import { useCurrency } from '../../context/CurrencyContext'
import 'react-image-gallery/styles/css/image-gallery.css'
import ProductGallery from '../../components/ProductGallery'

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

  console.log('third', currencyData)
  console.log('sec', selected)

  useEffect(() => {
    const timeout = setTimeout(() => setError(''), 3000)
    return () => clearTimeout(timeout)
  }, [error])

  const itemToCard = currencyData?.find(el => el.product?.id === selected?.id)
  const selectedPrice =
    currencyData?.find(el => el.product?.id === selected?.id) || currencyData[0]

  console.log('slected privce', selectedPrice)

  return (
    <div className='w-100vw h-screen cursor-grab flex gap-5  pt-10'>
      <ProductGallery />
      <div className='w-1/2'>
        <h2 className='text-3xl font-bold mb-4'>{selected.name}</h2>
        <p className='relative text-3xl text-black group-hover:text-black mb-4 font-light'>
          {(selectedPrice.unit_amount / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: currency
          })}
        </p>
        <p className='mb-4'>{selectedPrice.product.description}</p>
        <Select
          data={currencyData}
          selected={selected}
          setSelected={setSelected}
        />
        <button onClick={() => addItemToCart(itemToCard)}>add</button>
      </div>
    </div>
  )
}

export default ProductDetails
