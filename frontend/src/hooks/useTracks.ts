import { useQuery } from "@tanstack/react-query";
import { getTracks, getTrackById, type GetTracksParams } from "@/api/tracks";

/**
 * Fetch paginated/filtered tracks list

 */
export function useTracks(params?: GetTracksParams) {
  return useQuery({
    queryKey: ["tracks", params],
    queryFn: () => getTracks(params),
    staleTime: 1000 * 30, // 30 seconds
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Fetch single track by ID
 */
export function useTrack(id: number) {
  return useQuery({
    queryKey: ["tracks", id],
    queryFn: () => getTrackById(id),
    enabled: id > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}
