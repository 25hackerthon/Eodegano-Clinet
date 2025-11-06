interface NavigationButtonsProps {
  onPrevious?: () => void;
  onStart?: () => void;
}

export default function NavigationButtons({
  onPrevious,
  onStart,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center mt-[5%] mb-8">
      <button
        onClick={onPrevious}
        className="px-8 py-3 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors"
      >
        이전
      </button>
      <button
        onClick={onStart}
        className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
      >
        시작
      </button>
    </div>
  );
}
