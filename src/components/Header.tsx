import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const Header = styled.header`
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #c2c2c2;
  height: 116px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 40px;
`

const LogoSection = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  cursor: pointer;
`

const LogoIcon = styled.div`
  width: 53px;
  height: 46px;
  background: linear-gradient(135deg, #8f79ff 0%, #6b5ce6 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '✈';
    font-size: 24px;
    color: white;
  }
`

const LogoText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 36px;
  color: #000000;
`



export default function HeaderComponent() {
  return (
    <Header>
      <HeaderContent>
        <LogoSection to="/">
          <LogoIcon />
          <LogoText>logo</LogoText>
        </LogoSection>
      </HeaderContent>
    </Header>
  )
}

