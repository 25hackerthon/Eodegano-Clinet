import { useState } from 'react'
import styled from '@emotion/styled'
import StepLayout from './StepLayout'

interface Step5DetailedRegionProps {
  onNext: (DetailRegion: string) => void
  onPrevious: () => void
}

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

const InputSection = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 30%;
`

const InputWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DetailRegionInput = styled.input`
  width: 400px;
  height: 80px;
  border: 2px solid #e9ecef;
  border-radius: 20px;
  padding: 0 30px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  color: #000000;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: #6c757d;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 4px 16px rgba(0, 123, 255, 0.15);
  }
`

export default function Step5DetailedRegion({ onNext, onPrevious }: Step5DetailedRegionProps) {
  const [DetailRegion, setDetailRegion] = useState<string>('')

  const handleNext = () => {
    if (DetailRegion.trim()) {
      onNext(DetailRegion)
    }
  }

  const isValid = DetailRegion.trim().length > 0

  return (
    <StepLayout
      currentStep={5}
      totalSteps={6}
      onPrevious={onPrevious}
      onNext={handleNext}
      nextDisabled={!isValid}
    >
      <ContentContainer>
        <TitleSection>
          <StepTitle>어느 지역을 여행하고 싶으신가요?</StepTitle>
        </TitleSection>
        
        <InputSection>
          <InputWrapper>
            <DetailRegionInput
              type="text"
              placeholder="상세 지역을 입력하세요"
              value={DetailRegion}
              onChange={(e) => setDetailRegion(e.target.value)}
            />
          </InputWrapper>
        </InputSection>
      </ContentContainer>
    </StepLayout>
  )
}

