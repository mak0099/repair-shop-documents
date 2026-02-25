import { z } from "zod";

export const stockAdjustmentSchema = z.object({
  id: z.string().optional(),
  
  // Mobile specific linkage
  stockId: z.string().min(1, "Please select a specific stock item"),
  itemName: z.string().optional(), // For UI convenience
  imei: z.string().optional(),     // For UI convenience

  type: z.enum(["IN", "OUT"]), 
  quantity: z.number().positive("Quantity must be greater than 0"),
  
  // These values MUST match the 'value' field in your constants
  reason: z.enum([
    "Inventory Audit", 
    "Damage", 
    "Theft", 
    "Return", 
    "Restock", 
    "Correction", 
    "Testing Issue", 
    "Other"
  ]),
  
  note: z.string().optional(),
  adjustedBy: z.string().optional(),
  date: z.string().default(() => new Date().toISOString()),
});

export type StockAdjustment = z.infer<typeof stockAdjustmentSchema>;