import { FC } from 'react'
import * as S from '@/components/pokemon-modal/pokemon-info-modal.styled'
import cross from '@/public/cross.svg'
import Image from 'next/image'
import notFound from '@/public/404.png'

export const NotFoundModal:FC<{handleClose: () => void}> = ({
  handleClose
}) => (
  <S.Overlay>
    <S.ModalContainer>
      <S.Cross src={cross} alt={'cross'} onClick={handleClose}/>
      <S.ModalBlock>
        <S.NotFoundBlock>
          <Image width={590} src={notFound} alt={'404'}/>
          <span>404</span>
        </S.NotFoundBlock>
      </S.ModalBlock>
    </S.ModalContainer>
  </S.Overlay>
)
