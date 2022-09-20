import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: transparent;
    box-shadow: 0 0 0 2px #5e5e5e;
  }

  body {
    background: #999999;
    color: #cccccc;
    --webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-family: 'Roboto Mono', monospace;
    font-weight: 400;
    font-size: 1rem; /* 1rem == 16px*/
  }
`