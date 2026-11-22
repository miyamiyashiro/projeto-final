import { z } from 'zod'
import { addressSchema } from './address'
export const paymentLabels = { credit:'Cartão de crédito', debit:'Cartão de débito', cash:'Dinheiro' } as const
export const checkoutSchema = addressSchema.extend({
 paymentMethod:z.enum(['credit','debit','cash'],{error:'Escolha uma forma de pagamento.'}),
})
export type CheckoutValues = z.infer<typeof checkoutSchema>
