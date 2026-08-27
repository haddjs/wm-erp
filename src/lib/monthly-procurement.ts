import { db, delay, genId, findById, findProcurementItem } from "./mock-db";
import type {
  MonthlyProcurement,
  ProcurementItem,
} from "@/types/monthly-procurement";

export async function getMonthlyProcurements(params: {
  branch_id?: string;
  page?: number;
  limit?: number;
}): Promise<MonthlyProcurement[]> {
  await delay();
  let result = db.monthlyProcurements;
  if (params.branch_id) {
    result = result.filter((p) => p.branch_id === params.branch_id);
  }
  return result;
}

export async function getMonthlyProcurementById(
  id: string,
): Promise<MonthlyProcurement> {
  await delay();
  const procurement = findById(db.monthlyProcurements, id);
  if (!procurement) throw new Error("Monthly procurement not found");
  return procurement;
}

export async function createMonthlyProcurement(data: {
  branch_id: string;
  period: string;
  items: {
    category_id: string;
    item_id: string | null;
    code: string;
    quantity: number;
    unit: string;
    unit_price: number;
    notes?: string;
  }[];
}): Promise<MonthlyProcurement> {
  await delay();
  const branch = findById(db.branches, data.branch_id);
  const now = new Date().toISOString();

  const items: ProcurementItem[] = data.items.map((it) => {
    const item = it.item_id ? findById(db.items, it.item_id) : undefined;
    return {
      id: genId("mp-it"),
      category_id: it.category_id,
      category_name: findById(db.categories, it.category_id)?.name ?? "Unknown Category",
      item_id: it.item_id,
      item_name: item?.name ?? null,
      file_id: null,
      code: it.code,
      quantity: it.quantity,
      unit: it.unit,
      unit_price: it.unit_price,
      total_price: it.quantity * it.unit_price,
      total_budget: it.quantity * it.unit_price,
      status: "pending" as const,
      notes: it.notes ?? null,
    };
  });

  const procurement: MonthlyProcurement = {
    id: genId("mp"),
    branch_id: data.branch_id,
    branch_name: branch?.name ?? "Unknown Branch",
    submitter_id: "user-2",
    submitter_name: "GA User",
    approver_name: null,
    period: data.period,
    status: "pending",
    total_nominal: items.reduce((s, i) => s + i.total_price, 0),
    actual_spending: 0,
    created_at: now,
    updated_at: now,
    procurement_items: items,
  };

  db.monthlyProcurements.unshift(procurement);
  return procurement;
}

export async function updateMonthlyProcurementStatus(
  id: string,
  status: "pending" | "approved" | "partial" | "rejected",
): Promise<MonthlyProcurement> {
  await delay();
  const procurement = findById(db.monthlyProcurements, id);
  if (!procurement) throw new Error("Monthly procurement not found");
  procurement.status = status;
  procurement.updated_at = new Date().toISOString();
  return procurement;
}

export async function updateProcurementItemStatus(
  id: string,
  status: "pending" | "purchased" | "completed",
): Promise<ProcurementItem> {
  await delay();
  const ref = findProcurementItem(id);
  if (!ref) throw new Error("Procurement item not found");
  ref.item.status = status;
  return ref.item;
}

export async function reviseMonthlyProcurement(
  id: string,
  body?: {
    period?: string;
    items?: {
      category_id: string;
      item_id: string;
      code: string;
      quantity: number;
      unit: string;
      unit_price: number;
      notes?: string;
    }[];
  },
) {
  await delay();
  const procurement = findById(db.monthlyProcurements, id);
  if (!procurement) throw new Error("Monthly procurement not found");
  if (body?.period) procurement.period = body.period;
  if (body?.items) {
    procurement.procurement_items = body.items.map((it) => {
      const item = it.item_id ? findById(db.items, it.item_id) : undefined;
      return {
        id: genId("mp-it"),
        category_id: it.category_id,
        category_name: findById(db.categories, it.category_id)?.name ?? "Unknown Category",
        item_id: it.item_id,
        item_name: item?.name ?? null,
        file_id: null,
        code: it.code,
        quantity: it.quantity,
        unit: it.unit,
        unit_price: it.unit_price,
        total_price: it.quantity * it.unit_price,
        total_budget: it.quantity * it.unit_price,
        status: "pending" as const,
        notes: it.notes ?? null,
      };
    });
    procurement.total_nominal = procurement.procurement_items.reduce(
      (s, i) => s + i.total_price,
      0,
    );
  }
  procurement.updated_at = new Date().toISOString();
  return procurement;
}
