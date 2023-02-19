import { useState } from 'react'

import Header from './Header'
import Footer from './Footer'
import ShoppingCartSlideOver from './ShoppingCart'

const Layout = ({ children }) => {
  const [cartSliderIsOpen, setCartSliderIsOpen] = useState(false)

  return (
    <div className='h-screen flex flex-col '>
      <Header setCartSliderIsOpen={setCartSliderIsOpen} />

      <ShoppingCartSlideOver
        open={cartSliderIsOpen}
        setCartSliderIsOpen={setCartSliderIsOpen}
      />
      <div className='container mx-auto flex flex-grow flex-col'>
        {children}
      </div>

      <Footer />
    </div>
  )
}

export default Layout
