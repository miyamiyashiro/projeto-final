import styled from 'styled-components'
import type { CartItem as CartItemData } from '../types/cart'
import type { Coffee } from '../types/coffee'
import { QuantityInput } from './QuantityInput'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/currency'
const Row = styled.article`
  display: grid; grid-template-columns: 64px minmax(0,1fr) auto; gap: 16px; padding: 8px 0 24px; margin-bottom: 24px; border-bottom: 1px solid ${({ theme }) => theme.border};
  h3 { font: inherit; margin: 0 0 8px; }
  .actions { display:flex; flex-wrap:wrap; gap:8px; }
  strong { white-space:nowrap; }
  @media(max-width:480px) { grid-template-columns:64px minmax(0,1fr); gap:12px; strong { grid-column:2; } }
`
const Photo = styled.img<{ $rotation: number }>`width:64px;height:64px;object-fit:cover;transform:rotate(${({$rotation})=>$rotation}deg);`
const Remove = styled.button`
  display:flex; align-items:center; gap:4px; border:0; border-radius:6px; padding:8px; min-height:44px; background:${({theme})=>theme.soft}; color:${({theme})=>theme.text}; font-size:12px; text-transform:uppercase;
  img { background:#EBE5F9; border-radius:2px; }
`
export function CartItem({ item, coffee }: { item: CartItemData; coffee: Coffee }) {
 const { dispatch } = useCart()
 return <Row aria-label={coffee.name}>
  <Photo src={coffee.image} alt="" $rotation={coffee.imageRotation}/>
  <div><h3>{coffee.name}</h3><div className="actions">
    <QuantityInput label={coffee.name} value={item.quantity} onChange={value=>dispatch({type:value>item.quantity?'INCREMENT_ITEM':'DECREMENT_ITEM',coffeeId:coffee.id})}/>
    <Remove type="button" onClick={()=>dispatch({type:'REMOVE_ITEM',coffeeId:coffee.id})} aria-label={`Remover ${coffee.name}`}><img src="/icons/trash.svg" alt=""/>Remover</Remove>
  </div></div>
  <strong>{formatCurrency(coffee.priceInCents * item.quantity)}</strong>
 </Row>
}

