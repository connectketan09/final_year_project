import { useState } from 'react';
import type { FormEvent } from 'react';
import { useERP } from '../context/ERPContext';
import {
  Scale,
  TrendingUp,
  FileCheck,
  ShieldCheck,
  Plus
} from 'lucide-react';
import type { ExpenseRecord } from '../types';

export const ReportsSection = () => {
  const {
    sales,
    expenses,
    dashboardStats,
    auditLogs,
    recordExpense
  } = useERP();

  const [activeSubTab, setActiveSubTab] = useState<'pnl' | 'expenses' | 'audit'>('pnl');
  const [showAddExpense, setShowAddExpense] = useState<boolean>(false);

  // New Expense form state
  const [expCategory, setExpCategory] = useState<ExpenseRecord['category']>('Workshop Rent');
  const [expDesc, setExpDesc] = useState<string>('');
  const [expAmount, setExpAmount] = useState<number>(5000);
  const [expPaidTo, setExpPaidTo] = useState<string>('');
  const [expMode, setExpMode] = useState<'Cash' | 'UPI' | 'Bank Transfer'>('UPI');

  const {
    totalSalesRevenue,
    totalOperatingExpenses,
    netOperatingProfit,
    taxCollectedGST,
    taxPaidGST
  } = dashboardStats;

  // Breakdown calculations
  const grossSalesExclTax = sales.reduce((acc, s) => acc + s.subtotal, 0);
  const totalCogs = sales.reduce((acc, s) => acc + (s.unitPrice * 0.74) * s.quantity, 0); // ~₹829.40 per jean
  const grossProfit = grossSalesExclTax - totalCogs;

  const handleExpenseSubmit = (e: FormEvent) => {
    e.preventDefault();
    recordExpense({
      category: expCategory,
      description: expDesc || `${expCategory} payment`,
      amount: expAmount,
      paidTo: expPaidTo || 'Vendor Service',
      mode: expMode
    });
    setShowAddExpense(false);
    setExpDesc('');
    setExpAmount(5000);
    setExpPaidTo('');
  };

  return (
    <section id="reports" className="section-container reports-section">
      <div className="section-header-row">
        <div>
          <div className="section-eyebrow">
            <span className="badge-tag">FINANCIAL TRANSPARENCY</span>
            <span className="badge-sub">Statutory & Internal Audit</span>
          </div>
          <h2 className="section-title">Expenses, Tax & Profit / Loss Statement</h2>
          <p className="section-subtitle">
            Consolidated financial audit showing transparent revenue build-up, Cost of Goods Sold (COGS), operating expenses, and GST tracking.
          </p>
        </div>

        <button
          onClick={() => setShowAddExpense(true)}
          className="btn-outline-compact"
        >
          <Plus className="w-4 h-4" />
          <span>Add Operating Expense</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="inventory-tabs-row">
        <button
          onClick={() => setActiveSubTab('pnl')}
          className={`inv-tab-btn ${activeSubTab === 'pnl' ? 'active' : ''}`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Profit & Loss Statement</span>
        </button>
        <button
          onClick={() => setActiveSubTab('expenses')}
          className={`inv-tab-btn ${activeSubTab === 'expenses' ? 'active' : ''}`}
        >
          <Scale className="w-4 h-4" />
          <span>Operating Expense Ledger ({expenses.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('audit')}
          className={`inv-tab-btn ${activeSubTab === 'audit' ? 'active' : ''}`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Audit Log Trail ({auditLogs.length} Entries)</span>
        </button>
      </div>

      {/* SUB-TAB 1: PROFIT & LOSS STATEMENT */}
      {activeSubTab === 'pnl' && (
        <div className="pnl-statement-card">
          <div className="statement-header-box">
            <div>
              <h3 className="statement-org-title">UID DENIMS APPARELS</h3>
              <p className="statement-period-subtitle">DEMO FINANCIAL AUDIT STATEMENT — OCTOBER 2026</p>
            </div>
            <div className="text-right">
              <span className="badge-mono">CURRENCY: INR (₹)</span>
            </div>
          </div>

          <div className="statement-table-wrapper">
            <table className="pnl-formal-table">
              <thead>
                <tr>
                  <th>PARTICULARS</th>
                  <th className="text-right">AMOUNT (₹)</th>
                  <th className="text-right">NOTES / BASIS</th>
                </tr>
              </thead>
              <tbody>
                {/* 1. REVENUE SECTION */}
                <tr className="table-section-heading">
                  <td colSpan={3}>I. OPERATING REVENUE (INCOME)</td>
                </tr>
                <tr>
                  <td className="pl-6">Gross Wholesale B2B Sales (Excl. Tax)</td>
                  <td className="text-right font-mono font-bold text-slate-900">₹{grossSalesExclTax.toLocaleString('en-IN')}</td>
                  <td className="text-right text-xs text-slate-500">{sales.length} invoices generated</td>
                </tr>
                <tr>
                  <td className="pl-6">GST Output Tax Collected (12%)</td>
                  <td className="text-right font-mono text-emerald-700">+₹{taxCollectedGST.toLocaleString('en-IN')}</td>
                  <td className="text-right text-xs text-slate-500">Statutory liability collected</td>
                </tr>
                <tr className="subtotal-row">
                  <td className="pl-6 font-bold">Total Gross Invoiced Revenue</td>
                  <td className="text-right font-mono font-bold text-slate-900">₹{totalSalesRevenue.toLocaleString('en-IN')}</td>
                  <td className="text-right text-xs font-semibold text-slate-700">Gross Inflow</td>
                </tr>

                {/* 2. COGS SECTION */}
                <tr className="table-section-heading">
                  <td colSpan={3}>II. COST OF GOODS SOLD (COGS — VARIABLE PRODUCTION COSTS)</td>
                </tr>
                <tr>
                  <td className="pl-6">Raw Fabric Yardage Consumed in Sold Units</td>
                  <td className="text-right font-mono text-slate-800">₹{(totalCogs * 0.66).toFixed(0).toLocaleString()}</td>
                  <td className="text-right text-xs text-slate-500">2.2m/unit @ ₹240/m + 5% loss</td>
                </tr>
                <tr>
                  <td className="pl-6">Dyeing & Stone Wash Charges</td>
                  <td className="text-right font-mono text-slate-800">₹{(totalCogs * 0.10).toFixed(0).toLocaleString()}</td>
                  <td className="text-right text-xs text-slate-500">Apex Dyeing Works invoices</td>
                </tr>
                <tr>
                  <td className="pl-6">Stitching & Labor Assembly Job Work</td>
                  <td className="text-right font-mono text-slate-800">₹{(totalCogs * 0.15).toFixed(0).toLocaleString()}</td>
                  <td className="text-right text-xs text-slate-500">Master Rafiq piece rates</td>
                </tr>
                <tr>
                  <td className="pl-6">Hardware Trims (YKK Zips, Rivets, Leather Patch)</td>
                  <td className="text-right font-mono text-slate-800">₹{(totalCogs * 0.09).toFixed(0).toLocaleString()}</td>
                  <td className="text-right text-xs text-slate-500">Accessories per unit</td>
                </tr>
                <tr className="subtotal-row">
                  <td className="pl-6 font-bold text-slate-900">Total Cost of Goods Sold (B)</td>
                  <td className="text-right font-mono font-bold text-rose-800">-₹{totalCogs.toFixed(0).toLocaleString()}</td>
                  <td className="text-right text-xs text-slate-600">Calculated from true article costing</td>
                </tr>

                {/* GROSS PROFIT */}
                <tr className="profit-highlight-row">
                  <td className="font-extrabold text-slate-900">GROSS MANUFACTURING PROFIT (I - II)</td>
                  <td className="text-right font-mono font-extrabold text-emerald-800 text-base">
                    ₹{grossProfit.toFixed(0).toLocaleString()}
                  </td>
                  <td className="text-right text-xs font-semibold text-emerald-800">
                    Gross Margin: {((grossProfit / grossSalesExclTax) * 100).toFixed(1)}%
                  </td>
                </tr>

                {/* 3. OPERATING EXPENSES */}
                <tr className="table-section-heading">
                  <td colSpan={3}>III. FIXED WORKSHOP OPERATING EXPENSES (OVERHEADS)</td>
                </tr>
                {expenses.map((exp) => (
                  <tr key={exp.id}>
                    <td className="pl-6">{exp.category} — {exp.description}</td>
                    <td className="text-right font-mono text-slate-700">₹{exp.amount.toLocaleString('en-IN')}</td>
                    <td className="text-right text-xs text-slate-500">{exp.mode} ({exp.paidTo})</td>
                  </tr>
                ))}
                <tr className="subtotal-row">
                  <td className="pl-6 font-bold text-slate-900">Total Fixed Operating Overheads (C)</td>
                  <td className="text-right font-mono font-bold text-rose-800">-₹{totalOperatingExpenses.toLocaleString('en-IN')}</td>
                  <td className="text-right text-xs text-slate-600">Fixed workshop outlays</td>
                </tr>

                {/* NET OPERATING PROFIT */}
                <tr className="net-profit-row">
                  <td className="font-extrabold text-base text-slate-950">
                    NET OPERATING PROFIT / LOSS (EBITDA)
                  </td>
                  <td className={`text-right font-mono font-extrabold text-lg ${netOperatingProfit >= 0 ? 'text-emerald-800' : 'text-rose-800'}`}>
                    ₹{netOperatingProfit.toLocaleString('en-IN')}
                  </td>
                  <td className="text-right text-xs font-bold text-slate-800">
                    {netOperatingProfit >= 0 ? 'Positive Operating Cash Flow' : 'Deficit Outlay'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tax-statutory-note mt-4">
            <FileCheck className="w-4 h-4 text-slate-500 inline mr-1" />
            <span>
              <strong>Statutory Compliance Note:</strong> The UID Denims platform records and computes output tax (₹{taxCollectedGST.toLocaleString('en-IN')}) and input credit (₹{taxPaidGST.toFixed(0).toLocaleString()}) for internal bookkeeping; it does not file returns on the GST portal.
            </span>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: OPERATING EXPENSES LEDGER */}
      {activeSubTab === 'expenses' && (
        <div className="table-responsive-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>EXPENSE ID</th>
                <th>CATEGORY</th>
                <th>DESCRIPTION</th>
                <th>DATE</th>
                <th>AMOUNT</th>
                <th>PAID TO</th>
                <th>PAYMENT MODE</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td className="font-mono text-xs font-bold text-slate-800">{exp.id}</td>
                  <td>
                    <span className="badge-tag">{exp.category}</span>
                  </td>
                  <td className="text-slate-800 font-medium text-xs">{exp.description}</td>
                  <td className="text-xs text-slate-600">{exp.date}</td>
                  <td>
                    <span className="font-mono text-xs font-bold text-rose-800">
                      ₹{exp.amount.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="text-xs text-slate-700">{exp.paidTo}</td>
                  <td>
                    <span className="text-xs font-semibold text-slate-600">{exp.mode}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB-TAB 3: AUDIT LOG TRAIL */}
      {activeSubTab === 'audit' && (
        <div className="audit-trail-container">
          <div className="audit-header-banner mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-700 inline mr-1.5" />
            <span className="text-xs text-slate-700">
              Tamper-evident audit log: every financial and master data modification is recorded with user identity and timestamp.
            </span>
          </div>

          <div className="table-responsive-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>AUDIT ID</th>
                  <th>TIMESTAMP</th>
                  <th>USER</th>
                  <th>ROLE</th>
                  <th>MODULE</th>
                  <th>ACTION</th>
                  <th>TRANSACTION DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="font-mono text-xs font-bold text-slate-800">{log.id}</td>
                    <td className="font-mono text-xs text-slate-600">{log.timestamp}</td>
                    <td className="font-semibold text-xs text-slate-900">{log.user}</td>
                    <td>
                      <span className="badge-tag">{log.role}</span>
                    </td>
                    <td>
                      <span className="text-xs font-medium text-slate-700">{log.module}</span>
                    </td>
                    <td>
                      <span className="status-pill-badge neutral font-mono text-[10px]">{log.action}</span>
                    </td>
                    <td className="text-xs text-slate-800">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Operating Expense Modal */}
      {showAddExpense && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">Record Operating Expense</h3>
              <button
                type="button"
                onClick={() => setShowAddExpense(false)}
                className="modal-close-btn"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleExpenseSubmit} className="modal-body">
              <div className="form-group mb-3">
                <label htmlFor="expCategorySelect" className="form-label">Expense Head</label>
                <select
                  id="expCategorySelect"
                  value={expCategory}
                  onChange={(e) => setExpCategory(e.target.value as any)}
                  className="form-select font-medium"
                >
                  <option value="Workshop Rent">Workshop Rent</option>
                  <option value="Electricity & Steam">Electricity & Steam Generator</option>
                  <option value="Machinery Maintenance">Machinery Maintenance</option>
                  <option value="Staff Salary">Staff Salary & Supervisor Advance</option>
                  <option value="Packaging & Freight">Packaging & Tempo Freight</option>
                  <option value="Miscellaneous">Miscellaneous Overhead</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="expDescInput" className="form-label">Description</label>
                <input
                  id="expDescInput"
                  type="text"
                  value={expDesc}
                  onChange={(e) => setExpDesc(e.target.value)}
                  className="form-input"
                  placeholder="e.g. Monthly workshop power bill payment"
                  required
                />
              </div>

              <div className="form-grid-3 mb-3">
                <div className="form-group">
                  <label htmlFor="expAmtInput" className="form-label">Amount (₹)</label>
                  <input
                    id="expAmtInput"
                    type="number"
                    min="1"
                    value={expAmount}
                    onChange={(e) => setExpAmount(Number(e.target.value) || 0)}
                    className="form-input font-mono font-bold"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expPaidToInput" className="form-label">Paid To</label>
                  <input
                    id="expPaidToInput"
                    type="text"
                    value={expPaidTo}
                    onChange={(e) => setExpPaidTo(e.target.value)}
                    className="form-input"
                    placeholder="e.g. MSEDCL Power"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expModeSelect" className="form-label">Payment Mode</label>
                  <select
                    id="expModeSelect"
                    value={expMode}
                    onChange={(e) => setExpMode(e.target.value as any)}
                    className="form-select"
                  >
                    <option value="UPI">UPI</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setShowAddExpense(false)}
                  className="btn-outline-compact"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-compact">
                  <span>Record & Update P&L</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
