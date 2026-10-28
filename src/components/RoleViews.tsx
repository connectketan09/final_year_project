import { useERP } from '../context/ERPContext';
import {
  ShieldAlert,
  CheckCircle,
  Clock
} from 'lucide-react';

export const RoleViewBanner = () => {
  const { role, setRole } = useERP();

  const getRoleDetails = () => {
    switch (role) {
      case 'owner':
        return {
          title: 'Owner / Admin Full Access',
          badge: 'SUPER-ADMIN',
          desc: 'Complete end-to-end visibility across manufacturing, true article costing, ledgers, P&L audit, and AI assistant.'
        };
      case 'employee':
        return {
          title: 'Floor Employee / Supervisor View',
          badge: 'RESTRICTED: FLOOR ONLY',
          desc: 'Assigned workflow stages, daily cutting logs, barcode scanning, and inventory tracking. Sensitive owner profit margins and financial P&L are restricted.'
        };
      case 'buyer':
        return {
          title: 'Retailer & Buyer Portal (Metro Plus Apparels)',
          badge: 'RESTRICTED: B2B CLIENT',
          desc: 'Catalog availability for plus-size denim, own wholesale order invoices, ledger balance, and payment proof submission. Internal production BOM is hidden.'
        };
      case 'supplier':
        return {
          title: 'Raw Material Supplier Portal (Arvind Mills Ltd.)',
          badge: 'RESTRICTED: VENDOR',
          desc: 'Fabric purchase orders, lot inspection certificates, and mill payment ledger. Finished retail pricing and other vendor accounts are hidden.'
        };
      case 'dyer_worker':
        return {
          title: 'Job Worker & Tailor Portal (Master Rafiq Jobwork)',
          badge: 'RESTRICTED: CONTRACTOR',
          desc: 'Assigned cutting lots, stitching piece-rate work orders, completion counts, and labor payout vouchers. Wholesale revenue is hidden.'
        };
    }
  };

  const info = getRoleDetails();

  return (
    <div className="role-preview-banner">
      <div className="role-banner-left">
        <span className="role-pill-badge">{info.badge}</span>
        <div>
          <span className="font-bold text-slate-900 mr-2">{info.title}:</span>
          <span className="text-slate-600 text-xs">{info.desc}</span>
        </div>
      </div>

      {role !== 'owner' && (
        <button
          onClick={() => setRole('owner')}
          className="btn-outline-compact bg-white text-xs py-1"
        >
          <span>Return to Owner View</span>
        </button>
      )}
    </div>
  );
};

