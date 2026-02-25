import { StockAdjustment } from "../stock-adjustment.schema";
import {
  STOCK_ADJUSTMENT_REASON_OPTIONS,
  STOCK_ADJUSTMENT_TYPE_OPTIONS,
} from "../stock-adjustment.constants";

const generateStockAdjustments = (count: number): StockAdjustment[] => {
  const itemNames = ["iPhone 15 Pro", "Samsung S23 Ultra", "Google Pixel 8", "OnePlus 11", "Xiaomi 13"];
  const imeis = ["354678129034567", "359981002345671", "862345091234876", "982234567100234", "357781009988776"];

  return Array.from({ length: count }).map((_, i) => {
    const typeOption = STOCK_ADJUSTMENT_TYPE_OPTIONS[i % STOCK_ADJUSTMENT_TYPE_OPTIONS.length];
    const reasonOption = STOCK_ADJUSTMENT_REASON_OPTIONS[i % STOCK_ADJUSTMENT_REASON_OPTIONS.length];
    
    const date = new Date();
    date.setDate(date.getDate() - i);

    return {
      id: `sa-${100 + i}`,
      stockId: `stk-${1 + (i % 5)}`, // Linked to a specific stock unit
      itemName: itemNames[i % 5],   // For UI display convenience
      imei: imeis[i % 5],           // Mobile specific identifier
      type: typeOption.value as "IN" | "OUT",
      quantity: 1, // Usually 1 for IMEI based adjustments
      reason: reasonOption.value as any, // Syncs with updated constants
      note: `Adjustment due to ${reasonOption.label}`,
      adjustedBy: "Admin User",
      date: date.toISOString(),
    };
  });
};

export const stockAdjustmentsMock: StockAdjustment[] = generateStockAdjustments(25);