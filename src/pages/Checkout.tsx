import styled from 'styled-components'
import { EmptyState } from '../components/EmptyState'
import { CartSummary } from '../components/CartSummary'
import { DeliveryAddressForm } from '../components/DeliveryAddressForm'
import { useCart } from '../hooks/useCart'
const Container=styled.div`
 display:grid;grid-template-columns:minmax(0,1fr);gap:32px;align-items:start;
 h1,h2.section-title{font-size:20px;margin:0 0 16px}
 @media(min-width:1100px){grid-template-columns:minmax(0,640fr) minmax(0,448fr)}
`
export function Checkout() {
 const {items}=useCart()
 if(!items.length)return <EmptyState title="Seu carrinho está vazio" description="Escolha seus cafés favoritos para começar um pedido." />
 return <Container><section><h1>Complete seu pedido</h1><DeliveryAddressForm/></section><section><h2 className="section-title">Cafés selecionados</h2><CartSummary/></section></Container>
}
