import { z } from "zod";
import { BaseEntity } from "@/types/common";

export const stockSchema = z.object({
  itemName: z.string().min(1, "Item name is required"),
  sku: z.string().min(1, "SKU is required"),
  
  // Serialized Tracking
  imei: z.string().optional().nullable(),
  
  // Dynamic specs
  attributes: z.record(z.string(), z.string()), 
  
  categoryName: z.string(),
  brandName: z.string(),
  modelName: z.string().optional().nullable(),
  
  // Logistics & Location
  boxNumber: z.string().optional().nullable(),
  boxLocationName: z.string().optional().nullable(),
  storageNote: z.string().optional().nullable(), 
  
  // Unit (e.g., Pcs, Set, Box)
  unit: z.string().optional().default("Pcs"), // <--- FIX: Added unit property
  
  status: z.string(), 
  condition: z.enum(["New", "Used"]),
  
  stockQuantity: z.number().nonnegative(),
  lowStockThreshold: z.number().nonnegative(),
  
  purchasePrice: z.number().optional().nullable(),
  sellingPrice: z.number().positive(),
  
  isActive: z.boolean(),
});

export type StockFormValues = z.infer<typeof stockSchema>;
export interface Stock extends BaseEntity, StockFormValues {}