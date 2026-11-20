import styled from 'styled-components'
import { useTheme } from '../hooks/useTheme'
const Toggle = styled.button`
  min-height: 44px; min-width: 44px; padding: 8px 12px; border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border}; background: ${({ theme }) => theme.surface}; color: ${({ theme }) => theme.text};
`
export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme()
  return <Toggle onClick={toggleTheme} aria-label="Tema escuro" aria-pressed={mode === 'dark'} title="Alternar tema">
    <span aria-hidden="true">{mode === 'dark' ? '☀' : '☾'}</span>
  </Toggle>
}
