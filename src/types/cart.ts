export interface CartItem { coffeeId: string; quantity: number }
export type CartAction =
  | { type: 'ADD_ITEM'; coffeeId: string; quantity: number }
  | { type: 'INCREMENT_ITEM' | 'DECREMENT_ITEM' | 'REMOVE_ITEM'; coffeeId: string }
  | { type: 'CLEAR_CART' }
