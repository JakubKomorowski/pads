import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { MENU_LIST } from '../routes'
import Dropdown from './Dropdown'
import NavItem from './NavItem'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCurrency } from '../context/CurrencyContext'

const Header = ({ setCartSliderIsOpen }) => {
  const router = useRouter()
  const { locales, locale, pathname } = router
  const { items } = useCart()
  const itemsNumber = items.reduce((acc, curr) => (acc += curr.quantity), 0)
  const currencies = ['eur', 'pln', 'usd']
  const { handleCurrency, currency } = useCurrency()

  const handleLanguageChange = lang => {
    router.push({ pathname }, { pathname }, { locale: lang })
  }

  return (
    <nav className=' border-b border-grey px-16 font-mukta text-xl '>
      <div className='container mx-auto flex justify-between h-16 items-center'>
        <Link href='/' locale={locale}>
          <div className='flex items-center gap-3 cursor-pointer'>
            <div className='w-8 h-8'>
              <Image
                width='32px'
                height='32px'
                src='/assets/logo.svg'
                alt='logo'
              />
            </div>
            Logo
          </div>
        </Link>
        <ul className='flex gap-16 '>
          {MENU_LIST.map(menu => {
            return (
              <li
                key={menu.text}
                className='relative transition-all w-min-content
                before:w-0 before:h-px before:absolute before:bottom-0 before:right-0 before:bg-black before:transition-all before:duration-300
                hover:before:w-full hover:before:left-0 hover:before:black text-lg'
              >
                <NavItem {...menu} locale={locale} />
              </li>
            )
          })}
          <li>
            <Dropdown
              options={locales}
              handleChange={handleLanguageChange}
              option={locale}
            />
          </li>
          <li>
            <Dropdown
              options={currencies}
              handleChange={handleCurrency}
              option={currency}
            />
          </li>
          <li
            onClick={() => setCartSliderIsOpen(open => !open)}
            className='cursor-pointer relative transition-all w-min-content
            before:w-0 before:h-px before:absolute before:bottom-0 before:right-0 before:bg-black before:transition-all before:duration-300
            hover:before:w-full hover:before:left-0 hover:before:black text-lg'
          >
            Cart
            <span className='ml-1 '>({itemsNumber})</span>
            <span className='sr-only'>items in cart, view bag</span>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
