import { Category } from "../category.schema"

/**
 * Raw data for initial categories.
 * Standardized: Using 'parentId' instead of 'parent_id'.
 */
const categoryData = [
  { name: "Electronics", description: "All kinds of electronic devices", parentId: null },
  { name: "Smartphones", description: "Mobile phones with advanced features", parentId: "cat-100" },
  { name: "Laptops", description: "Portable computers", parentId: "cat-100" },
  { name: "Accessories", description: "Chargers, cases, and more", parentId: null },
  { name: "Cases", description: "Protective cases for devices", parentId: "cat-103" },
];

/**
 * Generates mock categories ensuring strict alignment with Category schema.
 * FIX: Replaced 'parent_id' with 'parentId'.
 */
const generateCategories = (count: number): Category[] => {
  const categories: Category[] = [];
  for (let i = 0; i < count; i++) {
    const categoryInfo = categoryData[i % categoryData.length];
    const isDuplicate = i >= categoryData.length;
    
    categories.push({
      id: `cat-${String(100 + i).padStart(3, '0')}`,
      name: isDuplicate ? `${categoryInfo.name} ${Math.floor(i / categoryData.length) + 1}` : categoryInfo.name,
      description: categoryInfo.description || "",
      // FIX: Changed from parent_id to parentId
      parentId: categoryInfo.parentId || null,
      // Consistency: Boolean isActive flag
      isActive: i % 10 !== 0,
      createdAt: new Date(Date.now() - (count - i) * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - (count - i) * 12 * 60 * 60 * 1000).toISOString(),
    });
  }
  return categories;
};

export const mockCategories: Category[] = generateCategories(10);