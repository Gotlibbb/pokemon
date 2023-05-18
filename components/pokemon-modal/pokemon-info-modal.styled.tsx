import styled, {
  css
} from 'styled-components'
import Image from 'next/image'

export const Cross = styled(Image)`
  cursor: pointer;
`

export const Overlay = styled.div`
  position: fixed;
  top:0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(33,33,33, .5);
`

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  align-items: flex-end;
`

export const ModalBlock = styled.div`
  display: flex;
  height: 371px;
  width: 796px;
  border-radius: 16px;
  background-color: white;
`

export const NotFoundBlock = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  
  img {
    z-index: 10;
    width: 100%;
    height: 100%;
    border-radius: 16px;
  }
  
  span {
    z-index: 20;
    position: absolute;
    font-size: 36px;
    font-weight: 600;
    left: 28%;
    top: 35%;
  }
`

const getCurrentColor = (types?: string[]) => {
  if (types?.includes('fire')) {
    return ['#B23327', '#D93E30']
  }
  if (types?.includes('grass')) {
    return ['#64D368', '#5abd5d']
  }
  if (types?.includes('water')) {
    return ['#5BC7FA', '#35BAFF']
  }
  return ['#ACA8A8', '#D8D8D8']
}

export const RightBlock = styled.div<{types: string[]}>`

  ${(props) => {
    const [firstColor, secondColor] = getCurrentColor(props.types)
    return css`
      background: linear-gradient(180deg, ${firstColor} 42.19%, ${secondColor} 100%);
    `
  }}
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding: 30px 20px 30px 12px;
  width: 436px;
  border-radius: 0 16px 16px 0;
`

export const TitleBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const Name = styled.div`
  font-size: 36px;
  color: #FDFDFD;
  text-shadow: 4px 4px 4px rgba(33, 33, 33, 0.1);
`

export const IdBlock = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`

export const Generation = styled.div`
  font-size: 24px;
  color: #FDFDFD;
  font-family: 'Source Sans Pro', sans-serif;
`

export const Id = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F2CB07;
  width: 41px;
  height: 41px;
  font-size: 16px;
  border-radius: 41px;
`

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`

export const BasicBlock = styled.div`
  padding: 20px;
  background-color: #FDFDFD;
  border-radius: 8px;
  letter-spacing: 1px;
  box-shadow: 4px 4px 4px rgba(33, 33, 33, 0.1);
`

export const AbilitiesBlock = styled(BasicBlock)`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  
  .values {
    display: flex;
    gap: 3px;
  }
`

export const MainSkillsBlock = styled(BasicBlock)`
  display: flex;
  gap: 28px;
  width: 397px;
  font-size: 16px;
`

export const ChargeBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  .bold {
    font-weight: 700;
  }
`

export const ChargeLine = styled.div<{isGreenLine?: boolean, count: number, maxCount: number }>`
  background-color: #F6F7F9;
  width: 170px;
  height: 6px;
  border-radius: 8px;
  position: relative;
  &::after {
    content: "";
    background-color: ${(props) =>
    (props.isGreenLine
      ? '#64D368'
      : '#F5DB13')
};
    position: absolute;
    height: 6px;
    border-radius: 8px;
    top: 0;
    left: 0;
    width: ${
  (props) => {
    const allWidth = 170

    if (props.count > props.maxCount) {
      return allWidth
    }
    return props.count / props.maxCount * allWidth
  }
}px;
  }
`

export const SkillsBlock = styled.div`
  display: flex;
  gap: 23px;
`

export const Skill = styled(BasicBlock)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  justify-content: center;
  width: 83px;
  padding-top: 8px;
  padding-bottom: 8px;
`

export const SkillName = styled.div`
  font-size: 7px;
  color: #4B4B4B;
`

export const SkillCount = styled.div`
  border: 3px solid #212121;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 36px;
  font-size: 16px;
  letter-spacing: 1px;
`

export const LeftBlock = styled.div<{types: string[]}>`
  
  ${(props) => {
    const [firstColor, secondColor] = getCurrentColor(props.types)
    return css`
      background: linear-gradient(270deg, ${firstColor} 0.15%, ${secondColor} 100%);
    `
  }}
  
  width: 365px;
  box-shadow: 4px 4px 8px rgba(1, 28, 64, 0.2);
  position: relative;
  height: 100%;
  border-radius: 16px 0 0 16px;
`

export const TypesBlock = styled.div`
  position: absolute;
  bottom: 17px;
  right: 14px;
  display: flex;
  justify-content: flex-end;
  gap: 11px;
  width: 111px;
  height: 14px;
`

export const TypeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 16px;
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.18);
  border-radius: 11px;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  background-color: #FDFDFD;
`
