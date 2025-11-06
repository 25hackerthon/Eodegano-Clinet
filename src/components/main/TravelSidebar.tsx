import { useState } from 'react';
import type { TravelMarker } from '../../data/travelMaker';
import { CATEGORIES } from '../../data/travelMaker';
import food from '../../assets/food.svg';
import building from '../../assets/building.svg';
import bed from '../../assets/bed.svg';

interface TravelSidebarProps {
  markers: TravelMarker[];
  isAddingMode: boolean;
  loading: boolean;
  error: string | null;
  totalTime: number;
  totalDistance: number;
  routeDistances: {[key: string]: number};
  routeDurations: {[key: string]: number};
  onToggleAddingMode: () => void;
  onRemoveMarker: (id: number) => void;
  onDayChange: (day: number) => void;
  onShowAddPlaceModal?: () => void;
  onRefreshPlaces?: () => void;
}

export default function TravelSidebar({
  markers,
  isAddingMode,
  loading,
  error,
  totalTime,
  totalDistance,
  routeDistances,
  routeDurations,
  onToggleAddingMode,
  onRemoveMarker,
  onDayChange,
  onShowAddPlaceModal,
  onRefreshPlaces
}: TravelSidebarProps) {
  const markersByDay = markers.reduce((acc, marker) => {
    if (!acc[marker.day]) acc[marker.day] = [];
    acc[marker.day].push(marker);
    return acc;
  }, {} as Record<number, typeof markers>);

  const maxDay = Math.max(...Object.keys(markersByDay).map(Number), 0);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}시간 ${minutes}분`;
  };

  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)}km`;
    }
    return `${meters}m`;
  };

  return (
    <div className="w-80 bg-gradient-to-br from-slate-50 to-white shadow-2xl flex flex-col border-r border-slate-200">
      {/* 헤더 */}
      <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-2xl">✈️</span>
            여행 플래너
          </h1>
          <div className="flex gap-2">
            <button
              onClick={onToggleAddingMode}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isAddingMode 
                  ? 'bg-red-500 hover:bg-red-600 text-white hover:shadow-red-500/25' 
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30'
              }`}
            >
              {isAddingMode ? '✕ 취소' : '+ 지도 추가'}
            </button>
            {onShowAddPlaceModal && (
              <button
                onClick={onShowAddPlaceModal}
                className="px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg bg-green-500 hover:bg-green-600 text-white"
              >
                📝 직접 추가
              </button>
            )}
          </div>
        </div>

        {/* API 관련 버튼들 */}
        <div className="flex gap-2 mb-4">
          {onRefreshPlaces && (
            <button
              onClick={onRefreshPlaces}
              className="flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 transition-all duration-200"
              disabled={loading}
            >
              {loading ? '🔄 로딩...' : '🔄 새로고침'}
            </button>
          )}
          <div className="flex-1 px-3 py-2 rounded-lg text-xs text-white/70 bg-white/5 border border-white/10">
            총 {markers.length}개 장소
          </div>
        </div>

        {isAddingMode && (
          <div className="p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm animate-pulse">
            <div className="text-sm text-white flex items-center gap-2">
              <span className="animate-bounce">📍</span>
              지도를 클릭해서 위치를 선택하세요
            </div>
          </div>
        )}
      </div>

      {/* 상태 표시 */}
      <div className="p-6 space-y-4">
        {loading && (
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 shadow-sm">
            <div className="text-sm text-amber-700 flex items-center gap-2">
              <div className="animate-spin w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full"></div>
              경로 정보 로딩 중...
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200 shadow-sm">
            <div className="text-sm text-red-700 flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              {error}
            </div>
          </div>
        )}
        
        {/* 경로 정보 */}
        <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
          <div className="text-sm font-medium text-slate-600 mb-3 flex items-center gap-2">
            <span className="text-blue-500">🚗</span>
            총 이동 정보
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">소요 시간</span>
              <span className="font-bold text-blue-700 text-lg">{formatTime(totalTime)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">총 거리</span>
              <span className="font-semibold text-slate-600">{formatDistance(totalDistance)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Day별 타임라인 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Array.from({ length: Math.max(maxDay, 2) }, (_, i) => i + 1).map(day => {
          const dayMarkers = markersByDay[day] || [];
          
          return (
            <div key={day} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">DAY {day}</h2>
                <span className="text-sm text-gray-500">{dayMarkers.length}개 장소</span>
              </div>
              
              <div className="relative">
                {dayMarkers.map((marker, index) => {
                  const isLast = index === dayMarkers.length - 1;
                  const categoryInfo = {
                    1: { name: '음식점', color: 'bg-red-500', icon: food },
                    2: { name: '관광지', color: 'bg-pink-500', icon: building },
                    3: { name: '숙소', color: 'bg-blue-500', icon: bed }
                  }[marker.category] || { name: '기타', color: 'bg-gray-500', icon: food };

                  return (
                    <div key={marker.id} className="relative flex items-start mb-6">
                      {!isLast && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-300"></div>
                      )}
                      
                      {!isLast && (() => {
                        const nextMarker = dayMarkers[index + 1];
                        const routeKey = `${marker.id}-${nextMarker?.id}`;
                        const distance = routeDistances[routeKey];
                        const distanceText = distance ? 
                          (distance >= 1000 ? `${(distance/1000).toFixed(1)}km` : `${distance}m`) : 
                          '계산중...';
                        
                        return (
                          <div className="absolute left-2 top-20 text-xs text-gray-500 bg-white px-1 rounded">
                            {distanceText}
                          </div>
                        );
                      })()}
                      
                      <div className={`flex-shrink-0 w-12 h-12 ${categoryInfo.color} rounded-full flex items-center justify-center text-white font-bold text-lg z-10`}>
                        {index + 1}
                      </div>
                      
                      <div className="ml-4 flex-1 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow group">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1 cursor-pointer"
                               onClick={() => onDayChange(day)}>
                            <h3 className="font-bold text-gray-800 text-lg mb-1">{marker.name}</h3>
                            <p className="text-gray-500 text-sm mb-2">{categoryInfo.name}</p>
                            <p className="text-gray-400 text-xs">{marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}</p>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveMarker(marker.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 text-gray-400 hover:text-red-500"
                            title="삭제"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        
                        {!isLast && (() => {
                          const nextMarker = dayMarkers[index + 1];
                          const routeKey = `${marker.id}-${nextMarker?.id}`;
                          const duration = routeDurations[routeKey];
                          const timeText = duration ? `약 ${Math.round(duration/60)}분` : '계산중...';
                          
                          return (
                            <div className="flex items-center text-blue-600 text-sm">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                              다음 장소까지 {timeText}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  );
                })}
                
                {dayMarkers.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <p>아직 여행지가 없습니다.</p>
                    <p className="text-sm mt-2">지도를 클릭해서 여행지를 추가해보세요!</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}