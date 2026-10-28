import type {
  AuditLogEntry,
  CostingConfig,
  ExpenseRecord,
  FinishedGood,
  PartyLedger,
  PaymentRecord,
  RawMaterial,
  SaleRecord,
  WipBatch,
  WorkflowStage
} from '../types';

export const INITIAL_WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 'purchase',
    stepNumber: 1,
    name: 'Fabric & Raw Material Purchase',
    shortDesc: 'Source high-grade raw denim rolls, spun threads and brass trims with vendor bills.',
    purpose: 'Record raw material intake, capture supplier lot numbers, verify rates, calculate purchase GST and update supplier payables.',
    stationLabel: '01 Purchase & Inspection',
    actor: 'Store Manager / Supplier',
    inputs: ['Supplier Purchase Bill', 'Quality Inspection Certificate', 'Mill Test Report'],
    outputs: ['Raw Fabric Lot No.', 'Material Inward Slip', 'Supplier Ledger Credit Entry'],
    status: 'completed',
    financialImpact: 'Adds to Raw Material Asset & Records Supplier Payable Liability.',
    nextStageFlow: 'Fabric lot LOT-DEN-8820 moves to Dyeing & Washing Vat after yardage verification.',
    sampleDataSummary: [
      { label: 'Primary Lot', value: 'LOT-DEN-8820 (14.5oz Selvedge Denim)' },
      { label: 'Quantity Inwarded', value: '1,250 Meters @ ₹240/m' },
      { label: 'Vendor', value: 'Arvind Mills Ltd. (Ahmedabad)' },
      { label: 'Bill Total', value: '₹3,36,000 (incl. 12% GST)' }
    ]
  },
  {
    id: 'dyeing',
    stepNumber: 2,
    name: 'Fabric Dyeing & Washing',
    shortDesc: 'Indigo rope dyeing, enzymatic softening, and shrinkage stabilization in rotary drums.',
    purpose: 'Transform raw grey denim into signature deep indigo tones, measure fabric shrinkage and log washing job charges.',
    stationLabel: '02 Dyeing & Wash Vat',
    actor: 'Dyeing Master (Apex Dyeing Works)',
    inputs: ['Raw Denim Roll (LOT-DEN-8820)', 'Shade Specification Card (Deep Indigo 04)'],
    outputs: ['Dyed Fabric Lot (LOT-DYE-04)', 'Shrinkage Log (4.2%)', 'Job Dyeing Bill'],
    status: 'completed',
    financialImpact: 'Accrues ₹85/garment equivalent into Work-in-Progress (WIP) valuation.',
    nextStageFlow: 'Dyed rolls transferred to Master Cutter and Stitching Job Worker with shade approval.',
    sampleDataSummary: [
      { label: 'Active Vat Lot', value: 'LOT-DYE-04 (200 Units Equivalent)' },
      { label: 'Dyeing Partner', value: 'Apex Dyeing Works, Bhiwandi' },
      { label: 'Process Cycle', value: 'Indigo Dip + Stone Enzyme Wash' },
      { label: 'Job Rate', value: '₹85.00 / garment cut piece' }
    ]
  },
  {
    id: 'stitching',
    stepNumber: 3,
    name: 'Job Work & Stitching',
    shortDesc: 'Panel cutting, pocket riveting, twin-needle flatlock seam joining for plus-size fit.',
    purpose: 'Issue cut panels to specialized tailors, track piece-rate stitching cost, monitor WIP count and enforce stitch density standards.',
    stationLabel: '03 Heavy Sewing Machine',
    actor: 'Master Tailor (Master Rafiq Jobwork)',
    inputs: ['Dyed Cut Panels', '20/3 Heavy Spun Thread', 'Work Order WO-ST-101'],
    outputs: ['Assembled Denim Trousers', 'Daily Stitching Sheet', 'Worker Payout Due'],
    status: 'active',
    financialImpact: 'Adds ₹120/garment piece-rate labor to WIP inventory cost.',
    nextStageFlow: 'Stitched garments forwarded to Finishing & QC station for trimming, rivets and labels.',
    sampleDataSummary: [
      { label: 'Work Order', value: 'WO-ST-101 (Article DEMO-DJ-001)' },
      { label: 'Batch Size', value: '150 Units (Waist 38 to 46)' },
      { label: 'Job Worker', value: 'Master Rafiq Jobwork (Ulhasnagar)' },
      { label: 'Stitching Rate', value: '₹120.00 / unit' }
    ]
  },
  {
    id: 'finishing',
    stepNumber: 4,
    name: 'Finishing & Accessories',
    shortDesc: 'Attach heavy brass zippers, embossed leather patch, bar-tacking, thread trim and pressing.',
    purpose: 'Complete hardware assembly, insert care tags, iron, pass final 7-point visual QC and affix UID brand barcodes.',
    stationLabel: '04 Finishing & QC Station',
    actor: 'Quality Inspector / Finishing Unit',
    inputs: ['Stitched Trousers', 'YKK Zippers', 'Copper Rivets', 'UID Leather Patch'],
    outputs: ['Packaged Finished Garments', 'QC Approval Tag', 'Barcode Labels'],
    status: 'completed',
    financialImpact: 'Adds ₹45 hardware trims + ₹25 packaging/ironing to final article cost.',
    nextStageFlow: 'Garments scanned and transferred into Finished Goods Inventory with barcode tags.',
    sampleDataSummary: [
      { label: 'Article', value: 'DEMO-DJ-001 Classic Jeans' },
      { label: 'QC Pass Rate', value: '98.5% (148/150 passed)' },
      { label: 'Trims Attached', value: 'YKK Brass Zip + UID Leather Patch' },
      { label: 'Packaging', value: 'Polybagged with Barcode Hanger Tag' }
    ]
  },
  {
    id: 'inventory',
    stepNumber: 5,
    name: 'Finished Inventory & Stock Tracking',
    shortDesc: 'Multi-location warehouse stock partitioned by SKU, waist size, fit and stock alert levels.',
    purpose: 'Provide live visibility of available vs reserved stock, trigger low-stock alerts, and calculate total inventory asset value.',
    stationLabel: '05 Inventory Racks',
    actor: 'Warehouse Controller',
    inputs: ['QC Passed Garment Batches', 'Inward Stock Transfer Vouchers'],
    outputs: ['Live Available Stock', 'Stock Valuations', 'Low-Stock Warnings'],
    status: 'completed',
    financialImpact: 'Capitalizes all production costs into Finished Goods Inventory Asset.',
    nextStageFlow: 'Available stock is drawn directly when Sales Invoices or Wholesale Orders are logged.',
    sampleDataSummary: [
      { label: 'Total Finished Stock', value: '160 Units across 5 Sizes' },
      { label: 'Total Stock Valuation', value: '₹1,32,704 (at Cost ₹829.40)' },
      { label: 'Low-Stock Alerts', value: 'Size 42 (12 pcs) & Size 46 (18 pcs)' },
      { label: 'Location', value: 'Central Depot - Bay D-04' }
    ]
  },
  {
    id: 'sales',
    stepNumber: 6,
    name: 'Wholesale & Retail Sales',
    shortDesc: 'B2B order booking, GST invoice generation, volume discounts and delivery challans.',
    purpose: 'Record sales to retail boutiques and wholesalers, deduct finished stock automatically, and post debit entries to buyer ledgers.',
    stationLabel: '06 Sales & Dispatch Desk',
    actor: 'Sales Executive / Buyer',
    inputs: ['Wholesale Purchase Order', 'Available Stock Allocation'],
    outputs: ['Tax Invoice (GST-12%)', 'Delivery Challan', 'Buyer Debit Entry'],
    status: 'active',
    financialImpact: 'Generates Revenue, recognizes Cost of Goods Sold (COGS), records Buyer Receivable.',
    nextStageFlow: 'Outstanding invoice balance flows to Payments & Collection Ledger for settlement tracking.',
    sampleDataSummary: [
      { label: 'Monthly Sales Total', value: '95 Units sold' },
      { label: 'Gross Revenue', value: '₹1,19,172 (incl. GST)' },
      { label: 'Active Retailers', value: 'Metro Plus, Royal Men\'s, Vastram' },
      { label: 'Top Article', value: 'DEMO-DJ-001 (Classic Indigo Jeans)' }
    ]
  },
  {
    id: 'payments',
    stepNumber: 7,
    name: 'Payments & Settlement with Proof',
    shortDesc: 'Record cash, UPI or bank transfer receipts from buyers and payouts to job workers/mills.',
    purpose: 'Track incoming buyer collections and outgoing supplier payouts, attach photo proofs, and require receiver confirmation.',
    stationLabel: '07 Accounts & Cashier Desk',
    actor: 'Accountant / Cashier',
    inputs: ['Bank UTR / UPI Ref', 'Transaction Screenshot / Cheque', 'Invoice Ref'],
    outputs: ['Payment Receipt Voucher', 'Updated Ledger Balance', 'Audit Log Stamp'],
    status: 'active',
    financialImpact: 'Reduces Accounts Receivable / Accounts Payable and updates Cash/Bank balance.',
    nextStageFlow: 'Cleared financial transactions flow directly into Monthly Expenses and Profit/Loss reports.',
    sampleDataSummary: [
      { label: 'Collections Received', value: '₹95,176 (UPI & Bank Transfer)' },
      { label: 'Worker Payouts Made', value: '₹42,500 (Direct Bank Transfer)' },
      { label: 'Outstanding Receivables', value: '₹23,996 from 2 Retailers' },
      { label: 'Proof Verification', value: '100% Transactions Logged with UTR' }
    ]
  },
  {
    id: 'reports',
    stepNumber: 8,
    name: 'Expenses & Monthly Profit / Loss',
    shortDesc: 'Consolidated financial health: Revenue - (COGS + Overheads) = True Operating Net Profit.',
    purpose: 'Aggregate purchases, production costs, operating overheads, tax collected/paid and give the owner transparent margin clarity.',
    stationLabel: '08 Owner Analytics Hub',
    actor: 'Business Owner / Partner',
    inputs: ['Sales Invoices', 'Job Work Payments', 'Overhead Bills', 'Inventory Asset Value'],
    outputs: ['Monthly P&L Statement', 'Tax Summary Sheet', 'Executive Margin Audit'],
    status: 'completed',
    financialImpact: 'Provides bottom-line clarity: Net Profit margin after all variable and fixed costs.',
    nextStageFlow: 'Historical figures feed the UID AI Assistant for automated querying and margin optimization.',
    sampleDataSummary: [
      { label: 'Monthly Net Sales', value: '₹1,06,400 (excl. tax)' },
      { label: 'COGS for Sold Units', value: '₹78,793' },
      { label: 'Fixed Monthly Overheads', value: '₹1,12,100' },
      { label: 'Current Demo Net Position', value: 'Positive Operating Cash Flow' }
    ]
  }
];

