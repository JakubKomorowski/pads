import { useContext, createContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const CartContext = createContext()
export const useCart = () => useContext(CartContext)

const CartProvider = ({ children }) => {
  const [items, setItems] = useLocalStorage(`STRIPE_CART_ITEMS`, [])

  const increaseQuantity = price => {
    items.forEach(item => {
      if (item.id === price.id) {
        item.quantity = item.quantity + 1
      }
    })
    setItems([...items])
  }

  const addItem = price => {
    if (items.length !== 0) {
      if (price.currency !== items[0].currency) return
    }

    if (items.length !== 0) {
      items.forEach(item => {
        if (item.id === price.id) {
          item.quantity = item.quantity + 1
        }
      })
    }

    let isProductAlreadyInCart

    items.forEach(el => {
      if (el.id === price.id) {
        isProductAlreadyInCart = true
      }
    })
    if (isProductAlreadyInCart) {
      setItems([...new Set([...items])])
    } else {
      setItems([...items, { ...price, quantity: 1 }])
    }
  }
  const removeItem = useCallback(
    id => setItems(prices => prices.filter(price => price.id !== id)),
    []
  )
  const resetCart = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, resetCart, increaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
