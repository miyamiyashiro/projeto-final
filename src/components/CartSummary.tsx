import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { coffees } from '../data/coffees'
import { useCart } from '../hooks/useCart'
import { CartItem } from './CartItem'
import { formatCurrency } from '../utils/currency'
const Panel = styled.section`
  background:${({theme})=>theme.mode==='light'?'#F3F2F2':theme.surface}; padding:clamp(20px,4vw,40px); border-radius:6px 44px;
  dl { margin:0; } dl div { display:flex;justify-content:space-between;gap:16px;margin:12px 0; } dd { margin:0;white-space:nowrap; }
  .total { font-size:20px;font-weight:700; }
  a { display:inline-block;margin-top:24px;color:${({theme})=>theme.brand};min-height:44px; }
  .warning { color:${({theme})=>theme.muted};font-size:14px; }
`
export function CartSummary() {
 const {items,subtotalInCents,deliveryFeeInCents,totalInCents,storageUnavailable}=useCart()
 return <Panel aria-label="Resumo do carrinho">
  {items.map(item=>{const coffee=coffees.find(coffee=>coffee.id===item.coffeeId);return coffee?<CartItem key={item.coffeeId} item={item} coffee={coffee}/>:null})}
  <dl aria-live="polite"><div><dt>Total de itens</dt><dd>{formatCurrency(subtotalInCents)}</dd></div><div><dt>Entrega</dt><dd>{formatCurrency(deliveryFeeInCents)}</dd></div><div className="total"><dt>Total</dt><dd>{formatCurrency(totalInCents)}</dd></div></dl>
  {storageUnavailable&&<p role="status" className="warning">Seu navegador não permitiu salvar o carrinho. Os itens ficam disponíveis enquanto esta página estiver aberta.</p>}
  <Link to="/">Continuar escolhendo cafés</Link>
 </Panel>
}
