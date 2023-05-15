import styled, {
  css
} from 'styled-components'
import Image from 'next/image'
import logo from '../../public/logo.svg'
import Link from 'next/link'
import {
  useRouter
} from 'next/router'

const urls = {
  home: '/pokemons-list',
  pokedex: '/pokedex',
  legendaries: '/legendaries',
  documentation: '/documentation'

}

export const Navbar = () => {
  const router = useRouter()

  return <NavbarContainer>
    <div>
      <Image src={logo} alt="logo"/>
    </div>
    <LinksBlock>
      <LinkBlock isActive={router.pathname === urls.home}>
        <Link href={urls.home}>
          Home
        </Link>
      </LinkBlock>
      <LinkBlock isActive={router.pathname === urls.pokedex}>
        <Link href={urls.pokedex}>
          Pokédex
        </Link>

      </LinkBlock>
      <LinkBlock isActive={router.pathname === urls.legendaries}>
        <Link href={urls.legendaries}>
          Legendaries
        </Link>

      </LinkBlock>
      <LinkBlock isActive={router.pathname === urls.documentation}>
        <Link href={urls.documentation}>
          Documentation
        </Link>
      </LinkBlock>
    </LinksBlock>
  </NavbarContainer>
}


const NavbarContainer = styled.div`
  height: 93px; 
  display: flex;
  align-items: center;
  background-color: #F5DB13;
  justify-self: flex-start;
  padding: 0 144px 0 161px;
  justify-content:  space-between;
  box-shadow: 0 4px 16px rgba(1, 28, 64, 0.2);
  position: sticky;
  top: 0;
`

const LinksBlock = styled.div`
  display: flex;
  gap: 58px;
  align-items: center;
`

const LinkBlock = styled.div<{isActive?: boolean}>`
  a {
    text-decoration: none;
    color: #212121;
  }
  height: 34px;
  font-size: 25px;
  border-bottom: 3px solid #212121;
  ${(props) => !props.isActive && css`
    border-bottom: 0;
    height: 37px;
  `}
`


