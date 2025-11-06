import { useState, useEffect } from 'react';
import { useTravelMarkers } from '../hooks/useTravelMarkers';
import { useKakaoRoute } from '../hooks/useKakaoRoute';
import MapView from './map/MapView';
import TravelSidebar from './main/TravelSidebar';
import AddMarkerModal from './main/AddMarkerModal';
import AddPlaceModal from './AddPlaceModal';

export default function TravelPlanner() {
  const [totalTime, setTotalTime] = useState<number>(0);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [newMarkerName, setNewMarkerName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<1 | 2 | 3>(2);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [viewDay, setViewDay] = useState<number>(1);
  const [routeDistances, setRouteDistances] = useState<{[key: string]: number}>({});
  const [routeDurations, setRouteDurations] = useState<{[key: string]: number}>({});
  const [showNameInput, setShowNameInput] = useState(false);
  const [pendingCoords, setPendingCoords] = useState<{lat: number, lng: number} | null>(null);
  const [showAddPlaceModal, setShowAddPlaceModal] = useState(false);
  const [isSelectingLocationForAPI, setIsSelectingLocationForAPI] = useState(false);
  const [selectedLocationForAPI, setSelectedLocationForAPI] = useState<{lat: number, lng: number} | null>(null);
  
  const { loading, error } = useKakaoRoute();
  const { markers, isAddingMode, addMarker, removeMarker, toggleAddingMode, addPlaceToAPI, removePlaceFromAPI, refreshPlaces, apiLoading } = useTravelMarkers();

  const markersByDay = markers.reduce((acc, marker) => {
    if (!acc[marker.day]) acc[marker.day] = [];
    acc[marker.day].push(marker);
    return acc;
  }, {} as Record<number, typeof markers>);

  const maxDay = Math.max(...Object.keys(markersByDay).map(Number), 0);

  useEffect(() => {
    setSelectedDay(viewDay);
  }, [viewDay]);

  const handleAddMarker = () => {
    if (newMarkerName.trim() && pendingCoords) {
      addMarker(newMarkerName.trim(), pendingCoords.lat, pendingCoords.lng, selectedCategory, viewDay);
      setNewMarkerName('');
      setShowNameInput(false);
      setPendingCoords(null);
      toggleAddingMode();
    }
  };

  const handleCancelAdd = () => {
    setShowNameInput(false);
    setPendingCoords(null);
    setNewMarkerName('');
    toggleAddingMode();
  };

  const handleAddPlaceToAPI = async (placeData: {
    name: string;
    category: string;
    address: string;
    latitude: number;
    longitude: number;
    description: string;
  }) => {
    await addPlaceToAPI(placeData);
    setSelectedLocationForAPI(null);
    setIsSelectingLocationForAPI(false);
  };

  const handleLocationSelectForAPI = () => {
    setIsSelectingLocationForAPI(true);
    setShowAddPlaceModal(false); // 모달을 잠시 닫고 지도에서 선택
  };

  const handleMapLocationSelect = (coords: {lat: number, lng: number}) => {
    if (isSelectingLocationForAPI) {
      setSelectedLocationForAPI(coords);
      setIsSelectingLocationForAPI(false);
      setShowAddPlaceModal(true); // 모달 다시 열기
    } else if (isAddingMode) {
      setPendingCoords(coords);
      setShowNameInput(true);
    }
  };

  return (
    <div className="flex h-screen">
      <TravelSidebar
        markers={markers}
        isAddingMode={isAddingMode}
        loading={loading || apiLoading}
        error={error}
        totalTime={totalTime}
        totalDistance={totalDistance}
        routeDistances={routeDistances}
        routeDurations={routeDurations}
        onToggleAddingMode={toggleAddingMode}
        onRemoveMarker={async (id: number) => {
          // API 마커인지 확인
          const marker = markers.find(m => m.id === id);
          if (marker?.isApiMarker) {
            const confirmDelete = window.confirm(`"${marker.name}"을(를) 삭제하시겠습니까?`);
            if (confirmDelete) {
              try {
                await removePlaceFromAPI(id);
              } catch (error) {
                alert('장소 삭제에 실패했습니다. 다시 시도해주세요.');
                return;
              }
            }
          } else {
            // 로컬 마커는 기존 방식으로 삭제
            removeMarker(id);
          }
        }}
        onDayChange={setViewDay}
        onShowAddPlaceModal={() => {
          setSelectedLocationForAPI(null);
          setShowAddPlaceModal(true);
        }}
        onRefreshPlaces={refreshPlaces}
      />

      <div className="flex-1 relative">
        <MapView 
          selectedDay={viewDay}
          isAddingMode={isAddingMode || isSelectingLocationForAPI}
          markers={markers}
          onRouteUpdate={(distance: number, time: number, distances?: {[key: string]: number}, durations?: {[key: string]: number}) => {
            setTotalDistance(distance);
            setTotalTime(time);
            if (distances) setRouteDistances(distances);
            if (durations) setRouteDurations(durations);
          }}
          onLocationSelect={handleMapLocationSelect}
          onRemoveMarker={async (id: number) => {
            // API 마커인지 확인
            const marker = markers.find(m => m.id === id);
            if (marker?.isApiMarker) {
              const confirmDelete = window.confirm(`"${marker.name}"을(를) 삭제하시겠습니까?`);
              if (confirmDelete) {
                try {
                  await removePlaceFromAPI(id);
                } catch (error) {
                  alert('장소 삭제에 실패했습니다. 다시 시도해주세요.');
                  return;
                }
              }
            } else {
              // 로컬 마커는 기존 방식으로 삭제
              removeMarker(id);
            }
          }}
        />
      </div>

      <AddMarkerModal
        isOpen={showNameInput}
        markerName={newMarkerName}
        selectedCategory={selectedCategory}
        selectedDay={selectedDay}
        maxDay={maxDay}
        onMarkerNameChange={setNewMarkerName}
        onCategoryChange={setSelectedCategory}
        onDayChange={setSelectedDay}
        onAdd={handleAddMarker}
        onCancel={handleCancelAdd}
      />

      <AddPlaceModal
        isOpen={showAddPlaceModal}
        onClose={() => {
          setShowAddPlaceModal(false);
          setSelectedLocationForAPI(null);
          setIsSelectingLocationForAPI(false);
        }}
        onAddPlace={handleAddPlaceToAPI}
        selectedLocation={selectedLocationForAPI}
        onLocationSelect={handleLocationSelectForAPI}
      />
    </div>
  );
}