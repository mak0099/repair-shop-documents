import { createApiHooksFor } from "@/lib/api-factory"
import { createBulkDeleteHook, createBulkUpdateHook } from "@/lib/api-bulk-hooks"
import type { User } from "./user.schema"
import type { UserFormValues } from "./user.schema"

const userApiHooks = createApiHooksFor<User, UserFormValues>("users")

export interface UserOption {
  id: string
  name: string
}

export const useUsers = userApiHooks.useGetList
export const useUserOptions = userApiHooks.useGetOptions<UserOption>
export const useCreateUser = userApiHooks.useCreate
export const useUpdateUser = userApiHooks.useUpdate
export const usePartialUpdateUser = userApiHooks.useUpdate
export const useDeleteUser = userApiHooks.useDelete

export const useDeleteManyUsers = createBulkDeleteHook<User>("users")
export const useUpdateManyUsers = createBulkUpdateHook<User>("users")
export const useUser = userApiHooks.useGetOne
