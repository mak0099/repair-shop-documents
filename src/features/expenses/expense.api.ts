"use client"

import { createApiHooksFor } from "@/lib/api-factory"
import { createBulkDeleteHook } from "@/lib/api-bulk-hooks"
import type { Expense } from "./expense.schema"

const expenseApiHooks = createApiHooksFor<Expense, Partial<Expense>>("expenses")

export interface ExpenseOption {
  id: string
  title: string
}

export const useExpenses = expenseApiHooks.useGetList
export const useExpenseOptions = expenseApiHooks.useGetOptions<ExpenseOption>
export const useCreateExpense = expenseApiHooks.useCreateWithFormData
export const useUpdateExpense = expenseApiHooks.useUpdateWithFormData
export const usePartialUpdateExpense = expenseApiHooks.useUpdate
export const useDeleteExpense = expenseApiHooks.useDelete

export const useDeleteManyExpenses = createBulkDeleteHook("expenses")
export const useExpense = expenseApiHooks.useGetOne
