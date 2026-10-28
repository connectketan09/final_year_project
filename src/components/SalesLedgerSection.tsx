import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useERP } from '../context/ERPContext';
import {
  CreditCard,
  Plus,
  Layers,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Check,
  Building
} from 'lucide-react';

export const SalesLedgerSection = () => {
  const {
    sales,
    recordSale,
    payments,
    recordPayment,
    ledgers,
    finishedGoods,
    calculatedCosting
  } = useERP();

  const [activeSubTab, setActiveSubTab] = useState<'sales' | 'ledgers' | 'record-payment'>('sales');
  const [showSaleModal, setShowSaleModal] = useState<boolean>(false);

  // New Sale Form State
  const [selectedBuyer, setSelectedBuyer] = useState<string>('Metro Plus Apparels');
  const [buyerCity, setBuyerCity] = useState<string>('Dadar, Mumbai');
  const [selectedSku, setSelectedSku] = useState<string>('DEMO-DJ-001-38');
  const [saleQty, setSaleQty] = useState<number>(15);
  const [unitRate, setUnitRate] = useState<number>(calculatedCosting.suggestedWholesalePrice || 1120);
  const discountPct = 0;
  const [advancePaid, setAdvancePaid] = useState<number>(10000);
  const [saleError, setSaleError] = useState<string | null>(null);

  // Payment Form State
  const [payPartyName, setPayPartyName] = useState<string>('Metro Plus Apparels');
  const [payPartyType, setPayPartyType] = useState<'buyer' | 'supplier' | 'job_worker'>('buyer');
  const [payType, setPayType] = useState<'Received' | 'Paid'>('Received');
  const [payAmount, setPayAmount] = useState<number>(7632);
  const [payMode, setPayMode] = useState<'Cash' | 'UPI' | 'Bank Transfer'>('UPI');
  const [payRef, setPayRef] = useState<string>('UPI/METRO-OCT28/9981');
  const [payConfirmed, setPayConfirmed] = useState<boolean>(true);
  const [payFile, setPayFile] = useState<File | null>(null);
  const [paySuccessMsg, setPaySuccessMsg] = useState<string | null>(null);

  // Selected item info for sale validation
  const currentItem = finishedGoods.find((g) => g.sku === selectedSku);

  const handleSaleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSaleError(null);

    const result = recordSale({
      buyerName: selectedBuyer,
      buyerCity,
      sku: selectedSku,
      size: currentItem?.size || '38',
      quantity: saleQty,
      unitPrice: unitRate,
      discountPercent: discountPct,
      taxPercent: 12,
      paidAmount: advancePaid
    });

    if (!result.success) {
      setSaleError(result.error || 'Failed to record sale.');
      return;
    }

    setShowSaleModal(false);
  };

  const handlePaymentSubmit = (e: FormEvent) => {
    e.preventDefault();
    recordPayment({
      partyName: payPartyName,
      partyType: payPartyType,
      type: payType,
      amount: payAmount,
      mode: payMode,
      reference: payRef,
      confirmed: payConfirmed,
      proofFileName: payFile ? payFile.name : 'digital_receipt.png',
      notes: `${payType} settlement for ${payPartyName}`
    });

    setPaySuccessMsg(`Recorded ${payType} payment of ₹${payAmount.toLocaleString('en-IN')} via ${payMode}!`);
    setTimeout(() => setPaySuccessMsg(null), 4000);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPayFile(e.target.files[0]);
    }
  };

  return (
    <section id="sales" className="section-container sales-section">
      <div className="section-header-row">
        <div>
          <div className="section-eyebrow">
            <span className="badge-tag">COMMERCIAL TRANSACTIONS</span>
            <span className="badge-sub">Invoicing, Ledgers & Settlement</span>
          </div>
          <h2 className="section-title">Sales, Party Ledgers & Payments</h2>
          <p className="section-subtitle">
            Record wholesale orders with live stock deduction, track buyer credit, manage mill & job-worker balances, and verify receipts with optional local proof.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setShowSaleModal(true)}
            className="btn-primary-compact"
          >
            <Plus className="w-4 h-4" />
            <span>New Wholesale Order</span>
          </button>
          <button
            onClick={() => setActiveSubTab('record-payment')}
            className="btn-outline-compact"
          >
            <CreditCard className="w-4 h-4" />
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      {paySuccessMsg && (
        <div className="alert-success-banner mb-4">
          <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>{paySuccessMsg}</span>
        </div>
      )}

      {/* Sub Tabs */}
      <div className="inventory-tabs-row">
        <button
          onClick={() => setActiveSubTab('sales')}
          className={`inv-tab-btn ${activeSubTab === 'sales' ? 'active' : ''}`}
        >
          <Layers className="w-4 h-4" />
          <span>Sales Invoices ({sales.length} Invoices)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('ledgers')}
          className={`inv-tab-btn ${activeSubTab === 'ledgers' ? 'active' : ''}`}
        >
          <Building className="w-4 h-4" />
          <span>Party Ledgers ({ledgers.length} Accounts)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('record-payment')}
          className={`inv-tab-btn ${activeSubTab === 'record-payment' ? 'active' : ''}`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Settlement & Proof Voucher</span>
        </button>
      </div>

      {/* SUB-TAB 1: SALES INVOICES */}
      {activeSubTab === 'sales' && (
        <div className="table-responsive-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>INVOICE NO.</th>
                <th>DATE</th>
                <th>BUYER / RETAILER</th>
                <th>ARTICLE & SIZE</th>
                <th>QTY (PCS)</th>
                <th>RATE</th>
                <th>SUBTOTAL</th>
                <th>GST (12%)</th>
                <th>INVOICE TOTAL</th>
                <th>PAID AMOUNT</th>
                <th>BALANCE DUE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s.id}>
                  <td>
                    <span className="font-mono font-bold text-slate-900">{s.invoiceNo}</span>
                  </td>
                  <td>
                    <span className="text-xs text-slate-600">{s.date}</span>
                  </td>
                  <td>
                    <div className="font-semibold text-slate-800">{s.buyerName}</div>
                    <div className="text-xs text-slate-500">{s.buyerCity}</div>
                  </td>
                  <td>
                    <div className="text-xs font-medium text-slate-800">{s.articleName}</div>
                    <span className="size-badge text-[10px] py-0 px-1.5">Size {s.size}</span>
                  </td>
                  <td>
                    <span className="font-mono font-bold">{s.quantity}</span>
                  </td>
                  <td>
                    <span className="font-mono text-xs">₹{s.unitPrice}</span>
                  </td>
                  <td>
                    <span className="font-mono text-xs">₹{s.subtotal.toLocaleString('en-IN')}</span>
                  </td>
                  <td>
                    <span className="font-mono text-xs text-slate-600">+₹{s.taxAmount.toLocaleString('en-IN')}</span>
                  </td>
                  <td>
                    <span className="font-mono font-bold text-slate-900">₹{s.totalAmount.toLocaleString('en-IN')}</span>
                  </td>
                  <td>
                    <span className="font-mono text-xs font-semibold text-emerald-700">₹{s.paidAmount.toLocaleString('en-IN')}</span>
                  </td>
                  <td>
                    <span className={`font-mono text-xs font-bold ${s.balanceAmount > 0 ? 'text-amber-700' : 'text-slate-500'}`}>
                      ₹{s.balanceAmount.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill-badge ${s.status === 'Paid' ? 'success' : s.status === 'Partial' ? 'warning' : 'alert'}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB-TAB 2: PARTY LEDGERS */}
      {activeSubTab === 'ledgers' && (
        <div className="ledgers-container">
          <div className="ledgers-summary-cards">
            {ledgers.map((ledger) => (
              <div key={ledger.id} className="party-ledger-card">
                <div className="ledger-card-header">
                  <div>
                    <h3 className="ledger-party-name">{ledger.partyName}</h3>
                    <div className="ledger-party-sub">
                      <span className="badge-tag">{ledger.role.toUpperCase()}</span>
                      <span className="text-xs text-slate-500">{ledger.city}</span>
                    </div>
                  </div>
                  <div className="ledger-balance-box">
                    <span className="balance-label">
                      {ledger.role === 'buyer' ? 'RECEIVABLE FROM BUYER' : 'PAYABLE TO PARTY'}
                    </span>
                    <span className={`balance-value font-mono ${ledger.currentBalance > 0 ? (ledger.role === 'buyer' ? 'text-blue-900 font-bold' : 'text-amber-900 font-bold') : 'text-slate-500'}`}>
                      ₹{ledger.currentBalance.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Ledger Journal Entries */}
                <div className="ledger-entries-table-wrapper">
                  <table className="ledger-mini-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description / Ref</th>
                        <th>Debit (₹)</th>
                        <th>Credit (₹)</th>
                        <th>Balance (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ledger.entries.map((entry) => (
                        <tr key={entry.id}>
                          <td className="text-xs text-slate-600">{entry.date}</td>
                          <td className="text-xs text-slate-800 font-medium">
                            {entry.description}
                            <span className="text-[10px] font-mono text-slate-500 ml-1.5">[{entry.referenceDoc}]</span>
                          </td>
                          <td className="font-mono text-xs">{entry.debit > 0 ? `₹${entry.debit.toLocaleString('en-IN')}` : '-'}</td>
                          <td className="font-mono text-xs text-emerald-700">{entry.credit > 0 ? `₹${entry.credit.toLocaleString('en-IN')}` : '-'}</td>
                          <td className="font-mono text-xs font-bold text-slate-900">₹{entry.balance.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: RECORD PAYMENT VOUCHER */}
      {activeSubTab === 'record-payment' && (
        <div className="payment-voucher-container">
          <div className="payment-form-card">
            <div className="card-sub-header">
              <CreditCard className="w-4 h-4 text-emerald-700" />
              <h3 className="card-sub-title">Record Payment Settlement Voucher</h3>
            </div>

            <form onSubmit={handlePaymentSubmit} className="payment-voucher-form">
              <div className="form-grid-3 mb-3">
                <div className="form-group">
                  <label htmlFor="txnType" className="form-label">Transaction Type</label>
                  <select
                    id="txnType"
                    value={payType}
                    onChange={(e) => {
                      const val = e.target.value as 'Received' | 'Paid';
                      setPayType(val);
                      if (val === 'Received') {
                        setPayPartyType('buyer');
                        setPayPartyName('Metro Plus Apparels');
                        setPayAmount(7632);
                      } else {
                        setPayPartyType('supplier');
                        setPayPartyName('Arvind Mills Ltd.');
                        setPayAmount(40000);
                      }
                    }}
                    className="form-select font-semibold"
                  >
                    <option value="Received">Payment Received (From Buyer)</option>
                    <option value="Paid">Payment Made (To Supplier / Job Worker)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="partySelect" className="form-label">Party Account</label>
                  <select
                    id="partySelect"
                    value={payPartyName}
                    onChange={(e) => setPayPartyName(e.target.value)}
                    className="form-select font-medium"
                  >
                    {payType === 'Received' ? (
                      <>
                        <option value="Metro Plus Apparels">Metro Plus Apparels (Receivable: ₹7,632)</option>
                        <option value="Royal Men's Big & Tall Store">Royal Men's Big & Tall Store (Nil)</option>
                        <option value="Vastram Plus Collections">Vastram Plus Collections (Receivable: ₹16,360)</option>
                      </>
                    ) : (
                      <>
                        <option value="Arvind Mills Ltd.">Arvind Mills Ltd. (Payable: ₹96,000)</option>
                        <option value="Apex Dyeing Works">Apex Dyeing Works (Dyeing charges)</option>
                        <option value="Master Rafiq Jobwork">Master Rafiq Jobwork (Stitching charges)</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="amountInput" className="form-label">Amount (₹)</label>
                  <input
                    id="amountInput"
                    type="number"
                    min="1"
                    value={payAmount}
                    onChange={(e) => setPayAmount(Number(e.target.value) || 0)}
                    className="form-input font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div className="form-grid-3 mb-3">
                <div className="form-group">
                  <label htmlFor="payModeSelect" className="form-label">Payment Mode</label>
                  <select
                    id="payModeSelect"
                    value={payMode}
                    onChange={(e) => setPayMode(e.target.value as any)}
                    className="form-select font-medium"
                  >
                    <option value="UPI">UPI / GooglePay / PhonePe</option>
                    <option value="Bank Transfer">Bank Transfer (NEFT / RTGS / IMPS)</option>
                    <option value="Cash">Cash Receipt Voucher</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="refInput" className="form-label">Reference / UTR / Cheque No.</label>
                  <input
                    id="refInput"
                    type="text"
                    value={payRef}
                    onChange={(e) => setPayRef(e.target.value)}
                    className="form-input font-mono"
                    placeholder="e.g. UPI/2209410294 or NEFT-HDFC-9921"
                    required
                  />
                </div>

                <div className="form-group flex flex-col justify-end">
                  <label className="checkbox-label flex items-center gap-2 pt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={payConfirmed}
                      onChange={(e) => setPayConfirmed(e.target.checked)}
                      className="form-checkbox w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-xs font-semibold text-slate-800">
                      Confirmed by Receiver
                    </span>
                  </label>
                  <span className="text-[11px] text-slate-500">Stamp verification in ledger</span>
                </div>
              </div>

              {/* Local File Attachment Upload Control */}
              <div className="form-group mb-4">
                <label className="form-label">Optional Payment Proof Attachment (Simulation)</label>
                <div className="file-upload-dropzone">
                  <input
                    type="file"
                    id="paymentProofFile"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden-file-input"
                  />
                  <label htmlFor="paymentProofFile" className="file-upload-label">
                    <Upload className="w-5 h-5 text-slate-500 mb-1" />
                    <span className="file-upload-prompt">
                      {payFile ? (
                        <strong className="text-emerald-700">Selected: {payFile.name} ({(payFile.size / 1024).toFixed(0)} KB)</strong>
                      ) : (
                        <span>Click to attach payment screenshot, bank receipt or cheque image</span>
                      )}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Local browser preview only. Demonstrates UI proof attachment without uploading to an external server.
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="btn-primary-compact"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Post Payment to Ledger</span>
                </button>
              </div>
            </form>
          </div>

          {/* Recent Payment Records Table */}
          <div className="recent-payments-card mt-4">
            <h4 className="card-sub-title mb-2">Verified Payment Transactions</h4>
            <div className="table-responsive-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>RECEIPT / VOUCHER</th>
                    <th>DATE</th>
                    <th>PARTY</th>
                    <th>TYPE</th>
                    <th>AMOUNT</th>
                    <th>MODE & REF</th>
                    <th>PROOF ATTACHMENT</th>
                    <th>RECEIVER CONFIRMED</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id}>
                      <td className="font-mono text-xs font-bold text-slate-900">{p.receiptNo}</td>
                      <td className="text-xs text-slate-600">{p.date}</td>
                      <td>
                        <span className="font-semibold text-xs text-slate-800">{p.partyName}</span>
                      </td>
                      <td>
                        <span className={`status-pill-badge ${p.type === 'Received' ? 'success' : 'neutral'}`}>
                          {p.type}
                        </span>
                      </td>
                      <td>
                        <span className={`font-mono text-xs font-bold ${p.type === 'Received' ? 'text-emerald-700' : 'text-slate-900'}`}>
                          ₹{p.amount.toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td>
                        <div className="text-xs font-medium text-slate-800">{p.mode}</div>
                        <div className="text-[10px] font-mono text-slate-500">{p.reference}</div>
                      </td>
                      <td>
                        {p.proofFileName ? (
                          <span className="file-attachment-pill" title="Local file attached">
                            <FileText className="w-3 h-3 text-blue-600 inline mr-1" />
                            {p.proofFileName}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">None</span>
                        )}
                      </td>
                      <td>
                        {p.confirmed ? (
                          <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Confirmed
                          </span>
                        ) : (
                          <span className="text-xs text-amber-600">Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* New Wholesale Order Modal */}
      {showSaleModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">New Wholesale Sales Order</h3>
              <button
                type="button"
                onClick={() => setShowSaleModal(false)}
                className="modal-close-btn"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSaleSubmit} className="modal-body">
              {saleError && (
                <div className="alert-error-banner mb-3">
                  <AlertCircle className="w-4 h-4 text-rose-700 flex-shrink-0" />
                  <span>{saleError}</span>
                </div>
              )}

              <div className="form-grid-2 mb-3">
                <div className="form-group">
                  <label htmlFor="buyerSelect" className="form-label">Buyer / Boutique</label>
                  <select
                    id="buyerSelect"
                    value={selectedBuyer}
                    onChange={(e) => {
                      const buyer = e.target.value;
                      setSelectedBuyer(buyer);
                      if (buyer === 'Metro Plus Apparels') setBuyerCity('Dadar, Mumbai');
                      else if (buyer === "Royal Men's Big & Tall Store") setBuyerCity('FC Road, Pune');
                      else if (buyer === 'Vastram Plus Collections') setBuyerCity('Ring Road, Surat');
                    }}
                    className="form-select font-semibold"
                  >
                    <option value="Metro Plus Apparels">Metro Plus Apparels (Mumbai)</option>
                    <option value="Royal Men's Big & Tall Store">Royal Men's Big & Tall Store (Pune)</option>
                    <option value="Vastram Plus Collections">Vastram Plus Collections (Surat)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="skuSelect" className="form-label">Article & Size Variant</label>
                  <select
                    id="skuSelect"
                    value={selectedSku}
                    onChange={(e) => setSelectedSku(e.target.value)}
                    className="form-select font-mono"
                  >
                    {finishedGoods.map((item) => (
                      <option key={item.sku} value={item.sku}>
                        {item.sku} (Size {item.size}) — {item.availableStock} in stock
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-grid-3 mb-3">
                <div className="form-group">
                  <label htmlFor="orderQtyInput" className="form-label">Quantity (Pcs)</label>
                  <input
                    id="orderQtyInput"
                    type="number"
                    min="1"
                    max={currentItem?.availableStock || 100}
                    value={saleQty}
                    onChange={(e) => setSaleQty(Number(e.target.value) || 1)}
                    className="form-input font-mono font-bold"
                    required
                  />
                  <span className="text-[11px] text-slate-500">
                    Max: {currentItem?.availableStock} available
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="unitRateInput" className="form-label">Unit Wholesale (₹)</label>
                  <input
                    id="unitRateInput"
                    type="number"
                    min="100"
                    value={unitRate}
                    onChange={(e) => setUnitRate(Number(e.target.value) || 0)}
                    className="form-input font-mono"
                    required
                  />
                  <span className="text-[11px] text-slate-500">Suggested: ₹{calculatedCosting.suggestedWholesalePrice}</span>
                </div>

                <div className="form-group">
                  <label htmlFor="advancePaidInput" className="form-label">Initial Advance Paid (₹)</label>
                  <input
                    id="advancePaidInput"
                    type="number"
                    min="0"
                    value={advancePaid}
                    onChange={(e) => setAdvancePaid(Number(e.target.value) || 0)}
                    className="form-input font-mono"
                  />
                  <span className="text-[11px] text-slate-500">Carries balance to ledger</span>
                </div>
              </div>

              {/* Order Financial Calculation Summary */}
              {(() => {
                const sub = saleQty * unitRate * (1 - discountPct / 100);
                const tax = sub * 0.12;
                const total = sub + tax;
                const bal = total - advancePaid;
                return (
                  <div className="modal-summary-box mb-4">
                    <div className="summary-row">
                      <span>Subtotal ({saleQty} pcs @ ₹{unitRate}):</span>
                      <strong className="font-mono">₹{sub.toFixed(2)}</strong>
                    </div>
                    <div className="summary-row">
                      <span>GST (12% Apparel Tax):</span>
                      <strong className="font-mono">+₹{tax.toFixed(2)}</strong>
                    </div>
                    <div className="summary-row text-slate-900 font-bold border-t border-slate-200 pt-1.5 mt-1.5">
                      <span>Invoice Total Amount:</span>
                      <strong className="font-mono text-base">₹{total.toFixed(2)}</strong>
                    </div>
                    <div className="summary-row text-amber-800">
                      <span>Balance Outstanding after Advance:</span>
                      <strong className="font-mono">₹{bal.toFixed(2)}</strong>
                    </div>
                  </div>
                );
              })()}

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setShowSaleModal(false)}
                  className="btn-outline-compact"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-compact">
                  <Check className="w-3.5 h-3.5" />
                  <span>Generate Invoice & Update Stock</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
