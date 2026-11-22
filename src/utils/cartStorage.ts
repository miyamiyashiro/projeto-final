import type { CartItem } from '../types/cart'
import { cartReducer } from '../reducers/cartReducer'
export const CART_STORAGE_KEY = 'coffee-delivery:cart:v1'
export function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return []
  try {
    const value: unknown = JSON.parse(raw)
    if (!Array.isArray(value)) return []
    return value.reduce<CartItem[]>((items, entry: unknown) => {
      if (typeof entry !== 'object' || entry === null || !('coffeeId' in entry) || !('quantity' in entry)) return items
      if (typeof entry.coffeeId !== 'string' || typeof entry.quantity !== 'number') return items
      return cartReducer(items, { type: 'ADD_ITEM', coffeeId: entry.coffeeId, quantity: entry.quantity })
    }, [])
  } catch { return [] }
}
export function readStoredCart(): CartItem[] {
  try { return parseStoredCart(localStorage.getItem(CART_STORAGE_KEY)) } catch { return [] }
}
