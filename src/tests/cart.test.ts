import { describe, expect, it } from 'vitest'
import { cartReducer } from '../reducers/cartReducer'
import { getCartTotals } from '../utils/cart'
import { parseStoredCart } from '../utils/cartStorage'
import type { CartItem } from '../types/cart'
const coffeeId='expresso-tradicional'
describe('carrinho',()=>{
 it('soma repetidos sem mutar o estado anterior',()=>{
  const original:CartItem[]=[{coffeeId,quantity:2}];Object.freeze(original[0]);Object.freeze(original)
  const next=cartReducer(original,{type:'ADD_ITEM',coffeeId,quantity:3})
  expect(next).toEqual([{coffeeId,quantity:5}]);expect(original[0].quantity).toBe(2)
 })
 it('incrementa, mantém mínimo, remove individualmente e limpa',()=>{
  let state=cartReducer([],{type:'ADD_ITEM',coffeeId,quantity:1})
  state=cartReducer(state,{type:'DECREMENT_ITEM',coffeeId});expect(state[0].quantity).toBe(1)
  state=cartReducer(state,{type:'INCREMENT_ITEM',coffeeId});expect(state[0].quantity).toBe(2)
  state=cartReducer(state,{type:'ADD_ITEM',coffeeId:'latte',quantity:3})
  expect(cartReducer(state,{type:'REMOVE_ITEM',coffeeId})).toEqual([{coffeeId:'latte',quantity:3}])
  expect(cartReducer(state,{type:'CLEAR_CART'})).toEqual([])
 })
 it.each([0,-1,1.5,NaN,Infinity,Number.MAX_SAFE_INTEGER])('rejeita quantidade inválida ou cálculo inseguro %s',quantity=>{
  expect(cartReducer([],{type:'ADD_ITEM',coffeeId,quantity})).toEqual([])
 })
 it('rejeita produto inexistente',()=>expect(cartReducer([],{type:'ADD_ITEM',coffeeId:'fake',quantity:1})).toEqual([]))
 it('calcula subtotal, frete, total e soma de unidades',()=>{
  expect(getCartTotals([{coffeeId,quantity:2},{coffeeId:'latte',quantity:3}])).toEqual({units:5,subtotalInCents:4950,deliveryFeeInCents:350,totalInCents:5300})
  expect(getCartTotals([])).toEqual({units:0,subtotalInCents:0,deliveryFeeInCents:0,totalInCents:0})
 })
 it('recupera dados válidos, consolida duplicados e ignora preço adulterado',()=>{
  expect(parseStoredCart(JSON.stringify([{coffeeId,quantity:2,priceInCents:1},{coffeeId,quantity:3},{coffeeId:'fake',quantity:1},{coffeeId:'latte',quantity:-2},null]))).toEqual([{coffeeId,quantity:5}])
 })
 it.each(['broken','{}','null','[1,"abc"]'])('recupera JSON inválido ou formato incorreto %s',raw=>expect(parseStoredCart(raw)).toEqual([]))
})
