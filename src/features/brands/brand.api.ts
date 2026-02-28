"use client"

import { createApiHooksFor } from "@/lib/api-factory"
import { createBulkDeleteHook, createBulkUpdateHook } from "@/lib/api-bulk-hooks"
import type { Brand, BrandFormValues } from "./brand.schema"

/**
 * FIX: Added Partial<BrandFormValues> as the 3rd generic to support partial updates.
 */
const brandApiHooks = createApiHooksFor<Brand, BrandFormValues, Partial<BrandFormValues>>("brands")

export interface BrandOption {
  id: string
  name: string
}

export const useBrands = brandApiHooks.useGetList
export const useBrandOptions = brandApiHooks.useGetOptions<BrandOption>
export const useCreateBrand = brandApiHooks.useCreate
export const useUpdateBrand = brandApiHooks.useUpdate
export const usePartialUpdateBrand = brandApiHooks.useUpdate
export const useDeleteBrand = brandApiHooks.useDelete

export const useDeleteManyBrands = createBulkDeleteHook("brands")
export const useUpdateManyBrands = createBulkUpdateHook<Brand>("brands")
export const useBrand = brandApiHooks.useGetOne