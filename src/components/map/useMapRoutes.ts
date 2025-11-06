import { useRef, useEffect, useMemo } from 'react';
import { useKakaoRoute } from '../../hooks/useKakaoRoute';
import type { TravelMarker } from '../../data/travelMaker';

interface UseMapRoutesProps {
  map: any;
  markers: TravelMarker[];
  onRouteUpdate?: (distance: number, time: number, distances?: {[key: string]: number}, durations?: {[key: string]: number}) => void;
}

export function useMapRoutes({ map, markers, onRouteUpdate }: UseMapRoutesProps) {
  const polylinesRef = useRef<any[]>([]);
  const { getRouteInfo } = useKakaoRoute();
  
  // 경로 변경 감지를 위한 키 생성 (순서도 중요)
  const routeKey = useMemo(() => 
    markers.map(m => `${m.id}-${m.lat}-${m.lng}`).join('|'), 
    [markers]
  );

  const drawRoutes = async () => {
    if (!map || markers.length < 2) {
      if (onRouteUpdate) {
        onRouteUpdate(0, 0);
      }
      return;
    }

    // 기존 경로선들 제거
    polylinesRef.current.forEach(polyline => polyline.setMap(null));
    polylinesRef.current = [];

    let totalDist = 0;
    let totalDur = 0;
    const newRouteDistances: {[key: string]: number} = {};
    const newRouteDurations: {[key: string]: number} = {};

    for (let i = 0; i < markers.length - 1; i++) {
      const fromMarker = markers[i];
      const toMarker = markers[i + 1];
      
      const routeInfo = await getRouteInfo(fromMarker, toMarker);
      if (routeInfo && routeInfo.path) {
        const polyline = new window.kakao.maps.Polyline({
          path: routeInfo.path.map((coord: any) => new window.kakao.maps.LatLng(coord.y, coord.x)),
          strokeWeight: 4,
          strokeColor: '#ff6b6b',
          strokeOpacity: 0.8,
          strokeStyle: 'solid'
        });
        polyline.setMap(map);
        polylinesRef.current.push(polyline);

        totalDist += routeInfo.distance || 0;
        totalDur += routeInfo.duration || 0;
        
        const routeKey = `${fromMarker.id}-${toMarker.id}`;
        newRouteDistances[routeKey] = routeInfo.distance || 0;
        newRouteDurations[routeKey] = routeInfo.duration || 0;
      }
    }

    if (onRouteUpdate) {
      onRouteUpdate(totalDist, totalDur, newRouteDistances, newRouteDurations);
    }
  };

  useEffect(() => {
    drawRoutes();
  }, [map, routeKey]);

  return { polylinesRef };
}