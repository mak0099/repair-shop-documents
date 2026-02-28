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
    const timestamp = date.toISOString();

    return {
      id: `sa-${100 + i}`,
      stockId: `stk-${1 + (i % 5)}`,
      itemName: itemNames[i % 5],
      imei: imeis[i % 5],
      type: typeOption.value as "IN" | "OUT",
      quantity: 1,
      /**
       * FIX: Using type casting to StockAdjustment['reason'] instead of 'any'
       * to keep the code strictly typed.
       */
      reason: reasonOption.value as StockAdjustment['reason'],
      note: `Adjustment due to ${reasonOption.label}`,
      adjustedBy: "Admin User",
      date: timestamp,
      // Adding missing BaseEntity properties
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  });
};

export const stockAdjustmentsMock: StockAdjustment[] = generateStockAdjustments(25);