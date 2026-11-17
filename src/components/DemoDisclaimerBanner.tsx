"use client";

import { useState } from "react";
import { AlertTriangle, Info, X } from "lucide-react";

export default function DemoDisclaimerBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (isDismissed) {
    return (
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-1 flex items-center justify-between text-[11px] text-amber-800 dark:text-amber-300">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>Demo / Mock Mode Active</span>
          <span className="text-amber-600/70 dark:text-amber-400/70 hidden sm:inline">
            — Simulated fictional data only.
          </span>
        </div>
        <button
          onClick={() => setIsDismissed(false)}
          className="text-[10px] underline hover:text-amber-950 dark:hover:text-amber-100 cursor-pointer"
        >
          Show Notice
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800/60 px-4 py-2 text-xs text-amber-900 dark:text-amber-200 transition-all z-40 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 shrink-0">
              <AlertTriangle className="w-3.5 h-3.5" />
            </span>
            <div className="truncate">
              <span className="font-bold uppercase tracking-wider text-[10px] bg-amber-200/70 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded mr-2">
                Simulated Mock Prototype
              </span>
              <span className="text-amber-800 dark:text-amber-300 hidden md:inline">
                All data, branch entities, financials, transactions, and company terms are 100% fictional.
              </span>
              <span className="text-amber-700 dark:text-amber-400 md:ml-1">
                Does not represent any actual entity or confidential information.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-xs">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="font-semibold underline hover:text-amber-950 dark:hover:text-amber-100 text-[11px] cursor-pointer"
            >
              Learn more
            </button>
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="text-amber-500 hover:text-amber-800 dark:hover:text-amber-200 p-0.5 rounded cursor-pointer"
              title="Minimize notice"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Learn more modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  <Info className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-zinc-100 text-base">
                  Disclaimer & Demonstration Notice
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-600 dark:text-zinc-300 space-y-2.5 leading-relaxed">
              <p>
                <strong>This system is strictly a demonstration prototype.</strong> It is built solely to demonstrate the design, UX, and operational workflow of an enterprise budgeting and procurement ERP.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-zinc-400">
                <li>
                  <strong>No Real Data:</strong> All users, emails, branches, budgets, costs, invoice receipts, and catalog items are randomly generated dummy data.
                </li>
                <li>
                  <strong>No Confidential Information:</strong> None of the terms, entities, financial ledgers, or logic disclose or reference any confidential, proprietary, or private company assets.
                </li>
                <li>
                  <strong>Client-Side Mock Architecture:</strong> All API actions and state modifications are held in client-side memory with no external database connection.
                </li>
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs rounded-xl hover:opacity-90 cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
