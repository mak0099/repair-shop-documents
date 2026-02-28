"use client"

import { createApiHooksFor } from "@/lib/api-factory";
import { createBulkDeleteHook, createBulkUpdateHook } from "@/lib/api-bulk-hooks";
import type { MasterSetting } from "./master-setting.schema";

/**
 * Standardized API configuration for Master Settings.
 * Using Partial<MasterSetting> for the update type ensures that we can 
 * update specific fields (like just 'values' or 'isActive') without errors.
 */
const masterSettingApiHooks = createApiHooksFor<MasterSetting, Partial<MasterSetting>>("master-settings");

export interface MasterSettingOption {
  id: string;
  name: string;
}

/**
 * Hook to fetch the list of all Master Settings category cards.
 */
export const useMasterSettings = masterSettingApiHooks.useGetList;

/**
 * Hook to fetch a specific Master Setting category (e.g., "Colors") by ID.
 */
export const useMasterSetting = masterSettingApiHooks.useGetOne;

/**
 * Hook to update settings within a category. 
 * This is used by the MasterSettingForm to save new entries.
 */
export const useUpdateMasterSetting = masterSettingApiHooks.useUpdate;

/**
 * Hook to delete an entire Master Setting category.
 */
export const useDeleteMasterSetting = masterSettingApiHooks.useDelete;

/**
 * Bulk operation hooks.
 * Standardized to match the pattern used in Brand, Category, and Item features.
 */
export const useDeleteManyMasterSettings = createBulkDeleteHook("master-settings");
export const useUpdateManyMasterSettings = createBulkUpdateHook<MasterSetting>("master-settings");

/**
 * Helper hook to get dropdown options (e.g., if you need a list of categories elsewhere).
 */
export const useMasterSettingOptions = masterSettingApiHooks.useGetOptions<MasterSettingOption>;