export const INITIAL_RAW_MATERIALS: RawMaterial[] = [
  {
    id: 'RAW-001',
    name: '14.5oz Deep Indigo Selvedge Denim Fabric',
    category: 'Denim Fabric',
    lotNumber: 'LOT-DEN-8820',
    quantity: 1250,
    unit: 'Meters',
    unitCost: 240,
    supplier: 'Arvind Mills Ltd.',
    minReorderLevel: 300,
    lastPurchaseDate: '2026-10-14'
  },
  {
    id: 'RAW-002',
    name: 'Heavy-Duty Brass Zippers 8" (Antique Brass)',
    category: 'Hardware Trims',
    lotNumber: 'LOT-ZIP-104',
    quantity: 600,
    unit: 'Pieces',
    unitCost: 18,
    supplier: 'YKK Fasteners India',
    minReorderLevel: 150,
    lastPurchaseDate: '2026-10-18'
  },
  {
    id: 'RAW-003',
    name: 'Solid Copper Rivets & Shank Buttons Set',
    category: 'Hardware Trims',
    lotNumber: 'LOT-RVT-302',
    quantity: 1200,
    unit: 'Sets (6 pcs/set)',
    unitCost: 12,
    supplier: 'Apex Trims & Hardware',
    minReorderLevel: 250,
    lastPurchaseDate: '2026-10-18'
  },
  {
    id: 'RAW-004',
    name: 'Spun Polyester Heavy Sewing Thread 20/3 (Golden Amber)',
    category: 'Sewing Thread',
    lotNumber: 'LOT-THR-901',
    quantity: 45,
    unit: 'Cones (5,000m)',
    unitCost: 95,
    supplier: 'Vardhman Threads',
    minReorderLevel: 15,
    lastPurchaseDate: '2026-10-12'
  },
  {
    id: 'RAW-005',
    name: 'UID Genuine Buffalo Leather Waistband Patch',
    category: 'Labels & Packaging',
    lotNumber: 'LOT-LBL-410',
    quantity: 400,
    unit: 'Pieces',
    unitCost: 15,
    supplier: 'Crown Leather Works',
    minReorderLevel: 100,
    lastPurchaseDate: '2026-10-20'
  }
];

