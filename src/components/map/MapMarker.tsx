import food from '../../assets/food.svg';
import building from '../../assets/building.svg';
import bed from '../../assets/bed.svg';
import type { TravelMarker } from '../../data/travelMaker';

interface MapMarkerProps {
  marker: TravelMarker;
  isHighlighted: boolean;
  isDimmed: boolean;
  onClick: (marker: TravelMarker) => void;
}

export function createMarkerElement(marker: TravelMarker, isHighlighted: boolean, isDimmed: boolean, onClick: (marker: TravelMarker) => void): HTMLDivElement {
  const getCategoryIcon = (category: number) => {
    switch (category) {
      case 1: return food;
      case 2: return building;
      case 3: return bed;
      default: return food;
    }
  };

  const markerElement = document.createElement('div');
  markerElement.style.cssText = `
    position: relative;
    width: ${isHighlighted ? '48px' : '40px'};
    height: ${isHighlighted ? '48px' : '40px'};
    background: ${isHighlighted ? '#3b82f6' : isDimmed ? '#9ca3af' : '#ef4444'};
    border: 3px solid white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: ${isDimmed ? '0.5' : '1'};
    transform: ${isHighlighted ? 'scale(1.1)' : 'scale(1)'};
  `;

  const iconImg = document.createElement('img');
  iconImg.src = getCategoryIcon(marker.category);
  iconImg.style.cssText = `
    width: ${isHighlighted ? '24px' : '20px'};
    height: ${isHighlighted ? '24px' : '20px'};
    filter: brightness(0) invert(1);
  `;
  markerElement.appendChild(iconImg);

  const arrowElement = document.createElement('div');
  arrowElement.style.cssText = `
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid ${isHighlighted ? '#3b82f6' : isDimmed ? '#9ca3af' : '#ef4444'};
  `;
  markerElement.appendChild(arrowElement);

  markerElement.addEventListener('click', (e) => {
    e.stopPropagation();
    onClick(marker);
  });

  return markerElement;
}