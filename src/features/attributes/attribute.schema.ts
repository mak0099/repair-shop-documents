import { z } from "zod";

/**
 * Professional Attribute Schema
 * We ensure isActive is a strict boolean to satisfy the form's type requirements.
 */
export const attributeValueSchema = z.object({
  id: z.string().optional(),
  value: z.string().min(1, "Value is required"),
  // By not using .optional(), we force the output to be a strict boolean.
  isActive: z.boolean(), 
});

export const attributeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  key: z.string().min(1, "Key is required"),
  description: z.string().optional().nullable(),
  values: z.array(attributeValueSchema),
});

/**
 * Inferring the type directly from the schema ensures that 
 * the Attribute interface is always in sync with validation rules.
 */
export type Attribute = z.infer<typeof attributeSchema>;