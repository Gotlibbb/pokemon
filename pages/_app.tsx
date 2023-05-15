import {
  AppProps
} from 'next/app'
import {
  createGlobalStyle, ThemeProvider
} from 'styled-components'
import MainContainer from '@/components/main-container/main-container'
import {
  FC
} from 'react'
import {
  QueryClient, QueryClientProvider
} from 'react-query'

const GlobalStyle = createGlobalStyle`
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

const queryClient = new QueryClient()

const App: FC<AppProps> = ({
  Component, pageProps
}) =>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={{}}>
      <MainContainer>
        <GlobalStyle />
        <Component {...pageProps} />
      </MainContainer>
    </ThemeProvider>
  </QueryClientProvider>


export default App
