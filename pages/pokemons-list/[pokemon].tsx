import { GetServerSideProps, NextPage } from 'next'
import { PokemonModal } from '@/features/pokemon-modal/pokemon-modal'
import { PokemonModalPagePropsType } from '@/types/pages-props-types'

const PokemonModalPage:NextPage<PokemonModalPagePropsType> = (props) => {
  return (
    <PokemonModal pokemonData={props.pokemonData}/>
  )
}

export const getServerSideProps: GetServerSideProps<PokemonModalPagePropsType> =  async (context) => {
  const { pokemon } = context.query
  let pokemonData
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    pokemonData = await response.json()
  } catch (e) {
    pokemonData = null
  }

  return {
    props: {
      pokemonData
    }
  }
}

export default PokemonModalPage
