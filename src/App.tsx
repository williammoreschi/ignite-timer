import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CyclesContexProvider } from './context/CyclesContex'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/theme/default'
export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContexProvider>
          <Router />
        </CyclesContexProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
