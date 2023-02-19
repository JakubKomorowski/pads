import React from 'react'
import Stripe from 'stripe'

export async function getStaticPaths() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const prices = await stripe.products.list()

  const paths = prices.data.map(el => {
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
  const product = await (
    await stripe.products.list()
  ).data.find(item => item.name.replace(/\s+/g, '-').toLowerCase() === id)
  return {
    props: {
      product
    }
  }
}

const ProductDetails = ({ product }) => {
  return <div>{product.name}</div>
}

export default ProductDetails
