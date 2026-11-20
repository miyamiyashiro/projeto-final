import { Link } from 'react-router-dom'
import styled from 'styled-components'
const Panel = styled.section`
  padding: clamp(24px, 5vw, 56px); background: ${({ theme }) => theme.surface}; border: 1px solid ${({ theme }) => theme.border}; border-radius: 6px 36px;
  h1 { font-size: clamp(28px, 5vw, 40px); margin: 0 0 16px; }
  p { color: ${({ theme }) => theme.muted}; max-width: 55ch; }
  a { display: inline-flex; align-items: center; min-height: 44px; margin-top: 12px; padding: 10px 20px; background: ${({ theme }) => theme.action}; color: ${({ theme }) => theme.onAction}; border-radius: 6px; text-decoration: none; font-weight: 700; }
`
export function EmptyState({ title, description }: { title: string; description: string }) {
  return <Panel><h1>{title}</h1><p>{description}</p><Link to="/">Voltar ao início</Link></Panel>
}
