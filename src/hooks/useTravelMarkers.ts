import { useState } from 'react';
import { travelMarkers as initialMarkers, type TravelMarker } from '../data/travelMaker';

export const useTravelMarkers = () => {
  const [markers, setMarkers] = useState<TravelMarker[]>(initialMarkers);
  const [route, setRoute] = useState<number[]>([1, 2, 4, 3]); // 초기 추천 경로
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [updateCounter, setUpdateCounter] = useState(0); // 강제 리렌더링용

  const addMarker = (name: string, lat: number, lng: number, category: 1 | 2 | 3, day: number) => {
    console.log(`🔍 addMarker 호출됨:`, { name, lat, lng, category, day });
    console.log(`🔍 현재 마커 개수:`, markers.length);
    
    const newId = Math.max(...markers.map(m => m.id)) + 1;
    const newMarker: TravelMarker = {
      id: newId,
      name,
      lat,
      lng,
      category,
      day
    };
    
    console.log(`🔍 새 마커 생성:`, newMarker);
    
    setMarkers(prev => {
      console.log(`🔍 이전 마커들:`, prev.length, prev.map(m => m.name));
      const newMarkers = [...prev, newMarker];
      console.log(`🔍 새 마커들:`, newMarkers.length, newMarkers.map(m => m.name));
      console.log(`🔍 새 마커 배열 참조:`, newMarkers);
      return newMarkers;
    });
    
    // 새 마커를 경로 끝에 추가
    setRoute(prev => [...prev, newId]);
    
    // 강제 리렌더링 트리거
    setUpdateCounter(prev => prev + 1);
    
    console.log(`✅ 새 여행지 추가: ${name} (${lat}, ${lng})`);
    return newMarker;
  };

  const removeMarker = (id: number) => {
    const markerToRemove = markers.find(m => m.id === id);
    if (markerToRemove) {
      setMarkers(prev => prev.filter(m => m.id !== id));
      // 경로에서도 제거
      setRoute(prev => prev.filter(markerId => markerId !== id));
      console.log(`🗑️ 여행지 삭제: ${markerToRemove.name}`);
    }
  };

  const reorderRoute = (newRoute: number[]) => {
    setRoute(newRoute);
    console.log(`🔄 경로 순서 변경:`, newRoute);
  };

  const toggleAddingMode = () => {
    setIsAddingMode(prev => !prev);
  };

  return {
    markers,
    route,
    isAddingMode,
    addMarker,
    removeMarker,
    reorderRoute,
    toggleAddingMode,
    updateCounter // 리렌더링 감지용
  };
};