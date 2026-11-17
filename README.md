# WM ERP — Enterprise Procurement & Financial Management System

A modern, enterprise-grade **Finance, Budgeting, and Procurement ERP** tailored for multi-branch organizations. The system manages the complete operational lifecycle—from budget requests (RAB — *Rencana Anggaran Biaya*) and multi-tier approvals to purchase execution, invoice auditing, direct expense tracking, and e-commerce reconciliation.

This repository features a **zero-dependency, in-memory mock backend architecture**: all data mutations, role switching, file uploads, and cross-entity relations are simulated client-side with realistic network latency, making it immediately runnable out-of-the-box.

---

## 📌 Table of Contents
- [The Procurement Lifecycle](#-the-procurement-lifecycle)
- [Role Capabilities & Permissions](#-role-capabilities--permissions)
- [How Every Role Connects](#-how-every-role-connects)
- [Application Modules](#-application-modules)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Demo Credentials](#-demo-credentials)
- [In-App Guide ("How to Use")](#-in-app-guide-how-to-use)

---

## 🔄 The Procurement Lifecycle

Every procurement passes through 4 sequential stages to ensure budget compliance, quantity verification, and accurate financial recording:

```
┌─────────────────────────┐
│ 1. Proposal (RAB)       │  • Submits Monthly or Event proposal
│    [General Affairs]    │  • Itemized units, estimated unit price & category
└───────────┬─────────────┘
            │  Status: "pending"
            ▼
┌─────────────────────────┐
│ 2. Budget Approval      │  • Evaluates against branch budget
│    [Finance / Admin]    │  • Modifies quantities / approves or rejects
└───────────┬─────────────┘
            │  Status: "approved" / "partial"
            ▼
┌─────────────────────────┐
│ 3. Purchase & Receipt   │  • Purchases approved items from merchants
│    [General Affairs]    │  • Records actual price paid & uploads invoice
└───────────┬─────────────┘
            │  Status: "submitted"
            ▼
┌─────────────────────────┐
│ 4. Audit & Settlement   │  • Audits uploaded invoice vs. recorded price
│    [Finance / Admin]    │  • Confirms purchase; actuals update branch balance
└─────────────────────────┘  Status: "confirmed" -> item "completed"
```

1. **RAB Submission (General Affairs)**: General Affairs drafts a Monthly (by month/year period) or Event proposal, itemizing required SKUs, projected quantities, and estimated unit prices.
2. **Review & Approval (Finance / Admin)**: Finance inspects the requested items against branch budgets. Finance can reduce item quantities or reject unneeded items to control expenditures.
3. **Purchasing & Receipt Upload (General Affairs)**: Once approved, items appear in **Purchase Records**. General Affairs executes the purchase, logs actual vendor prices, and attaches the receipt/invoice.
4. **Audit & Settlement (Finance)**: Finance cross-checks the invoice against the recorded transaction. Once confirmed, actual spending is calculated, remaining branch balances are updated, and items are marked completed.

---

## 👥 Role Capabilities & Permissions

The system implements Role-Based Access Control (RBAC) with 3 primary personas:

| Capability / Resource | General Affairs (Role 2) | Finance (Role 3) | Admin (Role 1) |
|---|:---:|:---:|:---:|
| **Dashboard & Financial KPIs** | View | View | View |
| **Create Monthly & Event RAB** | ✅ Full | ❌ No | ✅ Full |
| **Approve / Reject RAB** | ❌ No | ✅ Full | ✅ Full |
| **Adjust Item Quantities in RAB** | ❌ No | ✅ Full | ✅ Full |
| **Record Purchases & Upload Invoices** | ✅ Full | ❌ No | ✅ Full |
| **Audit & Confirm Purchase Records** | ❌ No | ✅ Full | ✅ Full |
| **Record General Expenses** | ✅ Full | ❌ View Only | ✅ Full |
| **Migrate Expense ↔ Purchase Record** | ❌ No | ❌ No | ✅ Full |
| **Shopee E-Commerce Reconciliation** | ❌ No | ❌ No | ✅ Full |
| **Master Data (Branches, Users)** | ❌ No | ❌ View Only | ✅ Full |
| **Master Data (Categories, Items)** | ❌ View Only | ❌ View Only | ✅ Full |
| **Activity Audit Logs** | ✅ View | ✅ View | ✅ Full |

### Role Breakdown:
* **General Affairs (GA)** — *The Operational Requester & Purchaser*: Responsible for submitting budget proposals (RAB), recording completed purchases, uploading receipts, and logging day-to-day out-of-pocket expenses.
* **Finance** — *The Financial Auditor & Gatekeeper*: Responsible for reviewing procurement budgets, adjusting quantities to control costs, auditing submitted receipts, confirming purchase transactions, and monitoring cash flow.
* **Admin** — *System Controller & Super-User*: Manages branch budgets, user accounts, catalog items, and categories; manages Shopee e-commerce imports; and performs emergency overrides and transaction migrations.

---

## 🔗 How Every Role Connects

The roles do not work in silos—they interact continuously through handoffs, approvals, and shared ledgers:

```
                  ┌──────────────────────┐
                  │      Admin (1)       │
                  │  • Master Data       │
                  │  • Branch Budgets    │
                  │  • Record Migration  │
                  └──────────┬───────────┘
            Configures Master│Data & Users
                             ▼
 ┌──────────────────────┐           ┌──────────────────────┐
 │ General Affairs (2)  │───(RAB)──>│     Finance (3)      │
 │                      │<-(Approve)│                      │
 │ • Drafts budget      │           │ • Approves/cuts qty  │
 │ • Purchases goods    │──(Receipt)│ • Audits receipts    │
 │ • Submits invoice    │<-(Confirm)│ • Confirms payment   │
 └──────────────────────┘           └──────────────────────┘
            │                                  │
            └───────────────┬──────────────────┘
                            ▼
               ┌────────────────────────┐
               │    Shared Dashboard    │
               │   & Audit Activity Log │
               └────────────────────────┘
```

1. **GA ➔ Finance (RAB Submission)**: GA submits an itemized proposal. The proposal enters Finance's pending approval queue.
2. **Finance ➔ GA (Budget Approval)**: Finance reviews budget availability and approves or adjusts quantities. Approved items unlock in GA's Purchase Records panel.
3. **GA ➔ Finance (Purchase Execution)**: GA buys the goods, logs actual amounts, and attaches proof of purchase. The record is flagged as `submitted` for Finance review.
4. **Finance ➔ Ledger (Invoice Audit)**: Finance reviews the uploaded receipt against the recorded spend. Confirming the record writes the actual expenditure to the branch's financial ledger.
5. **Admin ↔ Both (Support & Migration)**: If GA records an emergency expense without prior RAB, Admin can link and migrate that expense directly into an approved purchase item (`migration.ts`).

---

## 📦 Application Modules

| Module Route | Description | Primary Users |
|---|---|---|
| [`/`](file:///D:/Personal%20File/programming/wm-mock/wm-erp/src/app/(protected)/page.tsx) | Executive KPI dashboard with branch & period filters, burn rate, and analytics charts. | All Roles |
| [`/monthly-procurement`](file:///D:/Personal%20File/programming/wm-mock/wm-erp/src/app/(protected)/monthly-procurement/page.tsx) | Recurring monthly budget proposal (RAB) creation and approval workflow. | GA & Finance |
| [`/event-procurement`](file:///D:/Personal%20File/programming/wm-mock/wm-erp/src/app/(protected)/event-procurement/page.tsx) | One-time event procurement requests, itemized cost estimates, and disbursement. | GA & Finance |
| [`/purchase-records`](file:///D:/Personal%20File/programming/wm-mock/wm-erp/src/app/(protected)/purchase-records/page.tsx) | Execution tracking: input actual merchant costs, attach invoices, and finance review. | GA & Finance |
| [`/expense`](file:///D:/Personal%20File/programming/wm-mock/wm-erp/src/app/(protected)/expense/page.tsx) | Direct standalone operational expenses not tied to formal procurement. | GA & Admin |
| [`/shopee`](file:///D:/Personal%20File/programming/wm-mock/wm-erp/src/app/(protected)/shopee/page.tsx) | Simulated e-commerce order ingestion, item classification, and discrepancy reconciliation. | Admin |
| [`/branches`](file:///D:/Personal%20File/programming/wm-mock/wm-erp/src/app/(protected)/branches/page.tsx) | Corporate branch directory and allocated capital balance tracking. | Admin |
| [`/items`](file:///D:/Personal%20File/programming/wm-mock/wm-erp/src/app/(protected)/items/page.tsx) | Centralized catalog of standard procurement items, variants, and units. | All Roles (Admin edits) |
| [`/category`](file:///D:/Personal%20File/programming/wm-mock/wm-erp/src/app/(protected)/category/page.tsx) | Expense and procurement categorization tree. | All Roles (Admin edits) |
| [`/users`](file:///D:/Personal%20File/programming/wm-mock/wm-erp/src/app/(protected)/users/page.tsx) | User directory, credential setup, and role assignments. | Admin |
| [`/logs`](file:///D:/Personal%20File/programming/wm-mock/wm-erp/src/app/(protected)/logs/page.tsx) | Comprehensive timeline audit log capturing all system mutations with actor details. | All Roles |
| [`/how-to-use`](file:///D:/Personal%20File/programming/wm-mock/wm-erp/src/app/(protected)/how-to-use/page.tsx) | Interactive in-app visual guide explaining workflows, permissions, and step-by-step guides. | All Roles |

---

## 🛠 Tech Stack

* **Framework**: [Next.js 16.2.2](https://nextjs.org/) (App Router, React Compiler enabled, standalone build)
* **Frontend Library**: [React 19.2.4](https://react.dev/)
* **UI Components**: [shadcn/ui](https://ui.shadcn.com/) powered by `@base-ui/react` & Radix primitives
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS & `tw-animate-css`
* **Charts & Analytics**: [Recharts 3.8.0](https://recharts.org/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
* **Data & Persistence**: Client-side singleton in-memory mock engine (`src/lib/mock-db.ts`) with `localStorage` session caching
* **Containerization**: Multi-stage Docker build (`Dockerfile`) & `docker.compose.yaml`

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v20 or higher
* **npm**, **pnpm**, or **yarn**

### 1. Installation
```bash
git clone <repository-url>
cd wm-erp
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

### 4. Docker Deployment
```bash
docker compose up --build -d
```

---

## 🔑 Demo Credentials

The in-memory database comes pre-seeded with test accounts for each role:

| Role | Email | Password | Suggested Purpose |
|---|---|---|---|
| **Admin** | `admin@example.com` | `admin123` | Full control, master data, Shopee import, migrations |
| **General Affairs** | `ga@example.com` | `ga123` | Create RAB proposals, upload invoices, record expenses |
| **Finance** | `finance@example.com` | `finance123` | Approve proposals, adjust quantities, audit receipts |

> 💡 **Demo Shortcut**: Once logged in, use the **Role Switcher** dropdown in the sidebar to switch between Admin, GA, and Finance instantly without logging out.

---

## 📖 In-App Guide ("How to Use")

For an interactive, visual walkthrough while running the application, click **"How to Use"** in the sidebar navigation or visit [`/how-to-use`](file:///D:/Personal%20File/programming/wm-mock/wm-erp/src/app/(protected)/how-to-use/page.tsx). It includes:
* An interactive lifecycle flowchart.
* Role-by-role capability breakdowns.
* The inter-role collaboration matrix.
* Step-by-step scenario walkthroughs for common operations.
