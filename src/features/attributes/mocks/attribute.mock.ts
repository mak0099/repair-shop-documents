import { Attribute } from "../attribute.schema";

const initialAttributes: Attribute[] = [
  {
    id: "attr-ram",
    name: "RAM",
    description: "System memory capacity",
    values: [
      { id: "v-ram-1", value: "4GB", isActive: true },
      { id: "v-ram-2", value: "8GB", isActive: true },
      { id: "v-ram-3", value: "12GB", isActive: true },
    ],
  },
  {
    id: "attr-rom",
    name: "ROM",
    description: "Internal storage capacity",
    values: [
      { id: "v-rom-1", value: "64GB", isActive: true },
      { id: "v-rom-2", value: "128GB", isActive: true },
      { id: "v-rom-3", value: "256GB", isActive: true },
    ],
  },
  {
    id: "attr-color",
    name: "Color",
    description: "Device colors",
    values: [
      { id: "v-col-1", value: "Black", isActive: true },
      { id: "v-col-2", value: "White", isActive: true },
      { id: "v-col-3", value: "Gold", isActive: true },
    ],
  },
];

export const mockAttributes: Attribute[] = initialAttributes;