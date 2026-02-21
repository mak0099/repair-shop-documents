import { createApiHooksFor } from "@/lib/api-factory"
import { createBulkDeleteHook, createBulkUpdateHook } from "@/lib/api-bulk-hooks"
import type { Category } from "./category.schema"
import type { CategoryFormValues } from "./category.schema"

const categoryApiHooks = createApiHooksFor<Category, CategoryFormValues>("categories")

export interface CategoryOption {
  id: string
  name: string
}

export const useCategories = categoryApiHooks.useGetList
export const useCategoryOptions = (parentId?: string) =>
  categoryApiHooks.useGetOptions<CategoryOption>({ parentId })
export const useCreateCategory = categoryApiHooks.useCreate
export const useUpdateCategory = categoryApiHooks.useUpdate
export const usePartialUpdateCategory = categoryApiHooks.useUpdate
export const useDeleteCategory = categoryApiHooks.useDelete

export const useDeleteManyCategories = createBulkDeleteHook<Category>("categories")
export const useUpdateManyCategories = createBulkUpdateHook<Category>("categories")
export const useCategory = categoryApiHooks.useGetOne
