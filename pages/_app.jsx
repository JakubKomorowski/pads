import Layout from '../components/Layout'
import CartProvider from '../context/CartContext'
import CurrencyProvider from '../context/CurrencyContext'
import { usePageLoading } from '../hooks/usePageLoading'
import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next'

function App({ Component, pageProps }) {
  const { isPageLoading } = usePageLoading()
  return (
    <CurrencyProvider>
      <CartProvider>
        <Layout>
          {isPageLoading ? (
            <span className='mx-auto mt-[40vh] loading loading-ring loading-lg'></span>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </CartProvider>
    </CurrencyProvider>
  )
}

export default appWithTranslation(App)
