import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { LoaderModal, NotFoundModal, PokemonInfoModal } from '@/components/pokemon-modal'
import { ResponsePokemonDataType } from '@/features/pokemon-modal/types'

type PokemonModalPropsType = {
    pokemonData?: ResponsePokemonDataType
}

export const PokemonModal:FC<PokemonModalPropsType> = (props) => {
  const router = useRouter()

  const [data, setData] = useState<ResponsePokemonDataType | undefined>(props.pokemonData)

  const {
    id, name, types, abilities: invalidAbilities, stats, base_experience: baseExperience, sprites
  } = data || {}

  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    if (router.query.pokemon && props.pokemonData === undefined) {
      setIsLoad(true)
      fetch(`https://pokeapi.co/api/v2/pokemon/${router.query.pokemon}`).then((res) => {
        res.json().then((r) => setData(r)).finally(() => setIsLoad(false))
      })
    }
  }, [props.pokemonData, router.query.pokemon])

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
    <PokemonInfoModal
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
