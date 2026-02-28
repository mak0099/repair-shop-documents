import { Expense } from "../expense.schema"

/**
 * Explicitly defining the template type to ensure the loop 
 * can access all properties safely.
 */
interface ExpenseTemplate {
  title: string;
  amount: number;
  categoryId: string;
  branchId: string;
  vendorName: string;
  paymentMethod: "CASH" | "BANK_TRANSFER" | "CARD" | "MOBILE_BANKING";
  notes: string;
}

const expenseTemplates: ExpenseTemplate[] = [
  { 
    title: "Office Rent", 
    amount: 1500, 
    categoryId: "m-ec-1", 
    branchId: "main-branch", 
    vendorName: "Property Management", 
    paymentMethod: "BANK_TRANSFER",
    notes: "Monthly office lease payment" 
  },
  { 
    title: "Internet Bill", 
    amount: 80, 
    categoryId: "m-ec-2", 
    branchId: "main-branch", 
    vendorName: "ISP Provider", 
    paymentMethod: "CASH",
    notes: "Fiber optic monthly charge" 
  },
  { 
    title: "New Keyboards", 
    amount: 250, 
    categoryId: "m-ec-5", 
    branchId: "main-branch", 
    vendorName: "Tech Hub", 
    paymentMethod: "CARD",
    notes: "Replacement for mechanical keyboards" 
  },
];

const generateExpenses = (count: number): Expense[] => {
  const expenses: Expense[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const template = expenseTemplates[i % expenseTemplates.length];
    const entryDate = new Date();
    entryDate.setDate(now.getDate() - i);

    expenses.push({
      id: `exp-${String(100 + i).padStart(3, '0')}`,
      title: i >= expenseTemplates.length 
        ? `${template.title} #${Math.floor(i / expenseTemplates.length) + 1}` 
        : template.title,
      amount: template.amount + (i >= expenseTemplates.length ? i * 5 : 0),
      date: entryDate,
      categoryId: template.categoryId,
      branchId: template.branchId,
      vendorName: template.vendorName,
      paymentMethod: template.paymentMethod,
      referenceNo: `REF-${2026}${String(i).padStart(4, '0')}`,
      notes: template.notes,
      attachmentUrl: i % 3 === 0 ? `https://picsum.photos/seed/${100 + i}/400/600` : null,
      createdAt: new Date(Date.now() - (count - i) * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  return expenses;
};

export const mockExpenses: Expense[] = generateExpenses(20);