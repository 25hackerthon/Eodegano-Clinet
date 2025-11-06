import { useState } from 'react'
import Step1Concept from '../components/Input/Step1Concept'
import Step2Travelers from '../components/Input/Step2Travelers'
import Step3Schedule from '../components/Input/Step3Schedule'
import Step4Region from '../components/Input/Step4Region'
import Step5Detailedregion from '../components/Input/Step5Detaileregion'
import Step6Transport from '../components/Input/Step6Transport'

interface FormData {
  concept: string
  travelers: number
  startDate: string
  endDate: string
  region: string
  DetailRegion: string
  transport: string
}

function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<FormData>>({})

  const handleStep1Next = (concept: string) => {
    setFormData({ ...formData, concept })
    setCurrentStep(2)
  }

  const handleStep2Next = (travelers: number) => {
    setFormData({ ...formData, travelers })
    setCurrentStep(3)
  }

  const handleStep2Previous = () => {
    setCurrentStep(1)
  }

  const handleStep3Next = (startDate: string, endDate: string) => {
    setFormData({ ...formData, startDate, endDate })
    setCurrentStep(4)
  }

  const handleStep3Previous = () => {
    setCurrentStep(2)
  }

  const handleStep4Next = (region: string) => {
    setFormData({ ...formData, region })
    setCurrentStep(5)
  }

  const handleStep4Previous = () => {
    setCurrentStep(3)
  }   

  const handleStep5Next = (DetailRegion: string) => {
    setFormData({ ...formData, DetailRegion })
    setCurrentStep(6)
  }

  const handleStep5Previous = () => {
    setCurrentStep(4)
  }

  const handleStep6Complete = (transport: string) => {
    const finalData = { ...formData, transport } as FormData
    console.log('Form completed:', finalData)
    alert('템플릿이 생성되었습니다!')
  }

  const handleStep6Previous = () => {
    setCurrentStep(5)
  }

  return (
    <main className="main-content">
      {currentStep === 1 && <Step1Concept onNext={handleStep1Next} />}
      {currentStep === 2 && (
        <Step2Travelers 
          onNext={handleStep2Next} 
          onPrevious={handleStep2Previous}
        />
      )}
      {currentStep === 3 && (
        <Step3Schedule 
          onNext={handleStep3Next} 
          onPrevious={handleStep3Previous}
        />
      )}
      {currentStep === 4 && (
        <Step4Region 
          onNext={handleStep4Next} 
          onPrevious={handleStep4Previous}
        />
      )}
      {currentStep === 5 && (
        <Step5Detailedregion 
          onNext={handleStep5Next} 
          onPrevious={handleStep5Previous}
        />
      )}
      {currentStep === 6 && (
        <Step6Transport 
          onComplete={handleStep6Complete} 
          onPrevious={handleStep6Previous}
        />
      )}
    </main>
  )
}

export default CreatePage