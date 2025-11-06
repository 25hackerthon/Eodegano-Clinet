import { useEffect, useRef, useState } from "react";

interface PlaceMapProps {
  mapUrl?: string;
  lat?: number;
  lng?: number;
  placeName?: string;
}

declare global {
  interface Window {
    naver: any;
  }
}

export default function PlaceMap({
  mapUrl,
  lat,
  lng,
  placeName,
}: PlaceMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    // lat, lng가 없으면 지도를 표시하지 않음
    if (!lat || !lng || !mapRef.current) return;

    const CLIENT_ID = "YOUR_CLIENT_ID"; // 여기에 발급받은 Client ID 입력

    // Client ID가 설정되지 않은 경우
    if (CLIENT_ID === "YOUR_CLIENT_ID") {
      setMapError(true);
      return;
    }

    const initMap = () => {
      try {
        if (window.naver && window.naver.maps && mapRef.current) {
          const location = new window.naver.maps.LatLng(lat, lng);

          // 지도 생성
          const map = new window.naver.maps.Map(mapRef.current, {
            center: location,
            zoom: 16,
          });

          // 마커 생성
          new window.naver.maps.Marker({
            position: location,
            map: map,
            title: placeName || "위치",
          });

          mapInstanceRef.current = map;
          setMapError(false);
        }
      } catch (error) {
        console.error("Map initialization error:", error);
        setMapError(true);
      }
    };

    // 네이버 지도 스크립트 로드
    const existingScript = document.querySelector(
      `script[src*="openapi.map.naver.com"]`
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${CLIENT_ID}`;
      script.async = true;
      script.onload = initMap;
      script.onerror = () => setMapError(true);
      document.head.appendChild(script);
    } else if (window.naver && window.naver.maps) {
      // 이미 로드되어 있으면 바로 지도 생성
      initMap();
    }

    // cleanup
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy();
        } catch (e) {
          // ignore
        }
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, placeName]);

  return (
    <div>
      <h4 className="text-lg font-bold mb-3">장소</h4>
      <div
        ref={mapRef}
        className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden relative"
      >
        {/* 지도가 로드되기 전 또는 위치 정보가 없을 때 표시 */}
        {(mapError || !lat || !lng) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
            {mapError && (
              <div className="text-center px-4">
                <p className="text-gray-600 font-semibold mb-2">
                  지도를 불러올 수 없습니다
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  네이버 클라우드 플랫폼에서 Client ID를 발급받아주세요
                </p>
                <a
                  href="https://console.ncloud.com/naver-service/application"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                >
                  Client ID 발급받기
                </a>
              </div>
            )}
            {!mapError && (!lat || !lng) && (
              <p className="text-gray-400">위치 정보가 없습니다</p>
            )}
          </div>
        )}
      </div>

      {/* 임시: 구글 맵 링크 */}
      {lat && lng && (
        <div className="mt-3 flex gap-2">
          <a
            href={`https://map.naver.com/p/search/${placeName}?c=${lng},${lat},16,0,0,0,dh`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 bg-green-600 text-white text-center text-sm rounded-lg hover:bg-green-700 transition-colors"
          >
            네이버 지도에서 보기
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 bg-blue-500 text-white text-center text-sm rounded-lg hover:bg-blue-600 transition-colors"
          >
            구글 지도에서 보기
          </a>
        </div>
      )}
    </div>
  );
}
