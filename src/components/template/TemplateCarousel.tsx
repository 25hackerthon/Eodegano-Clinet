import { useRef, useState } from "react";
import TemplateCard from "./TemplateCard";
import AddTemplateCard from "./AddTemplateCard";

interface Template {
  id: number;
  title: string;
  subtitle: string;
  tags: string;
  image: string;
  lat?: number;
  lng?: number;
  description?: string;
  type?: "음식점" | "관광지" | "숙소";
}

interface TemplateCarouselProps {
  templates: Template[];
  onAdd?: () => void;
  handleDel: (id: number) => void;
  onPlaceClick?: (place: Template) => void;
  onReorder?: (newTemplates: Template[]) => void;
}

export default function TemplateCarousel({
  templates,
  onAdd,
  handleDel,
  onPlaceClick,
  onReorder,
}: TemplateCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const newTemplates = [...templates];
    const draggedItem = newTemplates[draggedIndex];

    // 드래그한 아이템을 제거하고 새 위치에 삽입
    newTemplates.splice(draggedIndex, 1);
    newTemplates.splice(index, 0, draggedItem);

    // 부모 컴포넌트에 새로운 순서 전달
    if (onReorder) {
      onReorder(newTemplates);
    }

    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <>
      <div
        ref={scrollRef}
        className="flex h-70 gap-6 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {templates.map((template, index) => (
          <TemplateCard
            key={template.id}
            title={template.title}
            subtitle={template.subtitle}
            tags={template.tags}
            image={template.image}
            lat={template.lat}
            lng={template.lng}
            description={template.description}
            handleDel={() => handleDel(template.id)}
            index={index}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
            isDragging={draggedIndex === index}
          />
        ))}
        <AddTemplateCard onAdd={onAdd} />
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
