import { FC } from 'react'
import * as S from '@/components/pokemon-modal/pokemon-info-modal.styled'
import cross from '@/public/cross.svg'
import Image from 'next/image'
import { getStringWithFirstUpperLetter } from '@/components/helpers'
import { MainSkillComponent, SkillComponent } from '@/components/pokemon-modal/components'

type PokemonModalPropsType = {
    handleClose: () => void
    typeNames: string[]
    abilities: string[]
    imageUrl:string
    id?:string
    name?:string
    hp:string
    baseExperience?:string
    defense:string
    attack:string
    spDefense:string
    spAttack:string
}
export const PokemonInfoModal:FC<PokemonModalPropsType> = (props) => {
  const {
    name,
    spAttack,
    attack,
    defense,
    spDefense,
    imageUrl,
    typeNames,
    id,
    hp,
    baseExperience,
    handleClose,
    abilities
  } = props

  return (
    <S.Overlay>
      <S.ModalContainer>
        <S.Cross src={cross} alt={'cross'} onClick={handleClose} />
        <S.ModalBlock>
          <S.LeftBlock types={typeNames} >
            <Image src={imageUrl} alt={'pokemon-modal'} width={325} height={325} />
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
                <div className={'values'}>
                  {abilities?.map((ab) =>
                    <span key={ab}>
                      {ab}
                    </span>
                  )}
                </div>
              </S.AbilitiesBlock>
              <S.MainSkillsBlock>
                <MainSkillComponent skillName={'Healthy Points'} skillValue={hp} isGreenLine/>
                <MainSkillComponent skillName={'Experience'} skillValue={baseExperience} />
              </S.MainSkillsBlock>
              <S.SkillsBlock>
                <SkillComponent skillName={'Defense'} skillValue={defense}/>
                <SkillComponent skillName={'Attack'} skillValue={attack}/>
                <SkillComponent skillName={'Sp Attack'} skillValue={spAttack}/>
                <SkillComponent skillName={'Sp Defense'} skillValue={spDefense}/>
              </S.SkillsBlock>
            </S.InfoBlock>
          </S.RightBlock>
        </S.ModalBlock>
      </S.ModalContainer>
    </S.Overlay>
  )
}
