import { z } from "zod";

export const barcodeSchema = z.object({
  itemId: z.string().min(1, "Item is required"),
  variantId: z.string().optional(),
  quantity: z.coerce.number().min(1).max(100, "Maximum 100 labels at once"),
  labelSize: z.enum(["38x25mm", "50x30mm", "A4_40_Labels", "Custom"]),
  includePrice: z.boolean().default(true),
  includeName: z.boolean().default(true),
});

export type BarcodeRequest = z.infer<typeof barcodeSchema>;