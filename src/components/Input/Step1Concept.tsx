import { useState } from 'react'
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
      <div className="flex flex-col h-full w-full">
        <div className="pt-16 mb-12">
          <h1 className="font-inter font-bold text-5xl text-black m-0 text-center">
            이번 여행의 컨셉은 무엇인가요?
          </h1>
        </div>
        
        <div className="flex-1 flex items-start justify-center">
          <div className="grid grid-cols-3 gap-y-12 gap-x-10 justify-center">
            {concepts.map((concept) => (
              <button
                key={concept.id}
                className={`w-44 h-44 rounded-3xl bg-white flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 p-6 shadow-md hover:border-blue-600 hover:-translate-y-0.5 hover:shadow-lg ${
                  selectedConcept === concept.id 
                    ? 'border-2 border-blue-600' 
                    : 'border border-gray-200'
                }`}
                onClick={() => setSelectedConcept(concept.id)}
              >
                <img 
                  src={concept.icon} 
                  alt={concept.name}
                  className="w-16 h-16 object-contain"
                />
                <span className="font-inter font-medium text-base text-black text-center">
                  {concept.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </StepLayout>
  )
}
