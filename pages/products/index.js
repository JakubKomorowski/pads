import Stripe from 'stripe'
import Link from 'next/link'
import Card from '../../components/Card'
import { useCurrency } from '../../context/CurrencyContext'
import { useEffect, useState } from 'react'

const Products = ({ prices: { data = [] } }) => {
  const { currency } = useCurrency()
  const [currencyData, setCurrencyData] = useState(data)

  useEffect(() => {
    const filteredData = data?.filter(el => {
      return el.currency === currency
    })
    setCurrencyData(filteredData)
  }, [currency])

  console.log(currencyData)

  const key = 'name'
  const unique = [
    ...new Map(currencyData.map(item => [item.product[key], item])).values()
  ]

  const uniqueProducts = currencyData.filter(el => !el.product.unit_label)

  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold text-gray-900 mt-4'>Online Courses</h2>
      <div className='mt-8 grid gap-y-12 gap-x-8 grid-cols-fluid'>
        {uniqueProducts.map(price => (
          <Card key={price.id} price={price} />
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const prices = await stripe.prices.list({
    active: true,
    limit: 80,
    expand: ['data.product']
  })

  return {
    props: {
      prices
    }
  }
}

export default Products
