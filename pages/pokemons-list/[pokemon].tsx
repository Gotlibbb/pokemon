import React, {
  useEffect, useState
} from 'react'
import {
  getStringWithFirstUpperLetter
} from '@/components/helpers'
import Image from 'next/image'
import loader from '../../public/loader.svg'
import cross from '../../public/cross.svg'
import notFound from '../../public/404.png'
import {
  useRouter
} from 'next/router'
import * as S from '@/components/styled/pokemon-modal.styled'


type ResponseDataType = {
  id: string,
  name: string,
  types: {type: {name: string}}[],
  stats: {base_stat:string}[]
  abilities: {ability : {name: string}}[]
  base_experience: string
  sprites: any
};

const PokemonModal = () => {
  const router = useRouter()

  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    if (router.query.pokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${router.query.pokemon}`).then((res) => {
        res.json().then((r) => setData(r)).finally(() => setIsLoad(false))
      })
    }
  }, [router.query.pokemon])

  const [data, setData] = useState<ResponseDataType | null>(null)

  const handleClose = () => {
    router.push('/pokemons-list', {}, {
      scroll: false
    })
  }

  const {
    id, name, types, abilities, stats, base_experience: baseExperience, sprites
  } = data || {}

  const imageUrl = sprites?.other.dream_world.front_default || ''

  const [hp, attack, defense, spAttack, spDefense] = stats || []

  const typeNames = types?.map((i) => i.type.name) || []

  if (isLoad) {
    return <S.Overlay>
      <Image src={loader} alt={'loader'} />
    </S.Overlay>
  }

  if (!isLoad && !data?.sprites) {
    return <S.Overlay>
      <S.ModalContainer>
        <S.Cross src={cross} alt={'cross'} onClick={handleClose} />
        <S.ModalBlock>
          <S.NotFoundBlock>
            <Image width={590} src={notFound} alt={'404'}/>
            <span>404</span>
          </S.NotFoundBlock>
        </S.ModalBlock>
      </S.ModalContainer>
    </S.Overlay>
  }

  return <S.Overlay>
    <S.ModalContainer>
      <S.Cross src={cross} alt={'cross'} onClick={handleClose} />
      <S.ModalBlock>
        <S.LeftBlock types={typeNames} >
          <Image src={imageUrl} alt={'pokemon'} width={325} height={325} />
          <S.TypesBlock>
            {typeNames?.map((i) =>
              <S.TypeItem key={i}>
                {i}
              </S.TypeItem>)}
          </S.TypesBlock>
        </S.LeftBlock>
        <S.RightBlock types={typeNames}>
          <S.TitleBlock>
            <S.Name>
              {getStringWithFirstUpperLetter(name)}
            </S.Name>
            <S.IdBlock>
              <S.Generation>
              Generation 1
              </S.Generation>
              <S.Id>
                {id}
              </S.Id>
            </S.IdBlock>
          </S.TitleBlock>
          <S.InfoBlock>
            <S.AbilitiesBlock>
              <div>Abilities</div>
              <div className={'values'}>{abilities?.map((ab) => <span key={ab.ability.name}>{ab.ability.name}</span>)}</div>
            </S.AbilitiesBlock>
            <S.MainSkillsBlock>
              <S.ChargeBlock>
                <div>Healthy Points</div>
                <div className="bold">{hp?.base_stat}</div>
                <S.ChargeLine isHp count={Number(hp?.base_stat)} maxCount={100}/>
              </S.ChargeBlock>
              <S.ChargeBlock>
                <div>Experience</div>
                <div className="bold">{baseExperience}</div>
                <S.ChargeLine count={Number(baseExperience)} maxCount={100}/>
              </S.ChargeBlock>
            </S.MainSkillsBlock>
            <S.SkillsBlock>
              <S.Skill>
                <S.SkillCount>
                  {defense?.base_stat}
                </S.SkillCount>
                <S.SkillName>
                Defense
                </S.SkillName>
              </S.Skill>
              <S.Skill>
                <S.SkillCount>
                  {attack?.base_stat}
                </S.SkillCount>
                <S.SkillName>
                Attack
                </S.SkillName>
              </S.Skill>
              <S.Skill>
                <S.SkillCount>
                  {spAttack?.base_stat}
                </S.SkillCount>
                <S.SkillName>
                Sp Attack
                </S.SkillName>
              </S.Skill>
              <S.Skill>
                <S.SkillCount>
                  {spDefense?.base_stat}
                </S.SkillCount>
                <S.SkillName>
                Sp Defense
                </S.SkillName>
              </S.Skill>
            </S.SkillsBlock>
          </S.InfoBlock>
        </S.RightBlock>
      </S.ModalBlock>
    </S.ModalContainer>
  </S.Overlay>
}


export default PokemonModal
