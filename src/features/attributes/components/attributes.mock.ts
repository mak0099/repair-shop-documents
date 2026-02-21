import type { Attribute } from "../attribute.schema";

export const mockAttributes: Attribute[] = [
  {
    id: "attr_1",
    name: "Color",
    values: [
      { value: "Black" },
      { value: "White" },
      { value: "Silver" },
      { value: "Space Gray" },
    ],
  },
  {
    id: "attr_2",
    name: "RAM",
    values: [
      { value: "4GB" },
      { value: "8GB" },
      { value: "16GB" },
      { value: "32GB" },
    ],
  },
  {
    id: "attr_3",
    name: "ROM",
    values: [
      { value: "64GB" },
      { value: "128GB" },
      { value: "256GB" },
      { value: "512GB" },
      { value: "1TB" },
    ],
  },
];