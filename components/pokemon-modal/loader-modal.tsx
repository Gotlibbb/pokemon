import * as S from '@/components/pokemon-modal/pokemon-modal.styled'
import Image from 'next/image'
import loader from '@/public/loader.svg'

export const LoaderModal = () => (
  <S.Overlay>
    <Image src={loader} alt={'loader'}/>
  </S.Overlay>
)
