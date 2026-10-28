import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type {
  AuditLogEntry,
  CostingConfig,
  ExpenseRecord,
  FinishedGood,
  PartyLedger,
  PaymentRecord,
  RawMaterial,
  SaleRecord,
  UserRole,
  UserProfile,
  WipBatch,
  WorkflowStage,
  WorkflowStageId,
  AIChatMessage
} from '../types';
import {
  INITIAL_AUDIT_LOG,
  INITIAL_COSTING_CONFIG,
  INITIAL_EXPENSES,
  INITIAL_FINISHED_GOODS,
  INITIAL_LEDGERS,
  INITIAL_PAYMENTS,
  INITIAL_RAW_MATERIALS,
  INITIAL_SALES,
  INITIAL_WIP_BATCHES,
  INITIAL_WORKFLOW_STAGES
} from '../data/initialData';

interface ERPContextType {
  // Role & Authentication
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile | null;
  login: (user: UserProfile) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;

  // Workflow
  workflowStages: WorkflowStage[];
  activeStageId: WorkflowStageId;
  setActiveStageId: (id: WorkflowStageId) => void;
  isAutoRunning: boolean;
  toggleAutoRun: () => void;
  nextStage: () => void;
  prevStage: () => void;

  // Raw Materials
  rawMaterials: RawMaterial[];
  recordFabricPurchase: (params: {
    supplier: string;
    materialName: string;
    lotNumber: string;
    quantity: number;
    unitCost: number;
    paidAmount: number;
    paymentMode: 'Cash' | 'UPI' | 'Bank Transfer';
  }) => void;

  // WIP Batches
  wipBatches: WipBatch[];
  sendBatchToDyeing: (params: {
    articleName: string;
    quantity: number;
    fabricUsedMeters: number;
    assignedTo: string;
  }) => void;
  sendBatchToStitching: (params: {
    wipId: string;
    assignedTo: string;
  }) => void;
  completeFinishingAndMoveToInventory: (params: {
    wipId: string;
    sku: string;
  }) => void;

  // Finished Goods & Inventory
  finishedGoods: FinishedGood[];

  // Costing
  costingConfig: CostingConfig;
  updateCostingConfig: (newConfig: Partial<CostingConfig>) => void;
  calculatedCosting: {
    fabricCostPerPiece: number;
    totalCostPerGarment: number;
    batchTotalCost: number;
    suggestedWholesalePrice: number;
    suggestedWholesaleWithGst: number;
    suggestedMrp: number;
    grossMarginPercent: number;
    markupPercent: number;
  };

  // Sales
  sales: SaleRecord[];
  recordSale: (sale: {
    buyerName: string;
    buyerCity: string;
    sku: string;
    size: string;
    quantity: number;
    unitPrice: number;
    discountPercent: number;
    taxPercent: number;
    paidAmount: number;
  }) => { success: boolean; error?: string };

  // Payments
  payments: PaymentRecord[];
  recordPayment: (payment: {
    partyName: string;
    partyType: 'buyer' | 'supplier' | 'job_worker';
    type: 'Received' | 'Paid';
    amount: number;
    mode: 'Cash' | 'UPI' | 'Bank Transfer';
    reference: string;
    confirmed: boolean;
    proofFileName?: string;
    notes?: string;
  }) => void;

  // Ledgers
  ledgers: PartyLedger[];

  // Expenses
  expenses: ExpenseRecord[];
  recordExpense: (expense: {
    category: ExpenseRecord['category'];
    description: string;
    amount: number;
    paidTo: string;
    mode: 'Cash' | 'UPI' | 'Bank Transfer';
  }) => void;

  // Audit Log
  auditLogs: AuditLogEntry[];

  // AI Assistant
  aiMessages: AIChatMessage[];
  sendAIMessage: (query: string) => void;
  clearAIChat: () => void;

  // Dashboard Aggregates
  dashboardStats: {
    totalSalesRevenue: number;
    totalSalesUnits: number;
    totalFinishedStockUnits: number;
    totalFinishedStockValue: number;
    totalRawMaterialMeters: number;
    totalWipUnits: number;
    amountsReceivable: number;
    amountsPayable: number;
    totalProductionCostCurrent: number;
    totalOperatingExpenses: number;
    netOperatingProfit: number;
    taxCollectedGST: number;
    taxPaidGST: number;
    lowStockItemCount: number;
  };

  // Guided Demo Scenario
  isGuidedDemoOpen: boolean;
  setGuidedDemoOpen: (open: boolean) => void;
  guidedStepIndex: number;
  setGuidedStepIndex: (step: number) => void;
  executeGuidedStep: (stepIndex: number) => void;

  // Global reset
  resetDemoData: () => void;
}

const ERPContext = createContext<ERPContextType | undefined>(undefined);

