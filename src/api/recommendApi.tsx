import { api } from "./axios";

export const recommendApi = async (tripId: number) => {
  const body = {
    tripId,
  };
  const res = await api.post(`/recommendation`, body);
  return res.data;
};
