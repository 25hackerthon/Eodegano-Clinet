import { useState } from 'react'
import StepLayout from './StepLayout'

interface Step5TransportProps {
  onComplete: (transport: string) => void
  onPrevious: () => void
}

const transports = [
  { id: 'train', name: '기차', icon: '/src/assets/train.svg' },
  { id: 'car', name: '자동차', icon: '/src/assets/car.svg' },
]

export default function Step5Transport({ onComplete, onPrevious }: Step5TransportProps) {
  const [selectedTransport, setSelectedTransport] = useState<string>('')

  const handleComplete = () => {
    if (selectedTransport) {
      onComplete(selectedTransport)
    }
  }

  return (
    <StepLayout
      currentStep={6}
      totalSteps={6}
      onPrevious={onPrevious}
      onNext={handleComplete}
      nextDisabled={!selectedTransport}
      nextText="템플릿 생성"
    >
      <div className="flex flex-col h-full w-full">
        <div className="pt-16 mb-12">
          <h1 className="font-inter font-bold text-5xl text-black m-0 text-center">
            무엇을 타고 떠나나요?
          </h1>
        </div>
        
        <div className="flex-1 flex items-center justify-center mb-[20%]">
          <div className="grid grid-cols-2 gap-16 justify-center">
            {transports.map((transport) => (
              <button
                key={transport.id}
                className={`w-48 h-48 rounded-3xl bg-white flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200 p-8 shadow-md hover:border-blue-600 hover:-translate-y-0.5 hover:shadow-lg ${
                  selectedTransport === transport.id 
                    ? 'border-2 border-blue-600' 
                    : 'border border-gray-200'
                }`}
                onClick={() => setSelectedTransport(transport.id)}
              >
                <img 
                  src={transport.icon} 
                  alt={transport.name}
                  className="w-20 h-20 object-contain"
                />
                <span className="font-inter font-medium text-lg text-black text-center">
                  {transport.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </StepLayout>
  )
}

