import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { MENU_LIST } from '../routes'
import Dropdown from './Dropdown'
import DropdownMobile from './DropdownMobile'
import NavItem from './NavItem'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCurrency } from '../context/CurrencyContext'
import { useState } from 'react'
import SlideOver from './SlideOver'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'

const Header = ({ setCartSliderIsOpen, route }) => {
  const router = useRouter()
  const { t } = useTranslation()

  const { locales, locale, pathname, asPath } = router
  const { items } = useCart()
  const itemsNumber = items.reduce((acc, curr) => (acc += curr.quantity), 0)
  const currencies = ['eur', 'pln', 'usd']
  const { handleCurrency, currency } = useCurrency()
  const [openMenu, setOpenMenu] = useState(false)

  const handleLanguageChange = lang => {
    router.push({ asPath }, `${asPath}`, {
      locale: lang
    })
  }

  return (
    <nav className=' border-b border-grey px-8 md:px-16 font-mukta text-xl '>
      <div className='container mx-auto flex justify-between h-16 items-center'>
        <Link href='/' locale={locale}>
          <div className='flex items-center gap-3 cursor-pointer'>
            <div className='w-11 h-11'>
              <Image
                width='44px'
                height='44px'
                src='/assets/logo.svg'
                alt='logo'
              />
            </div>
            Devon Pads
          </div>
        </Link>
        <div className='flex items-center flex-row-reverse gap-2 md:gap-10 md:flex-row lg:gap-16'>
          <label
            onClick={() => setOpenMenu(true)}
            tabIndex={0}
            className='btn btn-ghost btn-circle md:hidden'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h7'
              />
            </svg>
          </label>
          <SlideOver open={openMenu} setOpen={setOpenMenu} mdHidden>
            <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
              <div className='flex-1 overflow-y-auto py-6 px-4 sm:px-6'>
                <div className='flex items-start justify-between'>
                  <div className='ml-3 flex h-7 items-center'>
                    <button
                      type='button'
                      className='-m-2 p-2 text-gray-400 hover:text-gray-500'
                      onClick={() => setOpenMenu(false)}
                    >
                      <span className='sr-only'>Close panel</span>
                      <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>
                </div>
                <ul className='flex flex-col  gap-10 items-center md:h-full'>
                  {MENU_LIST.map(menu => {
                    return (
                      <li key={menu.text} className='w-full  text-lg'>
                        <NavItem
                          href={menu.href}
                          text={t(menu.text)}
                          locale={locale}
                        />
                      </li>
                    )
                  })}
                  <li className='w-full  text-lg'>
                    <DropdownMobile
                      options={locales}
                      handleChange={handleLanguageChange}
                      option={locale}
                    />
                  </li>
                  <li className='w-full  text-lg '>
                    <DropdownMobile
                      options={currencies}
                      handleChange={handleCurrency}
                      option={currency}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </SlideOver>
          <ul className='gap-10 hidden md:flex lg:gap-16'>
            {MENU_LIST.map(menu => {
              return (
                <li
                  key={menu.text}
                  className='text-lg cursor-pointer relative transition-all w-min-content
                before:w-0 before:h-px before:absolute before:bottom-0 before:right-0 before:bg-black before:transition-all before:duration-300
                hover:before:w-full hover:before:left-0 hover:before:black'
                >
                  <NavItem
                    href={menu.href}
                    text={t(menu.text)}
                    locale={locale}
                  />
                </li>
              )
            })}
            <li>
              <Dropdown
                options={locales}
                handleChange={handleLanguageChange}
                option={locale}
                ariaLabel='lang'
              />
            </li>
            <li>
              <Dropdown
                options={currencies}
                handleChange={handleCurrency}
                option={currency}
                ariaLabel='curr'
              />
            </li>
          </ul>
          <div
            onClick={() => setCartSliderIsOpen(open => !open)}
            className='cursor-pointer relative transition-all w-min-content
            before:w-0 before:h-px before:absolute before:bottom-0 before:right-0 before:bg-black before:transition-all before:duration-300
            hover:before:w-full hover:before:left-0 hover:before:black text-lg'
          >
            {t('cart')}
            <span className='ml-1 '>({itemsNumber})</span>
            <span className='sr-only'>items in cart, view bag</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
