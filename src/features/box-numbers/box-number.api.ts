import { createApiHooksFor } from "@/lib/api-factory"
import { createBulkDeleteHook, createBulkUpdateHook } from "@/lib/api-bulk-hooks"
import type { BoxNumber } from "./box-number.schema"

const boxNumberApiHooks = createApiHooksFor<BoxNumber, BoxNumber>("box-numbers")

export interface BoxNumberOption {
  id: string
  name: string
}

export const useBoxNumbers = boxNumberApiHooks.useGetList
export const useBoxNumberOptions = boxNumberApiHooks.useGetOptions<BoxNumberOption>
export const useCreateBoxNumber = boxNumberApiHooks.useCreate
export const useUpdateBoxNumber = boxNumberApiHooks.useUpdate
export const usePartialUpdateBoxNumber = boxNumberApiHooks.useUpdate
export const useDeleteBoxNumber = boxNumberApiHooks.useDelete

export const useDeleteManyBoxNumbers = createBulkDeleteHook<BoxNumber>("box-numbers")
export const useUpdateManyBoxNumbers = createBulkUpdateHook<BoxNumber>("box-numbers")
export const useBoxNumber = boxNumberApiHooks.useGetOne