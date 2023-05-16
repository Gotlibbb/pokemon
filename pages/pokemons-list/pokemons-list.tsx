import {
  useInfiniteQuery
} from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  useEffect, useState
} from 'react'
import loader from '../../public/loader.svg'
import Image from 'next/image'
import PokemonModalPage from '@/pages/pokemons-list/[pokemon]'
import {
  getStringWithFirstUpperLetter, urls
} from '@/components/helpers'
import * as S from '@/components/styled/pokemons-list.styled'
import {
  useRouter
} from 'next/router'
import {
  getPokemonsList, GetPokemonsResponsType, PokemonInfo
} from '@/api'


const PokemonsListPage = () => {
  const [pockemonsList, setPokemonsList] = useState<PokemonInfo[]>([])
  const [inputName, setInputName] = useState('')
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
    }
  })

  const countFilterEnable = 3
  const filteredPokemons = inputName.length >= countFilterEnable
    ? pockemonsList.filter((i) => i.name.includes(inputName.toLowerCase()))
    : pockemonsList

  useEffect(() => {
    if (router.query.pokemon) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [router.query.pokemon])

  const onPokemonItemClick = (name: string) => {
    router.push(`${urls.home}?pokemon=${name}`, undefined, {
      scroll: false
    })
  }

  const load = inputName
    ? null
    : (
      <S.LoaderBlock>
        <Image src={loader} alt={'loader'}/>
      </S.LoaderBlock>
    )

  return <S.PokemonsListContainer>
    <S.Title>
      {data?.pages[0].count} <span className={'bold'}>Pokemons</span> for you to choose your favorite
    </S.Title>
    <S.CustomInput
      placeholder={'Encuentra tu pokémon...'}
      value={inputName}
      onChange={(e) => {
        setInputName(e.target.value)
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
    {router.query.pokemon && <PokemonModalPage />}
  </S.PokemonsListContainer>
}

export default PokemonsListPage