export const INITIAL_WIP_BATCHES: WipBatch[] = [
  {
    id: 'WIP-DYE-01',
    articleName: 'Classic Denim Jeans (Plus Size)',
    stage: 'Dyeing',
    assignedTo: 'Apex Dyeing Works, Bhiwandi',
    quantity: 200,
    rawMaterialLot: 'LOT-DEN-8820',
    fabricUsedMeters: 462, // 200 pcs * 2.2m * 1.05
    startedDate: '2026-10-24',
    status: 'In Progress',
    costAccrued: 17000
  },
  {
    id: 'WIP-ST-02',
    articleName: 'Classic Denim Jeans (Plus Size)',
    stage: 'Stitching',
    assignedTo: 'Master Rafiq Jobwork (Ulhasnagar)',
    quantity: 150,
    rawMaterialLot: 'LOT-DEN-8820',
    fabricUsedMeters: 346.5,
    startedDate: '2026-10-22',
    status: 'In Progress',
    costAccrued: 18000
  },
  {
    id: 'WIP-FIN-03',
    articleName: 'Relaxed Fit Vintage Wash Jeans',
    stage: 'Finishing',
    assignedTo: 'UID In-House Finishing Unit',
    quantity: 80,
    rawMaterialLot: 'LOT-DEN-8815',
    fabricUsedMeters: 184.8,
    startedDate: '2026-10-26',
    status: 'Quality Review',
    costAccrued: 5600
  }
];

