import { InfiniteData } from 'react-query'
import { GetPokemonsResponsType } from '@/api'
import { ResponsePokemonDataType } from '@/features/pokemon-modal/types'

export type PokemonsListPagePropsType = {
    initialPokemonList: InfiniteData<GetPokemonsResponsType>
}

export type PokemonModalPagePropsType = {
    pokemonData?: ResponsePokemonDataType
}
