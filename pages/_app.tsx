import { AppProps } from 'next/app'
import MainContainer from '@/components/main-container/main-container'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GlobalStyle } from '@/global-style'
import { PokemonModalPagePropsType, PokemonsListPagePropsType } from '@/types/pages-props-types'

const queryClient = new QueryClient()

type PagePropsType = PokemonsListPagePropsType | PokemonModalPagePropsType

const App: FC<AppProps<PagePropsType>> = ({
  Component, pageProps
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainContainer>
        <GlobalStyle/>
        <Component {...pageProps} />
      </MainContainer>
    </QueryClientProvider>
  )
}


export default App
