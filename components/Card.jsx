import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const Card = ({ product }) => {
  const [error, setError] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    const timeout = setTimeout(() => setError(''), 3000)
    return () => clearTimeout(timeout)
  }, [error])

  return (
    <div className='cursor-pointer'>
      <Link href={'products/' + product.slug}>
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
              <div className='card-actions justify-end'>
                <button className='ease-in duration-100 flex items-center justify-center rounded-md border border-transparent  bg-main px-6 py-3 text-base font-medium text-white shadow-sm hover:border hover:border-secondary hover:bg-white hover:text-secondary'>
                  {t('see_more')}
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
