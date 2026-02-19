import { z } from "zod";
import { PaginationSchema } from "./pagination";

// Generic API response wrapper
export const createApiResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T,
) => {
  return z.object({
    success: z.boolean(),
    data: dataSchema,
    count: z.number().int().nonnegative().optional(),
    error: z.string().optional(),
  });
};

// Generic paginated API response
export const createPaginatedApiResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T,
) => {
  return z.object({
    success: z.boolean(),
    data: dataSchema,
    count: z.number().int().nonnegative().optional(),
    pagination: PaginationSchema.optional(),
    error: z.string().optional(),
  });
};
