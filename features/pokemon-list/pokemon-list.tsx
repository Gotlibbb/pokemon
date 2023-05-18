import { FC, useEffect, useMemo, useState } from 'react'
import { getPokemonsList, GetPokemonsResponsType, PokemonInfo } from '@/api'
import { useRouter } from 'next/router'
import { InfiniteData, useInfiniteQuery } from 'react-query'
import { getStringWithFirstUpperLetter, urls } from '@/components/helpers'
import * as S from '@/components/styled/pokemons-list.styled'
import Image from 'next/image'
import loader from '@/public/loader.svg'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PokemonModal } from '@/features/pokemon-modal'

type PokemonListPropsType = {
    initialPokemonList: InfiniteData<GetPokemonsResponsType>
}

export const PokemonList:FC<PokemonListPropsType> = (props) => {
  const [pockemonsList, setPokemonsList] = useState<PokemonInfo[]>(props.initialPokemonList.pages[0].results)
  const [filterName, setFilterName] = useState('')
  const router = useRouter()

  const {
    data, fetchNextPage, hasNextPage
  } = useInfiniteQuery<GetPokemonsResponsType>('pokemons', getPokemonsList, {
    getNextPageParam: (lastPage) => lastPage.next,
    onSuccess: (data) => {
      if (data.pages) {
        const newItems = data.pages.reduce<PokemonInfo[]>((allItems, page) => [...allItems, ...page.results], [])
        setPokemonsList(newItems)
      }
    },
    initialData: props.initialPokemonList
  })


  const filteredPokemons = useMemo(() => {
    const countFilterEnable = 3
    if (filterName.length >= countFilterEnable) {
      return pockemonsList
    }
    return pockemonsList.filter((i) => i.name.includes(filterName.toLowerCase()))
  }, [filterName, pockemonsList])


  useEffect(() => {
    if (router.query.pokemon) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [router.query.pokemon])

  const onPokemonItemClick = (name: string) => {
    router.push(`${urls.home}?pokemon=${name}`, `${urls.home}/${name}`, {
      scroll: false
    })
  }

  const load = filterName
    ? null
    : (
      <S.LoaderBlock>
        <Image src={loader} alt={'loader'}/>
      </S.LoaderBlock>
    )

  return (
    <S.PokemonsListContainer>
      <S.Title>
        {data?.pages[0].count} <span className={'bold'}>Pokemons</span> for you to choose your favorite
      </S.Title>
      <S.CustomInput
        placeholder={'Encuentra tu pokémon...'}
        value={filterName}
        onChange={(e) => {
          setFilterName(e.target.value)
        }}
      />
      <InfiniteScroll
        dataLength={filteredPokemons.length}
        next={fetchNextPage}
        hasMore={Boolean(hasNextPage)}
        loader={load}>
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
  )
}
