import Image from 'next/image'
import logo from '../../public/logo.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as S from './navbar.styled'
import { urls } from '@/components/helpers'

export const Navbar = () => {
  const router = useRouter()

  return <S.NavbarContainer>
    <div>
      <Image src={logo} alt="logo"/>
    </div>
    <S.LinksBlock>
      <S.LinkBlock isActive={router.pathname === urls.home}>
        <Link href={urls.home}>
          Home
        </Link>
      </S.LinkBlock>
      <S.LinkBlock isActive={router.pathname === urls.pokedex}>
        <Link href={urls.pokedex}>
          Pokédex
        </Link>

      </S.LinkBlock>
      <S.LinkBlock isActive={router.pathname === urls.legendaries}>
        <Link href={urls.legendaries}>
          Legendaries
        </Link>

      </S.LinkBlock>
      <S.LinkBlock isActive={router.pathname === urls.documentation}>
        <Link href={urls.documentation}>
          Documentation
        </Link>
      </S.LinkBlock>
    </S.LinksBlock>
  </S.NavbarContainer>
}