export const INITIAL_FINISHED_GOODS: FinishedGood[] = [
  {
    sku: 'DEMO-DJ-001-38',
    articleName: 'Classic Denim Jeans (Plus Size)',
    category: 'Heavyweight Denim Pants',
    colour: 'Deep Indigo Blue',
    size: '38',
    fit: 'Relaxed Comfort Fit',
    availableStock: 45,
    reservedStock: 10,
    unitCost: 829.40,
    suggestedWholesale: 1120.00,
    mrp: 2499.00,
    lowStockThreshold: 20,
    barcode: '890423100138'
  },
  {
    sku: 'DEMO-DJ-001-42',
    articleName: 'Classic Denim Jeans (Plus Size)',
    category: 'Heavyweight Denim Pants',
    colour: 'Deep Indigo Blue',
    size: '42',
    fit: 'Relaxed Comfort Fit',
    availableStock: 12, // LOW STOCK
    reservedStock: 5,
    unitCost: 829.40,
    suggestedWholesale: 1120.00,
    mrp: 2499.00,
    lowStockThreshold: 20,
    barcode: '890423100142'
  },
  {
    sku: 'DEMO-DJ-001-44',
    articleName: 'Classic Denim Jeans (Plus Size)',
    category: 'Heavyweight Denim Pants',
    colour: 'Deep Indigo Blue',
    size: '44',
    fit: 'Relaxed Comfort Fit',
    availableStock: 35,
    reservedStock: 0,
    unitCost: 829.40,
    suggestedWholesale: 1120.00,
    mrp: 2499.00,
    lowStockThreshold: 20,
    barcode: '890423100144'
  },
  {
    sku: 'DEMO-DJ-001-46',
    articleName: 'Classic Denim Jeans (Plus Size)',
    category: 'Heavyweight Denim Pants',
    colour: 'Deep Indigo Blue',
    size: '46',
    fit: 'Relaxed Comfort Fit',
    availableStock: 18, // LOW STOCK
    reservedStock: 2,
    unitCost: 829.40,
    suggestedWholesale: 1120.00,
    mrp: 2499.00,
    lowStockThreshold: 20,
    barcode: '890423100146'
  },
  {
    sku: 'DEMO-DJ-002-40',
    articleName: 'Relaxed Fit Vintage Wash Jeans',
    category: 'Stone Washed Denim',
    colour: 'Vintage Mid-Blue',
    size: '40',
    fit: 'Straight Leg Plus',
    availableStock: 50,
    reservedStock: 8,
    unitCost: 865.00,
    suggestedWholesale: 1175.00,
    mrp: 2599.00,
    lowStockThreshold: 25,
    barcode: '890423100240'
  }
];

