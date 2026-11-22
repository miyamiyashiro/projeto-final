import { z } from 'zod'
import { cepSchema } from '../schemas/address'
const responseSchema = z.object({ logradouro:z.string(), bairro:z.string(), localidade:z.string().min(1), uf:z.string().length(2) })
export interface CepAddress { street:string; neighborhood:string; city:string; uf:string }
export class CepError extends Error {
 readonly kind:'invalid'|'not-found'|'unavailable'
 constructor(kind:'invalid'|'not-found'|'unavailable') {
  super(kind==='invalid'?'Informe um CEP com 8 dígitos.':kind==='not-found'?'CEP não encontrado. Confira os números e tente novamente.':'Não foi possível consultar o CEP. Tente novamente ou preencha o endereço manualmente.')
  this.kind = kind
 }
}
export async function fetchCep(rawCep:string, signal?:AbortSignal):Promise<CepAddress> {
 if(!cepSchema.safeParse(rawCep).success)throw new CepError('invalid')
 const cep=rawCep.trim().replace('-','')
 let data:unknown
 try {
  const response=await fetch(`https://viacep.com.br/ws/${cep}/json/`,{signal})
  if(!response.ok)throw new CepError('unavailable')
  data=await response.json()
 } catch(error) {
  if(signal?.aborted)throw error
  throw new CepError('unavailable')
 }
 if(typeof data==='object'&&data!==null&&'erro' in data&&(data.erro===true||data.erro==='true'))throw new CepError('not-found')
 const parsed=responseSchema.safeParse(data)
 if(!parsed.success)throw new CepError('unavailable')
 return {street:parsed.data.logradouro,neighborhood:parsed.data.bairro,city:parsed.data.localidade,uf:parsed.data.uf}
}
