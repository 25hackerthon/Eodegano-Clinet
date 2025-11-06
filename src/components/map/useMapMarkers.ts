import { useRef, useEffect, useMemo } from 'react';
import type { TravelMarker } from '../../data/travelMaker';
import { createMarkerElement } from './MapMarker';

interface UseMapMarkersProps {
  map: any;
  markers: TravelMarker[];
  highlightCategory: 1 | 2 | 3 | null;
  onMarkerClick: (marker: TravelMarker) => void;
}

export function useMapMarkers({ map, markers, highlightCategory, onMarkerClick }: UseMapMarkersProps) {
  const markersRef = useRef<any[]>([]);
  
  // 마커 변경 감지를 위한 키 생성
  const markersKey = useMemo(() => 
    markers.map(m => `${m.id}-${m.lat}-${m.lng}`).join('|'), 
    [markers]
  );

  useEffect(() => {
    if (!map) return;

    // 기존 마커들 제거
    markersRef.current.forEach(marker => {
      if (marker.setMap) {
        marker.setMap(null);
      }
    });
    markersRef.current = [];

    // 새 마커들 생성
    markers.forEach((marker) => {
      const markerPosition = new window.kakao.maps.LatLng(marker.lat, marker.lng);
      
      const isHighlighted = highlightCategory === marker.category;
      const isDimmed = highlightCategory && highlightCategory !== marker.category;

      const markerElement = createMarkerElement(marker, isHighlighted, isDimmed, onMarkerClick);

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: markerElement,
        yAnchor: 1
      });
      
      customOverlay.setMap(map);
      markersRef.current.push(customOverlay);
    });

    // 첫 번째 마커로 지도 중심 이동
    if (markers.length > 0) {
      const firstMarker = markers[0];
      const center = new window.kakao.maps.LatLng(firstMarker.lat, firstMarker.lng);
      map.setCenter(center);
    }
  }, [map, markersKey, highlightCategory]);

  return { markersRef };
}