export const ERPProvider = ({ children }: { children: ReactNode }) => {
  // 1. Role & Auth
  const [role, setRole] = useState<UserRole>('owner');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    name: 'Ketan Rajput (Admin)',
    email: 'ketan@parshvacreation.in',
    role: 'owner',
    company: 'UID Denims × Parshva Creation'
  });
  const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // 2. Workflow
  const [workflowStages, setWorkflowStages] = useState<WorkflowStage[]>(INITIAL_WORKFLOW_STAGES);
  const [activeStageId, setActiveStageId] = useState<WorkflowStageId>('purchase');
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(false);

  // 3. Raw Materials
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>(INITIAL_RAW_MATERIALS);

  // 4. WIP Batches
  const [wipBatches, setWipBatches] = useState<WipBatch[]>(INITIAL_WIP_BATCHES);

  // 5. Finished Goods
  const [finishedGoods, setFinishedGoods] = useState<FinishedGood[]>(INITIAL_FINISHED_GOODS);

  // 6. Costing Config
  const [costingConfig, setCostingConfig] = useState<CostingConfig>(INITIAL_COSTING_CONFIG);

  // 7. Sales
  const [sales, setSales] = useState<SaleRecord[]>(INITIAL_SALES);

  // 8. Payments
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);

  // 9. Ledgers
  const [ledgers, setLedgers] = useState<PartyLedger[]>(INITIAL_LEDGERS);

  // 10. Expenses
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(INITIAL_EXPENSES);

  // 11. Audit Log
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOG);

  // 12. Guided Demo
  const [isGuidedDemoOpen, setGuidedDemoOpen] = useState<boolean>(false);
  const [guidedStepIndex, setGuidedStepIndex] = useState<number>(0);

  // 13. AI Assistant
  const [aiMessages, setAiMessages] = useState<AIChatMessage[]>([
    {
      id: 'AI-INIT-1',
      sender: 'assistant',
      text: "Namaste! I am your UID Denims Business Assistant. I inspect your active manufacturing, inventory, costing, and ledger records in real time. Ask me anything about current stock, outstanding receivables, product costing, or sales trends.",
      timestamp: 'Just now'
    }
  ]);

  // Workflow auto-runner timer
  useEffect(() => {
    if (!isAutoRunning) return;
    const stageIds: WorkflowStageId[] = [
      'purchase',
      'dyeing',
      'stitching',
      'finishing',
      'inventory',
      'sales',
      'payments',
      'reports'
    ];
    const timer = setInterval(() => {
      setActiveStageId((curr) => {
        const currIdx = stageIds.indexOf(curr);
        const nextIdx = (currIdx + 1) % stageIds.length;
        return stageIds[nextIdx];
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoRunning]);

  const toggleAutoRun = () => setIsAutoRunning((prev) => !prev);

  const nextStage = () => {
    const stageIds: WorkflowStageId[] = [
      'purchase',
      'dyeing',
      'stitching',
      'finishing',
      'inventory',
      'sales',
      'payments',
      'reports'
    ];
    const currIdx = stageIds.indexOf(activeStageId);
    const nextIdx = (currIdx + 1) % stageIds.length;
    setActiveStageId(stageIds[nextIdx]);
  };

  const prevStage = () => {
    const stageIds: WorkflowStageId[] = [
      'purchase',
      'dyeing',
      'stitching',
      'finishing',
      'inventory',
      'sales',
      'payments',
      'reports'
    ];
    const currIdx = stageIds.indexOf(activeStageId);
    const prevIdx = (currIdx - 1 + stageIds.length) % stageIds.length;
    setActiveStageId(stageIds[prevIdx]);
  };

  // Helper for audit logs
  const logAudit = (action: string, module: string, details: string) => {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const newEntry: AuditLogEntry = {
      id: `AUDIT-${Date.now().toString().slice(-4)}`,
      timestamp,
      user: role === 'owner' ? 'Ketan Rajput (Admin)' : `${role.toUpperCase()} User`,
      role: role.toUpperCase(),
      action,
      module,
      details
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const login = (user: UserProfile) => {
    setCurrentUser(user);
    setRole(user.role);
    setAuthModalOpen(false);
    logAudit(
      'USER_LOGIN',
      'SECURITY',
      `Terminal authenticated: ${user.name} (${user.role.toUpperCase()}) - ${user.company}`
    );
  };

  const logout = () => {
    setCurrentUser(null);
    setRole('buyer');
    logAudit('USER_LOGOUT', 'SECURITY', 'Terminal session terminated - switched to restricted buyer view');
  };

  // Costing calculations
  const calculateCosting = () => {
    const {
      batchSize,
      fabricCostPerMeter,
      fabricMetersPerGarment,
      fabricWastagePercent,
      dyeingCostPerPiece,
      stitchingCostPerPiece,
      accessoriesCostPerPiece,
      otherOverheadPerPiece,
      markupPercent,
      marginPercent,
      pricingStrategy,
      gstRatePercent,
      mrpMultiplier
    } = costingConfig;

    // Fabric cost per piece including wastage
    const fabricCostPerPiece = fabricMetersPerGarment * fabricCostPerMeter * (1 + fabricWastagePercent / 100);
    const totalCostPerGarment =
      fabricCostPerPiece +
      dyeingCostPerPiece +
      stitchingCostPerPiece +
      accessoriesCostPerPiece +
      otherOverheadPerPiece;

    const batchTotalCost = totalCostPerGarment * batchSize;

    let suggestedWholesalePrice = 0;
    if (pricingStrategy === 'markup') {
      // Cost + Markup% of Cost
      suggestedWholesalePrice = totalCostPerGarment * (1 + markupPercent / 100);
    } else {
      // Cost / (1 - Margin%)
      const marginDecimal = marginPercent / 100;
      suggestedWholesalePrice = marginDecimal < 1 ? totalCostPerGarment / (1 - marginDecimal) : totalCostPerGarment * 1.35;
    }

    const suggestedWholesaleWithGst = suggestedWholesalePrice * (1 + gstRatePercent / 100);
    const suggestedMrp = suggestedWholesalePrice * mrpMultiplier;

    const grossMarginPercent =
      suggestedWholesalePrice > 0
        ? ((suggestedWholesalePrice - totalCostPerGarment) / suggestedWholesalePrice) * 100
        : 0;

    return {
      fabricCostPerPiece: Number(fabricCostPerPiece.toFixed(2)),
      totalCostPerGarment: Number(totalCostPerGarment.toFixed(2)),
      batchTotalCost: Number(batchTotalCost.toFixed(2)),
      suggestedWholesalePrice: Number(suggestedWholesalePrice.toFixed(2)),
      suggestedWholesaleWithGst: Number(suggestedWholesaleWithGst.toFixed(2)),
      suggestedMrp: Number(Math.round(suggestedMrp / 10) * 10 - 1), // e.g. 2499
      grossMarginPercent: Number(grossMarginPercent.toFixed(1)),
      markupPercent: Number(markupPercent.toFixed(1))
    };
  };

  const calculatedCosting = calculateCosting();

  const updateCostingConfig = (newConfig: Partial<CostingConfig>) => {
    setCostingConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      return updated;
    });
    logAudit('CONFIG_CHANGE', 'Costing Engine', 'Updated article production pricing parameters');
  };

  // Actions
  const recordFabricPurchase = ({
    supplier,
    materialName,
    lotNumber,
    quantity,
    unitCost,
    paidAmount,
    paymentMode
  }: {
    supplier: string;
    materialName: string;
    lotNumber: string;
    quantity: number;
    unitCost: number;
    paidAmount: number;
    paymentMode: 'Cash' | 'UPI' | 'Bank Transfer';
  }) => {
    const totalCost = quantity * unitCost;
    const gstRate = 0.12;
    const billTotal = totalCost * (1 + gstRate);

    // 1. Update or add raw material
    setRawMaterials((prev) => {
      const existing = prev.find((m) => m.lotNumber === lotNumber || m.name.toLowerCase() === materialName.toLowerCase());
      if (existing) {
        return prev.map((m) =>
          m.id === existing.id
            ? { ...m, quantity: m.quantity + quantity, unitCost, lastPurchaseDate: '2026-10-28' }
            : m
        );
      } else {
        const newMat: RawMaterial = {
          id: `RAW-${Date.now().toString().slice(-3)}`,
          name: materialName,
          category: 'Denim Fabric',
          lotNumber: lotNumber || `LOT-DEN-${Math.floor(1000 + Math.random() * 9000)}`,
          quantity,
          unit: 'Meters',
          unitCost,
          supplier,
          minReorderLevel: 200,
          lastPurchaseDate: '2026-10-28'
        };
        return [...prev, newMat];
      }
    });

    // 2. Update Supplier Ledger
    setLedgers((prev) => {
      const ledger = prev.find((l) => l.partyName.toLowerCase() === supplier.toLowerCase());
      const netPayable = billTotal - paidAmount;
      if (ledger) {
        return prev.map((l) => {
          if (l.id === ledger.id) {
            return {
              ...l,
              currentBalance: l.currentBalance + netPayable,
              entries: [
                ...l.entries,
                {
                  id: `L-${Date.now().toString().slice(-4)}`,
                  date: '2026-10-28',
                  description: `Purchased ${quantity}m ${materialName} (${lotNumber})`,
                  referenceDoc: `BILL-${Math.floor(1000 + Math.random() * 9000)}`,
                  debit: paidAmount,
                  credit: billTotal,
                  balance: l.currentBalance + netPayable
                }
              ]
            };
          }
          return l;
        });
      }
      return prev;
    });

    // 3. Record payment if paidAmount > 0
    if (paidAmount > 0) {
      const newPay: PaymentRecord = {
        id: `PAY-${Date.now().toString().slice(-4)}`,
        receiptNo: `VOUCH-${Date.now().toString().slice(-4)}`,
        date: '2026-10-28',
        partyName: supplier,
        partyType: 'supplier',
        type: 'Paid',
        amount: paidAmount,
        mode: paymentMode,
        reference: `${paymentMode.toUpperCase()}/TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        confirmed: true,
        proofFileName: 'bank_transfer_purchase_slip.pdf',
        proofFileSize: '194 KB',
        notes: `Advance for fabric lot ${lotNumber}`
      };
      setPayments((prev) => [newPay, ...prev]);
    }

    logAudit(
      'RECORD_PURCHASE',
      'Purchase Ledger',
      `Purchased ${quantity}m fabric from ${supplier} for ₹${billTotal.toFixed(0)} (${lotNumber})`
    );
  };

  const sendBatchToDyeing = ({
    articleName,
    quantity,
    fabricUsedMeters,
    assignedTo
  }: {
    articleName: string;
    quantity: number;
    fabricUsedMeters: number;
    assignedTo: string;
  }) => {
    // Deduct fabric from raw materials
    setRawMaterials((prev) =>
      prev.map((m) =>
        m.category === 'Denim Fabric'
          ? { ...m, quantity: Math.max(0, m.quantity - fabricUsedMeters) }
          : m
      )
    );

    // Create new WIP batch
    const newWip: WipBatch = {
      id: `WIP-DYE-${Date.now().toString().slice(-3)}`,
      articleName,
      stage: 'Dyeing',
      assignedTo: assignedTo || 'Apex Dyeing Works',
      quantity,
      rawMaterialLot: 'LOT-DEN-8820',
      fabricUsedMeters,
      startedDate: '2026-10-28',
      status: 'In Progress',
      costAccrued: quantity * 85
    };
    setWipBatches((prev) => [...prev, newWip]);

    logAudit(
      'DISPATCH_DYEING',
      'WIP Processing',
      `Sent ${quantity} units (${fabricUsedMeters}m fabric) to ${assignedTo} for enzyme wash`
    );
  };

  const sendBatchToStitching = ({
    wipId,
    assignedTo
  }: {
    wipId: string;
    assignedTo: string;
  }) => {
    setWipBatches((prev) =>
      prev.map((b) =>
        b.id === wipId
          ? {
              ...b,
              stage: 'Stitching',
              assignedTo: assignedTo || 'Master Rafiq Jobwork',
              costAccrued: b.costAccrued + b.quantity * 120
            }
          : b
      )
    );
    logAudit(
      'DISPATCH_STITCHING',
      'Job Work',
      `Batch ${wipId} assigned to ${assignedTo} for stitching assembly`
    );
  };

  const completeFinishingAndMoveToInventory = ({
    wipId,
    sku
  }: {
    wipId: string;
    sku: string;
  }) => {
    const batch = wipBatches.find((b) => b.id === wipId);
    if (!batch) return;

    // Remove or complete from WIP
    setWipBatches((prev) => prev.filter((b) => b.id !== wipId));

    // Increase stock in finished goods
    setFinishedGoods((prev) => {
      const match = prev.find((item) => item.sku === sku);
      if (match) {
        return prev.map((item) =>
          item.sku === sku
            ? { ...item, availableStock: item.availableStock + batch.quantity }
            : item
        );
      }
      return prev;
    });

    logAudit(
      'STOCK_INWARD',
      'Finished Inventory',
      `Finished batch ${wipId}: Added ${batch.quantity} units to SKU ${sku}`
    );
  };

  const recordSale = (saleData: {
    buyerName: string;
    buyerCity: string;
    sku: string;
    size: string;
    quantity: number;
    unitPrice: number;
    discountPercent: number;
    taxPercent: number;
    paidAmount: number;
  }) => {
    // 1. Check stock
    const item = finishedGoods.find((g) => g.sku === saleData.sku);
    if (!item) {
      return { success: false, error: 'Product SKU not found in catalog.' };
    }
    if (item.availableStock < saleData.quantity) {
      return {
        success: false,
        error: `Insufficient stock! Only ${item.availableStock} units available for ${item.sku}.`
      };
    }

    // 2. Reduce stock
    setFinishedGoods((prev) =>
      prev.map((g) =>
        g.sku === saleData.sku
          ? { ...g, availableStock: g.availableStock - saleData.quantity }
          : g
      )
    );

    // 3. Calculations
    const discountedPrice = saleData.unitPrice * (1 - saleData.discountPercent / 100);
    const subtotal = discountedPrice * saleData.quantity;
    const taxAmount = subtotal * (saleData.taxPercent / 100);
    const totalAmount = subtotal + taxAmount;
    const balanceAmount = totalAmount - saleData.paidAmount;
    const status: 'Paid' | 'Partial' | 'Pending' =
      balanceAmount <= 0 ? 'Paid' : saleData.paidAmount > 0 ? 'Partial' : 'Pending';

    const invoiceNo = `INV-2026-${100 + sales.length + 1}`;
    const newSale: SaleRecord = {
      id: `SALE-${Date.now().toString().slice(-3)}`,
      invoiceNo,
      date: '2026-10-28',
      buyerName: saleData.buyerName,
      buyerCity: saleData.buyerCity,
      sku: saleData.sku,
      articleName: item.articleName,
      size: saleData.size,
      quantity: saleData.quantity,
      unitPrice: saleData.unitPrice,
      discountPercent: saleData.discountPercent,
      subtotal: Number(subtotal.toFixed(2)),
      taxPercent: saleData.taxPercent,
      taxAmount: Number(taxAmount.toFixed(2)),
      totalAmount: Number(totalAmount.toFixed(2)),
      paidAmount: saleData.paidAmount,
      balanceAmount: Number(balanceAmount.toFixed(2)),
      status
    };

    setSales((prev) => [newSale, ...prev]);

    // 4. Update Buyer Ledger
    setLedgers((prev) => {
      const buyerLedger = prev.find((l) => l.partyName.toLowerCase() === saleData.buyerName.toLowerCase());
      if (buyerLedger) {
        return prev.map((l) => {
          if (l.id === buyerLedger.id) {
            const updatedEntries = [
              ...l.entries,
              {
                id: `L-${Date.now().toString().slice(-4)}a`,
                date: '2026-10-28',
                description: `Invoice ${invoiceNo} (${saleData.quantity} pcs ${item.articleName})`,
                referenceDoc: invoiceNo,
                debit: totalAmount,
                credit: 0,
                balance: l.currentBalance + totalAmount
              }
            ];

            if (saleData.paidAmount > 0) {
              updatedEntries.push({
                id: `L-${Date.now().toString().slice(-4)}b`,
                date: '2026-10-28',
                description: `Payment for ${invoiceNo}`,
                referenceDoc: `REC-${Date.now().toString().slice(-3)}`,
                debit: 0,
                credit: saleData.paidAmount,
                balance: l.currentBalance + totalAmount - saleData.paidAmount
              });
            }

            return {
              ...l,
              currentBalance: l.currentBalance + balanceAmount,
              entries: updatedEntries
            };
          }
          return l;
        });
      } else {
        // Create new ledger
        const newLedger: PartyLedger = {
          id: `LEDGER-BUYER-${Date.now().toString().slice(-3)}`,
          partyName: saleData.buyerName,
          role: 'buyer',
          phone: '+91 98000 00000',
          city: saleData.buyerCity,
          currentBalance: balanceAmount,
          entries: [
            {
              id: `L-${Date.now().toString().slice(-4)}a`,
              date: '2026-10-28',
              description: `Invoice ${invoiceNo} (${saleData.quantity} pcs)`,
              referenceDoc: invoiceNo,
              debit: totalAmount,
              credit: saleData.paidAmount,
              balance: balanceAmount
            }
          ]
        };
        return [...prev, newLedger];
      }
    });

    // 5. If paid, create payment record
    if (saleData.paidAmount > 0) {
      const newPay: PaymentRecord = {
        id: `PAY-${Date.now().toString().slice(-4)}`,
        receiptNo: `REC-2026-${Math.floor(100 + Math.random() * 900)}`,
        date: '2026-10-28',
        partyName: saleData.buyerName,
        partyType: 'buyer',
        type: 'Received',
        amount: saleData.paidAmount,
        mode: 'UPI',
        reference: `UPI/ORDER-${invoiceNo}`,
        confirmed: true,
        proofFileName: 'advance_upi_slip.png',
        proofFileSize: '112 KB',
        notes: `Immediate payment against ${invoiceNo}`
      };
      setPayments((prev) => [newPay, ...prev]);
    }

    logAudit(
      'RECORD_SALE',
      'Sales & Invoicing',
      `Issued ${invoiceNo} to ${saleData.buyerName}: ${saleData.quantity} pcs @ ₹${saleData.unitPrice} (Total ₹${totalAmount.toFixed(0)})`
    );

    return { success: true };
  };

  const recordPayment = (paymentData: {
    partyName: string;
    partyType: 'buyer' | 'supplier' | 'job_worker';
    type: 'Received' | 'Paid';
    amount: number;
    mode: 'Cash' | 'UPI' | 'Bank Transfer';
    reference: string;
    confirmed: boolean;
    proofFileName?: string;
    notes?: string;
  }) => {
    const receiptNo = paymentData.type === 'Received' ? `REC-2026-${Math.floor(100 + Math.random() * 900)}` : `VOUCH-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newPayment: PaymentRecord = {
      id: `PAY-${Date.now().toString().slice(-4)}`,
      receiptNo,
      date: '2026-10-28',
      partyName: paymentData.partyName,
      partyType: paymentData.partyType,
      type: paymentData.type,
      amount: paymentData.amount,
      mode: paymentData.mode,
      reference: paymentData.reference || `${paymentData.mode.toUpperCase()}-REF-${Math.floor(100000 + Math.random() * 900000)}`,
      confirmed: paymentData.confirmed,
      proofFileName: paymentData.proofFileName || 'receipt_screenshot.png',
      proofFileSize: '154 KB',
      notes: paymentData.notes
    };

    setPayments((prev) => [newPayment, ...prev]);

    // Update Ledger
    setLedgers((prev) =>
      prev.map((l) => {
        if (l.partyName.toLowerCase() === paymentData.partyName.toLowerCase()) {
          const newBalance =
            paymentData.type === 'Received'
              ? l.currentBalance - paymentData.amount // Buyer pays us -> reduces their outstanding
              : l.currentBalance - paymentData.amount; // We pay supplier/worker -> reduces our payable
          return {
            ...l,
            currentBalance: Math.max(0, newBalance),
            entries: [
              ...l.entries,
              {
                id: `L-${Date.now().toString().slice(-4)}`,
                date: '2026-10-28',
                description: `${paymentData.mode} payment ${paymentData.type.toLowerCase()}: ${paymentData.reference}`,
                referenceDoc: receiptNo,
                debit: paymentData.type === 'Paid' ? paymentData.amount : 0,
                credit: paymentData.type === 'Received' ? paymentData.amount : 0,
                balance: Math.max(0, newBalance)
              }
            ]
          };
        }
        return l;
      })
    );

    // If buyer payment, also allocate to their pending sales invoices
    if (paymentData.partyType === 'buyer' && paymentData.type === 'Received') {
      let remaining = paymentData.amount;
      setSales((prev) =>
        prev.map((sale) => {
          if (sale.buyerName.toLowerCase() === paymentData.partyName.toLowerCase() && sale.balanceAmount > 0 && remaining > 0) {
            const deduction = Math.min(remaining, sale.balanceAmount);
            remaining -= deduction;
            const newBal = sale.balanceAmount - deduction;
            return {
              ...sale,
              paidAmount: sale.paidAmount + deduction,
              balanceAmount: newBal,
              status: newBal <= 0 ? 'Paid' : 'Partial'
            };
          }
          return sale;
        })
      );
    }

    logAudit(
      'RECORD_PAYMENT',
      'Payments & Ledgers',
      `${paymentData.type} ₹${paymentData.amount.toLocaleString('en-IN')} via ${paymentData.mode} for ${paymentData.partyName}`
    );
  };

  const recordExpense = (expData: {
    category: ExpenseRecord['category'];
    description: string;
    amount: number;
    paidTo: string;
    mode: 'Cash' | 'UPI' | 'Bank Transfer';
  }) => {
    const newExp: ExpenseRecord = {
      id: `EXP-${Date.now().toString().slice(-4)}`,
      category: expData.category,
      description: expData.description,
      amount: expData.amount,
      date: '2026-10-28',
      paidTo: expData.paidTo,
      mode: expData.mode
    };
    setExpenses((prev) => [newExp, ...prev]);
    logAudit('RECORD_EXPENSE', 'Expenses & Overheads', `Paid ₹${expData.amount} for ${expData.category} to ${expData.paidTo}`);
  };

  // Dashboard Aggregates
  const totalSalesRevenue = sales.reduce((acc, s) => acc + s.totalAmount, 0);
  const totalSalesUnits = sales.reduce((acc, s) => acc + s.quantity, 0);
  const totalFinishedStockUnits = finishedGoods.reduce((acc, g) => acc + g.availableStock, 0);
  const totalFinishedStockValue = finishedGoods.reduce((acc, g) => acc + g.availableStock * g.unitCost, 0);
  const totalRawMaterialMeters = rawMaterials
    .filter((m) => m.unit === 'Meters')
    .reduce((acc, m) => acc + m.quantity, 0);
  const totalWipUnits = wipBatches.reduce((acc, b) => acc + b.quantity, 0);

  // Receivables from buyers
  const amountsReceivable = ledgers
    .filter((l) => l.role === 'buyer')
    .reduce((acc, l) => acc + l.currentBalance, 0);

  // Payables to suppliers and job workers
  const amountsPayable = ledgers
    .filter((l) => l.role === 'supplier' || l.role === 'job_worker')
    .reduce((acc, l) => acc + l.currentBalance, 0);

  // Total operating expenses
  const totalOperatingExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  // COGS for sold articles (unitCost * quantity)
  const cogsSold = sales.reduce((acc, s) => {
    const matched = finishedGoods.find((g) => g.sku === s.sku);
    const unitCost = matched ? matched.unitCost : 829.40;
    return acc + unitCost * s.quantity;
  }, 0);

  // Net sales revenue before GST
  const netSalesRevenueExclTax = sales.reduce((acc, s) => acc + s.subtotal, 0);

  // Net Operating Profit = Net Sales - COGS - Overheads
  const netOperatingProfit = netSalesRevenueExclTax - cogsSold - totalOperatingExpenses;

  // Tax collected on sales vs tax paid on purchases
  const taxCollectedGST = sales.reduce((acc, s) => acc + s.taxAmount, 0);
  const taxPaidGST = rawMaterials.reduce((acc, m) => acc + m.quantity * m.unitCost * 0.12, 0);

  const lowStockItemCount = finishedGoods.filter((g) => g.availableStock <= g.lowStockThreshold).length;

  const dashboardStats = {
    totalSalesRevenue,
    totalSalesUnits,
    totalFinishedStockUnits,
    totalFinishedStockValue,
    totalRawMaterialMeters,
    totalWipUnits,
    amountsReceivable,
    amountsPayable,
    totalProductionCostCurrent: calculatedCosting.totalCostPerGarment,
    totalOperatingExpenses,
    netOperatingProfit,
    taxCollectedGST,
    taxPaidGST,
    lowStockItemCount
  };

  // AI Assistant Query Engine (Local deterministic analytics over live state)
  const sendAIMessage = (query: string) => {
    const userMsg: AIChatMessage = {
      id: `USR-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setAiMessages((prev) => [...prev, userMsg]);

    const q = query.toLowerCase();
    let replyText = '';
    let explanation: AIChatMessage['dataExplanation'] = undefined;

    if (q.includes('sale') || q.includes('how much did we sell') || q.includes('revenue')) {
      replyText = `Based on current demo records, total sales across **${sales.length} invoices** stand at **₹${totalSalesRevenue.toLocaleString('en-IN')}** for **${totalSalesUnits} pieces** of denim trousers.\n\n` +
        `• **Gross Sales (excl. tax)**: ₹${netSalesRevenueExclTax.toLocaleString('en-IN')}\n` +
        `• **GST Collected (12%)**: ₹${taxCollectedGST.toLocaleString('en-IN')}\n` +
        `• **Payment Collected**: ₹${sales.reduce((acc, s) => acc + s.paidAmount, 0).toLocaleString('en-IN')}\n` +
        `• **Top Article**: DEMO-DJ-001 (Classic Indigo Jeans)`;

      explanation = {
        figuresUsed: [
          { label: 'Total Invoices', value: `${sales.length} invoices` },
          { label: 'Units Sold', value: `${totalSalesUnits} pcs` },
          { label: 'Gross Revenue', value: `₹${totalSalesRevenue.toLocaleString('en-IN')}` }
        ],
        recordsReferenced: sales.map((s) => s.invoiceNo),
        calculationSummary: 'Sum of all invoices totalAmount including 12% GST'
      };
    } else if (q.includes('low stock') || q.includes('stock alert') || q.includes('shortage')) {
      const lowItems = finishedGoods.filter((g) => g.availableStock <= g.lowStockThreshold);
      if (lowItems.length > 0) {
        replyText = `Currently, **${lowItems.length} article variants** are running below minimum reorder thresholds:\n\n` +
          lowItems
            .map(
              (item) =>
                `• **${item.sku}** (${item.articleName}, Size ${item.size}): **${item.availableStock} pcs remaining** (Threshold: ${item.lowStockThreshold} pcs)`
            )
            .join('\n') +
          `\n\nRecommendation: Trigger a fresh cutting & stitching job order for plus-sizes **42 & 46** immediately to prevent order stockouts.`;
      } else {
        replyText = `All finished goods variants are currently above their safety thresholds. Total stock stands at **${totalFinishedStockUnits} units**.`;
      }

      explanation = {
        figuresUsed: lowItems.map((item) => ({
          label: `${item.sku} (Size ${item.size})`,
          value: `${item.availableStock} / ${item.lowStockThreshold} pcs`
        })),
        recordsReferenced: lowItems.map((i) => i.sku),
        calculationSummary: 'Filtered finishedGoods where availableStock <= lowStockThreshold'
      };
    } else if (q.includes('outstanding') || q.includes('receivable') || q.includes('owe') || q.includes('buyer')) {
      const buyerLedgers = ledgers.filter((l) => l.role === 'buyer' && l.currentBalance > 0);
      replyText = `Total outstanding receivable from buyers is **₹${amountsReceivable.toLocaleString('en-IN')}** across ${buyerLedgers.length} active retail accounts:\n\n` +
        buyerLedgers
          .map((b) => `• **${b.partyName}** (${b.city}): **₹${b.currentBalance.toLocaleString('en-IN')}** outstanding`)
          .join('\n') +
        `\n\n` +
        `On the liabilities side, you have **₹${amountsPayable.toLocaleString('en-IN')}** payable to suppliers & job workers (primarily Arvind Mills Ltd.).`;

      explanation = {
        figuresUsed: buyerLedgers.map((b) => ({
          label: b.partyName,
          value: `₹${b.currentBalance.toLocaleString('en-IN')}`
        })),
        recordsReferenced: buyerLedgers.map((b) => b.id),
        calculationSummary: 'Sum of debit balances in Buyer Ledgers minus verified payment credits'
      };
    } else if (q.includes('cost') || q.includes('classic denim') || q.includes('margin') || q.includes('price')) {
      const c = calculatedCosting;
      replyText = `The true production cost for **Classic Denim Jeans (DEMO-DJ-001)** is **₹${c.totalCostPerGarment} per garment**, calculated using your configurable cost sheet:\n\n` +
        `• **Fabric Cost (2.2m @ ₹240 + 5% wastage)**: ₹${c.fabricCostPerPiece}\n` +
        `• **Dyeing & Enzyme Washing**: ₹${costingConfig.dyeingCostPerPiece}.00\n` +
        `• **Stitching & Job Work**: ₹${costingConfig.stitchingCostPerPiece}.00\n` +
        `• **Hardware Accessories (YKK Zip, Rivets, Leather Patch)**: ₹${costingConfig.accessoriesCostPerPiece}.00\n` +
        `• **Overhead, Barcoding & Packing**: ₹${costingConfig.otherOverheadPerPiece}.00\n\n` +
        `At a **${c.markupPercent}% wholesale markup**, suggested selling price is **₹${c.suggestedWholesalePrice}** (₹${c.suggestedWholesaleWithGst} with 12% GST). Suggested Retail MRP is **₹${c.suggestedMrp}**.`;

      explanation = {
        figuresUsed: [
          { label: 'Fabric Cost/pc', value: `₹${c.fabricCostPerPiece}` },
          { label: 'Labor & Processing', value: `₹${costingConfig.dyeingCostPerPiece + costingConfig.stitchingCostPerPiece}` },
          { label: 'Total Unit Cost', value: `₹${c.totalCostPerGarment}` },
          { label: 'Suggested Wholesale', value: `₹${c.suggestedWholesalePrice}` }
        ],
        recordsReferenced: ['DEMO-DJ-001', 'CostingConfig'],
        calculationSummary: 'True Article Costing Formula: Fabric*(1+Wastage%) + Dyeing + Stitching + Trims + Overhead'
      };
    } else if (q.includes('expense') || q.includes('overhead')) {
      replyText = `Total recorded monthly operating overheads are **₹${totalOperatingExpenses.toLocaleString('en-IN')}** across ${expenses.length} expense heads:\n\n` +
        expenses.map((e) => `• **${e.category}**: ₹${e.amount.toLocaleString('en-IN')} (${e.description})`).join('\n') +
        `\n\nThe largest operational expense is **Staff Salary & Advances (₹48,000)** followed by **Workshop Rent (₹35,000)**.`;

      explanation = {
        figuresUsed: expenses.map((e) => ({
          label: e.category,
          value: `₹${e.amount.toLocaleString('en-IN')}`
        })),
        recordsReferenced: expenses.map((e) => e.id),
        calculationSummary: 'Sum of all overhead records categorized by cost center'
      };
    } else {
      replyText = `Here is an executive snapshot from the live demo platform:\n\n` +
        `• **Inventory**: ${totalFinishedStockUnits} finished jeans in stock (Valuation: ₹${totalFinishedStockValue.toLocaleString('en-IN')})\n` +
        `• **Sales**: ₹${totalSalesRevenue.toLocaleString('en-IN')} booked across ${sales.length} orders\n` +
        `• **Receivables**: ₹${amountsReceivable.toLocaleString('en-IN')} due from buyers\n` +
        `• **Payables**: ₹${amountsPayable.toLocaleString('en-IN')} due to fabric mill and job workers\n` +
        `• **True Article Cost**: ₹${calculatedCosting.totalCostPerGarment} / pc\n\n` +
        `You can ask me specific questions like: "Which article has low stock?", "What is the cost of Classic Denim?", or "How much did we sell this month?".`;

      explanation = {
        figuresUsed: [
          { label: 'Finished Stock', value: `${totalFinishedStockUnits} pcs` },
          { label: 'Sales Booked', value: `₹${totalSalesRevenue.toLocaleString('en-IN')}` },
          { label: 'Receivables', value: `₹${amountsReceivable.toLocaleString('en-IN')}` }
        ],
        recordsReferenced: ['DashboardSummary', 'FinishedGoodsMaster'],
        calculationSummary: 'General synthesis from connected production, sales and ledger tables'
      };
    }

    setTimeout(() => {
      const assistantMsg: AIChatMessage = {
        id: `AI-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: 'Just now',
        dataExplanation: explanation
      };
      setAiMessages((prev) => [...prev, assistantMsg]);
    }, 350);
  };

  const clearAIChat = () => {
    setAiMessages([
      {
        id: 'AI-INIT-RESET',
        sender: 'assistant',
        text: "Chat cleared. What question can I assist you with regarding your denim manufacturing operations?",
        timestamp: 'Just now'
      }
    ]);
  };

  // Guided Demo Scenario Execution
  const executeGuidedStep = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: // Step A: Fabric Purchase
        setActiveStageId('purchase');
        recordFabricPurchase({
          supplier: 'Arvind Mills Ltd.',
          materialName: '14.5oz Indigo Selvedge Denim Fabric',
          lotNumber: 'LOT-DEN-8825',
          quantity: 250,
          unitCost: 240,
          paidAmount: 30000,
          paymentMode: 'Bank Transfer'
        });
        break;
      case 1: // Step B: Dyeing
        setActiveStageId('dyeing');
        sendBatchToDyeing({
          articleName: 'Classic Denim Jeans (Plus Size)',
          quantity: 100,
          fabricUsedMeters: 231,
          assignedTo: 'Apex Dyeing Works, Bhiwandi'
        });
        break;
      case 2: // Step C: Stitching
        setActiveStageId('stitching');
        if (wipBatches.length > 0) {
          sendBatchToStitching({
            wipId: wipBatches[0].id,
            assignedTo: 'Master Rafiq Jobwork'
          });
        }
        break;
      case 3: // Step D: Finishing -> Inventory
        setActiveStageId('finishing');
        if (wipBatches.length > 0) {
          completeFinishingAndMoveToInventory({
            wipId: wipBatches[0].id,
            sku: 'DEMO-DJ-001-42'
          });
        }
        setActiveStageId('inventory');
        break;
      case 4: // Step E: Costing
        setActiveStageId('inventory');
        updateCostingConfig({ markupPercent: 38 });
        break;
      case 5: // Step F: Record Sale
        setActiveStageId('sales');
        recordSale({
          buyerName: 'Metro Plus Apparels',
          buyerCity: 'Dadar, Mumbai',
          sku: 'DEMO-DJ-001-38',
          size: '38',
          quantity: 10,
          unitPrice: 1120,
          discountPercent: 0,
          taxPercent: 12,
          paidAmount: 5000
        });
        break;
      case 6: // Step G: Check Stock & Ledger
        setActiveStageId('sales');
        break;
      case 7: // Step H: Record Payment
        setActiveStageId('payments');
        recordPayment({
          partyName: 'Metro Plus Apparels',
          partyType: 'buyer',
          type: 'Received',
          amount: 7544,
          mode: 'UPI',
          reference: 'UPI/DEMO/CLEARED-INV',
          confirmed: true,
          proofFileName: 'demo_payment_confirmation.png',
          notes: 'Full clearance of outstanding demo balance'
        });
        break;
      case 8: // Step I: Dashboard & P&L
        setActiveStageId('reports');
        break;
      case 9: // Step J: AI Assistant
        sendAIMessage('How much did we sell this month?');
        break;
      default:
        break;
    }
  };

  // Reset to original data
  const resetDemoData = () => {
    setRole('owner');
    setWorkflowStages(INITIAL_WORKFLOW_STAGES);
    setActiveStageId('purchase');
    setIsAutoRunning(false);
    setRawMaterials(INITIAL_RAW_MATERIALS);
    setWipBatches(INITIAL_WIP_BATCHES);
    setFinishedGoods(INITIAL_FINISHED_GOODS);
    setCostingConfig(INITIAL_COSTING_CONFIG);
    setSales(INITIAL_SALES);
    setPayments(INITIAL_PAYMENTS);
    setLedgers(INITIAL_LEDGERS);
    setExpenses(INITIAL_EXPENSES);
    setAuditLogs(INITIAL_AUDIT_LOG);
    setGuidedStepIndex(0);
    clearAIChat();
    logAudit('SYSTEM_RESET', 'System Master', 'Restored baseline demo state for Vidyalankar project presentation');
  };

  return (
    <ERPContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        login,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        setAuthModalMode,
        workflowStages,
        activeStageId,
        setActiveStageId,
        isAutoRunning,
        toggleAutoRun,
        nextStage,
        prevStage,
        rawMaterials,
        recordFabricPurchase,
        wipBatches,
        sendBatchToDyeing,
        sendBatchToStitching,
        completeFinishingAndMoveToInventory,
        finishedGoods,
        costingConfig,
        updateCostingConfig,
        calculatedCosting,
        sales,
        recordSale,
        payments,
        recordPayment,
        ledgers,
        expenses,
        recordExpense,
        auditLogs,
        aiMessages,
        sendAIMessage,
        clearAIChat,
        dashboardStats,
        isGuidedDemoOpen,
        setGuidedDemoOpen,
        guidedStepIndex,
        setGuidedStepIndex,
        executeGuidedStep,
        resetDemoData
      }}
    >
      {children}
    </ERPContext.Provider>
  );
};

export const useERP = () => {
  const context = useContext(ERPContext);
  if (!context) {
    throw new Error('useERP must be used within an ERPProvider');
  }
  return context;
};
