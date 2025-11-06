import type { ReactNode } from 'react'

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
    <div className="h-[calc(100vh-116px)] flex flex-col bg-gray-50">
      <div className="flex-1 flex flex-col h-[calc(100vh-116px-120px)]">
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 max-w-6xl mx-auto w-full text-center h-full">
          {children}
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-gray-50 py-8 px-5 z-[100]">
        <div className="max-w-5xl mx-auto flex justify-between items-center relative">
          <button 
            className={`px-6 py-3 rounded-lg w-[15%] font-pretendard text-xs border-none cursor-pointer transition-all duration-200 min-w-20 text-white ${
              !onPrevious 
                ? 'bg-gray-400 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
            onClick={onPrevious}
            disabled={!onPrevious}
          >
            {previousText}
          </button>
          
          <div className="font-inter font-medium text-base text-gray-500 absolute left-1/2 transform -translate-x-1/2">
            {currentStep}/{totalSteps}
          </div>
          
          <button 
            className={`px-6 py-3 rounded-lg w-[15%] font-pretendard text-xs border-none cursor-pointer transition-all duration-200 min-w-20 text-white ${
              nextDisabled || !onNext
                ? 'bg-gray-400 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={onNext}
            disabled={nextDisabled || !onNext}
          >
            {nextText}
          </button>
        </div>
      </div>
    </div>
  )
}