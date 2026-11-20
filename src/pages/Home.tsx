import styled from 'styled-components'
const Intro = styled.section`
  padding: clamp(28px, 6vw, 72px) 0; max-width: 700px;
  h1 { font-size: clamp(34px, 5vw, 48px); font-weight: 800; margin: 16px 0; }
  p { font-size: 20px; color: ${({ theme }) => theme.muted}; }
  small { display: inline-block; color: ${({ theme }) => theme.brand}; background: ${({ theme }) => theme.soft}; border-radius: 30px; padding: 6px 14px; font-weight: 700; }
`
export function Home() {
  return <Intro><small>COFFEE DELIVERY</small><h1>Encontre o café perfeito para qualquer hora do dia</h1><p>Seu café favorito, com o aconchego de uma pausa bem aproveitada.</p></Intro>
}
