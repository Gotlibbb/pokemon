import { FC } from 'react'
import * as S from '@/components/pokemon-modal/pokemon-info-modal.styled'

export const SkillComponent:FC<{skillName: string, skillValue?: string}> = ({
  skillValue, skillName
}) =>
  (
    <S.Skill>
      <S.SkillCount>
        {skillValue}
      </S.SkillCount>
      <S.SkillName>
        {skillName}
      </S.SkillName>
    </S.Skill>
  )
