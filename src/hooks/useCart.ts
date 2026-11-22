import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { getCartTotals } from '../utils/cart'
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart precisa estar dentro de CartProvider.')
  return { ...context, ...getCartTotals(context.items) }
}
