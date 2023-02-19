import Stripe from 'stripe'
import Link from 'next/link'
import Card from '../../components/Card'

const Products = ({ prices: { data = [] } }) => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-gray-900 mt-4'>Online Courses</h2>
      <div className='mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {data.map(price => (
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
    limit: 10,
    expand: ['data.product']
  })

  return {
    props: {
      prices
    }
  }
}

export default Products
