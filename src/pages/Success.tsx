import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { EmptyState } from '../components/EmptyState'
import type { Order } from '../utils/order'
import { paymentLabels } from '../schemas/checkout'
import { formatCurrency } from '../utils/currency'
const Container=styled.div`
 padding-top:40px;h1{font-size:32px;color:${({theme})=>theme.mode==='light'?'#925C08':'#DBAC2C'};margin:0}h1:focus{outline:none}
 .subtitle{font-size:20px;margin:4px 0 40px}
 .layout{display:grid;gap:56px;align-items:center;grid-template-columns:minmax(0,1fr)}
 .info{border:1px solid #DBAC2C;border-radius:6px 36px;padding:clamp(20px,4vw,40px);display:grid;gap:32px;overflow-wrap:anywhere}
 .row{display:flex;align-items:center;gap:12px}.row p{margin:0}.icon{flex-shrink:0;display:flex;padding:8px;border-radius:50%;background:#8047F8}.time{background:#DBAC2C}.payment{background:#C47F17}
 .illustration{min-width:0}.illustration img{display:block;max-width:100%;height:auto}
 .receipt{margin-top:32px;color:${({theme})=>theme.muted}}a{display:inline-block;color:${({theme})=>theme.brand};padding:12px 0;min-height:44px}
 @media(min-width:1000px){.layout{grid-template-columns:minmax(0,526fr) minmax(0,492fr)}}
`
export function Success({order,saved}:{order:Order|null;saved:boolean}) {
 const heading=useRef<HTMLHeadingElement>(null)
 useEffect(()=>{heading.current?.focus()},[])
 if(!order)return <EmptyState title="Nenhum pedido confirmado" description="Quando você concluir um pedido, os detalhes da entrega aparecerão aqui."/>
 const {address}=order
 return <Container><h1 ref={heading} tabIndex={-1}>Uhu! Pedido confirmado</h1><p className="subtitle">Seu pedido de demonstração foi concluído. Não haverá cobrança ou entrega real.</p>
 <div className="layout"><section className="info" aria-label="Detalhes da entrega">
 <div className="row"><span className="icon"><img src="/icons/success-location.svg" alt=""/></span><p>Entrega em <strong>{address.street}, {address.number}</strong><br/>{address.complement&&<>{address.complement}<br/></>}{address.neighborhood} — {address.city}, {address.uf}<br/>CEP {address.cep}</p></div>
 <div className="row"><span className="icon time"><img src="/icons/success-time.svg" alt=""/></span><p>Previsão ilustrativa de entrega<br/><strong>20 min – 30 min</strong></p></div>
 <div className="row"><span className="icon payment"><img src="/icons/success-payment.svg" alt=""/></span><p>Pagamento na entrega (simulado)<br/><strong>{paymentLabels[order.paymentMethod]}</strong></p></div>
 </section><div className="illustration"><img src="/icons/delivery.svg" alt="Entregador em uma scooter roxa"/></div></div>
 <section className="receipt" aria-label="Resumo do pedido confirmado"><h2>Seu pedido</h2><ul>{order.items.map(item=><li key={item.coffeeId}>{item.quantity} × {item.name} — {formatCurrency(item.quantity*item.unitPriceInCents)}</li>)}</ul><p>Entrega: {formatCurrency(order.deliveryFeeInCents)} · <strong>Total: {formatCurrency(order.totalInCents)}</strong></p></section>
 {!saved&&<p role="status">Não foi possível salvar o resumo nesta sessão. Ele ficará disponível enquanto a página estiver aberta.</p>}
 <Link to="/">Voltar aos cafés</Link></Container>
}
