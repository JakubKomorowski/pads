import { useContext, createContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useRouter } from 'next/router'

const CurrencyContext = createContext()
export const useCurrency = () => useContext(CurrencyContext)

const CurrencyProvider = ({ children }) => {
  const router = useRouter()
  const { locale } = router
  const [currency, setCurrency] = useLocalStorage(
    `CURRENCY`,
    locale === 'pl' ? 'pln' : 'eur'
  )

  const handleCurrency = cur => {
    setCurrency(cur)
  }
  return (
    <CurrencyContext.Provider value={{ handleCurrency, currency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export default CurrencyProvider
