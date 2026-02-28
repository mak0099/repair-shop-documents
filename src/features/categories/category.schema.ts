"use client"

import { z } from "zod";
import { BaseEntity } from "@/types/common";

/**
 * Standardized Zod schema for Category.
 * Matches the 'Brand' pattern: focus only on form-fillable fields.
 */
export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

/**
 * Type used for React Hook Form (Create/Edit)
 */
export type CategoryFormValues = z.infer<typeof categorySchema>;

/**
 * Main Entity Interface.
 * Like Brand, we extend BaseEntity to get 'id', 'createdAt', etc.
 */
export interface Category extends BaseEntity, CategoryFormValues {}