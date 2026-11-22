import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styled from 'styled-components'
import { EmptyState } from '../components/EmptyState'
import { CartSummary } from '../components/CartSummary'
import { DeliveryAddressForm } from '../components/DeliveryAddressForm'
import { PaymentMethodSelector } from '../components/PaymentMethodSelector'
import { useCart } from '../hooks/useCart'
import { checkoutSchema } from '../schemas/checkout'
import type { CheckoutValues } from '../schemas/checkout'
import { createOrder } from '../utils/order'
import type { Order } from '../utils/order'
const Container=styled.form`
 display:grid;grid-template-columns:minmax(0,1fr);gap:32px;align-items:start;
 h1,h2.section-title{font-size:20px;margin:0 0 16px}
 @media(min-width:1100px){grid-template-columns:minmax(0,640fr) minmax(0,448fr)}
`
export function Checkout({onOrder}:{onOrder:(order:Order)=>void}) {
 const {items,dispatch}=useCart()
 const navigate=useNavigate()
 const submitting=useRef(false)
 const [loading,setLoading]=useState(false)
 const form=useForm<CheckoutValues>({resolver:zodResolver(checkoutSchema),mode:'onBlur',defaultValues:{cep:'',street:'',number:'',complement:'',neighborhood:'',city:'',uf:''}})
 function confirm(values:CheckoutValues){
  if(loading||submitting.current||!items.length)return
  submitting.current=true
  const order=createOrder(items,values)
  onOrder(order)
  dispatch({type:'CLEAR_CART'})
  navigate('/success',{replace:true})
 }
 if(!items.length)return <EmptyState title="Seu carrinho está vazio" description="Escolha seus cafés favoritos para começar um pedido."/>
 return <FormProvider {...form}><Container noValidate onSubmit={event=>{void form.handleSubmit(confirm)(event)}}>
 <section><h1>Complete seu pedido</h1><DeliveryAddressForm onLoadingChange={setLoading}/><PaymentMethodSelector/></section>
 <section><h2 className="section-title">Cafés selecionados</h2><CartSummary confirmingDisabled={loading||form.formState.isSubmitting}/></section>
 </Container></FormProvider>
}


