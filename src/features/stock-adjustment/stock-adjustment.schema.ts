import { z } from "zod";

export const stockAdjustmentSchema = z.object({
  id: z.string().optional(),
  itemId: z.string().min(1, "Please select an item"),
  variantId: z.string().optional(), // For variant-specific adjustment
  type: z.enum(["IN", "OUT"]), 
  quantity: z.number().positive("Quantity must be greater than 0"),
  reason: z.enum(["Damage", "Theft", "Inventory Audit", "Return", "Restock", "Other"]),
  note: z.string().optional(),
  date: z.string().default(() => new Date().toISOString()),
});

export type StockAdjustment = z.infer<typeof stockAdjustmentSchema>;