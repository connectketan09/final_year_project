import { useState } from 'react';
import { useERP } from '../context/ERPContext';
import {
  Check,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Sliders
} from 'lucide-react';

export const CostingSection = () => {
  const { costingConfig, updateCostingConfig, calculatedCosting } = useERP();
  const [selectedSize, setSelectedSize] = useState<string>('42');
  const [appliedNotice, setAppliedNotice] = useState<boolean>(false);

  const handleApply = () => {
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 3000);
  };

  const resetCostingToStandard = () => {
    updateCostingConfig({
      batchSize: 100,
      fabricCostPerMeter: 240,
      fabricMetersPerGarment: 2.2,
      fabricWastagePercent: 5,
      dyeingCostPerPiece: 85,
      stitchingCostPerPiece: 120,
      accessoriesCostPerPiece: 45,
      otherOverheadPerPiece: 25,
      markupPercent: 35,
      marginPercent: 26,
      pricingStrategy: 'markup',
      gstRatePercent: 12,
      mrpMultiplier: 2.23
    });
  };

  return (
    <section id="costing" className="section-container costing-section">
      <div className="section-header-row">
        <div>
          <div className="section-eyebrow">
            <span className="badge-tag">PRODUCTION COSTING ENGINE</span>
            <span className="badge-sub">Transparent Article BOM</span>
          </div>
          <h2 className="section-title">Article Production Cost & Pricing Engine</h2>
          <p className="section-subtitle">
            Calculate the true unit cost of denim trousers by aggregating fabric yardage, cut loss, dyeing, stitching piece-rates, trims, and overheads.
          </p>
        </div>

        <button onClick={resetCostingToStandard} className="btn-outline-compact">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Standard Sheet</span>
        </button>
      </div>

      {/* Article Specification Header */}
      <div className="article-spec-card">
        <div className="spec-item">
          <span className="spec-label">ARTICLE NAME</span>
          <span className="spec-value font-bold">Classic Heavyweight Denim Jeans</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">BASE SKU</span>
          <span className="spec-value font-mono">DEMO-DJ-001</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">COLOUR / WEAVE</span>
          <span className="spec-value">Indigo Deep Blue (3/1 Right-Hand Twill)</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">PLUS-SIZE CUT</span>
          <div className="size-selector-pills">
            {['38', '42', '44', '46'].map((sz) => (
              <button
                key={sz}
                onClick={() => {
                  setSelectedSize(sz);
                  // Dynamic yardage tweak based on plus-size pattern
                  const yardage = sz === '38' ? 2.1 : sz === '42' ? 2.2 : sz === '44' ? 2.25 : 2.35;
                  updateCostingConfig({ fabricMetersPerGarment: yardage });
                }}
                className={`size-btn ${selectedSize === sz ? 'active' : ''}`}
              >
                Waist {sz}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="costing-grid">
        {/* Left Column: Configurable Cost Inputs */}
        <div className="cost-inputs-card">
          <div className="card-sub-header">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="card-sub-title">Configurable Production Parameters</h3>
          </div>

          <div className="input-fields-list">
            {/* Batch Size */}
            <div className="input-group-row">
              <div className="input-label-area">
                <label htmlFor="batchSize" className="input-field-label">Production Batch Size (Pcs)</label>
                <span className="input-hint">Units scheduled in this cutting lot</span>
              </div>
              <div className="input-control">
                <input
                  id="batchSize"
                  type="number"
                  min="1"
                  max="5000"
                  value={costingConfig.batchSize}
                  onChange={(e) => updateCostingConfig({ batchSize: Math.max(1, Number(e.target.value) || 1) })}
                  className="number-input font-mono"
                />
                <span className="unit-affix">pcs</span>
              </div>
            </div>

            {/* Fabric Rate */}
            <div className="input-group-row">
              <div className="input-label-area">
                <label htmlFor="fabricCost" className="input-field-label">Raw Denim Fabric Cost (per Meter)</label>
                <span className="input-hint">Arvind Mills 14.5oz Selvedge contract rate</span>
              </div>
              <div className="input-control">
                <span className="unit-prefix">₹</span>
                <input
                  id="fabricCost"
                  type="number"
                  min="50"
                  max="1000"
                  value={costingConfig.fabricCostPerMeter}
                  onChange={(e) => updateCostingConfig({ fabricCostPerMeter: Number(e.target.value) || 0 })}
                  className="number-input font-mono"
                />
                <span className="unit-affix">/m</span>
              </div>
            </div>

            {/* Fabric Yardage per Garment */}
            <div className="input-group-row">
              <div className="input-label-area">
                <label htmlFor="fabricMeters" className="input-field-label">Fabric Yardage required per Piece</label>
                <span className="input-hint">Includes front, back, yoke, pocket facing & waistband</span>
              </div>
              <div className="input-control">
                <input
                  id="fabricMeters"
                  type="number"
                  step="0.05"
                  min="1"
                  max="4"
                  value={costingConfig.fabricMetersPerGarment}
                  onChange={(e) => updateCostingConfig({ fabricMetersPerGarment: Number(e.target.value) || 1 })}
                  className="number-input font-mono"
                />
                <span className="unit-affix">meters</span>
              </div>
            </div>

            {/* Fabric Wastage % */}
            <div className="input-group-row">
              <div className="input-label-area">
                <label htmlFor="wastage" className="input-field-label">Fabric Cutting Wastage %</label>
                <span className="input-hint">Allowance for edge selvedge trim and pattern interlocking</span>
              </div>
              <div className="input-control">
                <input
                  id="wastage"
                  type="number"
                  step="0.5"
                  min="0"
                  max="20"
                  value={costingConfig.fabricWastagePercent}
                  onChange={(e) => updateCostingConfig({ fabricWastagePercent: Number(e.target.value) || 0 })}
                  className="number-input font-mono"
                />
                <span className="unit-affix">%</span>
              </div>
            </div>

            {/* Dyeing Cost */}
            <div className="input-group-row">
              <div className="input-label-area">
                <label htmlFor="dyeingCost" className="input-field-label">Dyeing & Stone Enzyme Wash Cost</label>
                <span className="input-hint">Paid to Apex Dyeing Works per piece</span>
              </div>
              <div className="input-control">
                <span className="unit-prefix">₹</span>
                <input
                  id="dyeingCost"
                  type="number"
                  min="0"
                  max="500"
                  value={costingConfig.dyeingCostPerPiece}
                  onChange={(e) => updateCostingConfig({ dyeingCostPerPiece: Number(e.target.value) || 0 })}
                  className="number-input font-mono"
                />
                <span className="unit-affix">/pc</span>
              </div>
            </div>

            {/* Stitching / Job Work Cost */}
            <div className="input-group-row">
              <div className="input-label-area">
                <label htmlFor="stitchingCost" className="input-field-label">Stitching & Job Work Rate</label>
                <span className="input-hint">Paid to Master Rafiq Jobwork per assembled trouser</span>
              </div>
              <div className="input-control">
                <span className="unit-prefix">₹</span>
                <input
                  id="stitchingCost"
                  type="number"
                  min="0"
                  max="600"
                  value={costingConfig.stitchingCostPerPiece}
                  onChange={(e) => updateCostingConfig({ stitchingCostPerPiece: Number(e.target.value) || 0 })}
                  className="number-input font-mono"
                />
                <span className="unit-affix">/pc</span>
              </div>
            </div>

            {/* Accessories Cost */}
            <div className="input-group-row">
              <div className="input-label-area">
                <label htmlFor="accessoriesCost" className="input-field-label">Hardware Accessories & Trims</label>
                <span className="input-hint">YKK 8" brass zip, 6 copper rivets, UID leather patch, button</span>
              </div>
              <div className="input-control">
                <span className="unit-prefix">₹</span>
                <input
                  id="accessoriesCost"
                  type="number"
                  min="0"
                  max="300"
                  value={costingConfig.accessoriesCostPerPiece}
                  onChange={(e) => updateCostingConfig({ accessoriesCostPerPiece: Number(e.target.value) || 0 })}
                  className="number-input font-mono"
                />
                <span className="unit-affix">/pc</span>
              </div>
            </div>

            {/* Other Overhead Cost */}
            <div className="input-group-row">
              <div className="input-label-area">
                <label htmlFor="overheadCost" className="input-field-label">Packaging, Barcode Tag & Steam Press</label>
                <span className="input-hint">20/3 spun thread, polybag, hang tag & final QC</span>
              </div>
              <div className="input-control">
                <span className="unit-prefix">₹</span>
                <input
                  id="overheadCost"
                  type="number"
                  min="0"
                  max="200"
                  value={costingConfig.otherOverheadPerPiece}
                  onChange={(e) => updateCostingConfig({ otherOverheadPerPiece: Number(e.target.value) || 0 })}
                  className="number-input font-mono"
                />
                <span className="unit-affix">/pc</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing Engine & Formula Breakdown */}
        <div className="cost-results-card">
          <div className="card-sub-header">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h3 className="card-sub-title">Automated Cost Breakdown & Selling Price</h3>
          </div>

          {/* Unit Cost Headline Callout */}
          <div className="unit-cost-callout">
            <div className="callout-label">TRUE ARTICLE PRODUCTION COST (COGS)</div>
            <div className="callout-value font-mono">
              ₹{calculatedCosting.totalCostPerGarment.toFixed(2)}
              <span className="callout-unit">per garment</span>
            </div>
            <div className="callout-batch-note">
              Total batch production outlay for {costingConfig.batchSize} pcs: <strong className="font-mono">₹{calculatedCosting.batchTotalCost.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* Step-by-Step Cost Build-Up */}
          <div className="cost-buildup-table">
            <div className="buildup-row">
              <span className="buildup-name">
                1. Fabric Cost (
                <span className="font-mono">{costingConfig.fabricMetersPerGarment}m</span> @{' '}
                <span className="font-mono">₹{costingConfig.fabricCostPerMeter}</span> +{' '}
                <span className="font-mono">{costingConfig.fabricWastagePercent}%</span> loss)
              </span>
              <span className="buildup-amount font-mono">₹{calculatedCosting.fabricCostPerPiece.toFixed(2)}</span>
            </div>
            <div className="buildup-row">
              <span className="buildup-name">2. Dyeing & Enzyme Wash Charge</span>
              <span className="buildup-amount font-mono">₹{costingConfig.dyeingCostPerPiece.toFixed(2)}</span>
            </div>
            <div className="buildup-row">
              <span className="buildup-name">3. Stitching & Labor Piece Rate</span>
              <span className="buildup-amount font-mono">₹{costingConfig.stitchingCostPerPiece.toFixed(2)}</span>
            </div>
            <div className="buildup-row">
              <span className="buildup-name">4. Trims & Hardware (Zipper, Rivets, Patch)</span>
              <span className="buildup-amount font-mono">₹{costingConfig.accessoriesCostPerPiece.toFixed(2)}</span>
            </div>
            <div className="buildup-row">
              <span className="buildup-name">5. Overhead, Tags, Packaging & Pressing</span>
              <span className="buildup-amount font-mono">₹{costingConfig.otherOverheadPerPiece.toFixed(2)}</span>
            </div>
            <div className="buildup-row total-row">
              <span className="buildup-name font-bold">Total Production Cost (A)</span>
              <span className="buildup-amount font-mono font-bold text-slate-900">
                ₹{calculatedCosting.totalCostPerGarment.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Pricing Strategy Selector: Markup vs Margin */}
          <div className="pricing-strategy-box">
            <div className="strategy-header">
              <span className="strategy-title">PRICING FORMULA SELECTOR</span>
              <div className="strategy-toggle">
                <button
                  type="button"
                  onClick={() => updateCostingConfig({ pricingStrategy: 'markup' })}
                  className={`toggle-btn ${costingConfig.pricingStrategy === 'markup' ? 'active' : ''}`}
                >
                  Wholesale Markup %
                </button>
                <button
                  type="button"
                  onClick={() => updateCostingConfig({ pricingStrategy: 'margin' })}
                  className={`toggle-btn ${costingConfig.pricingStrategy === 'margin' ? 'active' : ''}`}
                >
                  Target Margin %
                </button>
              </div>
            </div>

            {/* Formula Explainer Box */}
            <div className="formula-explanation-box">
              {costingConfig.pricingStrategy === 'markup' ? (
                <>
                  <div className="formula-text">
                    <strong>Formula:</strong> Wholesale Price = Cost × (1 + Markup% / 100)
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <label htmlFor="markupInput" className="text-xs font-semibold text-slate-700">Set Markup %:</label>
                    <input
                      id="markupInput"
                      type="number"
                      min="5"
                      max="150"
                      value={costingConfig.markupPercent}
                      onChange={(e) => updateCostingConfig({ markupPercent: Number(e.target.value) || 0 })}
                      className="inline-number-input font-mono"
                    />
                    <span className="text-xs text-slate-500">
                      (Yields {calculatedCosting.grossMarginPercent}% gross margin on selling price)
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="formula-text">
                    <strong>Formula:</strong> Wholesale Price = Cost / (1 - Target Margin% / 100)
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <label htmlFor="marginInput" className="text-xs font-semibold text-slate-700">Set Margin %:</label>
                    <input
                      id="marginInput"
                      type="number"
                      min="5"
                      max="80"
                      value={costingConfig.marginPercent}
                      onChange={(e) => updateCostingConfig({ marginPercent: Number(e.target.value) || 0 })}
                      className="inline-number-input font-mono"
                    />
                    <span className="text-xs text-slate-500">
                      (Markup over cost equivalent: {calculatedCosting.markupPercent}%)
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Suggested Prices */}
            <div className="suggested-prices-grid">
              <div className="price-pill-card">
                <span className="price-type">SUGGESTED WHOLESALE (Excl. Tax)</span>
                <span className="price-figure font-mono text-blue-900">
                  ₹{calculatedCosting.suggestedWholesalePrice.toFixed(2)}
                </span>
                <span className="price-note">B2B Base Selling Price</span>
              </div>

              <div className="price-pill-card">
                <span className="price-type">WHOLESALE (Incl. 12% GST)</span>
                <span className="price-figure font-mono text-emerald-900">
                  ₹{calculatedCosting.suggestedWholesaleWithGst.toFixed(2)}
                </span>
                <span className="price-note">Invoice Billing Rate</span>
              </div>

              <div className="price-pill-card highlight">
                <span className="price-type">SUGGESTED RETAIL MRP</span>
                <span className="price-figure font-mono text-slate-950">
                  ₹{calculatedCosting.suggestedMrp.toLocaleString('en-IN')}
                </span>
                <span className="price-note">At 2.23x wholesale multiplier</span>
              </div>
            </div>

            <button onClick={handleApply} className="btn-primary-full mt-4">
              {appliedNotice ? (
                <>
                  <Check className="w-4 h-4 text-green-300" />
                  <span>Costing Applied to Live Articles!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Apply Costing to Live Article Master</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
