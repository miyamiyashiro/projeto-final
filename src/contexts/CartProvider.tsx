import { useEffect, useReducer, useState } from 'react'
import type { ReactNode } from 'react'
import { CartContext } from './CartContext'
import { cartReducer } from '../reducers/cartReducer'
import { CART_STORAGE_KEY, readStoredCart } from '../utils/cartStorage'
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, readStoredCart)
  const [storageUnavailable, setStorageUnavailable] = useState(false)
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // O carrinho em memória continua disponível mesmo quando o navegador bloqueia o storage.
      // A falha só é conhecida após tentar sincronizar com a API externa de storage.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStorageUnavailable(true)
    }
  }, [items])
  return <CartContext.Provider value={{ items, dispatch, storageUnavailable }}>{children}</CartContext.Provider>
}
