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
    storageNote: "Top shelf, right side",
    status: "Ready for Sale",
    condition: "New",
    sellingPrice: 145000,
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
    storageNote: "Drawer 2, near front",
    status: "In Testing",
    condition: "Used",
    sellingPrice: 65000,
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
    storageNote: "Main display cabinet",
    status: "Ready for Sale",
    condition: "Used",
    sellingPrice: 98000,
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
    storageNote: "Home stock / Warehouse",
    status: "Pending",
    condition: "Used",
    sellingPrice: 58000,
  }
];

const generateStocks = (count: number): Stock[] => {
  const stocks: Stock[] = [];
  for (let i = 0; i < count; i++) {
    const stockInfo = stockData[i % stockData.length];
    const isDuplicate = i >= stockData.length;
    
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
      storageNote: stockInfo.storageNote,
      status: stockInfo.status,
      condition: stockInfo.condition as "New" | "Used",
      stockQuantity: Math.floor(Math.random() * 20),
      lowStockThreshold: 2,
      unit: "Pcs",
      sellingPrice: stockInfo.sellingPrice,
      isActive: i % 10 !== 0,
      lastUpdated: new Date(Date.now() - (count - i) * 3600000).toISOString(),
      createdAt: new Date(Date.now() - (count - i) * 86400000).toISOString(),
    });
  }
  return stocks;
};

export const mockStock: Stock[] = generateStocks(30);