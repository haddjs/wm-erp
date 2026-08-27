import { delay, findProcurementItem } from "./mock-db";

export async function updateProcurementItem(
  id: string,
  data: {
    quantity?: number;
    unit_price?: number;
    notes?: string | null;
  },
) {
  await delay();
  const ref = findProcurementItem(id);
  if (!ref) throw new Error("Procurement item not found");
  if (data.quantity !== undefined) ref.item.quantity = data.quantity;
  if (data.unit_price !== undefined) ref.item.unit_price = data.unit_price;
  if (data.notes !== undefined) ref.item.notes = data.notes;
  ref.item.total_price = ref.item.quantity * ref.item.unit_price;
  return ref.item;
}

export async function updateProcurementItemQty(id: string, quantity: number) {
  await delay();
  const ref = findProcurementItem(id);
  if (!ref) throw new Error("Procurement item not found");
  ref.item.quantity = quantity;
  ref.item.total_price = quantity * ref.item.unit_price;
  return ref.item;
}

export async function rejectProcurementItem(id: string) {
  await delay();
  const ref = findProcurementItem(id);
  if (!ref) throw new Error("Procurement item not found");
  ref.item.status = "rejected";
  return ref.item;
}

export async function deleteProcurementItem(id: string): Promise<void> {
  await delay();
  const ref = findProcurementItem(id);
  if (!ref) return;
  ref.parent.procurement_items = (ref.parent.procurement_items ?? []).filter(
    (i) => i.id !== id,
  );
}
