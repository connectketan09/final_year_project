import { useState } from 'react';
import type { FormEvent } from 'react';
import { useERP } from '../context/ERPContext';
import {
  Package,
  Layers,
  AlertTriangle,
  CheckCircle,
  Plus,
  ArrowRight,
  Barcode,
  Sparkles,
  Droplets,
  Scissors,
  Check
} from 'lucide-react';

export const InventorySection = () => {
  const {
    rawMaterials,
    wipBatches,
    finishedGoods,
    sendBatchToDyeing,
    sendBatchToStitching,
    completeFinishingAndMoveToInventory
  } = useERP();

  const [activeTab, setActiveTab] = useState<'finished' | 'wip' | 'raw'>('finished');
  const [showNewBatchModal, setShowNewBatchModal] = useState<boolean>(false);
  const [batchQty, setBatchQty] = useState<number>(50);
  const [targetSize, setTargetSize] = useState<string>('42');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleCreateBatch = (e: FormEvent) => {
    e.preventDefault();
    const fabricNeeded = Number((batchQty * 2.2 * 1.05).toFixed(1));
    sendBatchToDyeing({
      articleName: 'Classic Denim Jeans (Plus Size)',
      quantity: batchQty,
      fabricUsedMeters: fabricNeeded,
      assignedTo: 'Apex Dyeing Works, Bhiwandi'
    });
    setShowNewBatchModal(false);
    setActiveTab('wip');
    setSuccessMsg(`Launched new production batch of ${batchQty} units! ${fabricNeeded}m fabric issued to Dyeing.`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleAdvanceWip = (wipId: string, currentStage: 'Dyeing' | 'Stitching' | 'Finishing') => {
    if (currentStage === 'Dyeing') {
      sendBatchToStitching({ wipId, assignedTo: 'Master Rafiq Jobwork' });
      setSuccessMsg(`Batch ${wipId} advanced from Dyeing to Stitching job-work.`);
    } else if (currentStage === 'Stitching') {
      completeFinishingAndMoveToInventory({
        wipId,
        sku: `DEMO-DJ-001-${targetSize}`
      });
      setSuccessMsg(`Batch completed finishing! Units transferred directly into Finished Stock (Size ${targetSize}).`);
    } else {
      completeFinishingAndMoveToInventory({
        wipId,
        sku: 'DEMO-DJ-001-42'
      });
      setSuccessMsg(`Batch ${wipId} transferred into Finished Inventory!`);
    }
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <section id="inventory" className="section-container inventory-section">
      <div className="section-header-row">
        <div>
          <div className="section-eyebrow">
            <span className="badge-tag">INVENTORY & STOCK CONTROL</span>
            <span className="badge-sub">Multi-Stage Traceability</span>
          </div>
          <h2 className="section-title">Warehouse & WIP Stock Tracking</h2>
          <p className="section-subtitle">
            Monitor raw denim yardage, work-in-progress across job workers, and finished plus-size apparel with safety threshold alerts.
          </p>
        </div>

        <button
          onClick={() => setShowNewBatchModal(true)}
          className="btn-primary-compact"
        >
          <Plus className="w-4 h-4" />
          <span>Launch Production Batch</span>
        </button>
      </div>

      {successMsg && (
        <div className="alert-success-banner mb-4">
          <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Segmented View Switcher */}
      <div className="inventory-tabs-row">
        <button
          onClick={() => setActiveTab('finished')}
          className={`inv-tab-btn ${activeTab === 'finished' ? 'active' : ''}`}
        >
          <Package className="w-4 h-4" />
          <span>Finished Goods ({finishedGoods.length} Variants)</span>
        </button>
        <button
          onClick={() => setActiveTab('wip')}
          className={`inv-tab-btn ${activeTab === 'wip' ? 'active' : ''}`}
        >
          <Scissors className="w-4 h-4" />
          <span>Work-in-Progress ({wipBatches.length} Batches)</span>
        </button>
        <button
          onClick={() => setActiveTab('raw')}
          className={`inv-tab-btn ${activeTab === 'raw' ? 'active' : ''}`}
        >
          <Layers className="w-4 h-4" />
          <span>Raw Materials & Trims ({rawMaterials.length} Items)</span>
        </button>
      </div>

      {/* TAB 1: FINISHED GOODS */}
      {activeTab === 'finished' && (
        <div className="table-responsive-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ARTICLE & SKU</th>
                <th>WAIST SIZE</th>
                <th>COLOUR / FIT</th>
                <th>AVAILABLE STOCK</th>
                <th>RESERVED</th>
                <th>UNIT COST</th>
                <th>WHOLESALE PRICE</th>
                <th>STATUS</th>
                <th>BARCODE</th>
              </tr>
            </thead>
            <tbody>
              {finishedGoods.map((item) => {
                const isLow = item.availableStock <= item.lowStockThreshold;
                return (
                  <tr key={item.sku} className={isLow ? 'row-alert-warning' : ''}>
                    <td>
                      <div className="font-bold text-slate-900">{item.articleName}</div>
                      <div className="text-xs font-mono text-slate-500">{item.sku}</div>
                    </td>
                    <td>
                      <span className="size-badge">Waist {item.size}</span>
                    </td>
                    <td>
                      <div className="text-xs font-medium text-slate-800">{item.colour}</div>
                      <div className="text-xs text-slate-500">{item.fit}</div>
                    </td>
                    <td>
                      <div className="text-base font-extrabold font-mono text-slate-900">
                        {item.availableStock} <span className="text-xs font-sans font-normal text-slate-500">pcs</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs font-mono text-slate-500">{item.reservedStock} pcs</span>
                    </td>
                    <td>
                      <span className="text-xs font-mono font-medium">₹{item.unitCost.toFixed(2)}</span>
                    </td>
                    <td>
                      <span className="text-xs font-mono font-bold text-blue-900">₹{item.suggestedWholesale.toFixed(2)}</span>
                    </td>
                    <td>
                      {isLow ? (
                        <span className="status-pill-badge alert">
                          <AlertTriangle className="w-3 h-3 inline mr-1" />
                          Low Stock ({item.availableStock}/{item.lowStockThreshold})
                        </span>
                      ) : (
                        <span className="status-pill-badge success">
                          <CheckCircle className="w-3 h-3 inline mr-1" />
                          In Stock
                        </span>
                      )}
                    </td>
                    <td>
                      <span className="barcode-tag">
                        <Barcode className="w-3.5 h-3.5 inline mr-1 text-slate-600" />
                        {item.barcode}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: WORK-IN-PROGRESS (WIP) */}
      {activeTab === 'wip' && (
        <div className="table-responsive-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>BATCH ID</th>
                <th>ARTICLE</th>
                <th>CURRENT PROCESS STAGE</th>
                <th>ASSIGNED WORKER / UNIT</th>
                <th>BATCH QUANTITY</th>
                <th>FABRIC CONSUMED</th>
                <th>ACCRUED WIP VALUE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {wipBatches.map((batch) => (
                <tr key={batch.id}>
                  <td>
                    <span className="font-mono font-bold text-slate-900">{batch.id}</span>
                    <div className="text-xs text-slate-500">Started {batch.startedDate}</div>
                  </td>
                  <td>
                    <div className="font-semibold text-slate-800">{batch.articleName}</div>
                    <div className="text-xs font-mono text-slate-500">Lot: {batch.rawMaterialLot}</div>
                  </td>
                  <td>
                    <span className="process-stage-badge">
                      {batch.stage === 'Dyeing' && <Droplets className="w-3.5 h-3.5 text-blue-600 inline mr-1" />}
                      {batch.stage === 'Stitching' && <Scissors className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />}
                      {batch.stage === 'Finishing' && <Sparkles className="w-3.5 h-3.5 text-purple-600 inline mr-1" />}
                      {batch.stage}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs font-medium text-slate-700">{batch.assignedTo}</span>
                  </td>
                  <td>
                    <span className="font-mono font-bold text-slate-900">{batch.quantity} pcs</span>
                  </td>
                  <td>
                    <span className="text-xs font-mono text-slate-600">{batch.fabricUsedMeters} meters</span>
                  </td>
                  <td>
                    <span className="font-mono text-xs font-bold text-emerald-800">
                      ₹{batch.costAccrued.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td>
                    <span className="status-pill-badge neutral">{batch.status}</span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleAdvanceWip(batch.id, batch.stage)}
                      className="btn-accent-simulate text-xs py-1 px-2.5"
                      title="Advance to next production milestone"
                    >
                      <span>
                        {batch.stage === 'Dyeing' ? 'Send to Stitching' : batch.stage === 'Stitching' ? 'Complete to Stock' : 'Move to Inventory'}
                      </span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
              {wipBatches.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-6 text-slate-500 text-sm">
                    No batches currently in WIP. Click "Launch Production Batch" to start cutting.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: RAW MATERIALS & HARDWARE TRIMS */}
      {activeTab === 'raw' && (
        <div className="table-responsive-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>MATERIAL NAME</th>
                <th>CATEGORY</th>
                <th>LOT NUMBER</th>
                <th>AVAILABLE STOCK</th>
                <th>UNIT COST</th>
                <th>SUPPLIER</th>
                <th>LAST PURCHASED</th>
                <th>REORDER ALERT</th>
              </tr>
            </thead>
            <tbody>
              {rawMaterials.map((mat) => {
                const isLow = mat.quantity <= mat.minReorderLevel;
                return (
                  <tr key={mat.id} className={isLow ? 'row-alert-warning' : ''}>
                    <td>
                      <div className="font-bold text-slate-900">{mat.name}</div>
                      <div className="text-xs font-mono text-slate-500">{mat.id}</div>
                    </td>
                    <td>
                      <span className="badge-tag">{mat.category}</span>
                    </td>
                    <td>
                      <span className="font-mono text-xs font-semibold text-slate-700">{mat.lotNumber}</span>
                    </td>
                    <td>
                      <span className="text-base font-extrabold font-mono text-slate-900">
                        {mat.quantity.toLocaleString('en-IN')} {mat.unit}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs font-mono font-medium">₹{mat.unitCost} / {mat.unit}</span>
                    </td>
                    <td>
                      <span className="text-xs text-slate-700">{mat.supplier}</span>
                    </td>
                    <td>
                      <span className="text-xs text-slate-500">{mat.lastPurchaseDate}</span>
                    </td>
                    <td>
                      {isLow ? (
                        <span className="status-pill-badge alert">
                          Reorder Due (&lt; {mat.minReorderLevel} {mat.unit})
                        </span>
                      ) : (
                        <span className="status-pill-badge success">Safe (&gt; {mat.minReorderLevel})</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* New Production Batch Modal */}
      {showNewBatchModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">Launch New Denim Production Batch</h3>
              <button
                type="button"
                onClick={() => setShowNewBatchModal(false)}
                className="modal-close-btn"
                aria-label="Close batch modal"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleCreateBatch} className="modal-body">
              <p className="text-xs text-slate-600 mb-3">
                This will allocate raw fabric from LOT-DEN-8820 and start an active dyeing lot in the factory.
              </p>

              <div className="form-group mb-3">
                <label htmlFor="articleSelect" className="form-label">Article Style</label>
                <select id="articleSelect" className="form-select font-medium" defaultValue="Classic Heavyweight Denim Jeans">
                  <option value="Classic Heavyweight Denim Jeans">DEMO-DJ-001 — Classic Heavyweight Denim Jeans</option>
                  <option value="Relaxed Fit Vintage Wash Jeans">DEMO-DJ-002 — Relaxed Fit Vintage Wash Jeans</option>
                </select>
              </div>

              <div className="form-grid-2 mb-3">
                <div className="form-group">
                  <label htmlFor="batchSizeInput" className="form-label">Batch Quantity (Pcs)</label>
                  <input
                    id="batchSizeInput"
                    type="number"
                    min="10"
                    max="500"
                    value={batchQty}
                    onChange={(e) => setBatchQty(Number(e.target.value) || 10)}
                    className="form-input font-mono"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="targetSizeSelect" className="form-label">Primary Size Target</label>
                  <select
                    id="targetSizeSelect"
                    value={targetSize}
                    onChange={(e) => setTargetSize(e.target.value)}
                    className="form-select font-mono"
                  >
                    <option value="38">Waist 38</option>
                    <option value="42">Waist 42 (Low Stock)</option>
                    <option value="44">Waist 44</option>
                    <option value="46">Waist 46 (Low Stock)</option>
                  </select>
                </div>
              </div>

              <div className="modal-summary-box mb-4">
                <div className="summary-row">
                  <span>Raw Denim Needed (2.2m/pc + 5% wastage):</span>
                  <strong className="font-mono">{(batchQty * 2.2 * 1.05).toFixed(1)} Meters</strong>
                </div>
                <div className="summary-row">
                  <span>Initial Job Partner:</span>
                  <span>Apex Dyeing Works (Bhiwandi)</span>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setShowNewBatchModal(false)}
                  className="btn-outline-compact"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-compact">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Confirm & Issue Fabric</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
