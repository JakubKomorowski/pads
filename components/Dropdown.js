import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Dropdown({ options, option, handleChange }) {
  const [renderOption, setRenderOption] = useState('')

  useEffect(() => {
    switch (option) {
      case 'eur':
        setRenderOption('EUR €')
        break
      case 'pln':
        setRenderOption('PLN zł')
        break
      case 'usd':
        setRenderOption('USD $')
        break
      case 'pl':
        setRenderOption('PL')
        break
      case 'en':
        setRenderOption('EN')
        break
    }
  }, [option])

  return (
    <Menu as='div' className='relative inline-block text-left text-lg'>
      <div>
        <Menu.Button className='flex items-center'>
          {renderOption}
          <ChevronDownIcon
            className='ui-open:rotate-180 ui-open:transform -mr-1 ml-2 h-5 w-5 transition-all'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-50'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-50'
      >
        <Menu.Items className='absolute left-0 z-10 mt-[18px] w-24 origin-top-left  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {options.map(item => (
              <Menu.Item key={item} onClick={e => handleChange(item)}>
                <div className='cursor-pointer text-gray-700 block px-4 py-2 hover:bg-gray-100 hover:text-gray-900'>
                  {item === 'eur'
                    ? 'EUR €'
                    : item === 'usd'
                    ? 'USD $'
                    : item === 'pln'
                    ? 'PLN zł'
                    : item.toUpperCase()}
                </div>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
