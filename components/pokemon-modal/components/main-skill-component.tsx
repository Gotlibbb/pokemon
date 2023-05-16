import React, {
  FC
} from 'react'
import * as S from '@/components/pokemon-modal/pokemon-modal.styled'

export const MainSkillComponent:FC<{skillName: string, skillValue?: string, isGreenLine?: boolean}> = ({
  isGreenLine, skillValue, skillName
}) =>
  (
    <S.ChargeBlock>
      <div>{skillName}</div>
      <div className="bold">{skillValue}</div>
      <S.ChargeLine isGreenLine={isGreenLine} count={Number(skillValue)} maxCount={100}/>
    </S.ChargeBlock>
  )
