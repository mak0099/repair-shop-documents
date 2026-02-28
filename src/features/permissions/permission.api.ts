"use client"

import { createApiHooksFor } from "@/lib/api-factory"
import { createBulkDeleteHook, createBulkUpdateHook } from "@/lib/api-bulk-hooks"
import type { Permission } from "./permission.schema"

const permissionApiHooks = createApiHooksFor<Permission, Partial<Permission>>("permissions")

export interface PermissionOption {
  id: string
  name: string
}

export const usePermissions = permissionApiHooks.useGetList
export const usePermissionOptions = permissionApiHooks.useGetOptions<PermissionOption>
export const useCreatePermission = permissionApiHooks.useCreate
export const useUpdatePermission = permissionApiHooks.useUpdate
export const usePartialUpdatePermission = permissionApiHooks.useUpdate
export const useDeletePermission = permissionApiHooks.useDelete

export const useDeleteManyPermissions = createBulkDeleteHook("permissions")
export const useUpdateManyPermissions = createBulkUpdateHook<Permission>("permissions")
export const usePermission = permissionApiHooks.useGetOne
