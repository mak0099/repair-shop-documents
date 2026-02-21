import { StockAdjustment } from "../stock-adjustment.schema";
import {
  STOCK_ADJUSTMENT_REASON_OPTIONS,
  STOCK_ADJUSTMENT_TYPE_OPTIONS,
} from "../stock-adjustment.constants";

const generateStockAdjustments = (count: number): StockAdjustment[] => {
  return Array.from({ length: count }).map((_, i) => {
    const typeOption =
      STOCK_ADJUSTMENT_TYPE_OPTIONS[i % STOCK_ADJUSTMENT_TYPE_OPTIONS.length];
    const reasonOption =
      STOCK_ADJUSTMENT_REASON_OPTIONS[i % STOCK_ADJUSTMENT_REASON_OPTIONS.length];
    const date = new Date();
    date.setDate(date.getDate() - i);

    return {
      id: `sa-${100 + i}`,
      itemId: `item-${1 + (i % 5)}`,
      type: typeOption.value as "IN" | "OUT",
      quantity: (i % 10) + 1,
      reason: reasonOption.value as "Damage" | "Theft" | "Inventory Audit" | "Return" | "Restock" | "Other",
      note: `Note for stock adjustment ${i + 1}`,
      date: date.toISOString(),
    };
  });
};

export const stockAdjustmentsMock: StockAdjustment[] = generateStockAdjustments(25);