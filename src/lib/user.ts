import { db, delay, genId } from "./mock-db";
import type {
  User,
  AdminCreateUserPayload,
  UpdateNamePayload,
  UpdatePasswordPayload,
  PaginatedUsers,
} from "@/types/user";

export async function getAllUsers(
  page = 1,
  limit = 10,
): Promise<PaginatedUsers> {
  await delay();
  const totalData = db.users.length;
  const totalPages = Math.max(1, Math.ceil(totalData / limit));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * limit;
  const data = db.users.slice(start, start + limit);
  return {
    data,
    paging: {
      current_page: currentPage,
      total_pages: totalPages,
      total_data: totalData,
      limit,
      has_next: currentPage < totalPages,
    },
  };
}

export async function createUser(
  payload: AdminCreateUserPayload,
): Promise<{ data: User }> {
  await delay();
  const now = new Date().toISOString();
  const user: User = {
    id: genId("user"),
    email: payload.email,
    name: payload.name,
    role: payload.role,
    created_at: now,
    updated_at: now,
  };
  db.users.unshift(user);
  return { data: user };
}

export async function updateName(
  payload: UpdateNamePayload,
): Promise<{ data: null }> {
  await delay();
  return { data: null };
}

export async function updatePassword(
  payload: UpdatePasswordPayload,
): Promise<{ data: null }> {
  await delay();
  return { data: null };
}

export async function deleteAccount(): Promise<{ data: null }> {
  await delay();
  return { data: null };
}
