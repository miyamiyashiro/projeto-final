import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styled from 'styled-components'
import { addressSchema } from '../schemas/address'
import type { DeliveryAddress } from '../schemas/address'
import { useCepLookup } from '../hooks/useCepLookup'
const Panel=styled.form`
 padding:clamp(20px,4vw,40px);background:${({theme})=>theme.mode==='light'?'#F3F2F2':theme.surface};border-radius:6px;
 .intro{display:flex;gap:8px;align-items:flex-start;margin-bottom:28px}.intro h2{font-family:Roboto,sans-serif;font-size:16px;font-weight:400;margin:0}.intro p{font-size:14px;color:${({theme})=>theme.muted};margin:2px 0 0}
 .fields{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:16px 12px}
 .field{grid-column:span 3;min-width:0}.full{grid-column:1/-1}.small{grid-column:span 2}.wide{grid-column:span 4}
 label{display:block;font-size:14px;margin-bottom:6px}input{width:100%;min-height:44px;border:1px solid ${({theme})=>theme.border};border-radius:4px;padding:12px;background:${({theme})=>theme.background};color:${({theme})=>theme.text};font:inherit;font-size:14px}
 input[aria-invalid=true]{border-color:${({theme})=>theme.mode==='dark'?'#FFB4AB':'#A42620'}}
 .error{color:${({theme})=>theme.mode==='dark'?'#FFB4AB':'#A42620'};font-size:13px;margin:6px 0 0}
 .lookup{display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap}.lookup .field{flex:1;min-width:140px}
 button{min-height:44px;border-radius:6px;padding:10px 16px;border:1px solid ${({theme})=>theme.border};background:${({theme})=>theme.soft};color:${({theme})=>theme.brand}}
 .validate{margin-top:24px;background:${({theme})=>theme.action};color:${({theme})=>theme.onAction}}
 button:disabled{opacity:.6;cursor:wait}.status{font-size:14px;margin:16px 0;color:${({theme})=>theme.muted}}
 @media(max-width:540px){.field,.small,.wide{grid-column:1/-1}}
`
const fields = [
 {name:'street',label:'Rua',className:'full',autoComplete:'address-line1'},
 {name:'number',label:'Número',className:'small',autoComplete:'off'},
 {name:'complement',label:'Complemento (opcional)',className:'wide',autoComplete:'address-line2'},
 {name:'neighborhood',label:'Bairro',className:'small',autoComplete:'off'},
 {name:'city',label:'Cidade',className:'small',autoComplete:'address-level2'},
 {name:'uf',label:'UF',className:'small',autoComplete:'address-level1'},
] as const
export function DeliveryAddressForm() {
 const form=useForm<DeliveryAddress>({resolver:zodResolver(addressSchema),mode:'onBlur',defaultValues:{cep:'',street:'',number:'',complement:'',neighborhood:'',city:'',uf:''}})
 const {register,handleSubmit,getValues,setValue,formState:{errors}}=form
 const cep=useCepLookup()
 const [verified,setVerified]=useState(false)
 function search(){
  setVerified(false)
  void cep.lookup(getValues('cep'),address=>{
   for(const name of ['street','neighborhood','city','uf'] as const)setValue(name,address[name],{shouldValidate:true})
  })
 }
 const cepField=register('cep')
 return <Panel noValidate onChange={()=>setVerified(false)} onSubmit={handleSubmit(()=>setVerified(true))} aria-label="Endereço de entrega">
  <div className="intro"><img src="/icons/address.svg" alt=""/><div><h2>Endereço de entrega</h2><p>Informe o endereço onde deseja receber seu pedido.</p></div></div>
  <div className="lookup"><div className="field"><label htmlFor="cep">CEP</label><input {...cepField} id="cep" inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" maxLength={9} aria-invalid={!!errors.cep} aria-describedby={errors.cep?'cep-error':'cep-status'} onChange={event=>{
   cepField.onChange(event);cep.reset();setVerified(false)
   for(const name of ['street','neighborhood','city','uf'] as const)setValue(name,'')
  }} onBlur={event=>{cepField.onBlur(event);if(getValues('cep').trim())search()}}/>
  {errors.cep&&<p className="error" id="cep-error">{errors.cep.message}</p>}</div><button type="button" onClick={search} disabled={cep.status==='loading'}>Buscar CEP</button></div>
  <p id="cep-status" className={cep.status==='error'?'error':'status'} role="status">{cep.message||'Digite o CEP para buscar o endereço. Você pode corrigir os dados.'}</p>
  <div className="fields">{fields.map(field=><div key={field.name} className={`field ${field.className}`}><label htmlFor={field.name}>{field.label}</label><input {...register(field.name)} id={field.name} autoComplete={field.autoComplete} maxLength={field.name==='uf'?2:150} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name]?`${field.name}-error`:undefined} readOnly={cep.status==='loading'&&(['street','neighborhood','city','uf'] as string[]).includes(field.name)}/>{errors[field.name]&&<p className="error" id={`${field.name}-error`}>{errors[field.name]?.message}</p>}</div>)}</div>
  <button className="validate" type="submit" disabled={cep.status==='loading'}>Verificar endereço</button>
  {verified&&<p role="status" className="status">Campos do endereço válidos. Confira se os dados estão corretos.</p>}
 </Panel>
}
