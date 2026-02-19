import { apiClient } from "@/lib/client";
import {
  SignalsResponseSchema,
  SignalResponseSchema,
  type SignalsResponse,
  type SignalResponse,
} from "@/schemas/signalSchema";
import {
  SignalTracksResponseSchema,
  type SignalTracksResponse,
} from "@/schemas/trackSchema";

export interface GetSignalsParams {
  page?: number;
  limit?: number;
  signal_id?: number;
  signal_name?: string;
  elr?: string;
}

export const getSignals = async (
  params?: GetSignalsParams,
): Promise<SignalsResponse> => {
  const { data } = await apiClient.get("/api/signals", { params });
  return SignalsResponseSchema.parse(data);
};

export const getSignalById = async (id: number): Promise<SignalResponse> => {
  const { data } = await apiClient.get(`/api/signals/${id}`);
  return SignalResponseSchema.parse(data);
};

export const getSignalTracks = async (
  signalId: number,
): Promise<SignalTracksResponse> => {
  const { data } = await apiClient.get(`/api/signals/${signalId}/tracks`);
  return SignalTracksResponseSchema.parse(data);
};
