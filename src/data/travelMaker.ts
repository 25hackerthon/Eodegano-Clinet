// 여행지 데이터 타입 정의
export interface TravelMarker {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: 1 | 2 | 3; // 1: 음식점, 2: 관광지, 3: 숙소
  day: number;
  isApiMarker?: boolean; // API에서 온 마커인지 표시
}

// 카테고리 정보
export const CATEGORIES = {
  1: { name: '음식점', color: '#ff6b6b', icon: '1' },
  2: { name: '관광지', color: '#ff69b4', icon: '2' },
  3: { name: '숙소', color: '#4dabf7', icon: '3' }
} as const;

// 경로 정보 타입 정의
export interface RouteInfo {
  from: number;
  to: number;
  distance?: number; // 미터
  duration?: number; // 초
  taxi_fare?: number; // 택시 요금
  path?: Array<{x: number, y: number}>; // 실제 경로 좌표
}

export const travelMarkers: TravelMarker[] = [
  // Day 1
  {
    id: 1,
    name: "시즈닝",
    lat: 35.8560,
    lng: 129.2249,
    category: 1,
    day: 1
  },
  {
    id: 2,
    name: "대릉원",
    lat: 35.8345,
    lng: 129.2248,
    category: 2,
    day: 1
  },
  {
    id: 3,
    name: "안압지",
    lat: 35.8347,
    lng: 129.2244,
    category: 2,
    day: 1
  },
  {
    id: 4,
    name: "코모도 호텔",
    lat: 35.8290,
    lng: 129.2180,
    category: 3,
    day: 1
  },
  // Day 2
  {
    id: 5,
    name: "시즈닝",
    lat: 35.8560,
    lng: 129.2249,
    category: 1,
    day: 2
  },
  { 
    id: 6,
    name: "불국사",
    lat: 35.7898,
    lng: 129.3320,
    category: 2,
    day: 2
  },
  {
    id: 7,
    name: "석굴암",
    lat: 35.7948,
    lng: 129.3479,
    category: 2,
    day: 2
  },
  {
    id: 8,
    name: "코모도 호텔",
    lat: 35.8290,
    lng: 129.2180,
    category: 3,
    day: 2
  }
];


// Day별 추천 경로
export const recommendedRoute = [1, 2, 3, 4, 5, 6, 7, 8];