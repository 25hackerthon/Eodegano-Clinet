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

interface ApiPayload {
  region: string
  area: string
  startDate: string
  endDate: string
  person: number
  category: string
  ride: string
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

  // 데이터 변환 함수
  const transformToApiFormat = (data: FormData): ApiPayload => {
    // concept 매핑 (업데이트된 API 스펙)
    const conceptMap: { [key: string]: string } = {
      'healing': 'HEALING',
      'activity': 'ACTIVITY',
      'hotplace': 'HOTPLACE',
      'culture': 'CULTURE',
      'nature': 'NATURE',
      'food': 'FOOD',
      'resort': 'RESORT',
      'shopping': 'SHOPPING',
      'tourist': 'LANDMARK'  // TOURIST → LANDMARK로 변경
    }

    // region 매핑 (업데이트된 API 스펙)
    const regionMap: { [key: string]: string } = {
      'gangwon': 'GANGWON',
      'gyeonggi': 'GYEONGGI',
      'gyeongbuk': 'GYEONGSANG_N',  // GYEONGBUK → GYEONGSANG_N으로 변경
      'gyeongnam': 'GYEONGSANG_S',  // GYEONGNAM → GYEONGSANG_S로 변경
      'jeonbuk': 'JEOLLA_N',        // JEONBUK → JEOLLA_N으로 변경
      'jeonnam': 'JEOLLA_S',        // JEONNAM → JEOLLA_S로 변경
      'jeju': 'JEJU',
      'chungbuk': 'CHUNGCHEONG_N',  // CHUNGBUK → CHUNGCHEONG_N으로 변경
      'chungnam': 'CHUNGCHEONG_S'   // CHUNGNAM → CHUNGCHEONG_S로 변경
    }

    // transport 매핑 (변경 없음)
    const transportMap: { [key: string]: string } = {
      'train': 'TRAIN',
      'car': 'CAR'
    }

    return {
      region: regionMap[data.region] || data.region.toUpperCase(),
      area: data.DetailRegion,
      startDate: data.startDate,
      endDate: data.endDate,
      person: data.travelers,
      category: conceptMap[data.concept] || data.concept.toUpperCase(),
      ride: transportMap[data.transport] || data.transport.toUpperCase()
    }
  }

  // API 호출 함수
  const sendTripData = async (payload: ApiPayload) => {
    try {
      const response = await fetch('http://192.168.15.169:8080/trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const result = await response.json()
        console.log('API 응답:', result)
        alert('템플릿이 성공적으로 생성되었습니다!')
      } else {
        console.error('API 오류:', response.status, response.statusText)
        alert('템플릿 생성 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('네트워크 오류:', error)
      alert('네트워크 오류가 발생했습니다.')
    }
  }

  const handleStep6Complete = async (transport: string) => {
    const finalData = { ...formData, transport } as FormData
    console.log('Form completed:', finalData)
    
    // API 형식으로 변환
    const apiPayload = transformToApiFormat(finalData)
    console.log('API Payload:', apiPayload)
    
    // API 호출
    await sendTripData(apiPayload)
  }

  const handleStep6Previous = () => {
    setCurrentStep(5)
  }

  return (
    <main className="w-full">
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