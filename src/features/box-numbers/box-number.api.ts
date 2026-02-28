"use client"

import { createApiHooksFor } from "@/lib/api-factory"
import { createBulkDeleteHook, createBulkUpdateHook } from "@/lib/api-bulk-hooks"
import type { BoxNumber } from "./box-number.schema"

/**
 * FIX: Added 'Partial<BoxNumber>' as the 3rd generic.
 * Generic 1: The result type (BoxNumber)
 * Generic 2: The create payload (BoxNumber)
 * Generic 3: The update payload (Partial<BoxNumber>) - THIS IS THE FIX.
 * * This allows PATCH requests to send only the fields that changed (like isActive),
 * without complaining about missing 'name' or 'location'.
 */
const boxNumberApiHooks = createApiHooksFor<BoxNumber, BoxNumber, Partial<BoxNumber>>("box-numbers")

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

export const useDeleteManyBoxNumbers = createBulkDeleteHook("box-numbers")
export const useUpdateManyBoxNumbers = createBulkUpdateHook<BoxNumber>("box-numbers")
export const useBoxNumber = boxNumberApiHooks.useGetOne