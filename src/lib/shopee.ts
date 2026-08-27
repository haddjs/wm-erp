import { delay } from "./mock-db";
import type { ShopeeImportResult } from "@/types/shopee";
import type { PurchaseRecord } from "@/types/purchase-record";
import type { ExpenseResponse } from "@/types/expense";

function toISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export async function importShopeeOrders(
  from: Date,
  to: Date,
): Promise<ShopeeImportResult> {
  await delay(1200);
  const now = new Date().toISOString();
  const fromDate = toISODate(from);
  const toDate = toISODate(to);

  const records: PurchaseRecord[] = [
    {
      id: "shopee-pr-1",
      procurement_item_id: "ep-1-it-1",
      recorded_by: "GA User",
      file_id: null,
      quantity_bought: 2,
      actual_unit_price: 75000,
      actual_total_price: 150000,
      merchant: "Shopee Mall",
      purchased_at: fromDate,
      notes: "Imported from Shopee email",
      status: "submitted",
      created_at: now,
      updated_at: now,
      is_flagged: false,
    },
    {
      id: "shopee-pr-2",
      procurement_item_id: "ep-1-it-2",
      recorded_by: "GA User",
      file_id: null,
      quantity_bought: 1,
      actual_unit_price: 320000,
      actual_total_price: 320000,
      merchant: "Shopee Mall",
      purchased_at: toDate,
      notes: null,
      status: "submitted",
      created_at: now,
      updated_at: now,
      is_flagged: true,
    },
  ];

  const expenses: ExpenseResponse[] = [
    {
      id: "shopee-exp-1",
      recorded_by: "GA User",
      branch_id: "branch-1",
      item_code: null,
      item_name: null,
      item_id: null,
      file_id: null,
      order_id: "SP-1001",
      name: "Shopee Office Supplies",
      date: fromDate,
      amount: 1,
      nominal: 150000,
      merchant: "Shopee",
      is_flagged: false,
    },
  ];

  return {
    purchase_records: {
      count: records.length,
      flagged: records.filter((r) => r.is_flagged).length,
      data: records,
    },
    expenses: {
      count: expenses.length,
      flagged: expenses.filter((e) => e.is_flagged).length,
      data: expenses,
    },
    reconciliation: [
      {
        order_id: "SP-1001",
        total_amount: 1,
        total_nominal: 150000,
        reconciled: true,
        difference: 0,
      },
      {
        order_id: "SP-1002",
        total_amount: 2,
        total_nominal: 150000,
        reconciled: true,
        difference: 0,
      },
      {
        order_id: "SP-1003",
        total_amount: 1,
        total_nominal: 340000,
        reconciled: false,
        difference: 20000,
      },
    ],
    errors: [],
  };
}
