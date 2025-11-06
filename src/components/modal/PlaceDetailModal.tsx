import { useState, useEffect } from "react";

interface PlaceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeData: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    lat?: number;
    lng?: number;
  };
}

export default function PlaceDetailModal({
  isOpen,
  onClose,
  placeData,
}: PlaceDetailModalProps) {
  const [congestion, setCongestion] = useState<{
    level: string;
    percentage: number;
    color: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // API 연동 예정 - 혼잡도 데이터 가져오기
      fetchCongestionData();
    }
  }, [isOpen]);

  const fetchCongestionData = async () => {
    setLoading(true);
    try {
      // TODO: 실제 API 호출로 대체
      // const response = await fetch(`/api/congestion?lat=${placeData.lat}&lng=${placeData.lng}`);
      // const data = await response.json();

      // 임시 데이터 (API 연동 전)
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockData = {
        level: "보통",
        percentage: 65,
        color: "text-yellow-500",
      };

      setCongestion(mockData);
    } catch (error) {
      console.error("혼잡도 데이터 로딩 실패:", error);
      setCongestion({
        level: "정보 없음",
        percentage: 0,
        color: "text-gray-400",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getCongestionColor = (percentage: number) => {
    if (percentage < 30) return "bg-green-500";
    if (percentage < 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 이미지 섹션 */}
        <div className="relative h-64 w-full">
          <img
            src={placeData.image}
            alt={placeData.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* 장소 이름 */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {placeData.title}
          </h2>
          <p className="text-lg text-gray-600 mb-6">{placeData.subtitle}</p>

          {/* 소개 */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">소개</h3>
            <p className="text-gray-700 leading-relaxed">
              {placeData.description}
            </p>
          </div>

          {/* 혼잡도 */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              실시간 혼잡도
            </h3>
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">혼잡도 조회 중...</span>
              </div>
            ) : congestion ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-2xl font-bold ${congestion.color}`}>
                    {congestion.level}
                  </span>
                  <span className="text-lg font-semibold text-gray-700">
                    {congestion.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${getCongestionColor(
                      congestion.percentage
                    )} transition-all duration-500`}
                    style={{ width: `${congestion.percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  * 실시간 데이터 기반으로 업데이트됩니다
                </p>
              </div>
            ) : (
              <p className="text-gray-500">혼잡도 정보를 불러올 수 없습니다.</p>
            )}
          </div>

          {/* 지도 */}
          {placeData.lat && placeData.lng && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">위치</h3>
              <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden relative">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    placeData.lng - 0.01
                  },${placeData.lat - 0.01},${placeData.lng + 0.01},${
                    placeData.lat + 0.01
                  }&layer=mapnik&marker=${placeData.lat},${placeData.lng}`}
                  title="장소 지도"
                ></iframe>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-500">
                  좌표: {placeData.lat}, {placeData.lng}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${placeData.lat},${placeData.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-600 font-semibold"
                >
                  Google Maps에서 보기 →
                </a>
              </div>
            </div>
          )}

          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