export const INITIAL_COSTING_CONFIG: CostingConfig = {
  batchSize: 100,
  fabricCostPerMeter: 240,
  fabricMetersPerGarment: 2.2, // Plus size requires extra yardage
  fabricWastagePercent: 5,     // 5% cut loss
  dyeingCostPerPiece: 85,
  stitchingCostPerPiece: 120,
  accessoriesCostPerPiece: 45, // Heavy zip, copper rivets, leather patch
  otherOverheadPerPiece: 25,   // Thread, barcode tags, polybag, steam press
  markupPercent: 35,           // 35% Wholesale markup over cost
  marginPercent: 26,           // Corresponding margin
  pricingStrategy: 'markup',
  gstRatePercent: 12,          // Apparel GST rate above ₹1,000 threshold
  mrpMultiplier: 2.23          // Suggested Retail MRP = Wholesale * 2.23
};

export const INITIAL_SALES: SaleRecord[] = [
  {
    id: 'SALE-101',
    invoiceNo: 'INV-2026-101',
    date: '2026-10-21',
    buyerName: 'Metro Plus Apparels',
    buyerCity: 'Dadar, Mumbai',
    sku: 'DEMO-DJ-001-38',
    articleName: 'Classic Denim Jeans (Size 38)',
    size: '38',
    quantity: 30,
    unitPrice: 1120,
    discountPercent: 0,
    subtotal: 33600,
    taxPercent: 12,
    taxAmount: 4032,
    totalAmount: 37632,
    paidAmount: 30000,
    balanceAmount: 7632,
    status: 'Partial'
  },
  {
    id: 'SALE-102',
    invoiceNo: 'INV-2026-102',
    date: '2026-10-23',
    buyerName: 'Royal Men\'s Big & Tall Store',
    buyerCity: 'FC Road, Pune',
    sku: 'DEMO-DJ-001-44',
    articleName: 'Classic Denim Jeans (Size 44)',
    size: '44',
    quantity: 40,
    unitPrice: 1120,
    discountPercent: 0,
    subtotal: 44800,
    taxPercent: 12,
    taxAmount: 5376,
    totalAmount: 50176,
    paidAmount: 50176,
    balanceAmount: 0,
    status: 'Paid'
  },
  {
    id: 'SALE-103',
    invoiceNo: 'INV-2026-103',
    date: '2026-10-25',
    buyerName: 'Vastram Plus Collections',
    buyerCity: 'Ring Road, Surat',
    sku: 'DEMO-DJ-002-40',
    articleName: 'Relaxed Fit Vintage Wash (Size 40)',
    size: '40',
    quantity: 25,
    unitPrice: 1120, // Discounted for bulk
    discountPercent: 0,
    subtotal: 28000,
    taxPercent: 12,
    taxAmount: 3360,
    totalAmount: 31360,
    paidAmount: 15000,
    balanceAmount: 16360,
    status: 'Partial'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'PAY-001',
    receiptNo: 'REC-2026-088',
    date: '2026-10-21',
    partyName: 'Metro Plus Apparels',
    partyType: 'buyer',
    type: 'Received',
    amount: 30000,
    mode: 'UPI',
    reference: 'UPI/2290481903/METRO',
    confirmed: true,
    proofFileName: 'gpay_receipt_metro_30k.png',
    proofFileSize: '142 KB',
    notes: 'Advance transfer for Invoice INV-2026-101'
  },
  {
    id: 'PAY-002',
    receiptNo: 'REC-2026-089',
    date: '2026-10-23',
    partyName: 'Royal Men\'s Big & Tall Store',
    partyType: 'buyer',
    type: 'Received',
    amount: 50176,
    mode: 'Bank Transfer',
    reference: 'NEFT-HDFC-9938104',
    confirmed: true,
    proofFileName: 'bank_ack_royal_50176.pdf',
    proofFileSize: '284 KB',
    notes: 'Full clearance for Invoice INV-2026-102'
  },
  {
    id: 'PAY-003',
    receiptNo: 'REC-2026-090',
    date: '2026-10-25',
    partyName: 'Vastram Plus Collections',
    partyType: 'buyer',
    type: 'Received',
    amount: 15000,
    mode: 'UPI',
    reference: 'UPI/9984102941/VASTRAM',
    confirmed: true,
    proofFileName: 'phonepe_vastram_15k.jpg',
    proofFileSize: '98 KB',
    notes: 'Partial settlement against INV-2026-103'
  },
  {
    id: 'PAY-004',
    receiptNo: 'VOUCH-2026-041',
    date: '2026-10-24',
    partyName: 'Master Rafiq Jobwork',
    partyType: 'job_worker',
    type: 'Paid',
    amount: 18000,
    mode: 'Bank Transfer',
    reference: 'IMPS/SBI/66019481',
    confirmed: true,
    proofFileName: 'rafiq_payout_voucher_18k.pdf',
    proofFileSize: '180 KB',
    notes: 'Stitching charges for 150 units batch'
  },
  {
    id: 'PAY-005',
    receiptNo: 'VOUCH-2026-042',
    date: '2026-10-25',
    partyName: 'Apex Dyeing Works',
    partyType: 'job_worker',
    type: 'Paid',
    amount: 17000,
    mode: 'Bank Transfer',
    reference: 'IMPS/AXIS/44019203',
    confirmed: true,
    proofFileName: 'apex_dyeing_tax_invoice.pdf',
    proofFileSize: '310 KB',
    notes: 'Washing & enzyme treatment lot LOT-DYE-04'
  }
];

