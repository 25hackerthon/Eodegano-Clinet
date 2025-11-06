import { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { TravelMarker } from '../data/travelMaker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MarkerInfoModalProps {
  marker: TravelMarker;
  onClose: () => void;
}

interface CongestionData {
  name: string;
  address: string;
  rating: number;
  popular_times: Array<{
    day: number | string;
    day_text?: string;
    popular_times?: Array<{
      hour: number;
      percentage: number;
      title: string;
      time: string;
    }>;
    percentage?: number;
    title?: string;
    time?: number;
  }>;
}

export default function MarkerInfoModal({ marker, onClose }: MarkerInfoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [congestionData, setCongestionData] = useState<CongestionData | null>(null);
  const [loading, setLoading] = useState(false);

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  // 혼잡도 데이터 가져오기
  useEffect(() => {
    const fetchCongestionData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://192.168.15.169:8000/congestion?place=${encodeURIComponent(marker.name)}`);
        if (response.ok) {
          const data = await response.json();
          setCongestionData(data);
        }
      } catch (error) {
        console.error('혼잡도 데이터 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCongestionData();
  }, [marker.name]);

  // 지역별/카테고리별 기본 혼잡도 패턴 생성
  const getDefaultCongestionPattern = () => {
    const keyHours = [6, 9, 12, 15, 18, 21];
    const labels = keyHours.map(hour => `${hour}시`);
    let data: number[] = [];
    let backgroundColor, borderColor, pointBackgroundColor;

    // 카테고리별 기본 패턴
    switch (marker.category) {
      case 1: // 음식점
        // 식사시간대에 높은 혼잡도
        data = [5, 25, 85, 45, 90, 70];
        backgroundColor = 'rgba(249, 115, 22, 0.1)';
        borderColor = 'rgba(249, 115, 22, 0.8)';
        pointBackgroundColor = 'rgba(249, 115, 22, 1)';
        break;
      case 2: // 관광지
        // 오후에 높은 혼잡도
        data = [10, 40, 70, 85, 75, 35];
        backgroundColor = 'rgba(99, 102, 241, 0.1)';
        borderColor = 'rgba(99, 102, 241, 0.8)';
        pointBackgroundColor = 'rgba(99, 102, 241, 1)';
        break;
      case 3: // 숙소
        // 체크인/체크아웃 시간대에 높은 혼잡도
        data = [15, 20, 30, 65, 80, 25];
        backgroundColor = 'rgba(34, 197, 94, 0.1)';
        borderColor = 'rgba(34, 197, 94, 0.8)';
        pointBackgroundColor = 'rgba(34, 197, 94, 1)';
        break;
      default:
        // 일반적인 패턴
        data = [20, 45, 60, 70, 65, 40];
        backgroundColor = 'rgba(156, 163, 175, 0.1)';
        borderColor = 'rgba(156, 163, 175, 0.8)';
        pointBackgroundColor = 'rgba(156, 163, 175, 1)';
    }

    // 지역명에 따른 추가 조정
    const placeName = marker.name.toLowerCase();
    if (placeName.includes('서울') || placeName.includes('강남') || placeName.includes('홍대')) {
      // 도심지역은 전체적으로 혼잡도 증가
      data = data.map(val => Math.min(100, val + 15));
    } else if (placeName.includes('제주') || placeName.includes('강원') || placeName.includes('경주')) {
      // 관광지역은 주말/휴일 패턴
      data = data.map(val => Math.min(100, val + 10));
    } else if (placeName.includes('부산') || placeName.includes('대구') || placeName.includes('광주')) {
      // 지방 대도시
      data = data.map(val => Math.min(100, val + 5));
    }

    return {
      labels,
      datasets: [
        {
          label: '예상 혼잡도',
          data,
          fill: true,
          backgroundColor,
          borderColor,
          borderWidth: 2,
          pointBackgroundColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          tension: 0.4,
        },
      ],
    };
  };

  // 실제 혼잡도 데이터로 차트 생성
  const getCrowdData = () => {
    // 로딩 중일 때는 로딩 상태 표시
    if (loading) {
      return {
        labels: ['로딩 중...'],
        datasets: [
          {
            label: '혼잡도',
            data: [0],
            fill: true,
            backgroundColor: 'rgba(156, 163, 175, 0.1)',
            borderColor: 'rgba(156, 163, 175, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(156, 163, 175, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            tension: 0.4,
          },
        ],
      };
    }

    // API 호출 완료 후 데이터 확인
    // 데이터가 없거나 빈 배열일 때만 기본 패턴 사용
    if (!congestionData || !congestionData.popular_times || congestionData.popular_times.length === 0) {
      return getDefaultCongestionPattern();
    }

    // 현재 요일 가져오기 (0: 일요일, 1: 월요일, ...)
    const today = new Date().getDay();
    const todayData = congestionData.popular_times.find(day => day.day === today);
    
    // 오늘 데이터가 없거나 popular_times가 빈 배열일 때만 기본 패턴 사용
    if (!todayData?.popular_times || todayData.popular_times.length === 0) {
      return getDefaultCongestionPattern();
    }

    // 주요 시간대만 추출 (6시간 간격)
    const keyHours = [6, 9, 12, 15, 18, 21];
    const labels = keyHours.map(hour => `${hour}시`);
    const data = keyHours.map(hour => {
      const timeData = todayData.popular_times?.find(t => t.hour === hour);
      return timeData?.percentage || 0;
    });

    // 혼잡도에 따른 색상 결정
    const maxPercentage = Math.max(...data);
    let backgroundColor, borderColor, pointBackgroundColor;
    
    if (maxPercentage <= 25) {
      backgroundColor = 'rgba(34, 197, 94, 0.1)';
      borderColor = 'rgba(34, 197, 94, 0.8)';
      pointBackgroundColor = 'rgba(34, 197, 94, 1)';
    } else if (maxPercentage <= 50) {
      backgroundColor = 'rgba(234, 179, 8, 0.1)';
      borderColor = 'rgba(234, 179, 8, 0.8)';
      pointBackgroundColor = 'rgba(234, 179, 8, 1)';
    } else if (maxPercentage <= 75) {
      backgroundColor = 'rgba(249, 115, 22, 0.1)';
      borderColor = 'rgba(249, 115, 22, 0.8)';
      pointBackgroundColor = 'rgba(249, 115, 22, 1)';
    } else {
      backgroundColor = 'rgba(239, 68, 68, 0.1)';
      borderColor = 'rgba(239, 68, 68, 0.8)';
      pointBackgroundColor = 'rgba(239, 68, 68, 1)';
    }

    return {
      labels,
      datasets: [
        {
          label: '혼잡도',
          data,
          fill: true,
          backgroundColor,
          borderColor,
          borderWidth: 2,
          pointBackgroundColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          tension: 0.4,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(99, 102, 241, 0.8)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return value + '%';
          },
        },
      },
    },
  };

  // 카테고리별 기본 이미지
  const getDefaultImage = (category: number) => {
    switch (category) {
      case 1: // 음식점
        return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop';
      case 2: // 관광지
        return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
      case 3: // 숙소
        return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
    }
  };

  // 카테고리별 설명
  const getDescription = (category: number, name: string) => {
    switch (category) {
      case 1: // 음식점
        return `${name}은(는) 현지의 맛있는 음식을 경험할 수 있는 인기 맛집입니다. 신선한 재료와 전통적인 조리법으로 만든 요리를 맛볼 수 있으며, 현지인들에게도 사랑받는 곳입니다. 특별한 메뉴와 분위기로 여행의 즐거움을 더해줍니다.`;
      case 2: // 관광지
        return `${name}은(는) 역사와 문화가 살아 숨쉬는 대표적인 관광명소입니다. 아름다운 경관과 함께 다양한 볼거리를 제공하며, 사진 촬영 명소로도 유명합니다. 현지의 역사와 문화를 깊이 있게 체험할 수 있는 특별한 장소입니다.`;
      case 3: // 숙소
        return `${name}은(는) 편안하고 안전한 휴식을 제공하는 숙박시설입니다. 깔끔한 시설과 친절한 서비스로 여행객들에게 인기가 높으며, 주변 관광지로의 접근성도 뛰어납니다. 편안한 잠자리와 함께 여행의 피로를 풀 수 있습니다.`;
      default:
        return `${name}은(는) 여행객들에게 특별한 경험을 제공하는 장소입니다.`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* 헤더 */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="h-64 bg-gray-200 rounded-t-lg overflow-hidden">
            <img
              src={getDefaultImage(marker.category)}
              alt={marker.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = getDefaultImage(marker.category);
              }}
            />
          </div>
          
          {/* 제목 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h2 className="text-2xl font-bold text-white mb-1">{marker.name}</h2>
            <p className="text-gray-200 text-sm">
              {marker.category === 1 ? '음식점' : marker.category === 2 ? '관광지' : '숙소'}
            </p>
          </div>
        </div>

        <div className="p-6">
          {/* 설명 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{marker.name}</h3>
            <p className="text-gray-600 leading-relaxed">
              {getDescription(marker.category, marker.name)}
            </p>
          </div>



          {/* 혼잡도 차트 */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-3">
              오늘의 혼잡도 {loading && <span className="text-sm text-gray-500">(로딩 중...)</span>}
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="h-48">
                <Line data={getCrowdData()} options={chartOptions} />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                <span>한적함</span>
                <span>보통</span>
                <span>혼잡함</span>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                {loading 
                  ? '데이터를 불러오는 중...'
                  : congestionData && congestionData.popular_times && congestionData.popular_times.length > 0 
                    ? `실시간 데이터 기반 • ${congestionData.name}`
                    : `예상 혼잡도 패턴 • ${marker.category === 1 ? '음식점' : marker.category === 2 ? '관광지' : '숙소'} 기준`
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}