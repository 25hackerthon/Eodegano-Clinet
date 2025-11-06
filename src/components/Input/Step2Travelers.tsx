import { useState } from 'react'
import StepLayout from './StepLayout'

interface Step2TravelersProps {
  onNext: (travelers: number) => void
  onPrevious: () => void
}

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
      <div className="flex flex-col h-full w-full">
        <div className="pt-16 mb-12">
          <h1 className="font-inter font-bold text-5xl text-black m-0 text-center">
            몇명이서 여행을 떠나요?
          </h1>
        </div>
        
        <div className="flex-1 flex items-start justify-center pt-[25%]">
          <div className="w-full max-w-2xl flex justify-center items-center">
            <input
              type="number"
              placeholder="여행자 수를 입력하세요"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              min="1"
              className="w-[500px] h-24 border-2 border-gray-200 rounded-3xl px-10 font-inter font-medium text-3xl text-center text-black bg-white shadow-md placeholder:text-gray-500 focus:outline-none focus:border-blue-600 focus:shadow-lg"
            />
          </div>
        </div>
      </div>
    </StepLayout>
  )
}