export const INITIAL_LEDGERS: PartyLedger[] = [
  {
    id: 'LEDGER-BUYER-01',
    partyName: 'Metro Plus Apparels',
    role: 'buyer',
    phone: '+91 98201 44521',
    city: 'Dadar West, Mumbai',
    currentBalance: 7632, // Positive = Receivable
    entries: [
      {
        id: 'L-01',
        date: '2026-10-21',
        description: 'Tax Invoice INV-2026-101 (30 pcs)',
        referenceDoc: 'INV-2026-101',
        debit: 37632,
        credit: 0,
        balance: 37632
      },
      {
        id: 'L-02',
        date: '2026-10-21',
        description: 'UPI Payment Received (Ref: UPI/2290481903)',
        referenceDoc: 'REC-2026-088',
        debit: 0,
        credit: 30000,
        balance: 7632
      }
    ]
  },
  {
    id: 'LEDGER-BUYER-02',
    partyName: 'Royal Men\'s Big & Tall Store',
    role: 'buyer',
    phone: '+91 94220 18832',
    city: 'FC Road, Pune',
    currentBalance: 0,
    entries: [
      {
        id: 'L-03',
        date: '2026-10-23',
        description: 'Tax Invoice INV-2026-102 (40 pcs)',
        referenceDoc: 'INV-2026-102',
        debit: 50176,
        credit: 0,
        balance: 50176
      },
      {
        id: 'L-04',
        date: '2026-10-23',
        description: 'Bank Transfer Clearance (Ref: NEFT-HDFC-9938104)',
        referenceDoc: 'REC-2026-089',
        debit: 0,
        credit: 50176,
        balance: 0
      }
    ]
  },
  {
    id: 'LEDGER-BUYER-03',
    partyName: 'Vastram Plus Collections',
    role: 'buyer',
    phone: '+91 98980 77123',
    city: 'Ring Road, Surat',
    currentBalance: 16360,
    entries: [
      {
        id: 'L-05',
        date: '2026-10-25',
        description: 'Tax Invoice INV-2026-103 (25 pcs)',
        referenceDoc: 'INV-2026-103',
        debit: 31360,
        credit: 0,
        balance: 31360
      },
      {
        id: 'L-06',
        date: '2026-10-25',
        description: 'UPI Payment Received (Ref: UPI/9984102941)',
        referenceDoc: 'REC-2026-090',
        debit: 0,
        credit: 15000,
        balance: 16360
      }
    ]
  },
  {
    id: 'LEDGER-SUPP-01',
    partyName: 'Arvind Mills Ltd.',
    role: 'supplier',
    phone: '+91 79 2658 0000',
    city: 'Naroda Road, Ahmedabad',
    currentBalance: 96000, // Payable to supplier
    entries: [
      {
        id: 'L-07',
        date: '2026-10-14',
        description: 'Raw Denim Fabric Purchase 1,250m @ ₹240/m + 12% GST',
        referenceDoc: 'BILL-AM-8841',
        debit: 0,
        credit: 336000,
        balance: 336000
      },
      {
        id: 'L-08',
        date: '2026-10-16',
        description: 'RTGS Part Payment against BILL-AM-8841',
        referenceDoc: 'VOUCH-AM-01',
        debit: 240000,
        credit: 0,
        balance: 96000
      }
    ]
  },
  {
    id: 'LEDGER-WORKER-01',
    partyName: 'Master Rafiq Jobwork',
    role: 'job_worker',
    phone: '+91 97654 32109',
    city: 'Industrial Area, Ulhasnagar',
    currentBalance: 0,
    entries: [
      {
        id: 'L-09',
        date: '2026-10-22',
        description: 'Stitching Work Order WO-ST-101 (150 units @ ₹120)',
        referenceDoc: 'WO-ST-101',
        debit: 0,
        credit: 18000,
        balance: 18000
      },
      {
        id: 'L-10',
        date: '2026-10-24',
        description: 'Bank Payment settled in full',
        referenceDoc: 'VOUCH-2026-041',
        debit: 18000,
        credit: 0,
        balance: 0
      }
    ]
  }
];

