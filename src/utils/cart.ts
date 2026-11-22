import { coffees } from '../data/coffees'
import type { CartItem } from '../types/cart'
export const DELIVERY_FEE_IN_CENTS = 350
export function getCartTotals(items: CartItem[]) {
  const subtotalInCents = items.reduce((sum, item) => {
    const coffee = coffees.find(coffee => coffee.id === item.coffeeId)
    return sum + (coffee?.priceInCents ?? 0) * item.quantity
  }, 0)
  const units = items.reduce((sum, item) => sum + item.quantity, 0)
  const deliveryFeeInCents = items.length ? DELIVERY_FEE_IN_CENTS : 0
  return { units, subtotalInCents, deliveryFeeInCents, totalInCents: subtotalInCents + deliveryFeeInCents }
}
export function isValidCart(items: CartItem[]) {
  if (!items.every(item => coffees.some(coffee => coffee.id === item.coffeeId) && Number.isSafeInteger(item.quantity) && item.quantity > 0)) return false
  const totals = getCartTotals(items)
  return Number.isSafeInteger(totals.totalInCents) && Number.isSafeInteger(totals.units)
}
