import { useState } from 'react'

import Header from './Header'
import Footer from './Footer'
import ShoppingCartSlideOver from './ShoppingCart'

const Layout = ({ children }) => {
  const [cartSliderIsOpen, setCartSliderIsOpen] = useState(false)

  return (
    <div className='min-h-screen flex flex-col pb-8'>
      <Header setCartSliderIsOpen={setCartSliderIsOpen} />

      <ShoppingCartSlideOver
        open={cartSliderIsOpen}
        setCartSliderIsOpen={setCartSliderIsOpen}
      />
      <div className='px-16 '>{children}</div>

      <Footer />
    </div>
  )
}

export default Layout
