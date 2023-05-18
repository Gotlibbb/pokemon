import { getPokemonsList } from '@/api'
import { GetServerSideProps, NextPage } from 'next'
import { PokemonsListPagePropsType } from '@/types/pages-props-types'
import { PokemonList } from '@/features/pokemon-list'

const PokemonsListPage: NextPage<PokemonsListPagePropsType> = (props) => {
  return (
    <PokemonList initialPokemonList={props.initialPokemonList}/>
  )
}

export const getServerSideProps: GetServerSideProps<PokemonsListPagePropsType> =  async () => {
  const data = await getPokemonsList({
    pageParam: 'https://pokeapi.co/api/v2/pokemon?limit=24&offset=0',
    queryKey: [],
    meta: undefined
  })

  return {
    props: {
      initialPokemonList: {
        pages: [data],
        pageParams: []
      }
    }
  }
}

export default PokemonsListPage
