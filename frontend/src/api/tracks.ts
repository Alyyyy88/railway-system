import { apiClient } from "@/lib/client";
import {
  TracksResponseSchema,
  TrackResponseSchema,
  type TracksResponse,
  type TrackResponse,
} from "@/schemas/trackSchema";

export interface GetTracksParams {
  page?: number;
  limit?: number;
  track_id?: number;
  source?: string;
  target?: string;
}

export const getTracks = async (
  params?: GetTracksParams,
): Promise<TracksResponse> => {
  const { data } = await apiClient.get("/api/tracks", { params });
  return TracksResponseSchema.parse(data);
};

export const getTrackById = async (id: number): Promise<TrackResponse> => {
  const { data } = await apiClient.get(`/api/tracks/${id}`);
  return TrackResponseSchema.parse(data);
};
