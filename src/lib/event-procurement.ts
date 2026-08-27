import { db, delay, genId, findById, findProcurementItem } from "./mock-db";
import type { EventProcurement } from "@/types/event-procurement";
import type { ProcurementItem } from "@/types/monthly-procurement";

export async function getEventProcurements(params: {
  branch_id?: string;
  page?: number;
  limit?: number;
}): Promise<EventProcurement[]> {
  await delay();
  let result = db.eventProcurements;
  if (params.branch_id) {
    result = result.filter((p) => p.branch_id === params.branch_id);
  }
  return result;
}

export async function getEventProcurementById(
  id: string,
): Promise<{ data: EventProcurement }> {
  await delay();
  const procurement = findById(db.eventProcurements, id);
  if (!procurement) throw new Error("Event procurement not found");
  return { data: procurement };
}

export async function createEventProcurement(data: {
  branch_id: string;
  name: string;
  date: string;
  items: {
    category_id: string;
    item_id: string | null;
    code: string;
    quantity: number;
    unit: string;
    unit_price: number;
    notes?: string | null;
  }[];
}): Promise<EventProcurement> {
  await delay();
  const branch = findById(db.branches, data.branch_id);
  const now = new Date().toISOString();

  const items: ProcurementItem[] = data.items.map((it) => {
    const item = it.item_id ? findById(db.items, it.item_id) : undefined;
    return {
      id: genId("ep-it"),
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

  const procurement: EventProcurement = {
    id: genId("ep"),
    branch_id: data.branch_id,
    branch_name: branch?.name ?? "Unknown Branch",
    submitter_id: "user-2",
    submitter_name: "GA User",
    approver_name: null,
    name: data.name,
    date: data.date,
    status: "pending",
    total_nominal: items.reduce((s, i) => s + i.total_price, 0),
    actual_spending: 0,
    created_at: now,
    updated_at: now,
    procurement_items: items,
  };

  db.eventProcurements.unshift(procurement);
  return procurement;
}

export async function updateEventProcurementStatus(
  id: string,
  status: "pending" | "approved" | "rejected" | "disburse",
): Promise<EventProcurement> {
  await delay();
  const procurement = findById(db.eventProcurements, id);
  if (!procurement) throw new Error("Event procurement not found");
  procurement.status = status;
  procurement.updated_at = new Date().toISOString();
  return procurement;
}

export async function updateProcurementItemStatus(
  id: string,
  status: "pending" | "purchased" | "completed",
): Promise<EventProcurement> {
  await delay();
  const ref = findProcurementItem(id);
  if (!ref || ref.kind !== "event") throw new Error("Procurement item not found");
  ref.item.status = status;
  return ref.parent as EventProcurement;
}

export async function reviseEventProcurement(
  id: string,
  body?: {
    name?: string;
    date?: string;
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
  const procurement = findById(db.eventProcurements, id);
  if (!procurement) throw new Error("Event procurement not found");
  if (body?.name) procurement.name = body.name;
  if (body?.date) procurement.date = body.date;
  if (body?.items) {
    procurement.procurement_items = body.items.map((it) => {
      const item = it.item_id ? findById(db.items, it.item_id) : undefined;
      return {
        id: genId("ep-it"),
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
