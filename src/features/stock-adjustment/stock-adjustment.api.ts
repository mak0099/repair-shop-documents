"use client"

import { createApiHooksFor } from "@/lib/api-factory";
import { createBulkDeleteHook, createBulkUpdateHook } from "@/lib/api-bulk-hooks";
import type { StockAdjustment } from "./stock-adjustment.schema";

const stockAdjustmentApiHooks = createApiHooksFor<StockAdjustment, Partial<StockAdjustment>>("stock-adjustments");

/**
 * Hook to fetch adjustment records.
 * Supports filtering by 'stockId' for the History/Ledger view.
 */
export const useStockAdjustments = stockAdjustmentApiHooks.useGetList;

/**
 * Hook to fetch a single adjustment detail.
 */
export const useStockAdjustment = stockAdjustmentApiHooks.useGetOne;

/**
 * Core operation: Creating a new adjustment record.
 */
export const useCreateStockAdjustment = stockAdjustmentApiHooks.useCreate;

/**
 * Update and Delete hooks (Optional for Audit records)
 */
export const useUpdateStockAdjustment = stockAdjustmentApiHooks.useUpdate;
export const useDeleteStockAdjustment = stockAdjustmentApiHooks.useDelete;

/**
 * Bulk actions (Use with caution for adjustment records)
 */
export const useDeleteManyStockAdjustments = createBulkDeleteHook("stock-adjustments");
export const useUpdateManyStockAdjustments = createBulkUpdateHook<StockAdjustment>("stock-adjustments");