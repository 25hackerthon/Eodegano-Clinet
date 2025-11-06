import { useRef, useState } from "react";
import TemplateCard from "./TemplateCard";
import AddTemplateCard from "./AddTemplateCard";

interface Template {
  id: number;
  title: string;
  subtitle: string;
  tags: string;
  image: string;
}

interface TemplateCarouselProps {
  templates: Template[];
  onAdd?: () => void;
  handleDel: (id: number) => void;
  onPlaceClick?: (place: Template) => void;
}

export default function TemplateCarousel({
  templates,
  onAdd,
  handleDel,
  onPlaceClick,
}: TemplateCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const toggleCardSelection = (id: number) => {
    setSelectedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <>
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="flex h-70 gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.title}
            subtitle={template.subtitle}
            tags={template.tags}
            image={template.image}
            lat={template.lat}
            lng={template.lng}
            handleDel={() => handleDel(template.id)}
            isSelected={selectedCards.has(template.id)}
            onSelect={() => toggleCardSelection(template.id)}
            onViewDetails={() => onPlaceClick?.(template)}
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
