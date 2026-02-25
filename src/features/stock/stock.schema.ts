import { z } from "zod";

/**
 * Enhanced Stock View Schema
 * Optimized for mobile shop inventory tracking.
 */
export const stockSchema = z.object({
  id: z.string(), // Item or Variant ID
  itemName: z.string(),
  sku: z.string(),
  
  // Serialized Tracking
  imei: z.string().optional(), // Specific for mobile phones
  
  // Dynamic specs from our Attributes module
  // e.g., { "RAM": "8GB", "COLOR": "Deep Purple", "GRADE": "A" }
  attributes: z.record(z.string(), z.string()), 
  
  categoryName: z.string(),
  brandName: z.string(),
  modelName: z.string().optional(),
  
  // Logistics & Location
  boxNumber: z.string().optional(), // From BoxNumber Master
  storageNote: z.string().optional(), // Our newly renamed "Micro-location" field
  
  // Inventory Status (From Master Settings)
  status: z.string(), // e.g., "Ready for Sale", "In Testing", "Reserved"
  condition: z.enum(["New", "Used"]),
  
  // Quantity metrics
  stockQuantity: z.number().default(0),
  lowStockThreshold: z.number().default(2),
  
  // Financials
  purchasePrice: z.number().optional(), // Useful for calculating total inventory value
  sellingPrice: z.number(),
  
  isActive: z.boolean().default(true),
  createdAt: z.string().optional(),
  lastUpdated: z.string().optional(),
});

export type Stock = z.infer<typeof stockSchema>;