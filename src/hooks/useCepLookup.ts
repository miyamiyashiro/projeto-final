import { useEffect, useRef, useState } from 'react'
import { CepError, fetchCep } from '../services/cep'
import type { CepAddress } from '../services/cep'
type LookupState = { status:'idle'|'loading'|'success'|'error'; message:string }
export function useCepLookup() {
 const [state,setState]=useState<LookupState>({status:'idle',message:''})
 const active=useRef<AbortController|null>(null)
 const sequence=useRef(0)
 useEffect(()=>()=>{sequence.current++;active.current?.abort()},[])
 function reset() {
  sequence.current++;active.current?.abort();active.current=null
  setState({status:'idle',message:''})
 }
 async function lookup(cep:string,onFound:(address:CepAddress)=>void) {
  active.current?.abort()
  const controller=new AbortController();active.current=controller
  const request=++sequence.current
  setState({status:'loading',message:'Consultando CEP…'})
  let timedOut=false
  const timeout=setTimeout(()=>{timedOut=true;controller.abort()},10000)
  try {
   const address=await fetchCep(cep,controller.signal)
   if(request!==sequence.current)return
   onFound(address)
   setState({status:'success',message:address.street&&address.neighborhood?'Endereço encontrado. Confira os dados e informe o número.':'CEP encontrado. Complete os campos que não vieram preenchidos.'})
  }catch(error){
   if(request!==sequence.current)return
   if(controller.signal.aborted&&!timedOut)return
   setState({status:'error',message:error instanceof CepError?error.message:'A consulta demorou ou falhou. Tente novamente ou preencha o endereço manualmente.'})
  }finally{clearTimeout(timeout);if(request===sequence.current)active.current=null}
 }
 return {...state,lookup,reset}
}
