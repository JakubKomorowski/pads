import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { useCurrency } from '../context/CurrencyContext'

const Card = ({ price }) => {
  const { items, addItem } = useCart()
  const [error, setError] = useState('')
  const { product, unit_amount } = price
  const { currency } = useCurrency()
  const addItemToCart = price => {
    addItem(price)
  }

  useEffect(() => {
    const timeout = setTimeout(() => setError(''), 3000)
    return () => clearTimeout(timeout)
  }, [error])
  return (
    <div className='cursor-pointer'>
      <Link
        href={
          'products/' + price.product.name.replace(/\s+/g, '-').toLowerCase()
        }
      >
        <div className='relative group'>
          <div className='card w-96 bg-base-100 shadow-xl'>
            <figure>
              {' '}
              <div className='relative w-full h-80 rounded-lg overflow-hidden '>
                <Image
                  src={product?.images[0]}
                  alt={product?.description}
                  className='object-cover w-full'
                  layout='fill'
                />
              </div>
            </figure>
            <div className='card-body '>
              <h2 className='card-title'>{product.name}</h2>
              <p>{product.description}</p>
              <div className='card-actions justify-end'>
                <button className='btn btn-primary bg-main text-white border-none hover:bg-dark'>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
      {/* <div className='mt-6'>
        <button
          onClick={() => addItemToCart(price)}
          className='relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200'
        >
          Add to Cart<span className='sr-only'>, {product.name}</span>
        </button>
        {error && <p className='text-sm text-red-400'>{error}</p>}
      </div> */}
    </div>
  )
}

export default Card
