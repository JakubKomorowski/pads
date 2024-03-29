import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Select({ data, selected, setSelected }) {
  const products = data?.map(el => el.product)
  const filteredProducts = products?.filter(el => el.unit_label)
  //bg-red bg-purple bg-yellow bg-green bg-black bg-white

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className='block text-sm font-medium text-gray-700'>
            Accent color
          </Listbox.Label>
          <div className='relative mt-1'>
            <Listbox.Button className='relative  cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-12 text-left shadow-sm focus:border-main focus:outline-none focus:ring-1 focus:ring-main sm:text-sm'>
              <span className='flex items-center'>
                <div
                  className={`h-6 w-6 rounded-full bg-${selected?.unit_label} flex-shrink-0 border-solid border border-gray-400`}
                ></div>
                <span className='ml-3 block truncate'>
                  {selected?.unit_label}
                </span>
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 max-h-56  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {filteredProducts?.map(product => {
                  return (
                    <Listbox.Option
                      key={product?.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-main' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-12'
                        )
                      }
                      value={product}
                    >
                      {({ selected, active }) => {
                        return (
                          <>
                            <div className='flex items-center'>
                              <div
                                className={`h-6 w-6 rounded-full bg-${product?.unit_label} flex-shrink-0 border-solid border border-gray-400`}
                              ></div>
                              <span
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'ml-3 block truncate'
                                )}
                              >
                                {product?.unit_label}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-main',
                                  'absolute inset-y-0 right-0 flex items-center pr-4 '
                                )}
                              >
                                <CheckIcon
                                  className='h-5 w-5 ml-4'
                                  aria-hidden='true'
                                />
                              </span>
                            ) : null}
                          </>
                        )
                      }}
                    </Listbox.Option>
                  )
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
