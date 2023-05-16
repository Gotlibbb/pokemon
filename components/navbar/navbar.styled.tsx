import styled, {
  css
} from 'styled-components'

export const NavbarContainer = styled.div`
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

export const LinksBlock = styled.div`
  display: flex;
  gap: 58px;
  align-items: center;
`

export const LinkBlock = styled.div<{isActive?: boolean}>`
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


