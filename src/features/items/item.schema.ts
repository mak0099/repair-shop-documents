import { z } from "zod";

export const itemSchema = z.object({
  id: z.string().optional(),
  sku: z.string().optional(),
  name: z.string().min(1, "Product name is required"),
  
  // Relational IDs
  categoryId: z.string().min(1, "Category is required"),
  brandId: z.string().min(1, "Brand is required"),
  modelId: z.string().optional().nullable(),
  supplierId: z.string().optional().nullable(),
  boxNumberId: z.string().optional().nullable(),
  
  // Technical Specifications
  deviceType: z.string().optional(),
  imei: z.string().optional(),
  color: z.string().optional(),
  ram: z.string().optional(),
  rom: z.string().optional(),
  processor: z.string().optional(),
  camera: z.string().optional(),
  size: z.string().optional(),
  batteryHealth: z.string().optional(),
  grade: z.string().optional(),

  // Pricing & Inventory
  purchasePrice: z.coerce.number().min(0).default(0),
  salePrice: z.coerce.number().min(0).default(0),
  initialStock: z.coerce.number().default(0),
  storageNote: z.string().optional(),
  
  // Flags
  condition: z.enum(["Used", "New"]).default("Used"),
  isBoxIncluded: z.boolean().default(false),
  isChargerIncluded: z.boolean().default(false),
  addToKhata: z.boolean().default(false),
  isTouchScreen: z.boolean().default(false),
  isSolidDevice: z.boolean().default(false),
  isActive: z.boolean().default(true),

  note: z.string().optional(),
  description: z.string().optional(),

  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Item = z.infer<typeof itemSchema>;
export type ItemFormValues = Item;