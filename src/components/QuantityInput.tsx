import styled from 'styled-components'
const Counter = styled.div`
  display: flex; align-items: center; background: ${({ theme }) => theme.soft}; border-radius: 6px;
  button { border: 0; background: transparent; min-width: 28px; min-height: 44px; display: grid; place-items: center; }
  button:disabled { opacity: .4; cursor: not-allowed; }
  output { min-width: 24px; text-align: center; }
  img { background: #EBE5F9; border-radius: 2px; }
`
interface Props { value: number; onChange: (value: number) => void; label: string }
export function QuantityInput({ value, onChange, label }: Props) {
  return <Counter role="group" aria-label={`Quantidade de ${label}`}>
    <button type="button" disabled={value <= 1} aria-label={`Diminuir quantidade de ${label}`} onClick={() => onChange(value - 1)}><img src="/coffees/imgIcon.svg" alt="" /></button>
    <output aria-live="polite" aria-label={`Quantidade selecionada de ${label}`}>{value}</output>
    <button type="button" disabled={value >= Number.MAX_SAFE_INTEGER} aria-label={`Aumentar quantidade de ${label}`} onClick={() => onChange(value + 1)}><img src="/coffees/imgIcon1.svg" alt="" /></button>
  </Counter>
}
