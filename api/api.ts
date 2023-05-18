import { QueryFunctionContext } from 'react-query'

export type GetPokemonsResponsType = {
    count: number,
    next: string,
    previous: string,
    results: PokemonInfo[]
}

export type PokemonInfo = {
    name: string,
    url: string,
}

export const getPokemonsList = async ({
  pageParam = 'https://pokeapi.co/api/v2/pokemon?limit=24&offset=0'
}: QueryFunctionContext): Promise<GetPokemonsResponsType> => {
  const res = await fetch(pageParam)
  return res.json()
}
