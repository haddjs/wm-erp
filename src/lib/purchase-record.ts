import { db, delay, genId, findById } from "./mock-db";
import type {
  CreatePurchaseRecordPayload,
  PurchaseRecord,
  PurchaseRecordStatus,
  UpdatePurchaseRecordPayload,
} from "@/types/purchase-record";

export async function getPurchaseRecordsByItemId(
  procurementItemId: string,
  page?: number,
  limit?: number,
): Promise<{ data: PurchaseRecord[]; total: number }> {
  await delay();
  const records = db.purchaseRecords.filter(
    (r) => r.procurement_item_id === procurementItemId,
  );
  const total = records.length;
  const p = page ?? 1;
  const l = limit ?? 100;
  const start = (p - 1) * l;
  const data = records.slice(start, start + l);
  return { data, total };
}

export async function getPurchaseRecordById(
  id: string,
): Promise<PurchaseRecord> {
  await delay();
  const record = findById(db.purchaseRecords, id);
  if (!record) throw new Error("Purchase record not found");
  return record;
}

export async function createPurchaseRecord(
  data: CreatePurchaseRecordPayload,
): Promise<PurchaseRecord> {
  await delay();
  const now = new Date().toISOString();
  const record: PurchaseRecord = {
    id: genId("pr"),
    procurement_item_id: data.procurement_item_id,
    recorded_by: "GA User",
    file_id: data.file_id ?? null,
    quantity_bought: data.quantity_bought,
    actual_unit_price: data.actual_unit_price,
    actual_total_price: data.quantity_bought * data.actual_unit_price,
    merchant: data.merchant ?? null,
    purchased_at: data.purchased_at,
    notes: data.notes ?? null,
    status: "submitted",
    created_at: now,
    updated_at: now,
    is_flagged: false,
  };
  db.purchaseRecords.unshift(record);
  return record;
}

export async function updatePurchaseRecord(
  id: string,
  data: UpdatePurchaseRecordPayload,
): Promise<PurchaseRecord> {
  await delay();
  const record = findById(db.purchaseRecords, id);
  if (!record) throw new Error("Purchase record not found");
  if (data.file_id !== undefined) record.file_id = data.file_id;
  if (data.quantity_bought !== undefined)
    record.quantity_bought = data.quantity_bought;
  if (data.actual_unit_price !== undefined)
    record.actual_unit_price = data.actual_unit_price;
  if (data.merchant !== undefined) record.merchant = data.merchant;
  if (data.purchased_at !== undefined) record.purchased_at = data.purchased_at;
  if (data.notes !== undefined) record.notes = data.notes;
  record.actual_total_price = record.quantity_bought * record.actual_unit_price;
  record.updated_at = new Date().toISOString();
  return record;
}

export async function updatePurchaseRecordStatus(
  id: string,
  status: PurchaseRecordStatus,
  notes?: string,
): Promise<PurchaseRecord> {
  await delay();
  const record = findById(db.purchaseRecords, id);
  if (!record) throw new Error("Purchase record not found");
  record.status = status;
  if (notes) record.notes = notes;
  record.updated_at = new Date().toISOString();
  return record;
}

export async function attachInvoiceToPurchaseRecord(
  id: string,
  fileId: string,
): Promise<PurchaseRecord> {
  await delay();
  const record = findById(db.purchaseRecords, id);
  if (!record) throw new Error("Purchase record not found");
  record.file_id = fileId;
  record.updated_at = new Date().toISOString();
  return record;
}

export async function deletePurchaseRecord(id: string): Promise<void> {
  await delay();
  db.purchaseRecords = db.purchaseRecords.filter((r) => r.id !== id);
}
