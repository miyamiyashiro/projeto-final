import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { CartProvider } from './contexts/CartProvider'
import { Header } from './components/Header'
import { EmptyState } from './components/EmptyState'
import { AppThemeProvider } from './contexts/AppThemeProvider'
import { GlobalStyle } from './styles/GlobalStyle'
import { Home } from './pages/Home'
import { Checkout } from './pages/Checkout'
import { Success } from './pages/Success'
const Main = styled.main`width: min(1120px, calc(100% - 40px)); margin: 32px auto 64px; @media(max-width:480px){width:calc(100% - 32px);}`
const SkipLink = styled.a`position: fixed; left: 16px; top: -100px; z-index: 10; padding: 12px; background: ${({ theme }) => theme.surface}; color: ${({ theme }) => theme.text}; &:focus { top: 12px; }`
function App() {
  return <AppThemeProvider><GlobalStyle /><CartProvider><BrowserRouter>
    <SkipLink href="#conteudo">Pular para conteúdo</SkipLink><Header />
    <Main id="conteudo" tabIndex={-1}><Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<Success />} />
      <Route path="*" element={<EmptyState title="Página não encontrada" description="Volte ao início para continuar." />} />
    </Routes></Main>
  </BrowserRouter></CartProvider></AppThemeProvider>
}
export default App
