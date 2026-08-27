import { db, delay, genId, findById } from "./mock-db";
import type { ItemResponse } from "@/types/item";

export async function getItems(params?: {
  category_id?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: ItemResponse[]; total: number }> {
  await delay();
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 100;
  let items = db.items;
  if (params?.category_id) {
    items = items.filter((i) => i.category_id === params.category_id);
  }
  const total = items.length;
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);
  return { data, total };
}

export async function getItemById(id: string): Promise<ItemResponse> {
  await delay();
  const item = findById(db.items, id);
  if (!item) throw new Error("Item not found");
  return item;
}

export async function createItem(data: {
  category_id: string;
  name: string;
  variant?: string;
  description?: string;
  unit?: string;
}): Promise<ItemResponse> {
  await delay();
  const category = findById(db.categories, data.category_id);
  const now = new Date().toISOString();
  const item: ItemResponse = {
    id: genId("item"),
    category_id: data.category_id,
    category_name: category?.name,
    name: data.name,
    code: genId("ITM").toUpperCase(),
    variant: data.variant ?? null,
    description: data.description ?? null,
    unit: data.unit ?? null,
    created_at: now,
    updated_at: now,
  };
  db.items.unshift(item);
  return item;
}

export async function updateItem(
  id: string,
  data: {
    category_id?: string;
    name?: string;
    code?: string;
    variant?: string | null;
    description?: string | null;
    unit?: string | null;
  },
): Promise<ItemResponse> {
  await delay();
  const item = findById(db.items, id);
  if (!item) throw new Error("Item not found");
  if (data.category_id) {
    item.category_id = data.category_id;
    item.category_name = findById(db.categories, data.category_id)?.name;
  }
  if (data.name) item.name = data.name;
  if (data.code) item.code = data.code;
  if (data.variant !== undefined) item.variant = data.variant || null;
  if (data.description !== undefined) item.description = data.description || null;
  if (data.unit !== undefined) item.unit = data.unit || null;
  item.updated_at = new Date().toISOString();
  return item;
}

export async function deleteItem(id: string): Promise<void> {
  await delay();
  db.items = db.items.filter((i) => i.id !== id);
}
