import type { CartAction, CartItem } from '../types/cart'
import { isValidCart } from '../utils/cart'
export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  if (action.type === 'CLEAR_CART') return []
  if (action.type === 'REMOVE_ITEM') return state.filter(item => item.coffeeId !== action.coffeeId)
  let next: CartItem[]
  if (action.type === 'ADD_ITEM') {
    if (!Number.isSafeInteger(action.quantity) || action.quantity < 1) return state
    const existing = state.find(item => item.coffeeId === action.coffeeId)
    next = existing
      ? state.map(item => item.coffeeId === action.coffeeId ? { ...item, quantity: item.quantity + action.quantity } : item)
      : [...state, { coffeeId: action.coffeeId, quantity: action.quantity }]
  } else {
    next = state.map(item => item.coffeeId === action.coffeeId
      ? { ...item, quantity: action.type === 'INCREMENT_ITEM' ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
      : item)
  }
  return isValidCart(next) ? next : state
}
