import { api } from "../axios";

export const tripPlaceGetApi = async (tripId: number) => {
  const res = await api.get(`/places/${tripId}`);
  return res.data;
};
