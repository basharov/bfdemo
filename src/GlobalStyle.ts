import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    touch-action: pan-x pan-y;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    font-family: sans-serif;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  th {
    border-bottom: 1px solid rgba(0, 0, 0, .2);
    padding: 0 0 5px 0;
    text-align: left;
    font-size: 14px;
    color: #333;
  }

  button {
    border: 0;
    margin: 0 5px;
    padding: 5px 10px;
    border-radius: 2px
  }
`
