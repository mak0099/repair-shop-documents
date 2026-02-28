"use client"

import { delay, http, HttpResponse } from "msw"
import { applySort } from "@/mocks/mock-utils"
import { Expense } from "../expense.schema"
import { mockExpenses } from "./expenses.mock"
import { mockMasterSettings } from "@/features/master-settings/mocks/master-setting.mock"

/**
 * Local state for expenses.
 */
let expenses: Expense[] = [...mockExpenses];

/**
 * Type-safe helper to find category labels.
 */
const getCategoryLabel = (categoryId: string): string | undefined => {
  const expenseMaster = mockMasterSettings.find(s => s.key === "EXPENSE_CATEGORY");
  return expenseMaster?.values.find(v => v.id === categoryId)?.value;
};

export const expenseHandlers = [
  // 1. GET: Fetch list with pagination and search
  http.get("*/expenses", async ({ request }) => {
    await delay(400);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "1");
    const pageSize = Number(url.searchParams.get("pageSize") || "10");
    const search = url.searchParams.get("search")?.toLowerCase() || "";
    const sort = url.searchParams.get("_sort");
    const order = url.searchParams.get("_order");

    const filteredData = expenses.filter((e) => 
      e.title.toLowerCase().includes(search) || 
      e.vendorName?.toLowerCase().includes(search)
    );

    const sortedData = applySort(filteredData, sort, order) as Expense[];

    const dataWithLabels = sortedData.map(expense => ({
      ...expense,
      categoryLabel: getCategoryLabel(expense.categoryId)
    }));

    const total = dataWithLabels.length;
    const start = (page - 1) * pageSize;
    const paginatedData = dataWithLabels.slice(start, start + pageSize);

    return HttpResponse.json({
      data: paginatedData,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  }),

  // 2. GET: Single expense by ID
  http.get("*/expenses/:id", ({ params }) => {
    const { id } = params;
    const expense = expenses.find((e) => e.id === id);
    if (!expense) return new HttpResponse(null, { status: 404 });

    return HttpResponse.json({
      ...expense,
      categoryLabel: getCategoryLabel(expense.categoryId)
    });
  }),

  // 3. POST: Create new expense
  http.post("*/expenses", async ({ request }) => {
    await delay(800);
    const formData = await request.formData();
    
    // Strict file handling without 'any'
    const attachmentFile = formData.get("attachmentUrl");
    let attachmentUrl: string | null = null;

    if (attachmentFile instanceof File) {
      attachmentUrl = URL.createObjectURL(attachmentFile);
    } else if (typeof attachmentFile === "string") {
      attachmentUrl = attachmentFile;
    }

    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      title: String(formData.get("title") || ""),
      amount: Number(formData.get("amount") || 0),
      date: new Date(String(formData.get("date"))),
      categoryId: String(formData.get("categoryId") || ""),
      branchId: String(formData.get("branchId") || "main-branch"),
      paymentMethod: (formData.get("paymentMethod") as Expense["paymentMethod"]) || "CASH",
      vendorName: formData.get("vendorName") ? String(formData.get("vendorName")) : null,
      referenceNo: formData.get("referenceNo") ? String(formData.get("referenceNo")) : null,
      notes: formData.get("notes") ? String(formData.get("notes")) : null,
      attachmentUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expenses.unshift(newExpense);
    return HttpResponse.json(newExpense, { status: 201 });
  }),

  // 4. PATCH: Update expense
  http.patch("*/expenses/:id", async ({ params, request }) => {
    await delay(800);
    const { id } = params;
    const formData = await request.formData();
    
    const index = expenses.findIndex(e => e.id === id);
    if (index === -1) return new HttpResponse(null, { status: 404 });

    const current = expenses[index];
    const attachmentFile = formData.get("attachmentUrl");
    let attachmentUrl = current.attachmentUrl;

    if (attachmentFile instanceof File) {
      attachmentUrl = URL.createObjectURL(attachmentFile);
    } else if (formData.get("attachmentUrl") === "null") {
      attachmentUrl = null;
    }

    const updatedExpense: Expense = {
      ...current,
      title: formData.has("title") ? String(formData.get("title")) : current.title,
      amount: formData.has("amount") ? Number(formData.get("amount")) : current.amount,
      date: formData.has("date") ? new Date(String(formData.get("date"))) : current.date,
      categoryId: formData.has("categoryId") ? String(formData.get("categoryId")) : current.categoryId,
      paymentMethod: formData.has("paymentMethod") 
        ? (formData.get("paymentMethod") as Expense["paymentMethod"]) 
        : current.paymentMethod,
      vendorName: formData.has("vendorName") ? String(formData.get("vendorName")) : current.vendorName,
      referenceNo: formData.has("referenceNo") ? String(formData.get("referenceNo")) : current.referenceNo,
      notes: formData.has("notes") ? String(formData.get("notes")) : current.notes,
      attachmentUrl,
      updatedAt: new Date().toISOString()
    };

    expenses[index] = updatedExpense;
    return HttpResponse.json(updatedExpense);
  }),

  // 5. DELETE: Remove single or bulk
  http.delete("*/expenses/:id", ({ params }) => {
    const { id } = params;
    expenses = expenses.filter((e) => e.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),

  http.delete("*/expenses", async ({ request }) => {
    const { ids } = (await request.json()) as { ids: string[] };
    expenses = expenses.filter((e) => !ids.includes(e.id));
    return HttpResponse.json({ success: true });
  }),
];