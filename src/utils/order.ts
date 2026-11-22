import { z } from 'zod'
import { checkoutSchema } from '../schemas/checkout'
import type { CheckoutValues } from '../schemas/checkout'
import { addressSchema } from '../schemas/address'
import { coffees } from '../data/coffees'
import { getCartTotals, isValidCart } from './cart'
import type { CartItem } from '../types/cart'
const cents=z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER)
const orderSchema=z.object({
 id:z.string().min(1),createdAt:z.string().datetime(),address:addressSchema,
 paymentMethod:checkoutSchema.shape.paymentMethod,
 items:z.array(z.object({coffeeId:z.string(),name:z.string().min(1),quantity:z.number().int().positive(),unitPriceInCents:cents})).min(1),
 subtotalInCents:cents,deliveryFeeInCents:cents,totalInCents:cents,
}).refine(order=>{
 const cart=order.items.map(item=>({coffeeId:item.coffeeId,quantity:item.quantity}))
 if(!isValidCart(cart)||new Set(cart.map(item=>item.coffeeId)).size!==cart.length)return false
 const totals=getCartTotals(cart)
 return order.items.every(item=>{const coffee=coffees.find(c=>c.id===item.coffeeId);return coffee?.name===item.name&&coffee.priceInCents===item.unitPriceInCents})&&
 totals.subtotalInCents===order.subtotalInCents&&totals.deliveryFeeInCents===order.deliveryFeeInCents&&totals.totalInCents===order.totalInCents
})
export type Order=z.infer<typeof orderSchema>
export function createOrder(items:CartItem[],values:CheckoutValues):Order {
 if(!items.length||!isValidCart(items))throw Error('Carrinho inválido.')
 const {paymentMethod,...address}=checkoutSchema.parse(values)
 return orderSchema.parse({id:crypto.randomUUID(),createdAt:new Date().toISOString(),address,paymentMethod,
 items:items.map(item=>{const coffee=coffees.find(c=>c.id===item.coffeeId)!;return {...item,name:coffee.name,unitPriceInCents:coffee.priceInCents}}),
 ...getCartTotals(items)})
}
export const ORDER_KEY='coffee-delivery:order:v1'
export function parseOrder(raw:string|null):Order|null {
 try { const result=orderSchema.safeParse(JSON.parse(raw??'null'));return result.success?result.data:null }catch{return null}
}
export function readOrder():Order|null {try{return parseOrder(sessionStorage.getItem(ORDER_KEY))}catch{return null}}
export function saveOrder(order:Order):boolean {try{sessionStorage.setItem(ORDER_KEY,JSON.stringify(order));return true}catch{return false}}
