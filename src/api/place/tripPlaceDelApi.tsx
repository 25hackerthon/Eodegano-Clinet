import { api } from "../axios";

export const tripPlaceDelApi = async (tripId: number, placesId: number) => {
  const res = await api.delete(`/places/${tripId}/${placesId}`);
  return res.data;
};
