import { useEffect, useRef } from 'react';
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

export default function MarkerInfoModal({ marker, onClose }: MarkerInfoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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

  // 혼잡도 데이터 (시간대별)
  const crowdData = {
    labels: ['6시', '9시', '12시', '15시', '18시', '21시'],
    datasets: [
      {
        label: '혼잡도',
        data: [20, 45, 80, 90, 70, 30],
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderColor: 'rgba(99, 102, 241, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        tension: 0.4,
      },
    ],
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
          
          {/* 장소 이미지 */}
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
            <h4 className="text-md font-semibold text-gray-800 mb-3">혼잡도</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="h-48">
                <Line data={crowdData} options={chartOptions} />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                <span>한적함</span>
                <span>보통</span>
                <span>혼잡함</span>
              </div>
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-blue-800">운영시간</span>
              </div>
              <p className="text-blue-700">09:00 - 18:00</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="font-medium text-green-800">연락처</span>
              </div>
              <p className="text-green-700">02-1234-5678</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}