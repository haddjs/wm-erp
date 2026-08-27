import { db, delay, genId, findById } from "@/lib/mock-db";
import type { PurchaseRecord } from "@/types/purchase-record";
import type { ExpenseResponse } from "@/types/expense";

export async function migrateExpenseToPurchaseRecord(
  expenseId: string,
  procurementItemId: string,
) {
  await delay();
  const expense = findById(db.expenses, expenseId);
  if (!expense) throw new Error("Expense not found");

  const now = new Date().toISOString();
  const record: PurchaseRecord = {
    id: genId("pr"),
    procurement_item_id: procurementItemId,
    recorded_by: expense.recorded_by,
    file_id: expense.file_id ?? null,
    quantity_bought: expense.amount,
    actual_unit_price:
      expense.amount > 0 ? expense.nominal / expense.amount : expense.nominal,
    actual_total_price: expense.nominal,
    merchant: expense.merchant ?? null,
    purchased_at: expense.date,
    notes: null,
    status: "submitted",
    created_at: now,
    updated_at: now,
    is_flagged: expense.is_flagged,
  };

  db.purchaseRecords.unshift(record);
  db.expenses = db.expenses.filter((e) => e.id !== expenseId);
  return record;
}

export async function migratePurchaseRecordToExpense(
  purchaseRecordId: string,
  branchId: string,
  name: string,
) {
  await delay();
  const record = findById(db.purchaseRecords, purchaseRecordId);
  if (!record) throw new Error("Purchase record not found");

  const expense: ExpenseResponse = {
    id: genId("exp"),
    recorded_by: record.recorded_by,
    branch_id: branchId,
    item_code: null,
    item_name: null,
    item_id: null,
    file_id: record.file_id ?? null,
    order_id: null,
    name: name || "Migrated purchase",
    date: record.purchased_at,
    amount: record.quantity_bought,
    nominal: record.actual_total_price,
    merchant: record.merchant ?? null,
    is_flagged: record.is_flagged,
  };

  db.expenses.unshift(expense);
  db.purchaseRecords = db.purchaseRecords.filter(
    (r) => r.id !== purchaseRecordId,
  );
  return expense;
}
