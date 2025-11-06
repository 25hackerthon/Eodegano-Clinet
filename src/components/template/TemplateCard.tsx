import { useState } from "react";
import PlaceDetailModal from "../modal/PlaceDetailModal";

interface TemplateCardProps {
  title: string;
  subtitle: string;
  tags: string;
  image: string;
  description?: string;
  // mapUrl?: string;
  lat?: number;
  lng?: number;
  handleDel?: () => void;
}

export default function TemplateCard({
  title,
  subtitle,
  tags,
  image,
  description = "상세 설명이 없습니다.",
  // mapUrl,
  lat,
  lng,
  handleDel,
}: TemplateCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const placeData = {
    title,
    subtitle,
    description,
    image,
    lat,
    lng,
    // mapUrl,
  };

  return (
    <>
      <div
        className="min-w-[320px] bg-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex-shrink-0 relative"
        style={{ userSelect: "none" }}
      >
        <button
          onClick={handleDel}
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
