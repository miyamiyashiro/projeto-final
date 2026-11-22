import styled from 'styled-components'
import { EmptyState } from '../components/EmptyState'
import { CartSummary } from '../components/CartSummary'
import { useCart } from '../hooks/useCart'
const Container=styled.div`max-width:560px;margin:0 auto;h1{font-size:24px;margin:0 0 24px;}`
export function Checkout() {
 const {items}=useCart()
 if(!items.length)return <EmptyState title="Seu carrinho está vazio" description="Escolha seus cafés favoritos para começar um pedido." />
 return <Container><h1>Cafés selecionados</h1><CartSummary/></Container>
}
