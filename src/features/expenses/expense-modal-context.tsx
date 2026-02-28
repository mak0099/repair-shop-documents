"use client"
import { createModalContext } from "@/lib/modal-context-factory"
import { Expense } from "./expense.schema";

const { ModalProvider, useModal } = createModalContext<Expense>({
  featureName: "Expense",
  formName: "expenseForm",
  modalClassName: "max-w-4xl max-h-[90vh] overflow-y-auto",
  addDescription: "Record a new business expense.",
  editDescription: "Update expense details.",
  viewDescription: "View expense details.",
})

export const ExpenseModalProvider = ModalProvider
export const useExpenseModal = useModal
