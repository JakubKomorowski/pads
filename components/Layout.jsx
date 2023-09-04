import { Suspense, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import ShoppingCartSlideOver from './ShoppingCart'

const Layout = ({ children }) => {
  const [cartSliderIsOpen, setCartSliderIsOpen] = useState(false)

  return (
    <div className=' flex flex-col '>
      <Header setCartSliderIsOpen={setCartSliderIsOpen} />
      <ShoppingCartSlideOver
        open={cartSliderIsOpen}
        setCartSliderIsOpen={setCartSliderIsOpen}
      />
      <Suspense fallback={<div>halo</div>}>
        <div className='px-16 min-h-[calc(100vh-209px)]'>{children}</div>
      </Suspense>
      <Footer />
    </div>
  )
}

export default Layout
