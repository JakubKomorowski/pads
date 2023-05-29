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

  console.log('first', currencyData)

  useEffect(() => {
    const timeout = setTimeout(() => setError(''), 3000)
    return () => clearTimeout(timeout)
  }, [error])

  const itemToCard = currencyData?.find(el => el.product?.id === selected?.id)

  return (
    <div className='w-100vw h-screen cursor-grab'>
      <div>
        <Select
          data={currencyData}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <button onClick={() => addItemToCart(itemToCard)}>add</button>
      <ProductGallery />
    </div>
  )
}

export default ProductDetails
