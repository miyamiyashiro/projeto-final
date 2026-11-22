import { createContext } from 'react'
import type { Dispatch } from 'react'
import type { CartAction, CartItem } from '../types/cart'
export const CartContext = createContext<{ items: CartItem[]; dispatch: Dispatch<CartAction>; storageUnavailable: boolean } | null>(null)
