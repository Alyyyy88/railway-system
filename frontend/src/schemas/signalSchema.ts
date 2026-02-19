import { z } from "zod";
import {
  createApiResponseSchema,
  createPaginatedApiResponseSchema,
} from "./api";

export const SignalSchema = z.object({
  signal_id: z.number().int().positive(),
  signal_name: z.string().nullable(),
  elr: z.string().nullable(),
  mileage: z.number().nullable(),
});

export type Signal = z.infer<typeof SignalSchema>;

export const SignalsResponseSchema = createPaginatedApiResponseSchema(
  z.array(SignalSchema),
);
export const SignalResponseSchema = createApiResponseSchema(SignalSchema);

export type SignalsResponse = z.infer<typeof SignalsResponseSchema>;
export type SignalResponse = z.infer<typeof SignalResponseSchema>;
