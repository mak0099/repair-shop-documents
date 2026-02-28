import { z } from "zod";
import { BaseEntity } from "@/types/common";

/**
 * Validates stock adjustment entries.
 * Note: We don't include 'id' here because BaseEntity handles it.
 */
export const stockAdjustmentSchema = z.object({
  stockId: z.string().min(1, "Please select a specific stock item"),
  itemName: z.string().optional(), 
  imei: z.string().optional(),     

  type: z.enum(["IN", "OUT"]), 
  quantity: z.number().positive("Quantity must be greater than 0"),
  
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
  date: z.string().min(1, "Date is required"),
});

/**
 * This is used for form validation
 */
export type StockAdjustmentFormValues = z.infer<typeof stockAdjustmentSchema>;

/**
 * This is the full entity type used in lists and APIs.
 * It combines BaseEntity (id, createdAt, updatedAt) with form values.
 */
export interface StockAdjustment extends BaseEntity, StockAdjustmentFormValues {}