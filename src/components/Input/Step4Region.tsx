import { useState } from 'react'
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
      <div className="flex flex-col h-full w-full">
        <div className="pt-16 mb-12">
          <h1 className="font-inter font-bold text-5xl text-black m-0 text-center">
            어느 지역을 여행하고 싶으신가요?
          </h1>
        </div>
        
        <div className="flex-1 flex items-start justify-center">
          <div className="grid grid-cols-3 gap-y-12 gap-x-12 justify-center">
            {regions.map((region) => (
              <button
                key={region.id}
                className={`w-44 h-44 rounded-3xl bg-white flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 p-6 shadow-md hover:border-blue-600 hover:-translate-y-0.5 hover:shadow-lg ${
                  selectedRegion === region.id 
                    ? 'border-2 border-blue-600' 
                    : 'border border-gray-200'
                }`}
                onClick={() => setSelectedRegion(region.id)}
              >
                <img 
                  src={region.icon} 
                  alt={region.name}
                  className="w-16 h-16 object-contain"
                />
                <span className="font-inter font-medium text-base text-black text-center">
                  {region.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </StepLayout>
  )
}

