import { createApiHooksFor } from "@/lib/api-factory";
import { createBulkDeleteHook, createBulkUpdateHook } from "@/lib/api-bulk-hooks";
import type { Stock } from "./stock.schema";

/**
 * Stock Form Values
 * Usually, stock is updated through 'Stock Adjustment' or 'Sales'
 * but we keep Partial<Stock> for manual corrections if needed.
 */
type StockFormValues = Partial<Stock>;

// Initializing the factory for the "stock" endpoint
const stockApiHooks = createApiHooksFor<Stock, StockFormValues>("stock");

/**
 * Main hook to fetch the inventory list.
 * This is used in the StockList component.
 */
export const useStock = stockApiHooks.useGetList;

/**
 * Hook to fetch a specific stock record or IMEI details.
 */
export const useStockItem = stockApiHooks.useGetOne;

/**
 * Hook to update stock information (e.g., changing status or storage note).
 */
export const useUpdateStock = stockApiHooks.useUpdate;

/**
 * Hook to remove a stock record from the system.
 */
export const useDeleteStock = stockApiHooks.useDelete;

/**
 * Bulk operation hooks for inventory management.
 */
export const useDeleteManyStocks = createBulkDeleteHook<Stock>("stock");
export const useUpdateManyStocks = createBulkUpdateHook<Stock>("stock");

/**
 * Hook for dropdowns/options if you need to select from current stock 
 * in other modules (like Sales or Transfers).
 */
export interface StockOption {
  id: string;
  itemName: string;
  imei?: string;
}
export const useStockOptions = stockApiHooks.useGetOptions<StockOption>;