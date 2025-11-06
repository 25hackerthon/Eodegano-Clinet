import { useState } from 'react'
import styled from '@emotion/styled'
import StepLayout from './StepLayout'

interface Step4RegionProps {
  onNext: (region: string) => void
  onPrevious: () => void
}

const regions = [
  { id: 'gangwon', name: '강원도', icon: '/src/assets/region1.svg' },
  { id: 'gyeonggi', name: '경기도', icon: '/src/assets/region2.svg' },
  { id: 'gyeongbuk', name: '경상북도', icon: '/src/assets/region3.svg' },
  { id: 'gyeongnam', name: '경상남도', icon: '/src/assets/region4.svg' },
  { id: 'jeonbuk', name: '전라북도', icon: '/src/assets/region5.svg' },
  { id: 'jeonnam', name: '전라남도', icon: '/src/assets/region6.svg' },
  { id: 'jeju', name: '제주도', icon: '/src/assets/region7.svg' },
  { id: 'chungbuk', name: '충청북도', icon: '/src/assets/region8.svg' },
  { id: 'chungnam', name: '충청남도', icon: '/src/assets/region9.svg' },
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

const RegionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 150px);
  gap: 30px 20px;
  justify-content: center;
`

const RegionCard = styled.button<{ selected?: boolean }>`
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

const RegionIcon = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`

const RegionName = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #000000;
  text-align: center;
`

export default function Step4Region({ onNext, onPrevious }: Step4RegionProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('')

  const handleNext = () => {
    if (selectedRegion) {
      onNext(selectedRegion)
    }
  }

  return (
    <StepLayout
      currentStep={4}
      totalSteps={6}
      onPrevious={onPrevious}
      onNext={handleNext}
      nextDisabled={!selectedRegion}
    >
      <ContentContainer>
        <TitleSection>
          <StepTitle>어느 지역을 여행하고 싶으신가요?</StepTitle>
        </TitleSection>
        
        <ContentSection>
          <RegionGrid>
            {regions.map((region) => (
              <RegionCard
                key={region.id}
                selected={selectedRegion === region.id}
                onClick={() => setSelectedRegion(region.id)}
              >
                <RegionIcon src={region.icon} alt={region.name} />
                <RegionName>{region.name}</RegionName>
              </RegionCard>
            ))}
          </RegionGrid>
        </ContentSection>
      </ContentContainer>
    </StepLayout>
  )
}

