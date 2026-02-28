import { Item } from "../item.schema"

const itemData = [
  { name: "iPhone 15 Pro", sku: "APL-IP15P-256", price: 999, cost: 800, brandId: "brand-100" },
  { name: "Galaxy S24 Ultra", sku: "SAM-S24U-512", price: 1299, cost: 1000, brandId: "brand-101" },
  { name: "Screen Replacement Kit", sku: "SP-GEN-SCN01", price: 49.99, cost: 20, brandId: "brand-100" },
  { name: "USB-C Charger", sku: "ACC-USBC-20W", price: 19.99, cost: 5, brandId: "brand-100" },
  { name: "Pixel 8 Pro", sku: "GOO-P8P-128", price: 899, cost: 700, brandId: "brand-105" },
];

/**
 * Generates mock items ensuring all boolean flags and required fields are present.
 * This fixes the missing 'isTouchScreen' and 'isSolidDevice' error.
 */
const generateItems = (count: number): Item[] => {
  const items: Item[] = [];
  for (let i = 0; i < count; i++) {
    const itemInfo = itemData[i % itemData.length];
    const isDuplicate = i >= itemData.length;
    
    items.push({
      id: `item-${String(100 + i).padStart(3, '0')}`,
      name: isDuplicate ? `${itemInfo.name} ${Math.floor(i / itemData.length) + 1}` : itemInfo.name,
      sku: isDuplicate ? `${itemInfo.sku}-${i}` : itemInfo.sku,
      
      // Relational IDs
      categoryId: "cat-101",
      brandId: itemInfo.brandId,
      modelId: `model-${i % 5}`,
      supplierId: "supp-201",
      boxNumberId: "box-301",

      // Pricing (Ensuring camelCase as per Schema)
      purchasePrice: itemInfo.cost + (isDuplicate ? i * 5 : 0),
      salePrice: itemInfo.price + (isDuplicate ? i * 10 : 0),
      initialStock: Math.floor(Math.random() * 100),
      
      // Boolean Flags - Consistency Check
      isActive: i % 7 !== 0,
      isBoxIncluded: i % 2 === 0,
      isChargerIncluded: i % 3 === 0,
      addToKhata: false,
      
      // FIX: Adding missing properties that caused the error
      isTouchScreen: i % 2 === 0, 
      isSolidDevice: true,
      
      // Additional Specs
      condition: i % 2 === 0 ? "New" : "Used",
      deviceType: "Mobile",
      color: ['Black', 'White', 'Blue'][i % 3],
      ram: "8GB",
      rom: "256GB",
      createdAt: new Date(Date.now() - (count - i) * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  return items;
};

export const mockItems: Item[] = generateItems(30);