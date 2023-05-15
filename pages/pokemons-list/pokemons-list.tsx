import {
  QueryFunctionContext, useInfiniteQuery
} from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  useEffect, useState
} from 'react'
import loader from '../../public/loader.svg'
import Image from 'next/image'
import PokemonModal from '@/pages/pokemons-list/pokemon-modal/[name]'
import {
  getStringWithFirstUpperLetter
} from '@/components/helpers'
import {
  CustomInput,
  LoaderBlock,
  PokemonItem,
  PokemonsListBlock,
  PokemonsListContainer,
  Title
} from '@/pages/pokemons-list/pokemons-list.styled'

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


  const filteredPokemons = inputName.length >= 3
    ? pockemonsList.filter((i) => i.name.includes(inputName.toLowerCase()))
    : pockemonsList

  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState('')

  useEffect(() => {
    if (selectedPokemonUrl) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [selectedPokemonUrl])

  const onPokemonItemClick = (url: string) => {
    setSelectedPokemonUrl(url)
  }


  return <PokemonsListContainer>
    <Title>
      {data?.pages[0].count} <span className={'bold'}>Pokemons</span> for you to choose your favorite
    </Title>
    <CustomInput
      placeholder={'Encuentra tu pokémon...'}
      onChange={(e) => {
        setInputName(e.target.value)
      }} value={inputName}/>
    <InfiniteScroll
      dataLength={filteredPokemons.length}
      next={fetchNextPage}
      hasMore={Boolean(hasNextPage)}
      loader={inputName ? null : <LoaderBlock><Image src={loader} alt={'loader'}/></LoaderBlock>}>
      <PokemonsListBlock>
        {filteredPokemons.map((i) =>
          <PokemonItem key={i.url} onClick={() => onPokemonItemClick(i.url)}>
            {getStringWithFirstUpperLetter(i.name)}
          </PokemonItem>)}
      </PokemonsListBlock>
    </InfiniteScroll>
    {selectedPokemonUrl && <PokemonModal url={selectedPokemonUrl} closeModal={() => setSelectedPokemonUrl('')}/>}
  </PokemonsListContainer>
}


export default PokemonsList
