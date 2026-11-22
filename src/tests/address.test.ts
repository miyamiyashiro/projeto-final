import { afterEach, describe, expect, it, vi } from 'vitest'
import { addressSchema } from '../schemas/address'
import { fetchCep } from '../services/cep'
const valid={cep:'01001-000',street:'Praça da Sé',number:'12A',neighborhood:'Sé',city:'São Paulo',uf:'sp'}
afterEach(()=>vi.unstubAllGlobals())
describe('endereço',()=>{
 it('aceita complemento ausente e normaliza UF',()=>expect(addressSchema.parse(valid).uf).toBe('SP'))
 it.each(['street','number','neighborhood','city','uf'] as const)('exige %s',field=>expect(addressSchema.safeParse({...valid,[field]:'  '}).success).toBe(false))
 it.each(['123','123456789','01001A00'])('rejeita CEP inválido %s',cep=>expect(addressSchema.safeParse({...valid,cep}).success).toBe(false))
 it('rejeita UF inexistente',()=>expect(addressSchema.safeParse({...valid,uf:'XX'}).success).toBe(false))
})
describe('ViaCEP',()=>{
 it('mapeia resposta e não copia complemento',async()=>{
  const fetcher=vi.fn().mockResolvedValue({ok:true,json:async()=>({logradouro:'Rua teste',bairro:'Centro',localidade:'Cidade',uf:'SP',complemento:'API'})});vi.stubGlobal('fetch',fetcher)
  expect(await fetchCep('01001-000')).toEqual({street:'Rua teste',neighborhood:'Centro',city:'Cidade',uf:'SP'})
  expect(fetcher).toHaveBeenCalledWith('https://viacep.com.br/ws/01001000/json/',{signal:undefined})
 })
 it('aceita CEP geral com rua e bairro vazios',async()=>{
  vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:true,json:async()=>({logradouro:'',bairro:'',localidade:'Cidade',uf:'SP'})}))
  expect((await fetchCep('01001000')).street).toBe('')
 })
 it('não consulta formato inválido',async()=>{const fetcher=vi.fn();vi.stubGlobal('fetch',fetcher);await expect(fetchCep('123')).rejects.toMatchObject({kind:'invalid'});expect(fetcher).not.toHaveBeenCalled()})
 it.each([true,'true'])('trata CEP inexistente %s',async erro=>{vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:true,json:async()=>({erro})}));await expect(fetchCep('99999999')).rejects.toMatchObject({kind:'not-found'})})
 it('trata falha de rede',async()=>{vi.stubGlobal('fetch',vi.fn().mockRejectedValue(Error('offline')));await expect(fetchCep('01001000')).rejects.toMatchObject({kind:'unavailable'})})
 it('trata resposta malformada',async()=>{vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:true,json:async()=>({html:'error'})}));await expect(fetchCep('01001000')).rejects.toMatchObject({kind:'unavailable'})})
})
