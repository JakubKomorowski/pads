import { useContext, createContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const CurrencyContext = createContext()
export const useCurrency = () => useContext(CurrencyContext)

const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useLocalStorage(`CURRENCY`, 'eur')

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
