import { createGlobalStyle } from 'styled-components'
export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body { margin: 0; min-width: 320px; background: ${({ theme }) => theme.background}; color: ${({ theme }) => theme.text}; font-family: 'Roboto', sans-serif; line-height: 1.5; }
  h1,h2,h3 { font-family: 'Baloo 2', sans-serif; line-height: 1.2; }
  button, input { font: inherit; }
  a { color: inherit; }
  button, a { -webkit-tap-highlight-color: transparent; }
  :focus-visible { outline: 3px solid ${({ theme }) => theme.focus}; outline-offset: 4px; }
  button { cursor: pointer; }
  img { display: block; }
`
