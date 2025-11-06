import { useState } from 'react'
import styled from '@emotion/styled'
import StepLayout from './StepLayout'

interface Step1ConceptProps {
  onNext: (selectedConcept: string) => void
}

const concepts = [
  { id: 'healing', name: '힐링', icon: '/src/assets/icon1.svg' },
  { id: 'activity', name: '엑티비티', icon: '/src/assets/icon2.svg' },
  { id: 'hotplace', name: '핫플레이스', icon: '/src/assets/icon3.svg' },
  { id: 'culture', name: '문화 · 예술', icon: '/src/assets/icon4.svg' },
  { id: 'nature', name: '조용한 자연', icon: '/src/assets/icon5.svg' },
  { id: 'food', name: '맛집 탐방', icon: '/src/assets/icon6.svg' },
  { id: 'resort', name: '휴양지', icon: '/src/assets/icon7.svg' },
  { id: 'shopping', name: '쇼핑', icon: '/src/assets/icon8.svg' },
  { id: 'tourist', name: '유명관광지', icon: '/src/assets/icon9.svg' },
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
  align-items: flex-start;
  justify-content: center;
`

const ConceptGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 150px);
  gap: 30px 20px;
  justify-content: center;
`

const ConceptCard = styled.button<{ selected?: boolean }>`
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

const ConceptIcon = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`

const ConceptName = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #000000;
  text-align: center;
`

export default function Step1Concept({ onNext }: Step1ConceptProps) {
  const [selectedConcept, setSelectedConcept] = useState<string>('')

  const handleNext = () => {
    if (selectedConcept) {
      onNext(selectedConcept)
    }
  }

  return (
    <StepLayout
      currentStep={1}
      totalSteps={6}
      onNext={handleNext}
      nextDisabled={!selectedConcept}
    >
      <ContentContainer>
        <TitleSection>
          <StepTitle>이번 여행의 컨셉은 무엇인가요?</StepTitle>
        </TitleSection>
        
        <ContentSection>
          <ConceptGrid>
            {concepts.map((concept) => (
              <ConceptCard
                key={concept.id}
                selected={selectedConcept === concept.id}
                onClick={() => setSelectedConcept(concept.id)}
              >
                <ConceptIcon src={concept.icon} alt={concept.name} />
                <ConceptName>{concept.name}</ConceptName>
              </ConceptCard>
            ))}
          </ConceptGrid>
        </ContentSection>
      </ContentContainer>
    </StepLayout>
  )
}
