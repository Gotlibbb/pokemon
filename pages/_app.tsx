import {
  AppProps
} from 'next/app'
import {
  ThemeProvider
} from 'styled-components'
import MainContainer from '@/components/main-container/main-container'
import {
  FC
} from 'react'
import {
  QueryClient, QueryClientProvider
} from 'react-query'
import {
  GlobalStyle
} from '@/pages/global-style'

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
