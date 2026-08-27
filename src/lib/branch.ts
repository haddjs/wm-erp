import { db, delay, genId, paged, findById } from "./mock-db";
import type { Branch, BranchListResponse } from "@/types/branch";

export async function getBranches(
  page = 1,
  limit = 10,
): Promise<BranchListResponse> {
  await delay();
  const { data, paging } = paged(db.branches, page, limit);
  return { success: true, data, paging };
}

export async function getBranchById(id: string): Promise<Branch> {
  await delay();
  const branch = findById(db.branches, id);
  if (!branch) throw new Error("Branch not found");
  return branch;
}

export async function createBranch(data: {
  name: string;
  address: string;
  balance?: number;
}): Promise<Branch> {
  await delay();
  const now = new Date().toISOString();
  const branch: Branch = {
    id: genId("branch"),
    name: data.name,
    address: data.address,
    balance: data.balance ?? 0,
    created_at: now,
    updated_at: now,
  };
  db.branches.unshift(branch);
  return branch;
}

export async function updateBranch(
  id: string,
  data: {
    name?: string;
    address?: string;
    balance?: number;
  },
): Promise<Branch> {
  await delay();
  const branch = findById(db.branches, id);
  if (!branch) throw new Error("Branch not found");
  Object.assign(branch, data, { updated_at: new Date().toISOString() });
  return branch;
}

export async function deleteBranch(id: string): Promise<void> {
  await delay();
  db.branches = db.branches.filter((b) => b.id !== id);
}
