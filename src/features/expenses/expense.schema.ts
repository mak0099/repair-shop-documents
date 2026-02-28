import { z } from "zod";
import { BaseEntity } from "@/types/common";

export const expenseSchema = z.object({
  title: z.string().trim().min(1, "Expense title is required"),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  date: z.date().default(() => new Date()),
  categoryId: z.string().min(1, "Expense category is required"),
  branchId: z.string().min(1, "Branch is required"),
  paymentMethod: z.enum(["CASH", "BANK_TRANSFER", "CARD", "MOBILE_BANKING"]).default("CASH"),
  referenceNo: z.string().optional().nullable(),
  vendorName: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  attachmentUrl: z.string().optional().nullable(),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
export type Expense = BaseEntity & z.infer<typeof expenseSchema>;