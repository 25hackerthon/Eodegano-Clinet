import { useState } from 'react'
import StepLayout from './StepLayout'

interface Step3ScheduleProps {
  onNext: (startDate: string, endDate: string) => void
  onPrevious: () => void
}

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
      <div className="flex flex-col h-full w-full">
        <div className="pt-16 mb-12">
          <h1 className="font-inter font-bold text-5xl text-black m-0 text-center">
            여행 일정이 어떻게 되나요?
          </h1>
        </div>
        
        <div className="flex-1 flex items-start justify-center pt-12">
          <div className="w-full max-w-2xl flex flex-col gap-16">
            <div className="flex flex-col gap-6">
              <label className="font-inter font-semibold text-2xl text-black text-center">
                시작 날짜
              </label>
              <div className="w-full h-20 border-2 border-gray-200 rounded-3xl flex items-center px-8 bg-white shadow-md focus-within:border-blue-600 focus-within:shadow-lg">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1 border-none outline-none font-inter font-medium text-xl text-black text-center placeholder:text-gray-500"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <label className="font-inter font-semibold text-2xl text-black text-center">
                종료 날짜
              </label>
              <div className="w-full h-20 border-2 border-gray-200 rounded-3xl flex items-center px-8 bg-white shadow-md focus-within:border-blue-600 focus-within:shadow-lg">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="flex-1 border-none outline-none font-inter font-medium text-xl text-black text-center placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </StepLayout>
  )
}

