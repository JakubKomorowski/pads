/* eslint-disable @next/next/no-img-element */
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'
import { checkout } from '../lib/checkout'
import SlideOver from './SlideOver'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

export default function ShoppingCartSlideOver({ open, setCartSliderIsOpen }) {
  const { items, removeItem, increaseQuantity, decreaseQuantity } = useCart()
  const subTotal = items.reduce(
    (acc, curr) => (acc += curr.unit_amount * curr.quantity),
    0
  )

  const handleCheckout = event => {
    event.preventDefault()
    checkout(items)
  }

  return (
    <SlideOver open={open} setOpen={setCartSliderIsOpen}>
      <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
        <div className='flex-1 overflow-y-auto py-6 px-4 sm:px-6'>
          <div className='flex items-start justify-between'>
            <Dialog.Title className='text-lg font-medium text-gray-900'>
              Shopping cart
            </Dialog.Title>
            <div className='ml-3 flex h-7 items-center'>
              <button
                type='button'
                className='-m-2 p-2 text-gray-400 hover:text-gray-500'
                onClick={() => setCartSliderIsOpen(false)}
              >
                <span className='sr-only'>Close panel</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
          </div>

          <div className='mt-8'>
            <div className='flow-root'>
              <ul role='list' className='-my-6 divide-y divide-gray-200'>
                {items.map(price => (
                  <li key={price.id} className='flex py-6'>
                    <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                      <img
                        src={price.product.images[0]}
                        alt={price.product.description}
                        className='h-full w-full object-contain object-center'
                      />
                    </div>

                    <div className='ml-4 flex flex-1 flex-col'>
                      <div>
                        <div className='flex justify-between text-base font-medium text-gray-900'>
                          <h3>
                            <a href={price.product.href}>
                              {price.product.name}
                            </a>
                          </h3>
                          <p className='ml-4'>
                            {(price.unit_amount / 100).toLocaleString('en-US', {
                              style: 'currency',
                              currency: price.currency
                            })}
                          </p>
                        </div>
                        <p className='mt-2 text-sm text-gray-500'>
                          {price.product.description}
                        </p>
                      </div>
                      <div className='flex flex-1 items-center justify-between text-sm  mt-4'>
                        <div className='flex gap-4 items-center '>
                          <button
                            disabled={price.quantity === 1}
                            onClick={() => decreaseQuantity(price)}
                            className=' hover:bg-gray-100 text-gray-800 font-bold py-2 px-2 rounded disabled:hover:bg-white'
                          >
                            <AiOutlineMinus />
                          </button>
                          <p className='text-gray-500'>{price.quantity}</p>

                          <button
                            onClick={() => increaseQuantity(price)}
                            className=' hover:bg-gray-100 text-gray-800 font-bold py-2 px-2 rounded '
                          >
                            <AiOutlinePlus />
                          </button>
                        </div>

                        <div className='flex'>
                          <button
                            type='button'
                            onClick={() => removeItem(price.id)}
                            className='font-medium text-main hover:text-dark'
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
          <div className='flex justify-between text-base font-medium text-gray-900'>
            <p>Subtotal</p>
            <p>
              {(subTotal / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: items[0]?.currency ? items[0]?.currency : 'eur'
              })}
            </p>
          </div>
          <p className='mt-0.5 text-sm text-gray-500'>
            Shipping and taxes calculated at checkout.
          </p>
          <div className='mt-6'>
            <a
              href='#'
              onClick={handleCheckout}
              className='flex items-center justify-center rounded-md border border-transparent  bg-main px-6 py-3 text-base font-medium text-white shadow-sm hover:border hover:border-secondary hover:bg-white hover:text-secondary'
            >
              Checkout
            </a>
          </div>
          <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
            <p>
              or{' '}
              <button
                type='button'
                className='font-medium text-main hover:text-dark'
                onClick={() => setCartSliderIsOpen(false)}
              >
                Continue Shopping
                <span aria-hidden='true'> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </SlideOver>
  )
}
