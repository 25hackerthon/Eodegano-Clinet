import { useState } from "react";
import PlaceDetailModal from "../modal/PlaceDetailModal";

interface TemplateCardProps {
  title: string;
  subtitle: string;
  tags: string;
  image: string;
  description?: string;
  lat?: number;
  lng?: number;
  handleDel?: () => void;
  // 드래그 관련 props 추가
  index: number;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

export default function TemplateCard({
  title,
  subtitle,
  tags,
  image,
  description = "상세 설명이 없습니다.",
  lat,
  lng,
  handleDel,
  index,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isDragging,
}: TemplateCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const placeData = {
    title,
    subtitle,
    description,
    image,
    lat,
    lng,
  };

  return (
    <>
      <div
        draggable
        onDragStart={() => onDragStart(index)}
        onDragEnter={() => onDragEnter(index)}
        onDragEnd={onDragEnd}
        onDragOver={(e) => e.preventDefault()}
        className={`min-w-[320px] bg-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex-shrink-0 relative cursor-move ${
          isDragging ? "opacity-40 scale-95" : ""
        }`}
        style={{ userSelect: "none" }}
      >
        <button
          onClick={handleDel}
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 z-10"
        >
          ✕
        </button>

        <div className="p-6">
          <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{subtitle}</p>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">{tags}</p>
            <button
              onClick={() => setIsDetailOpen(true)}
              onMouseDown={(e) => e.stopPropagation()}
              className="text-gray-400 text-sm font-semibold hover:text-gray-600 whitespace-nowrap"
            >
              보러가기
            </button>
          </div>
        </div>

        <div className="relative h-56">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            draggable="false"
          />
        </div>
      </div>

      <PlaceDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        placeData={placeData}
      />
    </>
  );
}
