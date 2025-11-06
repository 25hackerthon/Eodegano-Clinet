import { useState } from 'react'
import styled from '@emotion/styled'
import StepLayout from './StepLayout'

interface Step5TransportProps {
  onComplete: (transport: string) => void
  onPrevious: () => void
}

const transports = [
  { id: 'train', name: '기차', icon: '/src/assets/train.svg' },
  { id: 'car', name: '자동차', icon: '/src/assets/car.svg' },
]

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const TitleSection = styled.div`
  padding-top: 60px;
  margin-bottom: 40px;
`

const StepTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 36px;
  color: #000000;
  margin: 0;
  text-align: center;
`

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25%;
`

const TransportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 150px);
  gap: 30px;
  justify-content: center;
`

const TransportCard = styled.button<{ selected?: boolean }>`
  width: 150px;
  height: 150px;
  border: ${props => props.selected ? '2px solid #007bff' : '1px solid #e9ecef'};
  border-radius: 20px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

const TransportIcon = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`

const TransportName = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #000000;
  text-align: center;
`

export default function Step5Transport({ onComplete, onPrevious }: Step5TransportProps) {
  const [selectedTransport, setSelectedTransport] = useState<string>('')

  const handleComplete = () => {
    if (selectedTransport) {
      onComplete(selectedTransport)
    }
  }

  return (
    <StepLayout
      currentStep={6}
      totalSteps={6}
      onPrevious={onPrevious}
      onNext={handleComplete}
      nextDisabled={!selectedTransport}
      nextText="템플릿 생성"
    >
      <ContentContainer>
        <TitleSection>
          <StepTitle>무엇을 타고 떠나나요?</StepTitle>
        </TitleSection>
        
        <ContentSection>
          <TransportGrid>
            {transports.map((transport) => (
              <TransportCard
                key={transport.id}
                selected={selectedTransport === transport.id}
                onClick={() => setSelectedTransport(transport.id)}
              >
                <TransportIcon src={transport.icon} alt={transport.name} />
                <TransportName>{transport.name}</TransportName>
              </TransportCard>
            ))}
          </TransportGrid>
        </ContentSection>
      </ContentContainer>
    </StepLayout>
  )
}

