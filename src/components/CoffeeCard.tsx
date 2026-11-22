import { useCart } from '../hooks/useCart'
import { useState } from 'react'
import styled from 'styled-components'
import type { Coffee } from '../types/coffee'
import { QuantityInput } from './QuantityInput'
import { formatCurrency } from '../utils/currency'
const Card = styled.article`
  background: ${({ theme }) => theme.mode === 'light' ? '#F3F2F2' : theme.surface};
  border-radius: 6px 36px; padding: 0 16px 20px; text-align: center; display: flex; flex-direction: column; min-width: 0;
  h3 { font-size: 20px; margin: 16px 0 8px; }
  p { font-size: 14px; color: ${({ theme }) => theme.muted}; margin: 0; line-height: 1.3; min-height: 54px; }
`
const Photo = styled.img<{ $rotation: number }>`width: 120px; height: 120px; object-fit: cover; margin: -20px auto 12px; transform: rotate(${({ $rotation }) => $rotation}deg);`
const Tags = styled.div`
 display: flex; justify-content: center; gap: 4px; flex-wrap: wrap;
 span { background: #F1E9C9; color: #80520B; font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 4px 8px; border-radius: 100px; }
`
const Buy = styled.div`
 display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 28px;
 strong { font-family: 'Baloo 2', sans-serif; font-size: 22px; white-space: nowrap; }
 .actions { display: flex; gap: 8px; }
`
const Add = styled.button`
 display: grid; place-items: center; min-width: 44px; min-height: 44px; border: 0; border-radius: 6px; background: #4B2995;
 &:disabled { opacity: .65; cursor: not-allowed; }
`
export function CoffeeCard({ coffee }: { coffee: Coffee }) {
 const [quantity, setQuantity] = useState(1)
 const { dispatch } = useCart()
 const [added, setAdded] = useState(0)
 return <Card aria-labelledby={`coffee-${coffee.id}`}>
   <Photo src={coffee.image} alt={coffee.name} $rotation={coffee.imageRotation} width={120} height={120} loading="lazy" />
   <Tags>{coffee.tags.map(tag => <span key={tag}>{tag}</span>)}</Tags>
   <h3 id={`coffee-${coffee.id}`}>{coffee.name}</h3><p>{coffee.description}</p>
   <Buy><strong>{formatCurrency(coffee.priceInCents)}</strong><div className="actions">
     <QuantityInput value={quantity} onChange={setQuantity} label={coffee.name} />
     <Add type="button" onClick={() => { dispatch({ type: 'ADD_ITEM', coffeeId: coffee.id, quantity }); setAdded(value => value + 1) }} aria-label={`Adicionar ${coffee.name} ao carrinho`}><img src="/coffees/imgShoppingCartSimple.svg" alt="" /></Add>
   </div></Buy><span role="status" style={{fontSize:12,minHeight:18,marginTop:8}}>{added > 0 ? `Adicionado ao carrinho (${added})` : ''}</span>
 </Card>
}
