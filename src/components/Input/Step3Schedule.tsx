import { useState } from 'react'
import styled from '@emotion/styled'
import StepLayout from './StepLayout'

interface Step3ScheduleProps {
  onNext: (startDate: string, endDate: string) => void
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

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 60px;
`

const DateInputs = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const DateInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const DateLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #000000;
  text-align: center;
`

const DateInputWrapper = styled.div`
  width: 100%;
  height: 70px;
  border: 2px solid #e9ecef;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:focus-within {
    border-color: #007bff;
    box-shadow: 0 4px 16px rgba(0, 123, 255, 0.15);
  }
`

const DateInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: #000000;
  text-align: center;

  &::placeholder {
    color: #6c757d;
  }

  &::-webkit-datetime-edit {
    text-align: center;
  }

  &::-webkit-datetime-edit-fields-wrapper {
    text-align: center;
  }
`

export default function Step3Schedule({ onNext, onPrevious }: Step3ScheduleProps) {
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const handleNext = () => {
    if (startDate && endDate) {
      onNext(startDate, endDate)
    }
  }

  const isValid = startDate && endDate

  return (
    <StepLayout
      currentStep={3}
      totalSteps={6}
      onPrevious={onPrevious}
      onNext={handleNext}
      nextDisabled={!isValid}
    >
      <ContentContainer>
        <TitleSection>
          <StepTitle>여행 일정이 어떻게 되나요?</StepTitle>
        </TitleSection>
        
        <ContentSection>
          <DateInputs>
            <DateInputGroup>
              <DateLabel>시작 날짜</DateLabel>
              <DateInputWrapper>
                <DateInput
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </DateInputWrapper>
            </DateInputGroup>
            
            <DateInputGroup>
              <DateLabel>종료 날짜</DateLabel>
              <DateInputWrapper>
                <DateInput
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                />
              </DateInputWrapper>
            </DateInputGroup>
          </DateInputs>
        </ContentSection>
      </ContentContainer>
    </StepLayout>
  )
}

