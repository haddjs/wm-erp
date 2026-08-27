import { db, delay, genId, findById } from "./mock-db";
import type { Category } from "@/types/category";

export async function getCategories(params?: {
  page?: number;
  limit?: number;
}): Promise<{ data: Category[]; total: number }> {
  await delay();
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 100;
  const total = db.categories.length;
  const start = (page - 1) * limit;
  const data = db.categories.slice(start, start + limit);
  return { data, total };
}

export async function getCategoryById(id: string): Promise<Category> {
  await delay();
  const category = findById(db.categories, id);
  if (!category) throw new Error("Category not found");
  return category;
}

export async function createCategory(data: {
  name: string;
  code?: string;
  description?: string;
}): Promise<Category> {
  await delay();
  const category: Category = {
    id: genId("cat"),
    name: data.name,
    code: data.code?.trim() || genId("CAT").toUpperCase(),
    description: data.description?.trim(),
  };
  db.categories.unshift(category);
  return category;
}

export async function updateCategory(
  id: string,
  data: {
    name?: string;
    code?: string;
    description?: string;
  },
): Promise<Category> {
  await delay();
  const category = findById(db.categories, id);
  if (!category) throw new Error("Category not found");
  if (data.name?.trim()) category.name = data.name.trim();
  if (data.code?.trim()) category.code = data.code.trim();
  if (data.description !== undefined) category.description = data.description;
  return category;
}

export async function deleteCategory(id: string): Promise<void> {
  await delay();
  db.categories = db.categories.filter((c) => c.id !== id);
}
