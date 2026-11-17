"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { UserRoleLabel } from "@/types/user";
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Users,
  ShieldCheck,
  CircleDollarSign,
  Briefcase,
  FileSpreadsheet,
  Receipt,
  ShoppingCart,
  RefreshCw,
  Clock,
  Building2,
  Sparkles,
  Layers,
  HelpCircle,
  TrendingUp,
  FileCheck2,
  Wallet,
  AlertTriangle,
  ArrowLeftRight,
} from "lucide-react";

export default function HowToUsePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "lifecycle" | "roles" | "connections" | "guides"
  >("lifecycle");

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-zinc-950 p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-700 via-indigo-700 to-cyan-600 text-white p-8 md:p-10 shadow-xl shadow-blue-500/10">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide uppercase border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            WM ERP System Guide
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            How to Use WM ERP
          </h1>
          <p className="text-blue-100 text-sm md:text-base leading-relaxed">
            Understand the complete procurement lifecycle, discover what each
            role is empowered to do, and see how Admin, General Affairs, and
            Finance collaborate seamlessly to manage organizational budgets.
          </p>

          {user && (
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="text-blue-200">Your Current Session:</span>
              <span className="px-3 py-1 rounded-full bg-white text-blue-900 font-bold shadow-xs">
                {user.name} ({UserRoleLabel[user.role]})
              </span>
              <span className="text-blue-200/80">
                Tip: Use the sidebar dropdown to switch roles anytime for demoing.
              </span>
            </div>
          )}
        </div>

        {/* Decorative background shapes */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-zinc-800 space-x-2 md:space-x-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("lifecycle")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === "lifecycle"
              ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-zinc-900 shadow-xs"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-zinc-400 hover:bg-slate-100/60 dark:hover:bg-zinc-800/40"
          }`}
        >
          <Layers className="w-4 h-4" />
          The Procurement Lifecycle
        </button>

        <button
          onClick={() => setActiveTab("roles")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === "roles"
              ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-zinc-900 shadow-xs"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-zinc-400 hover:bg-slate-100/60 dark:hover:bg-zinc-800/40"
          }`}
        >
          <Users className="w-4 h-4" />
          Role Capabilities
        </button>

        <button
          onClick={() => setActiveTab("connections")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === "connections"
              ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-zinc-900 shadow-xs"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-zinc-400 hover:bg-slate-100/60 dark:hover:bg-zinc-800/40"
          }`}
        >
          <ArrowLeftRight className="w-4 h-4" />
          How Roles Connect
        </button>

        <button
          onClick={() => setActiveTab("guides")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === "guides"
              ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-zinc-900 shadow-xs"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-zinc-400 hover:bg-slate-100/60 dark:hover:bg-zinc-800/40"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Step-by-Step Guides
        </button>
      </div>

      {/* TAB 1: THE PROCUREMENT LIFECYCLE */}
      {activeTab === "lifecycle" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs">
            <div className="max-w-2xl mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-zinc-100">
                End-to-End Procurement Flow
              </h2>
              <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
                Every procurement passes through 4 sequential stages to ensure
                budget compliance, quantity verification, and accurate financial
                recording.
              </p>
            </div>

            {/* Stepper Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Step 1 */}
              <div className="relative p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                      1
                    </span>
                    <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      General Affairs
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-zinc-100 text-base mb-1">
                    1. RAB Submission
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    GA compiles requested items for a branch, specifying target
                    period (Monthly) or Event details with projected quantities
                    and unit costs.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-zinc-700/60 text-[11px] font-medium text-slate-500">
                  Status: <span className="text-amber-600 font-bold">Pending Approval</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs">
                      2
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Finance / Admin
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-zinc-100 text-base mb-1">
                    2. Budget Approval
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    Finance reviews each line item against branch budget
                    limits. Finance can adjust requested quantities or reject
                    unjustified requests.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-zinc-700/60 text-[11px] font-medium text-slate-500">
                  Status: <span className="text-emerald-600 font-bold">Approved / Partial</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-700 font-bold text-xs">
                      3
                    </span>
                    <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      General Affairs
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-zinc-100 text-base mb-1">
                    3. Purchase & Receipt
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    Approved items appear in Purchase Records. GA buys the
                    items, inputs the actual purchase prices, and uploads the
                    official receipts/invoices.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-zinc-700/60 text-[11px] font-medium text-slate-500">
                  Status: <span className="text-blue-600 font-bold">Submitted</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs">
                      4
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Finance Audit
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-zinc-100 text-base mb-1">
                    4. Verification & Ledger
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    Finance verifies the invoice against the recorded amount and
                    marks it confirmed. The actual spending updates the branch
                    budget and dashboard analytics.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-zinc-700/60 text-[11px] font-medium text-slate-500">
                  Status: <span className="text-green-700 font-bold">Confirmed / Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alternate Flows: Expenses & Shopee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-zinc-100">
                    Standalone Expenses Flow
                  </h3>
                  <p className="text-xs text-slate-500">
                    For unbudgeted, unexpected, or non-recurring cash outlays
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">
                When operational expenses occur that weren't part of a pre-approved
                procurement (e.g., emergency repairs, quick merchant purchases),
                General Affairs logs them directly in <strong>Expenses</strong>.
                If they correspond to a later approved procurement item, an Admin
                can migrate them seamlessly to a Purchase Record.
              </p>
              <Link
                href="/expense"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Go to Expenses page <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-zinc-100">
                    Shopee E-Commerce Reconciliation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Automated order parsing and financial disparity check
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">
                Administrators can simulate fetching e-commerce order receipts
                directly. The system classifies incoming orders into either
                matching Purchase Records or general Expenses, while running an
                automated reconciliation calculation to identify billing anomalies.
              </p>
              <Link
                href="/shopee"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Go to Shopee Reconciliation <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ROLE CAPABILITIES */}
      {activeTab === "roles" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* General Affairs Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 dark:bg-sky-950/40 px-2.5 py-1 rounded-md border border-sky-200/60 dark:border-sky-800/40">
                    Role ID: 2
                  </span>
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-sm">
                    GA
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
                  General Affairs (GA)
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  The Operational Executor & Requester
                </p>

                <div className="space-y-3 text-xs text-slate-600 dark:text-zinc-400">
                  <div className="font-semibold text-slate-800 dark:text-zinc-200 text-xs">
                    Key Permissions & Responsibilities:
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Submit RAB:</strong> Draft and submit Monthly and
                        Event procurement proposals.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Record Purchases:</strong> Log vendor purchases,
                        actual quantities, and price per unit.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Attach Invoices:</strong> Upload proof of payment
                        and receipts for Finance verification.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Log Direct Expenses:</strong> Track ad-hoc
                        out-of-pocket branch spending.
                      </span>
                    </li>
                  </ul>

                  <div className="pt-2 border-t border-slate-100 dark:border-zinc-800">
                    <span className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Restricted from: Approving budgets, managing users, modifying branch balances.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Finance Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200/60 dark:border-emerald-800/40">
                    Role ID: 3
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    FIN
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
                  Finance
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  The Financial Auditor & Gatekeeper
                </p>

                <div className="space-y-3 text-xs text-slate-600 dark:text-zinc-400">
                  <div className="font-semibold text-slate-800 dark:text-zinc-200 text-xs">
                    Key Permissions & Responsibilities:
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>RAB Approval:</strong> Approve, partially approve,
                        or reject monthly and event proposals.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Quantity Adjustment:</strong> Modify item
                        quantities during review to enforce budget limits.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Invoice Verification:</strong> Audit uploaded
                        receipts and confirm purchase records.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Analytics & Balances:</strong> Monitor financial
                        dashboards, budget variance, and branch burn rates.
                      </span>
                    </li>
                  </ul>

                  <div className="pt-2 border-t border-slate-100 dark:border-zinc-800">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      Read-only for master data (branches, items, users).
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded-md border border-purple-200/60 dark:border-purple-800/40">
                    Role ID: 1
                  </span>
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                    ADM
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
                  Administrator
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Master Data & System Controller
                </p>

                <div className="space-y-3 text-xs text-slate-600 dark:text-zinc-400">
                  <div className="font-semibold text-slate-800 dark:text-zinc-200 text-xs">
                    Key Permissions & Responsibilities:
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Master Data:</strong> Create and maintain Users,
                        Branches & Balances, Categories, and Item Catalog.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Shopee Engine:</strong> Run e-commerce batch imports
                        and order reconciliation.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Record Migration:</strong> Shift transactions
                        between Expense and Purchase Records.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Super-User Access:</strong> Capable of performing
                        any action granted to GA or Finance.
                      </span>
                    </li>
                  </ul>

                  <div className="pt-2 border-t border-slate-100 dark:border-zinc-800">
                    <span className="text-[11px] text-purple-700 dark:text-purple-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Full system bypass & administrative overrides.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HOW ROLES CONNECT */}
      {activeTab === "connections" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 md:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 dark:text-zinc-100 mb-2">
              Inter-Role Collaboration Matrix
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">
              How information and authorization flow between General Affairs,
              Finance, and Admin across every business interaction.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/40 text-slate-700 dark:text-zinc-300 font-semibold">
                    <th className="py-3 px-4">Interaction / Trigger</th>
                    <th className="py-3 px-4">Initiator</th>
                    <th className="py-3 px-4">Receiver / Auditor</th>
                    <th className="py-3 px-4">Outcome & State Change</th>
                    <th className="py-3 px-4">Audit Record</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-600 dark:text-zinc-400">
                  <tr>
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-zinc-200">
                      RAB Budget Proposal
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-semibold border border-sky-200">
                        General Affairs
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                        Finance
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      Creates a <code className="text-blue-600 font-semibold">pending</code> procurement proposal visible in Finance's approval queue.
                    </td>
                    <td className="py-3.5 px-4">
                      Logged in <code>Activity Logs</code> as <code>monthly_procurement_created</code>.
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-zinc-200">
                      Budget & Quantity Review
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                        Finance
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-semibold border border-sky-200">
                        General Affairs
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      Approves, modifies quantity, or rejects. If approved, items unlock in the <strong>Purchase Records</strong> panel.
                    </td>
                    <td className="py-3.5 px-4">
                      Logged as <code>monthly_procurement_status_changed</code>.
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-zinc-200">
                      Purchase Execution & Receipt
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-semibold border border-sky-200">
                        General Affairs
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                        Finance
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      Records actual spending and attaches receipt file. Record changes to <code className="text-amber-600 font-semibold">submitted</code>.
                    </td>
                    <td className="py-3.5 px-4">
                      Logged as <code>expense_recorded</code> or purchase record creation.
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-zinc-200">
                      Invoice Audit & Settlement
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                        Finance
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold border border-purple-200">
                        System / Ledger
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      Verifies receipt vs. transaction. Status becomes <code className="text-emerald-600 font-semibold">confirmed</code>, item marked <code className="text-emerald-600 font-semibold">completed</code>.
                    </td>
                    <td className="py-3.5 px-4">
                      Dashboard actual spending and branch remaining balance update automatically.
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-zinc-200">
                      Master Data Governance
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold border border-purple-200">
                        Admin
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-300">
                        All Roles
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      Creates branch budgets, assigns user accounts, and configures categories and standard SKUs.
                    </td>
                    <td className="py-3.5 px-4">
                      Logged under <code>user_action</code> and system logs.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: STEP-BY-STEP GUIDES */}
      {activeTab === "guides" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
          {/* Guide 1 */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Guide 1: Submitting a Monthly Procurement (RAB)</span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 dark:text-zinc-400">
              <li>Navigate to <strong>Monthly Procurement</strong> in the sidebar.</li>
              <li>Ensure you have the <strong>Create</strong> tab selected.</li>
              <li>Select the target <strong>Branch</strong> and the budget <strong>Period (YYYY-MM)</strong>.</li>
              <li>Click <strong>Add Item</strong>: pick an inventory item, category, target quantity, and price.</li>
              <li>Review the calculated total estimated budget and click <strong>Submit Proposal</strong>.</li>
              <li>Your submission is now queued for Finance approval!</li>
            </ol>
            <div className="pt-2">
              <Link
                href="/monthly-procurement"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
              >
                Go to Monthly Procurement <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Guide 2 */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <FileCheck2 className="w-4 h-4" />
              <span>Guide 2: Reviewing & Approving as Finance</span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 dark:text-zinc-400">
              <li>Switch your role to <strong>Finance</strong> or <strong>Admin</strong>.</li>
              <li>Navigate to <strong>Monthly Procurement</strong> or <strong>Event Procurement</strong>.</li>
              <li>Click the <strong>Approve</strong> tab to see submissions awaiting action.</li>
              <li>Click on a row to inspect the submitted line items.</li>
              <li>You can adjust item quantities if necessary to control branch spending.</li>
              <li>Click <strong>Approve</strong> to release the budget for purchasing, or <strong>Reject</strong> with notes.</li>
            </ol>
            <div className="pt-2">
              <Link
                href="/monthly-procurement"
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
              >
                View Approvals Queue <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Guide 3 */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
              <Receipt className="w-4 h-4" />
              <span>Guide 3: Recording Purchases & Uploading Invoices</span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 dark:text-zinc-400">
              <li>Once a procurement is approved, go to <strong>Purchase Records</strong>.</li>
              <li>Choose between <strong>Monthly</strong> or <strong>Event</strong> tab.</li>
              <li>Select the procurement to open the approved items table.</li>
              <li>Click on an item to open the <strong>Purchase Record Panel</strong>.</li>
              <li>Input the actual units purchased, unit price, merchant name, and purchase date.</li>
              <li>Attach the invoice or receipt file, then click <strong>Submit Purchase</strong>.</li>
            </ol>
            <div className="pt-2">
              <Link
                href="/purchase-records"
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:underline"
              >
                Go to Purchase Records <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Guide 4 */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-purple-600 font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Guide 4: Monitoring Dashboards & Audit Trail</span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 dark:text-zinc-400">
              <li>Go to <strong>Dashboard</strong> to view executive financial health across all branches.</li>
              <li>Use the <strong>Branch Filter</strong> or <strong>Period Filter</strong> to inspect specific performance.</li>
              <li>Compare total budgeted allocation against actual spending to track burn rate.</li>
              <li>Go to <strong>Activity Log</strong> to inspect timestamped records of every modification.</li>
            </ol>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:underline"
              >
                Go to Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation Cards */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 shadow-xs">
        <h3 className="font-bold text-slate-900 dark:text-zinc-100 text-sm mb-4">
          Quick Access Shortcuts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <Link
            href="/"
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-all text-center group"
          >
            <TrendingUp className="w-5 h-5 text-blue-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Dashboard</span>
          </Link>

          <Link
            href="/monthly-procurement"
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-all text-center group"
          >
            <FileSpreadsheet className="w-5 h-5 text-indigo-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Monthly RAB</span>
          </Link>

          <Link
            href="/event-procurement"
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-all text-center group"
          >
            <Briefcase className="w-5 h-5 text-cyan-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Event RAB</span>
          </Link>

          <Link
            href="/purchase-records"
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-all text-center group"
          >
            <Receipt className="w-5 h-5 text-emerald-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Purchases</span>
          </Link>

          <Link
            href="/expense"
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-all text-center group"
          >
            <Wallet className="w-5 h-5 text-amber-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Expenses</span>
          </Link>

          <Link
            href="/logs"
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-all text-center group"
          >
            <Clock className="w-5 h-5 text-slate-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Activity Logs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
