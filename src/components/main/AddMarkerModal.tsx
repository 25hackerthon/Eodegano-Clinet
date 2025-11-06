import { CATEGORIES } from '../../data/travelMaker';

interface AddMarkerModalProps {
  isOpen: boolean;
  markerName: string;
  selectedCategory: 1 | 2 | 3;
  selectedDay: number;
  maxDay: number;
  onMarkerNameChange: (name: string) => void;
  onCategoryChange: (category: 1 | 2 | 3) => void;
  onDayChange: (day: number) => void;
  onAdd: () => void;
  onCancel: () => void;
}

export default function AddMarkerModal({
  isOpen,
  markerName,
  selectedCategory,
  selectedDay,
  maxDay,
  onMarkerNameChange,
  onCategoryChange,
  onDayChange,
  onAdd,
  onCancel
}: AddMarkerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h3 className="font-bold text-lg mb-4">새 장소 추가</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">장소명</label>
          <input
            type="text"
            value={markerName}
            onChange={(e) => onMarkerNameChange(e.target.value)}
            placeholder="장소 이름을 입력하세요"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && onAdd()}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(CATEGORIES).map(([key, category]) => (
              <button
                key={key}
                onClick={() => onCategoryChange(Number(key) as 1 | 2 | 3)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  selectedCategory === Number(key)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-lg mb-1">{category.icon}</div>
                <div className="text-xs font-medium">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
          <div className="flex gap-2 justify-center">
            {Array.from({ length: Math.max(maxDay, 2) }, (_, i) => i + 1).map(day => (
              <button
                key={day}
                onClick={() => onDayChange(day)}
                className={`px-4 py-2 rounded-lg border-2 transition-colors w-full ${
                  selectedDay === day
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                Day {day}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onAdd}
            disabled={!markerName.trim()}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            추가
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}