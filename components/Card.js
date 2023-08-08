import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Card = ({ product }) => {
  const [error, setError] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => setError(''), 3000)
    return () => clearTimeout(timeout)
  }, [error])
  return (
    <div className='cursor-pointer'>
      <Link
        href={
          // 'products/' + price.product.name.replace(/\s+/g, '-').toLowerCase()
          'products/' + product.slug
        }
      >
        <div className='relative group'>
          <div className='card w-80 md:w-96 bg-base-100 shadow-xl'>
            <figure>
              {' '}
              <div className='relative w-full h-80 rounded-lg overflow-hidden '>
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className='object-contain w-full'
                  layout='fill'
                />
              </div>
            </figure>
            <div className='card-body '>
              <h2 className='card-title'>{product.name}</h2>
              {/* <p>{product.description}</p> */}
              <div className='card-actions justify-end'>
                <button className='btn btn-primary bg-main text-white border-none hover:bg-dark'>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card
