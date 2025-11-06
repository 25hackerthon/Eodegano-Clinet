import food from '../../assets/food.svg';
import building from '../../assets/building.svg';
import bed from '../../assets/bed.svg';

interface CategoryFilterProps {
  highlightCategory: 1 | 2 | 3 | null;
  onCategoryChange: (category: 1 | 2 | 3 | null) => void;
  onInfoWindowClose: () => void;
}

export default function CategoryFilter({ highlightCategory, onCategoryChange, onInfoWindowClose }: CategoryFilterProps) {
  const handleCategoryClick = (category: 1 | 2 | 3) => {
    onInfoWindowClose();
    onCategoryChange(highlightCategory === category ? null : category);
  };

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
      <button
        onClick={() => handleCategoryClick(1)}
        className={`px-4 py-2 rounded-full border-2 bg-white shadow-lg transition-all duration-200 flex items-center gap-2 ${
          highlightCategory === 1 
            ? 'border-blue-500 bg-blue-50 text-blue-700' 
            : 'border-gray-300 text-gray-700 hover:border-gray-400'
        }`}
      >
        <img src={food} alt="음식점" className="w-5 h-5" />
        <span className="font-medium">음식점</span>
      </button>
      
      <button
        onClick={() => handleCategoryClick(2)}
        className={`px-4 py-2 rounded-full border-2 bg-white shadow-lg transition-all duration-200 flex items-center gap-2 ${
          highlightCategory === 2 
            ? 'border-blue-500 bg-blue-50 text-blue-700' 
            : 'border-gray-300 text-gray-700 hover:border-gray-400'
        }`}
      >
        <img src={building} alt="관광지" className="w-5 h-5" />
        <span className="font-medium">관광지</span>
      </button>
      
      <button
        onClick={() => handleCategoryClick(3)}
        className={`px-4 py-2 rounded-full border-2 bg-white shadow-lg transition-all duration-200 flex items-center gap-2 ${
          highlightCategory === 3 
            ? 'border-blue-500 bg-blue-50 text-blue-700' 
            : 'border-gray-300 text-gray-700 hover:border-gray-400'
        }`}
      >
        <img src={bed} alt="숙소" className="w-5 h-5" />
        <span className="font-medium">숙소</span>
      </button>
    </div>
  );
}