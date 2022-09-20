import { ThemeProvider } from 'styled-components';
import { ButtonStyleComponent } from './components/exemplos/csscomponents';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/theme/default';
export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <h1>Configurar tema</h1>
      <ButtonStyleComponent text="Primary" color="primary" />
      <ButtonStyleComponent text="Secondary" color="secondary" />
      <ButtonStyleComponent text="Danger" color="danger" />
      <ButtonStyleComponent text="Success" color="success" />
      <ButtonStyleComponent text="Default" />
    </ThemeProvider>
  )
}