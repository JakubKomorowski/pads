import Layout from '../components/Layout'
import CartProvider from '../context/CartContext'
import CurrencyProvider from '../context/CurrencyContext'
import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next'

function App({ Component, pageProps }) {
  return (
    <CurrencyProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </CurrencyProvider>
  )
}

export default appWithTranslation(App)
