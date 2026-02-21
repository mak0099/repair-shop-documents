import { createApiHooksFor } from "@/lib/api-factory"
import { createBulkDeleteHook, createBulkUpdateHook } from "@/lib/api-bulk-hooks"
import type { Item } from "./item.schema"
import type { ItemFormValues } from "./item.schema"

const itemApiHooks = createApiHooksFor<Item, ItemFormValues>("items")

export interface ItemOption {
  id: string
  name: string
}

export const useItems = itemApiHooks.useGetList
export const useItemOptions = itemApiHooks.useGetOptions<ItemOption>
export const useCreateItem = itemApiHooks.useCreate
export const useUpdateItem = itemApiHooks.useUpdate
export const usePartialUpdateItem = itemApiHooks.useUpdate
export const useDeleteItem = itemApiHooks.useDelete

export const useDeleteManyItems = createBulkDeleteHook<Item>("items")
export const useUpdateManyItems = createBulkUpdateHook<Item>("items")
export const useItem = itemApiHooks.useGetOne
