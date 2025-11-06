import { useState, useEffect } from 'react';
import { useTravelMarkers } from '../hooks/useTravelMarkers';
import { useKakaoRoute } from '../hooks/useKakaoRoute';
import MapView from './map/MapView';
import TravelSidebar from './main/TravelSidebar';
import AddMarkerModal from './main/AddMarkerModal';

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
  
  const { loading, error } = useKakaoRoute();
  const { markers, isAddingMode, addMarker, removeMarker, toggleAddingMode } = useTravelMarkers();

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

  return (
    <div className="flex h-screen">
      <TravelSidebar
        markers={markers}
        isAddingMode={isAddingMode}
        loading={loading}
        error={error}
        totalTime={totalTime}
        totalDistance={totalDistance}
        routeDistances={routeDistances}
        routeDurations={routeDurations}
        onToggleAddingMode={toggleAddingMode}
        onRemoveMarker={removeMarker}
        onDayChange={setViewDay}
      />

      <div className="flex-1 relative">
        <MapView 
          selectedDay={viewDay}
          isAddingMode={isAddingMode}
          markers={markers}
          onRouteUpdate={(distance: number, time: number, distances?: {[key: string]: number}, durations?: {[key: string]: number}) => {
            setTotalDistance(distance);
            setTotalTime(time);
            if (distances) setRouteDistances(distances);
            if (durations) setRouteDurations(durations);
          }}
          onLocationSelect={(coords: {lat: number, lng: number}) => {
            setPendingCoords(coords);
            setShowNameInput(true);
          }}
          onRemoveMarker={removeMarker}
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
    </div>
  );
}