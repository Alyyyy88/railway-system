import { z } from "zod";
import { SignalSchema } from "./signalSchema";
import {
  createApiResponseSchema,
  createPaginatedApiResponseSchema,
} from "./api";

export const TrackSchema = z.object({
  track_id: z.number().int().positive(),
  source: z.string(),
  target: z.string(),
  signal_ids: z.array(SignalSchema),
});

export type Track = z.infer<typeof TrackSchema>;

export const SignalTrackRelationshipSchema = z.object({
  signal: SignalSchema,
  tracks: z.array(TrackSchema),
});

export type SignalTrackRelationship = z.infer<
  typeof SignalTrackRelationshipSchema
>;

export const TracksResponseSchema = createPaginatedApiResponseSchema(
  z.array(TrackSchema),
);
export const TrackResponseSchema = createApiResponseSchema(TrackSchema);
export const SignalTracksResponseSchema = createApiResponseSchema(
  SignalTrackRelationshipSchema,
);

export type TracksResponse = z.infer<typeof TracksResponseSchema>;
export type TrackResponse = z.infer<typeof TrackResponseSchema>;
export type SignalTracksResponse = z.infer<typeof SignalTracksResponseSchema>;
