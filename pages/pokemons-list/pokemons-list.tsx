import {
  QueryFunctionContext, useInfiniteQuery
} from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  useEffect, useState
} from 'react'
import loader from '../../public/loader.svg'
import Image from 'next/image'
import PokemonModal from '@/pages/pokemons-list/[pokemon]'
import {
  getStringWithFirstUpperLetter
} from '@/components/helpers'
import * as S from '@/components/styled/pokemons-list.styled'
import {
  useRouter
} from 'next/router'

type ResultType = {
    name: string,
    url: string,
}

type GetPokemonsResponsType = {
    count: number,
    next: string,
    previous: string,
    results: ResultType[]
}

export const getPokemonsList = async ({
  pageParam = 'https://pokeapi.co/api/v2/pokemon?limit=24&offset=0'
}: QueryFunctionContext): Promise<GetPokemonsResponsType> => {
  const res = await fetch(pageParam)
  return res.json()
}


const PokemonsList = () => {
  const [pockemonsList, setPokemonsList] = useState<ResultType[]>([])

  const {
    data, fetchNextPage, hasNextPage
  } = useInfiniteQuery<GetPokemonsResponsType>('pokemons', getPokemonsList, {
    getNextPageParam: (lastPage) => lastPage.next,

    onSuccess: (data) => {
      if (data.pages) {
        const newItems = data.pages.reduce<ResultType[]>((allItems, page) => [...allItems, ...page.results], [])
        setPokemonsList(newItems)
      }
    }

  })


  const [inputName, setInputName] = useState('')

  const countFilterEnable = 3
  const filteredPokemons = inputName.length >= countFilterEnable
    ? pockemonsList.filter((i) => i.name.includes(inputName.toLowerCase()))
    : pockemonsList

  const router = useRouter()

  useEffect(() => {
    if (router.query.pokemon) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [router.query.pokemon])

  const onPokemonItemClick = (name: string) => {
    router.push(`/pokemons-list?pokemon=${name}`, {}, {
      scroll: false
    })
  }

  return <S.PokemonsListContainer>
    <S.Title>
      {data?.pages[0].count} <span className={'bold'}>Pokemons</span> for you to choose your favorite
    </S.Title>
    <S.CustomInput
      placeholder={'Encuentra tu pokémon...'}
      onChange={(e) => {
        setInputName(e.target.value)
      }} value={inputName}/>
    <InfiniteScroll
      dataLength={filteredPokemons.length}
      next={fetchNextPage}
      hasMore={Boolean(hasNextPage)}
      loader={inputName ? null : <S.LoaderBlock><Image src={loader} alt={'loader'}/></S.LoaderBlock>}>
      <S.PokemonsListBlock>
        {filteredPokemons.map((i) =>
          <S.PokemonItem key={i.name} onClick={() => onPokemonItemClick(i.name)}>
            {getStringWithFirstUpperLetter(i.name)}
          </S.PokemonItem>
        )}
      </S.PokemonsListBlock>
    </InfiniteScroll>
    {router.query.pokemon && <PokemonModal />}
  </S.PokemonsListContainer>
}


export default PokemonsList
