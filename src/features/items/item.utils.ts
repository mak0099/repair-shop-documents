import { ItemVariant } from "./item.schema";

/**
 * Generates a slug-friendly SKU based on product name and attributes.
 */
export const generateSKU = (productName: string, attributes: Record<string, string>): string => {
  const prefix = productName.substring(0, 3).toUpperCase();
  const attrValues = Object.values(attributes)
    .map((val) => val.substring(0, 3).toUpperCase())
    .join("-");
  
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${attrValues}-${randomSuffix}`;
};

/**
 * Creates a Cartesian Product of attributes to generate all possible combinations.
 */
export const generateCartesianProduct = (entries: [string, string[]][]): Record<string, string>[] => {
  return entries.reduce<Record<string, string>[]>(
    (results, [key, values]) => {
      const newResults: Record<string, string>[] = [];
      results.forEach((result) => {
        values.forEach((value) => {
          newResults.push({ ...result, [key]: value });
        });
      });
      return newResults;
    },
    [{}]
  );
};

/**
 * Formats a display name for a variant (e.g., iPhone 13 - Red - 128GB)
 */
export const formatVariantName = (productName: string, attributes: Record<string, string>): string => {
  const attrString = Object.values(attributes).join(" - ");
  return attrString ? `${productName} - ${attrString}` : productName;
};

/**
 * Transforms attribute selections into an initial array of ItemVariants.
 */
export const createVariantsFromAttributes = (
  productName: string,
  selectedAttributes: Record<string, string[]>,
  basePrice: number = 0
): Partial<ItemVariant>[] => {
  const attributeEntries = Object.entries(selectedAttributes);
  const combinations = generateCartesianProduct(attributeEntries);

  return combinations.map((combination) => ({
    sku: generateSKU(productName, combination),
    attributes: combination,
    purchasePrice: basePrice,
    sellingPrice: basePrice,
    stockQuantity: 0,
    isActive: true,
  }));
};