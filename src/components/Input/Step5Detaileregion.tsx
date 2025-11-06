import { useState } from 'react'
import StepLayout from './StepLayout'

interface Step5DetailedRegionProps {
  onNext: (DetailRegion: string) => void
  onPrevious: () => void
}

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
      <div className="flex flex-col h-full w-full">
        <div className="pt-16 mb-12">
          <h1 className="font-inter font-bold text-5xl text-black m-0 text-center">
            어느 지역을 여행하고 싶으신가요?
          </h1>
        </div>
        
        <div className="flex-1 flex items-start justify-center pt-[25%]">
          <div className="w-full max-w-2xl flex justify-center items-center">
            <input
              type="text"
              placeholder="상세 지역을 입력하세요"
              value={DetailRegion}
              onChange={(e) => setDetailRegion(e.target.value)}
              className="w-[500px] h-24 border-2 border-gray-200 rounded-3xl px-10 font-inter font-medium text-3xl text-center text-black bg-white shadow-md placeholder:text-gray-500 focus:outline-none focus:border-blue-600 focus:shadow-lg"
            />
          </div>
        </div>
      </div>
    </StepLayout>
  )
}

