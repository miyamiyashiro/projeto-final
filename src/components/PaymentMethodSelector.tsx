import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { paymentLabels } from '../schemas/checkout'
import type { CheckoutValues } from '../schemas/checkout'
const Panel=styled.fieldset`
 margin:12px 0 0;padding:clamp(20px,4vw,40px);border:0;border-radius:6px;min-width:0;
 background:${({theme})=>theme.mode==='light'?'#F3F2F2':theme.surface};
 legend{float:left;width:100%;display:flex;align-items:center;gap:8px;margin-bottom:8px}p{clear:both;font-size:14px;color:${({theme})=>theme.muted}}
 .choices{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
 label{position:relative;flex:1;min-width:140px;cursor:pointer}
 input{position:absolute;opacity:0;width:1px;height:1px}
 span{display:flex;align-items:center;gap:8px;min-height:52px;padding:12px;border:1px solid transparent;border-radius:6px;background:${({theme})=>theme.soft};font-size:12px;text-transform:uppercase}
 input:checked+span{border-color:${({theme})=>theme.brand};font-weight:bold}
 input:focus-visible+span{outline:3px solid ${({theme})=>theme.focus};outline-offset:3px}
 .error{color:${({theme})=>theme.mode==='dark'?'#FFB4AB':'#A42620'}}
`
export function PaymentMethodSelector(){
 const {register,formState:{errors}}=useFormContext<CheckoutValues>()
 return <Panel><legend><img src="/icons/payment.svg" alt=""/>Pagamento</legend><p>Escolha como pagaria na entrega. Este pedido é uma simulação, sem cobrança.</p>
 <div className="choices">{(Object.keys(paymentLabels) as Array<keyof typeof paymentLabels>).map(value=><label key={value}><input type="radio" value={value} {...register('paymentMethod')} aria-invalid={!!errors.paymentMethod} aria-describedby={errors.paymentMethod?'payment-error':undefined}/><span><img src={`/icons/${value}.svg`} alt=""/>{paymentLabels[value]}</span></label>)}</div>
 {errors.paymentMethod&&<p className="error" id="payment-error" role="alert">{errors.paymentMethod.message}</p>}</Panel>
}
