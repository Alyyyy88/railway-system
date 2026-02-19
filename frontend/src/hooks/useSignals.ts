import { useQuery } from "@tanstack/react-query";
import {
  getSignals,
  getSignalById,
  getSignalTracks,
  type GetSignalsParams,
} from "@/api/signals";

/**
 * Fetch paginated/filtered signals list
 */
export function useSignals(params?: GetSignalsParams) {
  return useQuery({
    queryKey: ["signals", params],
    queryFn: () => getSignals(params),
    staleTime: 1000 * 30, // 30 seconds
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Fetch single signal by ID
 */
export function useSignal(id: number) {
  return useQuery({
    queryKey: ["signals", id],
    queryFn: () => getSignalById(id),
    enabled: id > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Fetch tracks associated with a signal
 */
export function useSignalTracks(signalId: number) {
  return useQuery({
    queryKey: ["signals", signalId, "tracks"],
    queryFn: () => getSignalTracks(signalId),
    enabled: signalId > 0,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}
