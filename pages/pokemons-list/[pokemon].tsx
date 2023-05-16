import React, {
  useEffect, useState
} from 'react'
import {
  useRouter
} from 'next/router'
import {
  LoaderModal, NotFoundModal, PokemonModal
} from '@/components/pokemon-modal'


type ResponseDataType = {
  id: string,
  name: string,
  types: {type: {name: string}}[],
  stats: {base_stat:string}[]
  abilities: {ability : {name: string}}[]
  base_experience: string
  sprites: any
};

const PokemonModalPage = () => {
  const router = useRouter()

  const [data, setData] = useState<ResponseDataType | null>(null)

  const {
    id, name, types, abilities: invalidAbilities, stats, base_experience: baseExperience, sprites
  } = data || {}

  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    if (router.query.pokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${router.query.pokemon}`).then((res) => {
        res.json().then((r) => setData(r)).finally(() => setIsLoad(false))
      })
    }
  }, [router.query.pokemon])

  const handleClose = () => {
    router.push('/pokemons-list', undefined, {
      scroll: false
    })
  }

  const imageUrl = sprites?.other.dream_world.front_default || ''

  const [hp, attack, defense, spAttack, spDefense] = stats?.map((i) => i.base_stat) || []

  const typeNames = types?.map((i) => i.type.name) || []

  const abilities = invalidAbilities?.map((i) => i.ability.name) || []

  if (isLoad) {
    return (
      <LoaderModal/>
    )
  }

  if (!isLoad && !data?.sprites) {
    return (
      <NotFoundModal handleClose={handleClose}/>
    )
  }

  return (
    <PokemonModal
      id={id}
      defense={defense}
      spDefense={spDefense}
      name={name}
      typeNames={typeNames}
      imageUrl={imageUrl}
      spAttack={spAttack}
      attack={attack}
      handleClose={handleClose}
      baseExperience={baseExperience}
      abilities={abilities}
      hp={hp}
    />
  )
}

export default PokemonModalPage
