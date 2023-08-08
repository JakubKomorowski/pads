import { useState, useEffect } from 'react'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Dropdown({ options, option, handleChange }) {
  const [renderOption, setRenderOption] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState('')

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
    <Menu as='div' className='relative  text-left text-lg inline-block w-full'>
      <Menu.Button
        className='flex items-center w-full justify-center'
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {renderOption}

        <ChevronDownIcon
          className={`${
            dropdownOpen ? 'rotate-180 transform' : ''
          } -mr-1 ml-2 h-5 w-5 transition-all`}
          aria-hidden='true'
        />
      </Menu.Button>

      <div className={`${dropdownOpen ? 'flex' : ' hidden'} justify-center`}>
        <div className=' origin-top md:absolute md:left-0 md:z-10 md:mt-[18px] md:w-24 md:origin-top-left  md:bg-white md:shadow-lg md:ring-1 md:ring-black md:ring-opacity-5 focus:outline-none'>
          <ul className='py-1 '>
            {options.map(item => (
              <li
                key={item}
                onClick={() => {
                  handleChange(item)
                  setDropdownOpen(!dropdownOpen)
                }}
              >
                <div className='cursor-pointer text-gray-700 block md:px-4 py-2 hover:bg-gray-100 hover:text-gray-900'>
                  {item === 'eur'
                    ? 'EUR €'
                    : item === 'usd'
                    ? 'USD $'
                    : item === 'pln'
                    ? 'PLN zł'
                    : item.toUpperCase()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Menu>
  )
}
