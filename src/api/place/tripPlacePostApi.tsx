import { api } from "../axios";

interface Template {
  id: number;
  title: string;
  subtitle: string;
  tags: string;
  image: string;
  lat: number;
  lng: number;
  description?: string;
  type: "음식점" | "관광지" | "숙소";
  congestionByTime?: {
    morning: number; // am 6:00 ~ am 11:00
    afternoon: number; // am 11:00 ~ pm 5:00
    evening: number; // pm 5:00 ~ pm 10:00
  };
}

interface TripPlacePostResponse {
  placeId: number;
  category: "음식점" | "관광지" | "숙소";
}

export const tripPlacePostApi = async (
  tripId: number,
  templates: Template[]
): Promise<TripPlacePostResponse> => {
  const body = {
    templates,
  };

  const res = await api.post(`/places/${tripId}`, body);
  console.log("dasasd", res.data);
  return res.data;
};
