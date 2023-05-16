import {
  createGlobalStyle
} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Karla', sans-serif;
    width: 100%;
    height: 100%;
    
    &::-webkit-scrollbar {
      position: sticky;
      right: 0;
      width: 6px;
      background-color: #F2F2F2;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #C1C1C1;
      border-radius: 20px;
    }
  }
     
`
