import { useState, useEffect } from 'react';

interface AddPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlace: (placeData: {
    name: string;
    category: string;
    address: string;
    latitude: number;
    longitude: number;
    description: string;
  }) => Promise<void>;
  selectedLocation?: { lat: number; lng: number } | null;
  onLocationSelect?: () => void;
}

export default function AddPlaceModal({ isOpen, onClose, onAddPlace, selectedLocation, onLocationSelect }: AddPlaceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'attraction',
    address: '',
    latitude: selectedLocation?.lat || 0,
    longitude: selectedLocation?.lng || 0,
    description: ''
  });
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);
  const [loading, setLoading] = useState(false);

  // selectedLocation이 변경될 때 formData 업데이트
  useEffect(() => {
    if (selectedLocation) {
      setFormData(prev => ({
        ...prev,
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng
      }));
    }
  }, [selectedLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.address || formData.latitude === 0 || formData.longitude === 0) {
      alert('모든 필수 항목을 입력해주세요. 위치는 지도에서 선택해주세요.');
      return;
    }

    setLoading(true);
    try {
      await onAddPlace(formData);
      // 성공 시 폼 초기화 및 모달 닫기
      setFormData({
        name: '',
        category: 'attraction',
        address: '',
        latitude: 0,
        longitude: 0,
        description: ''
      });
      setIsSelectingLocation(false);
      onClose();
      alert('새 장소가 추가되었습니다!');
    } catch (error) {
      alert('장소 추가에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) || 0 : value
    }));
  };

  const handleLocationSelect = () => {
    setIsSelectingLocation(true);
    if (onLocationSelect) {
      onLocationSelect();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">새 장소 추가</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              disabled={loading}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 장소명 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                장소명 *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="장소명을 입력하세요"
                required
                disabled={loading}
              />
            </div>

            {/* 카테고리 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                카테고리 *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              >
                <option value="restaurant">음식점</option>
                <option value="attraction">관광지</option>
                <option value="accommodation">숙소</option>
              </select>
            </div>

            {/* 주소 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주소 *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="주소를 입력하세요"
                required
                disabled={loading}
              />
            </div>

            {/* 위치 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                위치 선택 *
              </label>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleLocationSelect}
                  className={`w-full px-4 py-3 border-2 border-dashed rounded-lg transition-colors ${
                    formData.latitude !== 0 && formData.longitude !== 0
                      ? 'border-green-300 bg-green-50 text-green-700'
                      : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                  disabled={loading}
                >
                  {formData.latitude !== 0 && formData.longitude !== 0 ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>위치 선택됨: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>📍</span>
                      <span>지도에서 위치 선택하기</span>
                    </div>
                  )}
                </button>
                
                {/* 수동 입력 옵션 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      step="any"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="위도 (37.5665)"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      step="any"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="경도 (126.9780)"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 설명 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="장소에 대한 설명을 입력하세요"
                disabled={loading}
              />
            </div>

            {/* 버튼 */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                disabled={loading}
              >
                {loading ? '추가 중...' : '추가'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}