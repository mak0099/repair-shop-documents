import { z } from "zod";
import { BaseEntity } from "@/types/common";

/**
 * Validates device models linked to specific brands.
 * Removed .default(true) to ensure strict boolean type matching for RHF.
 */
export const modelSchema = z.object({
  name: z.string().trim().min(1, "Model name is required"),
  brand_id: z.string().min(1, "Brand selection is required"),
  isActive: z.boolean(),
});

export type ModelFormValues = z.infer<typeof modelSchema>;

export interface Model extends BaseEntity, ModelFormValues {}