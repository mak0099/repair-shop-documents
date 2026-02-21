import { BarcodeRequest } from "../barcode.schema";

export const sampleBarcodeRequest: BarcodeRequest = {
  itemId: "item-1",
  quantity: 10,
  labelSize: "38x25mm",
  includeName: true,
  includePrice: true,
};