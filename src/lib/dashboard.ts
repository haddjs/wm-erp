import { db, delay, findById } from "@/lib/mock-db";
import type { Branch } from "@/types/branch";
import type { MonthlyProcurement, ProcurementItem } from "@/types/monthly-procurement";
import type { EventProcurement } from "@/types/event-procurement";
import type {
  MPDashboardResponse,
  EPDashboardResponse,
  DashboardBranch,
  DashboardMP,
  DashboardEP,
  DashboardItemSummary,
} from "@/types/dashboard";

function toDashboardBranch(b: Branch | undefined): DashboardBranch | undefined {
  if (!b) return undefined;
  return { id: b.id, name: b.name, balance: b.balance };
}

function summarize(items?: ProcurementItem[]): DashboardItemSummary {
  return {
    total: items?.length ?? 0,
    pending: items?.filter((i) => i.status === "pending").length ?? 0,
    purchased: items?.filter((i) => i.status === "purchased").length ?? 0,
    completed: items?.filter((i) => i.status === "completed").length ?? 0,
  };
}

function toDashboardMP(p: MonthlyProcurement): DashboardMP {
  return {
    id: p.id,
    period: p.period,
    status: p.status,
    total_nominal: p.total_nominal,
    actual_spending: p.actual_spending ?? 0,
    items: summarize(p.procurement_items),
  };
}

function toDashboardEP(e: EventProcurement): DashboardEP {
  return {
    id: e.id,
    name: e.name,
    date: e.date,
    status: e.status,
    total_nominal: e.total_nominal,
    actual_spending: e.actual_spending ?? 0,
    items: summarize(e.procurement_items),
  };
}

export async function getMPDashboard(params?: {
  branch_id?: string;
  monthly_procurement_id?: string;
}): Promise<MPDashboardResponse> {
  await delay();
  const mps = params?.branch_id
    ? db.monthlyProcurements.filter((p) => p.branch_id === params.branch_id)
    : db.monthlyProcurements;
  const branch = params?.branch_id
    ? findById(db.branches, params.branch_id)
    : db.branches[0];

  let monthly_procurement: DashboardMP | undefined;
  if (params?.monthly_procurement_id) {
    const p = findById(db.monthlyProcurements, params.monthly_procurement_id);
    if (p) monthly_procurement = toDashboardMP(p);
  }

  return {
    branch: toDashboardBranch(branch),
    monthly_procurement,
    summary: {
      total_budget: mps.reduce((s, p) => s + p.total_nominal, 0),
      total_actual_spending: mps.reduce(
        (s, p) => s + (p.actual_spending ?? 0),
        0,
      ),
    },
  };
}

export async function getEPDashboard(params?: {
  branch_id?: string;
  event_procurement_id?: string;
}): Promise<EPDashboardResponse> {
  await delay();
  const eps = params?.branch_id
    ? db.eventProcurements.filter((p) => p.branch_id === params.branch_id)
    : db.eventProcurements;
  const branch = params?.branch_id
    ? findById(db.branches, params.branch_id)
    : db.branches[0];

  let event_procurement: DashboardEP | undefined;
  if (params?.event_procurement_id) {
    const e = findById(db.eventProcurements, params.event_procurement_id);
    if (e) event_procurement = toDashboardEP(e);
  }

  return {
    branch: toDashboardBranch(branch),
    event_procurement,
    summary: {
      total_budget: eps.reduce((s, e) => s + e.total_nominal, 0),
      total_actual_spending: eps.reduce(
        (s, e) => s + (e.actual_spending ?? 0),
        0,
      ),
    },
  };
}
