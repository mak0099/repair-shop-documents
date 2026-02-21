import { z } from "zod";

/**
 * Stock View Schema
 * Used for displaying stock levels in a table format.
 * This combines item and variant data for reporting.
 */
export const stockSchema = z.object({
  id: z.string(), // Usually the variant ID or a combination SKU
  itemName: z.string(),
  sku: z.string(),
  attributes: z.record(z.string(), z.string()),
  categoryName: z.string(),
  brandName: z.string(),
  modelName: z.string().optional(),
  boxLocationName: z.string().optional(),
  
  // Quantity metrics
  stockQuantity: z.number(),
  lowStockThreshold: z.number(),
  unit: z.string(),
  
  // Prices for reference in stock view
  sellingPrice: z.number(),
  
  isActive: z.boolean(),
  lastUpdated: z.string().optional(),
});

export type Stock = z.infer<typeof stockSchema>;