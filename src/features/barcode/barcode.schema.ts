import { z } from "zod";

/**
 * Clean and strict Barcode Schema.
 * We use 'z.coerce.number' to handle the string-to-number conversion.
 * No 'invalid_type_error' used here to avoid TypeScript conflicts.
 */
export const barcodeSchema = z.object({
  itemId: z.string().min(1, "Please select an item"),
  variantId: z.string().nullish(),
  // Coerce handles string inputs from the form safely.
  quantity: z.coerce.number()
    .int("Must be a whole number")
    .min(1, "Minimum 1 label required"),
  labelSize: z.enum(["38x25mm", "50x30mm", "A4_40_Labels", "Custom"]).default("38x25mm"),
  includePrice: z.boolean().default(true),
  includeName: z.boolean().default(true),
});

/**
 * Inferring the type directly from the schema.
 */
export type BarcodeRequest = z.infer<typeof barcodeSchema>;