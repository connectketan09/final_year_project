import { useERP } from '../context/ERPContext';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  RotateCcw
} from 'lucide-react';

export const GuidedDemoModal = () => {
  const {
    isGuidedDemoOpen,
    setGuidedDemoOpen,
    guidedStepIndex,
    setGuidedStepIndex,
    executeGuidedStep,
    resetDemoData
  } = useERP();

  if (!isGuidedDemoOpen) return null;

  const steps = [
    {
      letter: 'A',
      title: 'Record Fabric Purchase',
      module: 'Purchase & Supplier Ledger',
      targetId: 'workflow',
      desc: 'Purchase 250m of 14.5oz raw denim @ ₹240/m from Arvind Mills Ltd. (Lot LOT-DEN-8825). Posts bill and credits supplier ledger.',
      actionLabel: 'Execute Fabric Purchase'
    },
    {
      letter: 'B',
      title: 'Dispatch Fabric to Dyeing',
      module: 'Dyeing & Wash Vat',
      targetId: 'inventory',
      desc: 'Deduct 231m of raw fabric and create active Dyeing WIP Lot for 100 units at Apex Dyeing Works (Bhiwandi).',
      actionLabel: 'Dispatch to Dyeing Vat'
    },
    {
      letter: 'C',
      title: 'Issue Stitching Job Order',
      module: 'Job Work & Assembly',
      targetId: 'inventory',
      desc: 'Advance the batch from Dyeing to Stitching at Master Rafiq Jobwork @ ₹120 piece rate.',
      actionLabel: 'Assign Stitching Work Order'
    },
    {
      letter: 'D',
      title: 'Complete Finishing & Inward Stock',
      module: 'Finished Goods Inventory',
      targetId: 'inventory',
      desc: 'Complete zipper/rivet assembly, pass final QC inspection, and transfer 100 completed jeans into Finished Inventory (Size 42).',
      actionLabel: 'Transfer to Finished Stock'
    },
    {
      letter: 'E',
      title: 'Audit Article Costing & Pricing',
      module: 'Production Costing Engine',
      targetId: 'costing',
      desc: 'Verify article BOM: Fabric (₹554.40) + Dyeing (₹85) + Stitching (₹120) + Trims (₹45) + Overhead (₹25) = ₹829.40 unit cost.',
      actionLabel: 'Recalculate Article Cost'
    },
    {
      letter: 'F',
      title: 'Book Wholesale Sale to Buyer',
      module: 'Sales & Invoicing',
      targetId: 'sales',
      desc: 'Generate Invoice INV-2026-104 for Metro Plus Apparels for 10 pcs @ ₹1,120 wholesale price. Automatically deducts 10 pcs from finished stock.',
      actionLabel: 'Generate Sales Invoice'
    },
    {
      letter: 'G',
      title: 'Inspect Stock Deduction & Ledger',
      module: 'Inventory & Ledgers',
      targetId: 'inventory',
      desc: 'Verify that available finished stock decreased immediately and Metro Plus Apparels debit ledger balance updated.',
      actionLabel: 'Verify Stock & Debits'
    },
    {
      letter: 'H',
      title: 'Record Payment Clearance with Proof',
      module: 'Settlement & Proof Voucher',
      targetId: 'sales',
      desc: 'Record ₹7,544 full payment clearance via UPI with receiver confirmation stamp and local transaction slip preview.',
      actionLabel: 'Clear Outstanding via UPI'
    },
    {
      letter: 'I',
      title: 'Review Owner Dashboard & P&L',
      module: 'Executive Dashboard & Reports',
      targetId: 'dashboard',
      desc: 'Observe the updated Sales Turnover, COGS, Net Operating Margin, and Net GST liability position.',
      actionLabel: 'Inspect Updated Dashboard'
    },
    {
      letter: 'J',
      title: 'Query UID Business Assistant',
      module: 'AI Business Assistant',
      targetId: 'ai-assistant',
      desc: 'Ask the AI Assistant: "How much did we sell this month?". Notice the response synthesizes all newly posted demo records!',
      actionLabel: 'Ask AI Assistant'
    }
  ];

  const currentStep = steps[guidedStepIndex];

  const handleExecute = () => {
    executeGuidedStep(guidedStepIndex);
    // Smooth scroll to section
    const el = document.getElementById(currentStep.targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (guidedStepIndex < steps.length - 1) {
      setGuidedStepIndex(guidedStepIndex + 1);
    }
  };

  const handleNext = () => {
    if (guidedStepIndex < steps.length - 1) {
      setGuidedStepIndex(guidedStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (guidedStepIndex > 0) {
      setGuidedStepIndex(guidedStepIndex - 1);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card max-w-2xl">
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="modal-title">2-Minute Mentor Demonstration Sequence</h3>
              <p className="text-xs text-slate-500">
                10-Step Connected Scenario: "From Fabric to Profit" (Vidyalankar Diploma Project)
              </p>
            </div>
          </div>
          <button
            onClick={() => setGuidedDemoOpen(false)}
            className="modal-close-btn"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
            <span>STEP {guidedStepIndex + 1} OF 10: {currentStep.letter}. {currentStep.title}</span>
            <span className="font-mono">{Math.round(((guidedStepIndex + 1) / 10) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${((guidedStepIndex + 1) / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Card Body */}
        <div className="modal-body">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="badge-tag">RELEVANT MODULE: {currentStep.module}</span>
              <span className="badge-mono font-bold text-slate-700">SCENARIO {currentStep.letter}</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1.5">
              {currentStep.letter}. {currentStep.title}
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {currentStep.desc}
            </p>
          </div>

          {/* Quick Step Selector Pills */}
          <div className="step-pills-row">
            {steps.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setGuidedStepIndex(idx)}
                className={`step-pill-btn ${idx === guidedStepIndex ? 'active' : idx < guidedStepIndex ? 'completed' : ''}`}
                title={`${s.letter}: ${s.title}`}
              >
                <span>{s.letter}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="modal-footer justify-between">
          <button
            type="button"
            onClick={resetDemoData}
            className="btn-outline-compact text-slate-600 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={guidedStepIndex === 0}
              className="btn-outline-compact disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleExecute}
              className="btn-primary-compact"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{currentStep.actionLabel}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={guidedStepIndex === steps.length - 1}
              className="btn-outline-compact disabled:opacity-40"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