export const INITIAL_EXPENSES: ExpenseRecord[] = [
  {
    id: 'EXP-01',
    category: 'Workshop Rent',
    description: 'Unit 4B Industrial Gala Monthly Rent',
    amount: 35000,
    date: '2026-10-01',
    paidTo: 'Shree Sai Industrial Estate',
    mode: 'Bank Transfer'
  },
  {
    id: 'EXP-02',
    category: 'Electricity & Steam',
    description: 'MSEDCL Industrial Power & Boiler Steam Fuel',
    amount: 14200,
    date: '2026-10-05',
    paidTo: 'Maharashtra State Electricity Board',
    mode: 'Bank Transfer'
  },
  {
    id: 'EXP-03',
    category: 'Machinery Maintenance',
    description: 'Juki Flatlock Sewing & Rotary Washer Servicing',
    amount: 6500,
    date: '2026-10-11',
    paidTo: 'Pioneer Machine Spares',
    mode: 'Cash'
  },
  {
    id: 'EXP-04',
    category: 'Staff Salary',
    description: 'Master Cutter & Floor Supervisor Advance',
    amount: 48000,
    date: '2026-10-07',
    paidTo: 'Cutting & Floor Supervisors',
    mode: 'Bank Transfer'
  },
  {
    id: 'EXP-05',
    category: 'Packaging & Freight',
    description: 'Heavy Carton Corrugated Boxes & Tempo Logistics',
    amount: 8400,
    date: '2026-10-19',
    paidTo: 'Ganesh Logistics Services',
    mode: 'UPI'
  }
];

export const INITIAL_AUDIT_LOG: AuditLogEntry[] = [
  {
    id: 'AUDIT-001',
    timestamp: '2026-10-14 11:20:15',
    user: 'Ketan Rajput (Admin)',
    role: 'Owner / Admin',
    action: 'INWARD_PURCHASE',
    module: 'Purchase Ledger',
    details: 'Logged Purchase BILL-AM-8841 from Arvind Mills: 1,250m @ ₹240/m (Lot LOT-DEN-8820)'
  },
  {
    id: 'AUDIT-002',
    timestamp: '2026-10-21 14:05:42',
    user: 'Smaran Jage (Sales)',
    role: 'Employee',
    action: 'CREATE_INVOICE',
    module: 'Sales Module',
    details: 'Generated INV-2026-101 for Metro Plus Apparels (30 pcs DEMO-DJ-001 Size 38, Total ₹37,632)'
  },
  {
    id: 'AUDIT-003',
    timestamp: '2026-10-21 16:30:10',
    user: 'Yash Pawar (Accounts)',
    role: 'Employee',
    action: 'RECORD_PAYMENT',
    module: 'Payments Module',
    details: 'Recorded UPI receipt ₹30,000 for Metro Plus (Ref UPI/2290481903) with photo proof verified'
  },
  {
    id: 'AUDIT-004',
    timestamp: '2026-10-24 10:15:00',
    user: 'Varun Shripati (Floor)',
    role: 'Employee',
    action: 'UPDATE_COSTING',
    module: 'Costing Engine',
    details: 'Recalculated DEMO-DJ-001 unit cost at ₹829.40 with 5% cut wastage factor'
  }
];
