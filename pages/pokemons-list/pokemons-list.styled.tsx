import styled from 'styled-components'


export const LoaderBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 80px;
  align-items: flex-start;
`


export const PokemonsListBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
  padding-bottom: 50px;
`

export const PokemonItem = styled.div`
  width: 248px;
  height: 63px;
  padding-left: 28px;
  display: flex;
  align-items: center;
  background-color: #F2F2F2;
  font-size: 24px;
  border-radius: 8px;
  cursor: pointer;
`

export const PokemonsListContainer = styled.div`
  padding-top: 73px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.div`
  font-style: normal;
  font-size: 35px;
  line-height: 41px;
  letter-spacing: 3px;
  .bold {
    font-weight: 600;
  }
  margin-bottom: 34px;
`
export const CustomInput = styled.input`
  box-shadow: 4px 4px 16px rgba(1, 28, 64, 0.2);
  background: #F2F2F2;
  width: 1088px;
  font-family: 'Source Sans Pro',sans-serif;
  font-size: 16px;
  padding: 16px 31px;
  border: none;
  border-radius: 40px;
  &:focus{
    outline: 2px solid #d9d9d9  ;
  }
  caret-color: #212121CC;
  color: #212121CC;
  margin-bottom: 63px;
`
