import { Stock } from "../stock.schema";

const stockData = [
  {
    itemName: "iPhone 15 Pro",
    sku: "IP15P-256-DP",
    attributes: {
      RAM: "8GB",
      ROM: "256GB",
      COLOR: "Deep Purple",
      GRADE: "Brand New"
    },
    categoryName: "Smartphone",
    brandName: "Apple",
    modelName: "iPhone 15 Pro",
    boxNumber: "B-01",
    boxLocationName: "Section A, Rack 1",
    storageNote: "Top shelf, right side",
    status: "Ready for Sale",
    condition: "New" as const,
    sellingPrice: 145000,
    purchasePrice: 130000,
  },
  {
    itemName: "Google Pixel 8",
    sku: "GP8-128-OBS",
    attributes: {
      RAM: "8GB",
      ROM: "128GB",
      COLOR: "Obsidian",
      GRADE: "Grade A"
    },
    categoryName: "Smartphone",
    brandName: "Google",
    modelName: "Pixel 8",
    boxNumber: "B-05",
    boxLocationName: "Testing Lab",
    storageNote: "Drawer 2, near front",
    status: "In Testing",
    condition: "Used" as const,
    sellingPrice: 65000,
    purchasePrice: 55000,
  },
  {
    itemName: "Samsung Galaxy S23 Ultra",
    sku: "S23U-512-GRN",
    attributes: {
      RAM: "12GB",
      ROM: "512GB",
      COLOR: "Green",
      GRADE: "Grade B"
    },
    categoryName: "Smartphone",
    brandName: "Samsung",
    modelName: "S23 Ultra",
    boxNumber: "B-02",
    boxLocationName: "Display Center",
    storageNote: "Main display cabinet",
    status: "Ready for Sale",
    condition: "Used" as const,
    sellingPrice: 98000,
    purchasePrice: 82000,
  },
  {
    itemName: "OnePlus 11",
    sku: "OP11-256-BLK",
    attributes: {
      RAM: "16GB",
      ROM: "256GB",
      COLOR: "Eternal Black",
      GRADE: "Grade A"
    },
    categoryName: "Smartphone",
    brandName: "OnePlus",
    modelName: "11 5G",
    boxNumber: "B-10",
    boxLocationName: "Warehouse",
    storageNote: "Home stock / Warehouse",
    status: "Pending",
    condition: "Used" as const,
    sellingPrice: 58000,
    purchasePrice: 48000,
  }
];

const generateStocks = (count: number): Stock[] => {
  const stocks: Stock[] = [];
  for (let i = 0; i < count; i++) {
    const stockInfo = stockData[i % stockData.length];
    const isDuplicate = i >= stockData.length;
    const timestamp = new Date(Date.now() - (count - i) * 3600000).toISOString();
    
    stocks.push({
      id: `stk-${String(100 + i).padStart(3, '0')}`,
      itemName: isDuplicate ? `${stockInfo.itemName} ${Math.floor(i / stockData.length) + 1}` : stockInfo.itemName,
      sku: isDuplicate ? `${stockInfo.sku}-${i}` : stockInfo.sku,
      imei: `35${String(Math.floor(Math.random() * 1000000000000)).padStart(13, '0')}`,
      attributes: stockInfo.attributes,
      categoryName: stockInfo.categoryName,
      brandName: stockInfo.brandName,
      modelName: stockInfo.modelName,
      boxNumber: stockInfo.boxNumber,
      boxLocationName: stockInfo.boxLocationName,
      storageNote: stockInfo.storageNote,
      status: stockInfo.status,
      condition: stockInfo.condition,
      stockQuantity: Math.floor(Math.random() * 20),
      lowStockThreshold: 2,
      unit: "Pcs",
      purchasePrice: stockInfo.purchasePrice,
      sellingPrice: stockInfo.sellingPrice,
      isActive: i % 10 !== 0,
      /**
       * FIX: Renamed lastUpdated to updatedAt to match BaseEntity.
       */
      updatedAt: timestamp,
      createdAt: new Date(Date.now() - (count - i) * 86400000).toISOString(),
    });
  }
  return stocks;
};

export const mockStock: Stock[] = generateStocks(30);