export const PartnerPortalView = () => {
  const { role, sales, finishedGoods, ledgers, wipBatches } = useERP();

  if (role === 'owner') return null;

  if (role === 'employee') {
    return (
      <div className="partner-portal-card">
        <div className="portal-header">
          <div>
            <span className="badge-tag">FLOOR OPERATIONS</span>
            <h3 className="portal-title">Employee Floor Station — Cutting & Assembly</h3>
          </div>
          <span className="badge-mono">LOGGED IN: SMARAN JAGE</span>
        </div>

        <div className="portal-grid-3">
          <div className="portal-sub-card">
            <h4 className="font-bold text-sm mb-2 text-slate-800">Assigned Workflow Tasks</h4>
            <ul className="text-xs space-y-2 text-slate-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verify fabric roll yardage for LOT-DEN-8820 (Passed)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Issue 20/3 spun thread cones to Master Rafiq</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Affix UID barcode labels to 148 finished jeans</span>
              </li>
            </ul>
          </div>

          <div className="portal-sub-card">
            <h4 className="font-bold text-sm mb-2 text-slate-800">Active WIP Batches</h4>
            <div className="space-y-2">
              {wipBatches.map((b) => (
                <div key={b.id} className="text-xs p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-bold text-slate-900">{b.id} ({b.quantity} pcs)</div>
                  <div className="text-slate-500">{b.stage} • {b.assignedTo}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="portal-sub-card restricted-box">
            <div className="flex items-center gap-1.5 text-slate-500 mb-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <h4 className="font-bold text-sm text-slate-700">Least-Privilege Controls</h4>
            </div>
            <p className="text-xs text-slate-500">
              Company net margin %, owner drawings, and financial P&L statements are restricted for Employee role under Vidyalankar RBAC design.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (role === 'buyer') {
    const buyerLedger = ledgers.find((l) => l.partyName === 'Metro Plus Apparels');
    const buyerSales = sales.filter((s) => s.buyerName === 'Metro Plus Apparels');

    return (
      <div className="partner-portal-card">
        <div className="portal-header">
          <div>
            <span className="badge-tag">RETAILER PORTAL</span>
            <h3 className="portal-title">Metro Plus Apparels — Dadar Boutique</h3>
          </div>
          <span className="badge-mono font-bold text-blue-900">
            OUTSTANDING BALANCE: ₹{buyerLedger?.currentBalance.toLocaleString('en-IN') || 0}
          </span>
        </div>

        <div className="portal-grid-2">
          {/* Catalog availability */}
          <div className="portal-sub-card">
            <h4 className="font-bold text-sm mb-2 text-slate-800">UID Denims Available Plus-Size Catalog</h4>
            <div className="space-y-1.5">
              {finishedGoods.map((item) => (
                <div key={item.sku} className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900">{item.articleName} (Size {item.size})</span>
                    <span className="text-slate-500 block">{item.colour}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-blue-900">₹{item.suggestedWholesale} / pc</span>
                    <span className="text-[11px] text-emerald-700 block font-semibold">{item.availableStock} in stock</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Orders & Ledger */}
          <div className="portal-sub-card">
            <h4 className="font-bold text-sm mb-2 text-slate-800">Your Orders & Invoices</h4>
            <div className="space-y-2">
              {buyerSales.map((s) => (
                <div key={s.id} className="text-xs p-2 bg-white rounded border border-slate-200 shadow-sm">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{s.invoiceNo}</span>
                    <span className="font-mono">₹{s.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 mt-1">
                    <span>{s.quantity} pcs {s.articleName}</span>
                    <span className={`status-pill-badge ${s.status === 'Paid' ? 'success' : 'warning'}`}>{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (role === 'supplier') {
    const millLedger = ledgers.find((l) => l.partyName === 'Arvind Mills Ltd.');
    return (
      <div className="partner-portal-card">
        <div className="portal-header">
          <div>
            <span className="badge-tag">SUPPLIER PORTAL</span>
            <h3 className="portal-title">Arvind Mills Ltd. — Ahmedabad Textile Depot</h3>
          </div>
          <span className="badge-mono font-bold text-amber-900">
            PAYABLE DUE FROM UID: ₹{millLedger?.currentBalance.toLocaleString('en-IN') || 0}
          </span>
        </div>

        <div className="portal-grid-2">
          <div className="portal-sub-card">
            <h4 className="font-bold text-sm mb-2 text-slate-800">Fabric Supply Orders & Lots</h4>
            <div className="text-xs p-3 bg-slate-50 rounded border border-slate-200 space-y-1.5">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Lot LOT-DEN-8820 (14.5oz Denim)</span>
                <span className="font-mono">1,250 Meters</span>
              </div>
              <div className="text-slate-600">Contract Rate: ₹240.00 / Meter + 12% GST</div>
              <div className="text-emerald-700 font-semibold">QC Inspection Status: Inward Yardage Approved ✓</div>
            </div>
          </div>

          <div className="portal-sub-card">
            <h4 className="font-bold text-sm mb-2 text-slate-800">Payment Clearance History</h4>
            <div className="text-xs p-3 bg-white rounded border border-slate-200 shadow-sm space-y-1.5">
              <div className="flex justify-between">
                <span>Part Payment RTGS (VOUCH-AM-01)</span>
                <span className="font-mono text-emerald-700 font-bold">₹2,40,000 Cleared</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Remaining Balance Due</span>
                <span className="font-mono text-amber-800 font-bold">₹96,000 Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (role === 'dyer_worker') {
    const workerLedger = ledgers.find((l) => l.partyName === 'Master Rafiq Jobwork');
    return (
      <div className="partner-portal-card">
        <div className="portal-header">
          <div>
            <span className="badge-tag">JOB WORKER PORTAL</span>
            <h3 className="portal-title">Master Rafiq Jobwork — Ulhasnagar Stitching Unit</h3>
          </div>
          <span className="badge-mono font-bold text-emerald-800">
            PAYOUT DUE: ₹{workerLedger?.currentBalance.toLocaleString('en-IN') || 0}
          </span>
        </div>

        <div className="portal-grid-2">
          <div className="portal-sub-card">
            <h4 className="font-bold text-sm mb-2 text-slate-800">Current Work Order</h4>
            <div className="text-xs p-3 bg-slate-50 rounded border border-slate-200 space-y-1.5">
              <div className="flex justify-between font-bold text-slate-900">
                <span>WO-ST-101 (Classic Denim Plus Size)</span>
                <span className="font-mono">150 Units</span>
              </div>
              <div className="text-slate-600">Agreed Piece Rate: ₹120.00 / garment assembled</div>
              <div className="text-blue-800 font-semibold">Specification: Twin-needle flatlock & reinforced crotch seam</div>
            </div>
          </div>

          <div className="portal-sub-card">
            <h4 className="font-bold text-sm mb-2 text-slate-800">Payout Vouchers</h4>
            <div className="text-xs p-3 bg-white rounded border border-slate-200 shadow-sm space-y-1.5">
              <div className="flex justify-between">
                <span>VOUCH-2026-041 (150 units batch)</span>
                <span className="font-mono text-emerald-700 font-bold">₹18,000 Settled in Full ✓</span>
              </div>
              <div className="text-slate-500">Disbursed via Bank Transfer to State Bank of India account.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
