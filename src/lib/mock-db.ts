// In-memory mock "backend". Replaces src/lib/api.ts entirely.
// All src/lib/* resource functions read/write this singleton store instead of
// making HTTP calls, while keeping their original signatures and return shapes.

import {
  seedUsers,
  seedBranches,
  seedCategories,
  seedItems,
  seedExpenses,
  seedMonthlyProcurements,
  seedEventProcurements,
  seedPurchaseRecords,
  seedActivityLogs,
} from "@/mocks/seed";
import type { User } from "@/types/user";
import type { Branch } from "@/types/branch";
import type { Category } from "@/types/category";
import type { ItemResponse } from "@/types/item";
import type { ExpenseResponse } from "@/types/expense";
import type {
  MonthlyProcurement,
  ProcurementItem,
} from "@/types/monthly-procurement";
import type { EventProcurement } from "@/types/event-procurement";
import type { PurchaseRecord } from "@/types/purchase-record";
import type { ActivityLogResponse } from "@/types/activity-log";

export interface MockFile {
  file_id: string;
  file_path: string;
  file_url: string;
}

export const db = {
  users: [...seedUsers] as User[],
  branches: [...seedBranches] as Branch[],
  categories: [...seedCategories] as Category[],
  items: [...seedItems] as ItemResponse[],
  expenses: [...seedExpenses] as ExpenseResponse[],
  monthlyProcurements: [...seedMonthlyProcurements] as MonthlyProcurement[],
  eventProcurements: [...seedEventProcurements] as EventProcurement[],
  purchaseRecords: [...seedPurchaseRecords] as PurchaseRecord[],
  activityLogs: [...seedActivityLogs] as ActivityLogResponse[],
  files: new Map<string, MockFile>(),
};

/** Simulate network latency so loading states still render. */
export function delay(ms = 250): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Generate a reasonably-unique id for newly created entities. */
export function genId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Paginate an array into the backend's standard envelope. */
export function paged<T>(arr: T[], page = 1, limit = 10) {
  const totalData = arr.length;
  const totalPages = Math.max(1, Math.ceil(totalData / limit));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * limit;
  const data = arr.slice(start, start + limit);
  return {
    data,
    paging: {
      hasNext: currentPage < totalPages,
      currentPage,
      totalPages,
      totalData,
      limit,
    },
  };
}

export function findById<T extends { id: string }>(
  arr: T[],
  id: string,
): T | undefined {
  return arr.find((x) => x.id === id);
}

export interface ProcurementItemRef {
  item: ProcurementItem;
  parent: MonthlyProcurement | EventProcurement;
  kind: "monthly" | "event";
}

/** Find a procurement item by id across both monthly and event procurements. */
export function findProcurementItem(id: string): ProcurementItemRef | undefined {
  for (const p of db.monthlyProcurements) {
    const item = p.procurement_items?.find((i) => i.id === id);
    if (item) return { item, parent: p, kind: "monthly" };
  }
  for (const p of db.eventProcurements) {
    const item = p.procurement_items?.find((i) => i.id === id);
    if (item) return { item, parent: p, kind: "event" };
  }
  return undefined;
}
