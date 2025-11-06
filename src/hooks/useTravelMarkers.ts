import { useState, useEffect } from 'react';
import { travelMarkers as initialMarkers, type TravelMarker } from '../data/travelMaker';
import { fetchPlaces, convertPlaceToMarker, createPlace, deletePlace } from '../api/placeApi';
import type { CreatePlaceRequest } from '../api/placeApi';

export const useTravelMarkers = () => {
  const [markers, setMarkers] = useState<TravelMarker[]>(initialMarkers);
  const [route, setRoute] = useState<number[]>([1, 2, 4, 3]); // 초기 추천 경로
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [updateCounter, setUpdateCounter] = useState(0); // 강제 리렌더링용
  const [apiLoading, setApiLoading] = useState(false);

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

  // API에서 장소 삭제
  const removePlaceFromAPI = async (id: number) => {
    try {
      await deletePlace(id);
      
      // 로컬 상태에서도 제거
      const markerToRemove = markers.find(m => m.id === id);
      if (markerToRemove) {
        setMarkers(prev => prev.filter(m => m.id !== id));
        setRoute(prev => prev.filter(markerId => markerId !== id));
        setUpdateCounter(prev => prev + 1);
        console.log(`🗑️ API에서 장소 삭제: ${markerToRemove.name}`);
      }
    } catch (error) {
      console.error('API 장소 삭제 실패:', error);
      throw error;
    }
  };

  const reorderRoute = (newRoute: number[]) => {
    setRoute(newRoute);
    console.log(`🔄 경로 순서 변경:`, newRoute);
  };

  const toggleAddingMode = () => {
    setIsAddingMode(prev => !prev);
  };

  // API에서 장소 데이터 가져오기
  const loadPlacesFromAPI = async () => {
    setApiLoading(true);
    try {
      const places = await fetchPlaces();
      const apiMarkers = places
        .map(convertPlaceToMarker)
        .filter((marker): marker is TravelMarker => marker !== null);
      
      // API 마커를 기존 TravelMarker 형식으로 변환
      const convertedApiMarkers = apiMarkers.map(apiMarker => ({
        id: apiMarker.id,
        name: apiMarker.name,
        lat: apiMarker.latitude,
        lng: apiMarker.longitude,
        category: apiMarker.category as 1 | 2 | 3,
        day: 1, // 기본값
        isApiMarker: true // API 마커임을 표시
      }));
      
      // 기존 정적 마커와 API 마커 합치기 (중복 제거)
      const combinedMarkers = [...initialMarkers];
      convertedApiMarkers.forEach(apiMarker => {
        const exists = combinedMarkers.some(marker => 
          marker.name === apiMarker.name && 
          Math.abs(marker.lat - apiMarker.lat) < 0.001 &&
          Math.abs(marker.lng - apiMarker.lng) < 0.001
        );
        if (!exists) {
          combinedMarkers.push(apiMarker);
        }
      });
      
      setMarkers(combinedMarkers);
      console.log(`📍 API에서 ${apiMarkers.length}개 장소 로드됨`);
    } catch (error) {
      console.error('API 장소 데이터 로딩 실패:', error);
      // 실패 시 기본 마커만 사용
      setMarkers(initialMarkers);
    } finally {
      setApiLoading(false);
    }
  };

  // 새 장소를 API에 추가
  const addPlaceToAPI = async (placeData: {
    name: string;
    category: string;
    address: string;
    latitude: number;
    longitude: number;
    description: string;
  }) => {
    try {
      const newPlace = await createPlace(placeData);
      const newMarker = convertPlaceToMarker(newPlace);
      
      if (newMarker) {
        const convertedMarker = {
          id: newMarker.id,
          name: newMarker.name,
          lat: newMarker.latitude,
          lng: newMarker.longitude,
          category: newMarker.category as 1 | 2 | 3,
          day: 1, // 기본값
          isApiMarker: true // API 마커임을 표시
        };
        
        setMarkers(prev => [...prev, convertedMarker]);
        setRoute(prev => [...prev, convertedMarker.id]);
        setUpdateCounter(prev => prev + 1);
        
        console.log(`✅ API에 새 장소 추가: ${newMarker.name}`);
        return convertedMarker;
      }
    } catch (error) {
      console.error('API 장소 추가 실패:', error);
      throw error;
    }
  };

  const refreshPlaces = () => {
    loadPlacesFromAPI();
  };

  // 컴포넌트 마운트 시 API 데이터 로드
  useEffect(() => {
    loadPlacesFromAPI();
  }, []);

  return {
    markers,
    route,
    isAddingMode,
    addMarker,
    removeMarker,
    reorderRoute,
    toggleAddingMode,
    updateCounter, // 리렌더링 감지용
    addPlaceToAPI,
    removePlaceFromAPI,
    refreshPlaces,
    apiLoading
  };
};