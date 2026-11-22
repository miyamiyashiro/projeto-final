import { describe, expect, it } from 'vitest'
import { createOrder, parseOrder } from '../utils/order'
import { checkoutSchema } from '../schemas/checkout'
import { coffees } from '../data/coffees'
const values={cep:'01001-000',street:'Praça da Sé',number:'12',complement:'',neighborhood:'Sé',city:'São Paulo',uf:'SP',paymentMethod:'cash' as const}
describe('checkout and order snapshot',()=>{
 it('requires payment',()=>{expect(checkoutSchema.safeParse({...values,paymentMethod:undefined}).success).toBe(false)})
 it.each(['credit','debit','cash'])('accepts %s',paymentMethod=>{expect(checkoutSchema.safeParse({...values,paymentMethod}).success).toBe(true)})
 it('rejects empty or unknown cart',()=>{expect(()=>createOrder([],values)).toThrow();expect(()=>createOrder([{coffeeId:'fake',quantity:1}],values)).toThrow()})
 it('copies items and address, preserving totals after cart changes',()=>{
 const items=[{coffeeId:coffees[0].id,quantity:2}]
 const data={...values};const order=createOrder(items,data)
 items[0].quantity=10;items.length=0;data.street='Alterado'
 expect(order.items[0].quantity).toBe(2);expect(order.address.street).toBe('Praça da Sé');expect(order.totalInCents).toBe(2330)
 expect(parseOrder(JSON.stringify(order))).toEqual(order)
 expect(parseOrder(JSON.stringify({...order,totalInCents:1}))).toBeNull()
 })
 it.each([null,'bad','{}'])('ignores invalid stored order %s',raw=>{expect(parseOrder(raw)).toBeNull()})
})
