// Place API 관련 타입 정의
export interface Place {
  placeId: number;
  tripId: number;
  name: string | null;
  category: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  description: string | null;
  order: number;
}

export interface CreatePlaceRequest {
  name: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  order: number;
}

const API_BASE_URL = 'http://192.168.15.169:8080';
const TRIP_ID = 9; // 고정된 tripId

// 모든 장소 가져오기
export const fetchPlaces = async (): Promise<Place[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/places/${TRIP_ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('장소 데이터 가져오기 실패:', error);
    throw error;
  }
};

// 새 장소 추가하기
export const createPlace = async (placeData: Omit<CreatePlaceRequest, 'order'>): Promise<Place> => {
  try {
    // 현재 장소들을 가져와서 order 값 계산
    const existingPlaces = await fetchPlaces();
    const maxOrder = existingPlaces.reduce((max, place) => Math.max(max, place.order), 0);
    
    const requestData: CreatePlaceRequest = {
      ...placeData,
      order: maxOrder + 1
    };

    const response = await fetch(`${API_BASE_URL}/places/${TRIP_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('장소 추가 실패:', error);
    throw error;
  }
};

// 장소 업데이트하기 (필요시 사용)
export const updatePlace = async (placeId: number, placeData: Partial<CreatePlaceRequest>): Promise<Place> => {
  try {
    const response = await fetch(`${API_BASE_URL}/place/${placeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(placeData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('장소 업데이트 실패:', error);
    throw error;
  }
};

// 장소 삭제하기
export const deletePlace = async (placeId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/places/${TRIP_ID}/${placeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('장소 삭제 실패:', error);
    throw error;
  }
};

// Place 데이터를 TravelMarker 형식으로 변환
export const convertPlaceToMarker = (place: Place) => {
  if (!place.name || !place.latitude || !place.longitude) {
    return null;
  }

  // category 문자열을 숫자로 변환
  let categoryNumber = 2; // 기본값: 관광지
  if (place.category) {
    switch (place.category.toLowerCase()) {
      case 'restaurant':
      case 'food':
      case '음식점':
        categoryNumber = 1;
        break;
      case 'tourist':
      case 'attraction':
      case '관광지':
        categoryNumber = 2;
        break;
      case 'hotel':
      case 'accommodation':
      case '숙소':
        categoryNumber = 3;
        break;
    }
  }

  return {
    id: place.placeId,
    name: place.name,
    latitude: place.latitude,
    longitude: place.longitude,
    category: categoryNumber,
    description: place.description || '',
    address: place.address || '',
    isApiMarker: true // API에서 온 마커임을 표시
  };
};