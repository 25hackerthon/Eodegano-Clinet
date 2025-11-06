interface AddTemplateCardProps {
  onAdd?: () => void;
}

export default function AddTemplateCard({ onAdd }: AddTemplateCardProps) {
  return (
    <button
      onClick={onAdd}
      className="min-w-[320px] h-[363px] bg-white rounded-3xl border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all flex-shrink-0"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center text-3xl mx-auto mb-4">
          +
        </div>
        <p className="text-gray-500 font-semibold">새 템플릿 추가</p>
      </div>
    </button>
  );
}
