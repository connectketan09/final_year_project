# UID Denims ERP — An AI-Enabled Business Operating Platform

> **Final-Year Diploma Engineering Project Demonstration**  
> **Institution:** Vidyalankar Polytechnic, Wadala, Mumbai  
> **Department:** Computer Engineering / Information Technology  
> **Academic Year:** 2024–2025  
> **Domain:** Industrial Manufacturing ERP & Financial Operating Platform for Denim & Men's Plus-Size Apparel

---

## 🏭 Project Overview

**UID Denims ERP** is an end-to-end cloud-native manufacturing execution and business operating system engineered specifically for the Indian apparel & denim manufacturing industry (plus-size segment 38"–54" waist). 

It unifies what is typically fractured across spreadsheets, WhatsApp communication, and disconnected accounting ledgers into a single, cohesive, audit-compliant platform.

### Key Industry Problem Solved
Small-to-medium denim manufacturers face severe cash leakage, uncontrolled fabric wastage in grading/cutting, delayed fabric washing approvals, and unverified wholesale payment claims. UID Denims ERP addresses this through:
- **Batch-level traceability** with unique QR tracking across 8 factory stages
- **Automated Bill of Materials (BOM)** and Markup vs. Margin pricing models
- **Least-Privilege Role Switching** (Admin, Production Manager, Floor Supervisor, Accountant, Wholesale Buyer, Washing Job-Worker)
- **Wholesale party ledger** with audit-trail payment proof settlements
- **Deterministic AI Business Assistant** for anomaly detection, gross margin analysis, and reorder alerts

---

## ✨ Key Features & Interactive Prototype Modules

1. **Animated Vector Factory Floor Illustration**
   - Industrial editorial aesthetic inspired by modern European manufacturing interfaces.
   - SVG-based animated elements: continuous conveyor rollers, spinning wash tumblers, reciprocating sewing needles, automated robotic worker arms, and live operational status indicators.

2. **8-Stage Manufacturing Pipeline**
   - Stages: Fabric Inspection → Pattern Cutting & Grading → Stitching & Assembly → Industrial Washing (Enzyme/Acid) → Riveting & Trims → Quality Audit → Steam Press & Packaging → Finished Goods Inward.
   - Interactive Stage Inspector displaying cycle time, target machines, scrap thresholds, and real-time batch movement.
   - 1-click **Auto-Simulate Pipeline** run with live state transitions.

3. **Production Costing & BOM Calculator**
   - Live breakdown of Raw Materials (11.5oz Denim Spandex, YKK Zippers, Rivets, Pocketing).
   - Labor costing (Cutting, Stitching, Quality Inspection) and Job-work expenses (Enzyme wash).
   - Dynamic Price Engine toggling between **Target Margin %** and **Target Markup %** with wholesale GST calculation (12% slab).

4. **Tri-Tier Inventory Management**
   - **Finished Goods (FG):** Size-graded denim inventory (Waist 38–50) with low-stock badges.
   - **Work in Progress (WIP):** Active floor batches tracked by production stage.
   - **Raw Materials (RM):** Mill roll stock (meters), thread spools, and brass hardware with reorder alerts.
   - 1-click **Spawn Production Batch** deducting raw materials and updating WIP.

5. **Wholesale B2B Billing & Party Ledgers**
   - Invoicing for Maharashtra, Gujarat, and National distributors.
   - Debit/Credit running ledger balances with instant statement downloads.
   - Interactive payment simulation: upload simulated UTR / cheque receipts, verify payment proofs, and trigger automatic ledger credits.

6. **Executive P&L Statement & Audit Trail**
   - Real-time Gross Profit, Operating Overheads (Washing chemicals, factory lease, electrical load), and Net Operating Margin.
   - Immutable system audit trail logging all role activities, batch status updates, and transactions.

7. **UID Business Assistant (Deterministic AI Engine)**
   - Pre-configured prompt chips: *Gross Margin Analysis*, *Inventory Anomalies*, *Washing Cost Breakdown*, *Top Debtors*.
   - Traceable mathematical formulas for every insight — zero opaque hallucinations.

8. **Role-Based Demo Views (Least Privilege)**
   - Switch between **Admin**, **Production Manager**, **Floor Supervisor**, **Accountant**, **Wholesale Buyer**, and **Washing Partner**.
   - Tailored views that mask unauthorized financial records or floor actions according to zero-trust principles.

9. **Guided Mentor Walkthrough Modal**
   - 10-step step-by-step interactive script designed for presentation to diploma examiners and industry evaluators.

---

## 🛠️ Technology Stack & Architecture

- **Frontend Core:** React 19, TypeScript
- **Styling:** CSS3 Design System with custom industrial tokens, glassmorphism, and responsive CSS grid
- **Icons:** Lucide React
- **Build Tool:** Vite 6
- **Architecture:** Zero-dependency deterministic state container (`ERPContext`) with immutable action reducers and event logging
- **Deployment:** Vercel with Vite SPA rewrites

---

## 🚀 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/connectketan09/final_year_project.git
cd final_year_project

# Install dependencies
npm install

# Run Vite dev server
npm run dev

# Run TypeScript type check
npx tsc --noEmit

# Run production build
npm run build
```

---

## 📋 Academic Disclaimer

*This project is an interactive frontend operating prototype developed for academic demonstration and diploma curriculum submission. All factory metrics, batch runs, ledger movements, and AI insights are calculated in real time using client-side deterministic data structures to allow full offline and presentation reliability without requiring live cloud databases.*
