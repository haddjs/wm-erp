import { db, delay, genId, paged, findById } from "@/lib/mock-db";
import {
  ExpenseListResponse,
  ExpenseDetailResponse,
  CreateExpensePayload,
  UpdateExpensePayload,
  ExpenseResponse,
} from "@/types/expense";

export async function getExpenses(
  page = 1,
  limit = 10,
): Promise<ExpenseListResponse> {
  await delay();
  const { data, paging } = paged(db.expenses, page, limit);
  return { success: true, message: "OK", data, paging, code: 200 };
}

export async function getExpenseById(
  id: string,
): Promise<ExpenseDetailResponse> {
  await delay();
  const expense = findById(db.expenses, id);
  if (!expense) throw new Error("Expense not found");
  return { success: true, data: expense };
}

export async function createExpense(
  payload: CreateExpensePayload,
): Promise<ExpenseDetailResponse> {
  await delay();
  const item = payload.item_id
    ? findById(db.items, payload.item_id)
    : undefined;
  const expense: ExpenseResponse = {
    id: genId("exp"),
    recorded_by: "GA User",
    branch_id: payload.branch_id ?? null,
    item_code: item?.code ?? null,
    item_name: item?.name ?? null,
    item_id: payload.item_id ?? null,
    file_id: payload.file_id ?? null,
    order_id: payload.order_id ?? null,
    name: payload.name,
    date: payload.date,
    amount: payload.amount,
    nominal: payload.nominal,
    merchant: payload.merchant ?? null,
    is_flagged: false,
  };
  db.expenses.unshift(expense);
  return { success: true, data: expense };
}

export async function updateExpense(
  id: string,
  payload: UpdateExpensePayload,
): Promise<ExpenseDetailResponse> {
  await delay();
  const expense = findById(db.expenses, id);
  if (!expense) throw new Error("Expense not found");
  Object.assign(expense, payload);
  return { success: true, data: expense };
}

export async function attachInvoice(
  id: string,
  file_id: string,
): Promise<ExpenseDetailResponse> {
  await delay();
  const expense = findById(db.expenses, id);
  if (!expense) throw new Error("Expense not found");
  expense.file_id = file_id;
  return { success: true, data: expense };
}

export async function deleteExpense(id: string): Promise<void> {
  await delay();
  db.expenses = db.expenses.filter((e) => e.id !== id);
}
