import { useState } from 'react'
import styled from '@emotion/styled'
import StepLayout from './StepLayout'

interface Step2TravelersProps {
  onNext: (travelers: number) => void
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

const TravelersInput = styled.input`
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

export default function Step2Travelers({ onNext, onPrevious }: Step2TravelersProps) {
  const [travelers, setTravelers] = useState<string>('')

  const handleNext = () => {
    const num = parseInt(travelers)
    if (num > 0) {
      onNext(num)
    }
  }

  const isValid = travelers && parseInt(travelers) > 0

  return (
    <StepLayout
      currentStep={2}
      totalSteps={6}
      onPrevious={onPrevious}
      onNext={handleNext}
      nextDisabled={!isValid}
    >
      <ContentContainer>
        <TitleSection>
          <StepTitle>몇명이서 여행을 떠나요?</StepTitle>
        </TitleSection>
        
        <InputSection>
          <InputWrapper>
            <TravelersInput
              type="number"
              placeholder="여행자 수를 입력하세요"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              min="1"
            />
          </InputWrapper>
        </InputSection>
      </ContentContainer>
    </StepLayout>
  )
}

