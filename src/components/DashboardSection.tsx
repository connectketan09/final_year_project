import { useERP } from '../context/ERPContext';
import {
  TrendingUp,
  Package,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  FileCheck,
  Scale,
  DollarSign
} from 'lucide-react';

export const DashboardSection = () => {
  const { dashboardStats, calculatedCosting, costingConfig } = useERP();

  const {
    totalSalesRevenue,
    totalSalesUnits,
    totalFinishedStockUnits,
    totalFinishedStockValue,
    totalRawMaterialMeters,
    totalWipUnits,
    amountsReceivable,
    amountsPayable,
    totalProductionCostCurrent,
    totalOperatingExpenses,
    netOperatingProfit,
    taxCollectedGST,
    taxPaidGST,
    lowStockItemCount
  } = dashboardStats;

  // Percentage calculations for cost distribution
  const fabricCost = calculatedCosting.fabricCostPerPiece;
  const dyeingCost = costingConfig.dyeingCostPerPiece;
  const stitchingCost = costingConfig.stitchingCostPerPiece;
  const trimsCost = costingConfig.accessoriesCostPerPiece;
  const overheadCost = costingConfig.otherOverheadPerPiece;
  const totalCost = calculatedCosting.totalCostPerGarment;

  const fabricPct = Math.round((fabricCost / totalCost) * 100);
  const stitchingPct = Math.round((stitchingCost / totalCost) * 100);
  const dyeingPct = Math.round((dyeingCost / totalCost) * 100);
  const trimsPct = Math.round((trimsCost / totalCost) * 100);
  const overheadPct = 100 - (fabricPct + stitchingPct + dyeingPct + trimsPct);

  return (
    <section id="dashboard" className="section-container dashboard-section">
      {/* Mandatory Demo Data Disclaimer */}
      <div className="demo-data-disclaimer">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>
          <strong>DEMO DATA NOTICE:</strong> Illustrative figures for final-year diploma project review. Not actual UID Denims live financial records.
        </span>
      </div>

      <div className="section-header-row">
        <div>
          <div className="section-eyebrow">
            <span className="badge-tag">EXECUTIVE COCKPIT</span>
            <span className="badge-sub">Consolidated Real-Time Metrics</span>
          </div>
          <h2 className="section-title">Owner Business Performance</h2>
          <p className="section-subtitle">
            Instant visibility into sales turnover, inventory assets, receivables, payables, and true operational margins.
          </p>
        </div>
      </div>

      {/* 8 Primary Key Metric Cards */}
      <div className="metrics-grid">
        {/* Card 1: Total Sales */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">TOTAL SALES TURNOVER</span>
            <span className="metric-icon-box bg-blue-50 text-blue-700">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="metric-value font-mono">₹{totalSalesRevenue.toLocaleString('en-IN')}</div>
          <div className="metric-subtext text-emerald-700">
            <ArrowUpRight className="w-3.5 h-3.5 inline mr-0.5" />
            <span>{totalSalesUnits} units booked (incl. 12% GST)</span>
          </div>
        </div>

        {/* Card 2: Finished Stock Quantity */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">FINISHED STOCK ASSET</span>
            <span className="metric-icon-box bg-green-50 text-green-700">
              <Package className="w-4 h-4" />
            </span>
          </div>
          <div className="metric-value font-mono">{totalFinishedStockUnits} <span className="text-sm font-sans font-normal text-slate-500">Pcs</span></div>
          <div className="metric-subtext text-slate-600">
            <span>Valuation: ₹{totalFinishedStockValue.toLocaleString('en-IN')} (at cost)</span>
          </div>
          {lowStockItemCount > 0 && (
            <div className="metric-badge-alert">
              <span>{lowStockItemCount} sizes low on stock</span>
            </div>
          )}
        </div>

        {/* Card 3: Raw Materials & WIP */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">RAW DENIM & WIP</span>
            <span className="metric-icon-box bg-slate-100 text-slate-700">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div className="metric-value font-mono">{totalRawMaterialMeters.toLocaleString('en-IN')} <span className="text-sm font-sans font-normal text-slate-500">Meters</span></div>
          <div className="metric-subtext text-slate-600">
            <span>WIP: {totalWipUnits} pcs across Dyeing & Stitching</span>
          </div>
        </div>

        {/* Card 4: Receivables from Buyers */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">AMOUNTS RECEIVABLE</span>
            <span className="metric-icon-box bg-indigo-50 text-indigo-700">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
          <div className="metric-value font-mono text-indigo-950">₹{amountsReceivable.toLocaleString('en-IN')}</div>
          <div className="metric-subtext text-slate-600">
            <span>Pending collection from 2 retail buyers</span>
          </div>
        </div>

        {/* Card 5: Payables to Suppliers & Workers */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">AMOUNTS PAYABLE</span>
            <span className="metric-icon-box bg-amber-50 text-amber-700">
              <ArrowDownRight className="w-4 h-4" />
            </span>
          </div>
          <div className="metric-value font-mono text-slate-900">₹{amountsPayable.toLocaleString('en-IN')}</div>
          <div className="metric-subtext text-slate-600">
            <span>Fabric mill credit & job worker ledger balance</span>
          </div>
        </div>

        {/* Card 6: True Production Cost */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">UNIT PRODUCTION COST</span>
            <span className="metric-icon-box bg-purple-50 text-purple-700">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="metric-value font-mono">₹{totalProductionCostCurrent.toFixed(2)}</div>
          <div className="metric-subtext text-slate-600">
            <span>Classic Denim Jeans (DEMO-DJ-001)</span>
          </div>
        </div>

        {/* Card 7: Monthly Overheads */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">MONTHLY OVERHEADS</span>
            <span className="metric-icon-box bg-rose-50 text-rose-700">
              <Scale className="w-4 h-4" />
            </span>
          </div>
          <div className="metric-value font-mono">₹{totalOperatingExpenses.toLocaleString('en-IN')}</div>
          <div className="metric-subtext text-slate-600">
            <span>Rent, staff salary, maintenance & logistics</span>
          </div>
        </div>

        {/* Card 8: Net Profit / Loss */}
        <div className={`metric-card ${netOperatingProfit >= 0 ? 'bg-emerald-50/50 border-emerald-300' : 'bg-rose-50/50 border-rose-300'}`}>
          <div className="metric-header">
            <span className="metric-title">ESTIMATED NET OPERATING PROFIT</span>
            <span className={`metric-icon-box ${netOperatingProfit >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className={`metric-value font-mono ${netOperatingProfit >= 0 ? 'text-emerald-900' : 'text-rose-900'}`}>
            ₹{netOperatingProfit.toLocaleString('en-IN')}
          </div>
          <div className="metric-subtext text-slate-700">
            <span>After COGS & all fixed workshop expenses</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics / Breakdown Charts Row */}
      <div className="analytics-dual-grid">
        {/* Visual 1: True Production Cost Component Breakdown */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Garment Production Cost Composition</h3>
              <p className="chart-sub">Where every rupee of ₹{totalCost.toFixed(2)} per jean goes</p>
            </div>
            <span className="badge-mono">DEMO-DJ-001</span>
          </div>

          {/* Segmented Stack Bar */}
          <div className="cost-stack-bar-container">
            <div className="cost-stack-bar">
              <div style={{ width: `${fabricPct}%` }} className="cost-segment segment-fabric" title={`Fabric: ₹${fabricCost} (${fabricPct}%)`}></div>
              <div style={{ width: `${stitchingPct}%` }} className="cost-segment segment-stitching" title={`Stitching: ₹${stitchingCost} (${stitchingPct}%)`}></div>
              <div style={{ width: `${dyeingPct}%` }} className="cost-segment segment-dyeing" title={`Dyeing: ₹${dyeingCost} (${dyeingPct}%)`}></div>
              <div style={{ width: `${trimsPct}%` }} className="cost-segment segment-trims" title={`Trims: ₹${trimsCost} (${trimsPct}%)`}></div>
              <div style={{ width: `${overheadPct}%` }} className="cost-segment segment-overhead" title={`Overhead: ₹${overheadCost} (${overheadPct}%)`}></div>
            </div>
          </div>

          {/* Legend Items */}
          <div className="cost-legend-grid">
            <div className="legend-item">
              <span className="legend-dot segment-fabric"></span>
              <span className="legend-name">Raw Fabric (2.2m @ ₹240 + 5% loss)</span>
              <span className="legend-val font-mono">₹{fabricCost.toFixed(2)} ({fabricPct}%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot segment-stitching"></span>
              <span className="legend-name">Job Work Stitching (Flatlock)</span>
              <span className="legend-val font-mono">₹{stitchingCost.toFixed(2)} ({stitchingPct}%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot segment-dyeing"></span>
              <span className="legend-name">Indigo Dyeing & Enzyme Wash</span>
              <span className="legend-val font-mono">₹{dyeingCost.toFixed(2)} ({dyeingPct}%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot segment-trims"></span>
              <span className="legend-name">Hardware (YKK Zip, Rivets, Patch)</span>
              <span className="legend-val font-mono">₹{trimsCost.toFixed(2)} ({trimsPct}%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot segment-overhead"></span>
              <span className="legend-name">Thread, Tagging & Steam Press</span>
              <span className="legend-val font-mono">₹{overheadCost.toFixed(2)} ({overheadPct}%)</span>
            </div>
          </div>
        </div>

        {/* Visual 2: GST & Cash Flow Reconciliation */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Tax Tracking & Liquidity Summary</h3>
              <p className="chart-sub">Internal GST reconciliation (reported, not auto-filed)</p>
            </div>
            <span className="badge-tag">GST-12%</span>
          </div>

          <div className="tax-summary-rows">
            <div className="tax-row">
              <div className="tax-row-label">
                <span className="font-semibold text-slate-800">GST Collected on Sales (Output Tax)</span>
                <span className="text-xs text-slate-500 block">From retail buyer invoices</span>
              </div>
              <span className="tax-row-val font-mono text-emerald-700 font-bold">
                +₹{taxCollectedGST.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="tax-row">
              <div className="tax-row-label">
                <span className="font-semibold text-slate-800">GST Paid on Fabric Purchases (Input Tax)</span>
                <span className="text-xs text-slate-500 block">Available Input Tax Credit (ITC)</span>
              </div>
              <span className="tax-row-val font-mono text-slate-700 font-bold">
                -₹{taxPaidGST.toFixed(0).toLocaleString()}
              </span>
            </div>

            <div className="tax-row net-row">
              <div className="tax-row-label">
                <span className="font-bold text-slate-900">Net GST Liability Position</span>
                <span className="text-xs text-slate-500 block">Output Tax minus Input Tax Credit</span>
              </div>
              <span className="tax-row-val font-mono text-indigo-900 font-extrabold text-base">
                ₹{Math.max(0, taxCollectedGST - taxPaidGST).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="tax-statutory-note">
            <FileCheck className="w-3.5 h-3.5 text-slate-500 inline mr-1" />
            <span>Note: Prototype records and reports tax values transparently; it does not file GST returns.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
