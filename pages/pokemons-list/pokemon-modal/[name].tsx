import React, {
  FC, useEffect, useState
} from 'react'
import {
  getStringWithFirstUpperLetter
} from '@/components/helpers'
import Image from 'next/image'
import loader from '../../../public/loader.svg'
import cross from '../../../public/cross.svg'
import notFound from '../../../public/404.png'
import {
  useRouter
} from 'next/router'
import {
  AbilitiesBlock,
  ChargeBlock,
  ChargeLine,
  Cross,
  Generation,
  Id,
  IdBlock,
  InfoBlock,
  LeftBlock,
  MainSkillsBlock,
  ModalBlock,
  ModalContainer,
  Name,
  NotFoundBlock,
  Overlay,
  RightBlock,
  Skill,
  SkillCount,
  SkillName,
  SkillsBlock,
  TitleBlock,
  TypeItem,
  TypesBlock
} from '@/components/styled/pokemon-modal.styled'

type PokemonModalPropsType = {
  url: string,
  closeModal: () => void
}


type ResponseDataType = {
  id: string,
  name: string,
  types: {type: {name: string}}[],
  stats: {base_stat:string}[]
  abilities: {ability : {name: string}}[]
  base_experience: string
  sprites: any
};

const PokemonModal: FC<PokemonModalPropsType> = (props) => {
  const router = useRouter()

  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    if (router.query.name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${router.query.name}`).then((res) => {
        res.json().then((r) => setData(r)).finally(() => setIsLoad(false))
      })
    }
    if (props.url) {
      fetch(props.url).then((res) => {
        res.json().then((r) => setData(r)).finally(() => setIsLoad(false))
      })
    }
  }, [props.url, router.query.name])

  const [data, setData] = useState<ResponseDataType | null>(null)

  const handleClose = () => {
    if (props.closeModal) {
      props.closeModal()
    } else {
      router.push('/pokemons-list')
    }
  }

  const {
    id, name, types, abilities, stats, base_experience: baseExperience, sprites
  } = data || {}

  const imageUrl = sprites?.other.dream_world.front_default || ''

  const [hp, attack, defense, spAttack, spDefense] = stats || []

  const typeNames = types?.map((i) => i.type.name) || []


  if (isLoad) {
    return <Overlay>
      <Image src={loader} alt={'loader'} />
    </Overlay>
  }

  if (!isLoad && !data?.sprites) {
    return <Overlay>
      <ModalContainer>
        <Cross src={cross} alt={'cross'} onClick={handleClose} />
        <ModalBlock>
          <NotFoundBlock>
            <Image width={590} src={notFound} alt={'404'}/>
            <span>404</span>
          </NotFoundBlock>
        </ModalBlock>
      </ModalContainer>
    </Overlay>
  }

  return <Overlay>
    <ModalContainer>
      <Cross src={cross} alt={'cross'} onClick={handleClose} />
      <ModalBlock>
        <LeftBlock types={typeNames} >
          <Image src={imageUrl} alt={'pokemon'} width={325} height={325} />
          <TypesBlock>
            {typeNames?.map((i) =>
              <TypeItem key={i}>
                {i}
              </TypeItem>)}
          </TypesBlock>
        </LeftBlock>
        <RightBlock types={typeNames}>
          <TitleBlock>
            <Name>
              {getStringWithFirstUpperLetter(name)}
            </Name>
            <IdBlock>
              <Generation>
              Generation 1
              </Generation>
              <Id>
                {id}
              </Id>
            </IdBlock>
          </TitleBlock>
          <InfoBlock>
            <AbilitiesBlock>
              <div>Abilities</div>
              <div className={'values'}>{abilities?.map((ab) => <span key={ab.ability.name}>{ab.ability.name}</span>)}</div>
            </AbilitiesBlock>
            <MainSkillsBlock>
              <ChargeBlock>
                <div>Healthy Points</div>
                <div className="bold">{hp?.base_stat}</div>
                <ChargeLine isHp count={Number(hp?.base_stat)} maxCount={100}/>
              </ChargeBlock>
              <ChargeBlock>
                <div>Experience</div>
                <div className="bold">{baseExperience}</div>
                <ChargeLine count={Number(baseExperience)} maxCount={100}/>
              </ChargeBlock>
            </MainSkillsBlock>
            <SkillsBlock>
              <Skill>
                <SkillCount>
                  {defense?.base_stat}
                </SkillCount>
                <SkillName>
                Defense
                </SkillName>
              </Skill>
              <Skill>
                <SkillCount>
                  {attack?.base_stat}
                </SkillCount>
                <SkillName>
                Attack
                </SkillName>
              </Skill>
              <Skill>
                <SkillCount>
                  {spAttack?.base_stat}
                </SkillCount>
                <SkillName>
                Sp Attack
                </SkillName>
              </Skill>
              <Skill>
                <SkillCount>
                  {spDefense?.base_stat}
                </SkillCount>
                <SkillName>
                Sp Defense
                </SkillName>
              </Skill>
            </SkillsBlock>
          </InfoBlock>
        </RightBlock>
      </ModalBlock>
    </ModalContainer>
  </Overlay>
}


export default PokemonModal
