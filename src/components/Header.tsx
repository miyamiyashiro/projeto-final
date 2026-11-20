import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ThemeToggle } from './ThemeToggle'
const Bar = styled.header`
  width: min(1120px, calc(100% - 40px)); margin: auto; min-height: 104px;
  display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 24px 0;
  @media(max-width: 480px) { width: calc(100% - 32px); flex-wrap: wrap; gap: 12px; padding: 20px 0; }
`
const Brand = styled(Link)`
  display: flex; align-items: center; gap: 8px; text-decoration: none; color: ${({ theme }) => theme.brand};
  font-family: 'Baloo 2', sans-serif; font-size: 20px; font-weight: 800; line-height: 1;
  img { width: 48px; height: 48px; object-fit: contain; background: #FAF7F2; border-radius: 12px; }
`
const Actions = styled.nav`display: flex; align-items: center; gap: 12px;`
const Location = styled.span`
  display: flex; align-items: center; gap: 4px; border-radius: 6px; padding: 8px; background: #EBE5F9; color: #4B2995; font-size: 14px;
  @media(max-width: 640px) { display: none; }
`
const CartLink = styled(Link)`
  display: flex; align-items: center; justify-content: center; min-width: 44px; min-height: 44px;
  border-radius: 6px; background: #F1E9C9;
`
export function Header() {
  return <Bar>
    <Brand to="/" aria-label="Coffee Delivery — início"><img src="/brand/coffee-delivery-symbol.png" alt="" /><span>Coffee<br />Delivery</span></Brand>
    <Actions aria-label="Ações principais">
      <Location><img src="/icons/location.svg" alt="" />Entrega no seu endereço</Location>
      <ThemeToggle />
      <CartLink to="/checkout" aria-label="Abrir carrinho"><img src="/icons/cart.svg" alt="" /></CartLink>
    </Actions>
  </Bar>
}
