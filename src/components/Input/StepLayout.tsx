import styled from '@emotion/styled'
import { ReactNode } from 'react'

interface StepLayoutProps {
  children: ReactNode
  currentStep: number
  totalSteps: number
  onPrevious?: () => void
  onNext?: () => void
  nextDisabled?: boolean
  nextText?: string
  previousText?: string
}

const LayoutContainer = styled.div`
  height: calc(100vh - 116px);
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
`

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  height: 100%;
`

const FixedFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f8f9fa;
  padding: 30px 20px;
  z-index: 100;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

const StepCounter = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #6c757d;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 10px;
  width: 15%;
  font-family: pretendard, sans-serif;
  font-size: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 80px;
  background: ${props => props.variant === 'primary' ? '#007bff' : '#cacaca'};
  color: #ffffff;

  &:hover:not(:disabled) {
    background: ${props => props.variant === 'primary' ? '#0056b3' : '#a0a0a0'};
  }

  &:disabled {
    background: #cacaca;
    color: #6c757d;
    cursor: not-allowed;
  }
`

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 116px - 120px); 
`

export default function StepLayout({
  children,
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  nextDisabled = false,
  nextText = '다음',
  previousText = '이전'
}: StepLayoutProps) {
  return (
    <LayoutContainer>
      <ContentWrapper>
        <ContentArea>
          {children}
        </ContentArea>
      </ContentWrapper>
      
      <FixedFooter>
        <FooterContent>
          <Button 
            variant="secondary" 
            onClick={onPrevious}
            disabled={!onPrevious}
          >
            {previousText}
          </Button>
          
          <StepCounter>{currentStep}/{totalSteps}</StepCounter>
          
          <Button 
            variant="primary" 
            onClick={onNext}
            disabled={nextDisabled || !onNext}
          >
            {nextText}
          </Button>
        </FooterContent>
      </FixedFooter>
    </LayoutContainer>
  )
}