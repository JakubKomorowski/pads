import { Suspense, useState } from 'react'

import Header from './Header'
import Footer from './Footer'
import ShoppingCartSlideOver from './ShoppingCart'

const Layout = ({ children }) => {
  const [cartSliderIsOpen, setCartSliderIsOpen] = useState(false)

  return (
    <div className='min-h-screen flex flex-col '>
      <Header setCartSliderIsOpen={setCartSliderIsOpen} />

      <ShoppingCartSlideOver
        open={cartSliderIsOpen}
        setCartSliderIsOpen={setCartSliderIsOpen}
      />
      <Suspense fallback={<div>halo</div>} className='px-16 '>
        {children}
      </Suspense>

      <Footer />
    </div>
  )
}

export default Layout
