import { z } from 'zod'
export const brazilianStates = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'] as const
export const cepSchema = z.string().trim().regex(/^\d{5}-?\d{3}$/, 'Informe um CEP com 8 dígitos.')
const required = (name: string) => z.string().trim().min(1, `Informe ${name}.`).max(150, 'Use no máximo 150 caracteres.')
export const addressSchema = z.object({
 cep: cepSchema,
 street: required('a rua'), number: required('o número'),
 complement: z.string().trim().max(150, 'Use no máximo 150 caracteres.').optional(),
 neighborhood: required('o bairro'), city: required('a cidade'),
 uf: z.string().trim().toUpperCase().refine(value => brazilianStates.some(uf => uf === value), 'Informe uma UF válida, como SP.'),
})
export type DeliveryAddress = z.infer<typeof addressSchema>
