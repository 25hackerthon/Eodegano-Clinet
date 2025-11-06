import { useState, useEffect } from 'react'

interface PopularTime {
  hour: number
  percentage: number
  title: string
  time: string
}

interface DayData {
  day: number | string
  day_text?: string
  popular_times?: PopularTime[]
  percentage?: number
  title?: string
  time?: number
}

interface CongestionData {
  name: string
  address: string
  rating: number
  popular_times: DayData[]
}

interface CongestionModalProps {
  isOpen: boolean
  onClose: () => void
  placeName: string
}

const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

const getCongestionColor = (percentage: number) => {
  if (percentage === 0) return 'bg-gray-200'
  if (percentage <= 25) return 'bg-green-400'
  if (percentage <= 50) return 'bg-yellow-400'
  if (percentage <= 75) return 'bg-orange-400'
  return 'bg-red-500'
}

const getCongestionText = (percentage: number) => {
  if (percentage === 0) return '운영 안함'
  if (percentage <= 25) return '한가함'
  if (percentage <= 50) return '보통'
  if (percentage <= 75) return '조금 붐빔'
  return '매우 붐빔'
}

export default function CongestionModal({ isOpen, onClose, placeName }: CongestionModalProps) {
  const [congestionData, setCongestionData] = useState<CongestionData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState(0)

  useEffect(() => {
    if (isOpen && placeName) {
      fetchCongestionData()
    }
  }, [isOpen, placeName])

  const fetchCongestionData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`http://192.168.15.169:8000/congestion?place=${encodeURIComponent(placeName)}`)
      
      if (response.ok) {
        const data = await response.json()
        setCongestionData(data)
        // 현재 요일로 초기 선택 설정 (0: 일요일, 1: 월요일, ...)
        const today = new Date().getDay()
        setSelectedDay(today)
      } else {
        setError('혼잡도 데이터를 불러올 수 없습니다.')
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const currentLiveData = congestionData?.popular_times.find(day => day.day === 'live')
  const weeklyData = congestionData?.popular_times.filter(day => day.day !== 'live') as DayData[]
  const selectedDayData = weeklyData?.[selectedDay]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{placeName} 혼잡도</h2>
              {congestionData && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>{congestionData.address}</p>
                  <p className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{congestionData.rating}</span>
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">혼잡도 데이터를 불러오는 중...</div>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-red-600">{error}</div>
            </div>
          )}

          {congestionData && (
            <div className="space-y-6">
              {/* 현재 실시간 혼잡도 */}
              {currentLiveData && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="text-lg font-semibold mb-3">현재 실시간 혼잡도</h3>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg ${getCongestionColor(currentLiveData.percentage || 0)}`}>
                      {currentLiveData.percentage}%
                    </div>
                    <div>
                      <div className="text-xl font-semibold">{getCongestionText(currentLiveData.percentage || 0)}</div>
                      <div className="text-sm text-gray-600">{currentLiveData.title}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 요일별 선택 탭 */}
              <div>
                <h3 className="text-lg font-semibold mb-3">요일별 혼잡도</h3>
                <div className="flex space-x-2 mb-4 overflow-x-auto">
                  {weeklyData?.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDay(index)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        selectedDay === index
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {dayNames[index]}
                    </button>
                  ))}
                </div>

                {/* 선택된 요일의 시간별 혼잡도 차트 */}
                {selectedDayData?.popular_times && (
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-4">{dayNames[selectedDay]} 시간별 혼잡도</h4>
                    
                    {/* 시간별 바 차트 */}
                    <div className="space-y-2">
                      {selectedDayData.popular_times.map((timeData, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-16 text-sm text-gray-600 text-right">
                            {timeData.time}
                          </div>
                          <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${getCongestionColor(timeData.percentage)}`}
                              style={{ width: `${timeData.percentage}%` }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
                              {timeData.percentage > 0 ? `${timeData.percentage}%` : ''}
                            </div>
                          </div>
                          <div className="w-20 text-sm text-gray-600">
                            {getCongestionText(timeData.percentage)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 범례 */}
                    <div className="mt-6 flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        <span>운영 안함</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-400 rounded"></div>
                        <span>한가함 (1-25%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                        <span>보통 (26-50%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-orange-400 rounded"></div>
                        <span>조금 붐빔 (51-75%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span>매우 붐빔 (76-100%)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}