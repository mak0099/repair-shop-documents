import { createApiHooksFor } from "@/lib/api-factory";
import { createBulkDeleteHook, createBulkUpdateHook } from "@/lib/api-bulk-hooks";
import type { StockAdjustment } from "./stock-adjustment.schema";

// Assuming StockAdjustment can be used for form values as well.
type StockAdjustmentFormValues = StockAdjustment;

const stockAdjustmentApiHooks = createApiHooksFor<StockAdjustment, StockAdjustmentFormValues>("stock-adjustments");

export const useStockAdjustments = stockAdjustmentApiHooks.useGetList;
export const useCreateStockAdjustment = stockAdjustmentApiHooks.useCreate;
export const useUpdateStockAdjustment = stockAdjustmentApiHooks.useUpdate; // For PUT/PATCH full updates
export const usePartialUpdateStockAdjustment = stockAdjustmentApiHooks.useUpdate; // For PATCH partial updates
export const useDeleteStockAdjustment = stockAdjustmentApiHooks.useDelete;

export const useDeleteManyStockAdjustments = createBulkDeleteHook<StockAdjustment>("stock-adjustments");
export const useUpdateManyStockAdjustments = createBulkUpdateHook<StockAdjustment>("stock-adjustments");
export const useStockAdjustment = stockAdjustmentApiHooks.useGetOne;