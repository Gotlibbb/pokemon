import React, { FC, ReactNode } from 'react'
import { Navbar } from '@/components/navbar'
import styled from 'styled-components'

type MainContainerPropsType = {
    children: ReactNode
}


const MainContainer: FC<MainContainerPropsType> = ({
  children
}) =>
  <MainContainerStyled>
    <Navbar/>
    {children}
  </MainContainerStyled>


const MainContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

export default MainContainer
