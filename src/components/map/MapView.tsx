import { useEffect, useRef, useState, useCallback } from 'react';
import type { TravelMarker } from '../../data/travelMaker';
import MarkerInfoModal from '../MarkerInfoModal';
import CategoryFilter from './CategoryFilter';

import { useMapRoutes } from './useMapRoutes';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapViewProps {
  selectedDay: number;
  isAddingMode: boolean;
  markers: TravelMarker[];
  onRouteUpdate?: (distance: number, time: number, distances?: {[key: string]: number}, durations?: {[key: string]: number}) => void;
  onLocationSelect?: (coords: {lat: number, lng: number}) => void;
  onRemoveMarker?: (id: number) => void;
}

export default function MapView({ selectedDay, isAddingMode, markers, onRouteUpdate, onLocationSelect, onRemoveMarker }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  
  const [highlightCategory, setHighlightCategory] = useState<1 | 2 | 3 | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<TravelMarker | null>(null);
  
  const currentInfoWindowRef = useRef<any>(null);
  const isAddingModeRef = useRef(isAddingMode);
  const onLocationSelectRef = useRef(onLocationSelect);

  const dayMarkers = markers.filter(marker => marker.day === selectedDay);
  


  // 커스텀 훅 사용 (경로만)
  useMapRoutes({
    map: mapRef.current,
    markers: dayMarkers,
    onRouteUpdate
  });

  // 지도 상태 관리
  useEffect(() => {
    isAddingModeRef.current = isAddingMode;
    onLocationSelectRef.current = onLocationSelect;
    
    if (mapContainer.current && mapRef.current) {
      mapContainer.current.style.cursor = isAddingMode ? 'crosshair' : '';
      mapRef.current.setDraggable(!isAddingMode);
    }
  }, [isAddingMode, onLocationSelect]);

  // 지도 초기화 - 간단 버전
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapContainer.current && window.kakao && window.kakao.maps) {
        try {
          const map = new window.kakao.maps.Map(mapContainer.current, {
            center: new window.kakao.maps.LatLng(35.8345, 129.2248),
            level: 6
          });
          mapRef.current = map;
          console.log('✅ 지도 생성 성공');
          
          // 클릭 이벤트
          window.kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
            if (isAddingModeRef.current && onLocationSelectRef.current) {
              const latlng = mouseEvent.latLng;
              onLocationSelectRef.current({
                lat: latlng.getLat(),
                lng: latlng.getLng()
              });
            }
          });
          
          // 초기 마커 표시
          dayMarkers.forEach((marker) => {
            const markerPosition = new window.kakao.maps.LatLng(marker.lat, marker.lng);
            const kakaoMarker = new window.kakao.maps.Marker({
              position: markerPosition,
              title: marker.name
            });
            kakaoMarker.setMap(map);
            console.log('✅ 초기 마커 생성:', marker.name);
          });
        } catch (error) {
          console.error('❌ 지도 생성 실패:', error);
        }
      } else {
        console.log('❌ 조건 미충족 - 재시도');
        // 재귀 호출로 다시 시도
        setTimeout(() => {
          if (mapContainer.current && window.kakao && window.kakao.maps) {
            const map = new window.kakao.maps.Map(mapContainer.current, {
              center: new window.kakao.maps.LatLng(35.8345, 129.2248),
              level: 6
            });
            mapRef.current = map;
            console.log('✅ 지도 생성 성공 (재시도)');
            
            // 재시도 시에도 마커 표시
            dayMarkers.forEach((marker) => {
              const markerPosition = new window.kakao.maps.LatLng(marker.lat, marker.lng);
              const kakaoMarker = new window.kakao.maps.Marker({
                position: markerPosition,
                title: marker.name
              });
              kakaoMarker.setMap(map);
            });
          }
        }, 2000);
      }
    }, 2000); // 2초 대기

    return () => clearTimeout(timer);
  }, []);

  // 마커 관리
  const markersRef = useRef<any[]>([]);

  // 마커 업데이트
  useEffect(() => {
    if (!mapRef.current) return;

    console.log('🔄 마커 업데이트:', dayMarkers.length, '개');
    
    // 기존 마커들 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    // 새 마커들 생성
    dayMarkers.forEach((marker) => {
      const markerPosition = new window.kakao.maps.LatLng(marker.lat, marker.lng);
      const kakaoMarker = new window.kakao.maps.Marker({
        position: markerPosition,
        title: marker.name
      });
      kakaoMarker.setMap(mapRef.current);
      markersRef.current.push(kakaoMarker);
      console.log('✅ 마커 업데이트:', marker.name);
      
      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(kakaoMarker, 'click', () => {
        setSelectedMarker(marker);
      });
    });
  }, [dayMarkers, selectedDay]);

  const handleInfoWindowClose = () => {
    if (currentInfoWindowRef.current) {
      currentInfoWindowRef.current.close();
      currentInfoWindowRef.current = null;
    }
  };

  useEffect(() => {
    (window as any).removeMarkerFromMap = (id: number) => {
      if (onRemoveMarker) {
        onRemoveMarker(id);
      }
    };
    
    return () => {
      delete (window as any).removeMarkerFromMap;
    };
  }, [onRemoveMarker]);

  return (
    <div className="w-full h-full relative">
      <CategoryFilter 
        highlightCategory={highlightCategory}
        onCategoryChange={setHighlightCategory}
        onInfoWindowClose={handleInfoWindowClose}
      />

      <div 
        ref={mapContainer} 
        style={{
          width: '100%',
          height: '100%',
          minHeight: '500px',
          backgroundColor: '#f0f0f0',
          cursor: isAddingMode ? 'crosshair' : 'default'
        }}
      />

      {selectedMarker && (
        <MarkerInfoModal
          marker={selectedMarker}
          onClose={() => setSelectedMarker(null)}
        />
      )}
    </div>
  );
}