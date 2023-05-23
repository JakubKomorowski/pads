import Layout from '../components/Layout'
import CartProvider from '../context/CartContext'
import CurrencyProvider from '../context/CurrencyContext'
import '../styles/globals.css'

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

export default App
