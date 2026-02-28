"use client";

import { createApiHooksFor } from "@/lib/api-factory";
import {
  createBulkDeleteHook,
  createBulkUpdateHook,
} from "@/lib/api-bulk-hooks";
import type { Customer, CustomerFormValues } from "./customer.schema";

/**
 * Customer API Hooks.
 * * Generics:
 * 1. Customer: The full entity type from the database.
 * 2. CustomerFormValues: The type for creating a new customer (Required fields).
 * 3. Partial<CustomerFormValues>: Enables partial updates (e.g., toggling isActive).
 */
const customerApiHooks = createApiHooksFor<
  Customer,
  CustomerFormValues,
  Partial<CustomerFormValues>
>("customers");

export interface CustomerOption {
  id: string;
  name: string;
  mobile: string;
}

// Standard Hooks
export const useCustomers = customerApiHooks.useGetList;
export const useCustomerOptions =
  customerApiHooks.useGetOptions<CustomerOption>;
export const useCreateCustomer = customerApiHooks.useCreate;
export const useUpdateCustomer = customerApiHooks.useUpdate;
export const usePartialUpdateCustomer = customerApiHooks.useUpdate; // For better readability in lists
export const useDeleteCustomer = customerApiHooks.useDelete;
export const useCustomer = customerApiHooks.useGetOne;

// Bulk Actions
export const useDeleteManyCustomers = createBulkDeleteHook("customers");
export const useUpdateManyCustomers =
  createBulkUpdateHook<Customer>("customers");
