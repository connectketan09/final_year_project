export type UserRole = 'owner' | 'employee' | 'buyer' | 'supplier' | 'dyer_worker';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  company: string;
  avatar?: string;
}

export type WorkflowStageId =
  | 'purchase'
  | 'dyeing'
  | 'stitching'
  | 'finishing'
  | 'inventory'
  | 'sales'
  | 'payments'
  | 'reports';

export interface WorkflowStage {
  id: WorkflowStageId;
  stepNumber: number;
  name: string;
  shortDesc: string;
  purpose: string;
  stationLabel: string;
  actor: string;
  inputs: string[];
  outputs: string[];
  status: 'active' | 'completed' | 'queued';
  financialImpact: string;
  nextStageFlow: string;
  sampleDataSummary: {
    label: string;
    value: string;
  }[];
}

export interface RawMaterial {
  id: string;
  name: string;
  category: 'Denim Fabric' | 'Sewing Thread' | 'Hardware Trims' | 'Labels & Packaging';
  lotNumber: string;
  quantity: number;
  unit: string;
  unitCost: number;
  supplier: string;
  minReorderLevel: number;
  lastPurchaseDate: string;
}

export interface WipBatch {
  id: string;
  articleName: string;
  stage: 'Dyeing' | 'Stitching' | 'Finishing';
  assignedTo: string;
  quantity: number;
  rawMaterialLot: string;
  fabricUsedMeters: number;
  startedDate: string;
  status: 'In Progress' | 'Quality Review' | 'Ready for Transfer';
  costAccrued: number;
}

export interface FinishedGood {
  sku: string;
  articleName: string;
  category: string;
  colour: string;
  size: string;
  fit: string;
  availableStock: number;
  reservedStock: number;
  unitCost: number;
  suggestedWholesale: number;
  mrp: number;
  lowStockThreshold: number;
  barcode: string;
}

export interface CostingConfig {
  batchSize: number;
  fabricCostPerMeter: number;
  fabricMetersPerGarment: number;
  fabricWastagePercent: number;
  dyeingCostPerPiece: number;
  stitchingCostPerPiece: number;
  accessoriesCostPerPiece: number;
  otherOverheadPerPiece: number;
  markupPercent: number;
  marginPercent: number;
  pricingStrategy: 'markup' | 'margin';
  gstRatePercent: number;
  mrpMultiplier: number;
}

export interface SaleRecord {
  id: string;
  invoiceNo: string;
  date: string;
  buyerName: string;
  buyerCity: string;
  sku: string;
  articleName: string;
  size: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  subtotal: number;
  taxPercent: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  status: 'Paid' | 'Partial' | 'Pending';
}

export interface PaymentRecord {
  id: string;
  receiptNo: string;
  date: string;
  partyName: string;
  partyType: 'buyer' | 'supplier' | 'job_worker';
  type: 'Received' | 'Paid';
  amount: number;
  mode: 'Cash' | 'UPI' | 'Bank Transfer';
  reference: string;
  confirmed: boolean;
  proofFileName?: string;
  proofFileSize?: string;
  notes?: string;
}

export interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  referenceDoc: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface PartyLedger {
  id: string;
  partyName: string;
  role: 'buyer' | 'supplier' | 'job_worker';
  phone: string;
  city: string;
  currentBalance: number; // For buyer: positive means buyer owes us. For supplier/worker: positive means we owe them.
  entries: LedgerEntry[];
}

export interface ExpenseRecord {
  id: string;
  category: 'Workshop Rent' | 'Electricity & Steam' | 'Machinery Maintenance' | 'Staff Salary' | 'Packaging & Freight' | 'Miscellaneous';
  description: string;
  amount: number;
  date: string;
  paidTo: string;
  mode: 'Cash' | 'UPI' | 'Bank Transfer';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  details: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  dataExplanation?: {
    figuresUsed: { label: string; value: string }[];
    recordsReferenced: string[];
    calculationSummary?: string;
  };
}
