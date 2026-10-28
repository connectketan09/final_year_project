import { CheckCircle2, ShieldCheck, ArrowDown } from 'lucide-react';

export function EditorialAboutWork() {
  const scrollToWorkflow = () => {
    const el = document.getElementById('workflow-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="editorial-content-wrapper">
      {/* ----------------------------------------------------------------- */}
      {/* ABOUT US SECTION                                                  */}
      {/* ----------------------------------------------------------------- */}
      <section id="about" className="editorial-about-section">
        <div className="editorial-section-eyebrow-row">
          <span className="editorial-pill-tag">ABOUT UID DENIMS ERP</span>
          <span className="editorial-pill-sub">MSBTE DIPLOMA CAPSTONE 2026–2027</span>
        </div>

        <div className="editorial-about-grid">
          <div className="editorial-about-headline-col">
            <h2 className="editorial-section-heading">
              Bridging Industrial Denim Craft with Algorithmic Clarity.
            </h2>
            <div className="academic-seal-card">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="seal-title">Vidyalankar Polytechnic, Wadala, Mumbai</span>
                <span className="seal-sub">Department of Computer Engineering • Pilot Industry Partner: Parshva Creation</span>
              </div>
            </div>
          </div>

          <div className="editorial-about-text-col">
            <p className="editorial-lead-paragraph">
              In small-to-medium apparel manufacturing, production workflows, piece-rate wages, and wholesale ledgers often remain fractured across paper slips, phone calls, and disconnected spreadsheets.
            </p>
            <p className="editorial-body-paragraph">
              <strong>UID Denims ERP</strong> transforms this fragmented environment into a single, cohesive operating platform. Specially engineered for the <strong>men's plus-size apparel sector (waist 38" to 54")</strong>, the system models fabric shrinkage, tracks 8 manufacturing stages, enforces true article costing, and settles wholesale ledgers with verifiable payment proofs.
            </p>

            <div className="editorial-metrics-row">
              <div className="metric-box">
                <span className="metric-number">38"–54"</span>
                <span className="metric-label">Specialized Plus-Size Waist Range</span>
              </div>
              <div className="metric-box">
                <span className="metric-number">12%</span>
                <span className="metric-label">Automated Apparel GST &amp; HSN 6203</span>
              </div>
              <div className="metric-box">
                <span className="metric-number">&lt; 0.8%</span>
                <span className="metric-label">Fabric Scrap Rate with Nesting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* WORK / DISCIPLINES SECTION                                        */}
      {/* ----------------------------------------------------------------- */}
      <section id="work" className="editorial-work-section">
        <div className="editorial-section-eyebrow-row">
          <span className="editorial-pill-tag">MANUFACTURING DISCIPLINES</span>
          <span className="editorial-pill-sub">From Selvedge Bolt to Audited B2B Shipment</span>
        </div>

        <div className="work-header-row">
          <h2 className="editorial-section-heading">
            How UID Denims Manufactures at Scale.
          </h2>
          <button
            className="editorial-pill-btn"
            onClick={scrollToWorkflow}
          >
            <span>TEST LIVE WORKFLOW DEMO</span>
            <ArrowDown className="w-4 h-4 ml-2" />
          </button>
        </div>

        <div className="editorial-work-grid">
          {/* Card 1 */}
          <div className="work-discipline-card">
            <div className="card-num-watermark">01</div>
            <div className="card-top-icon">
              <span className="discipline-tag">FABRIC INWARD</span>
            </div>
            <h3 className="card-discipline-title">Selvedge Weaving &amp; Shrinkage Testing</h3>
            <p className="card-discipline-desc">
              11.5oz to 14.5oz raw denim cotton with elastane blend. Every roll is assigned a mill lot barcode and pre-tested for 4.2% warp/weft wash shrinkage.
            </p>
            <div className="card-bullet-list">
              <div className="card-bullet-item">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0" />
                <span>Supplier Ledger Credit Generation</span>
              </div>
              <div className="card-bullet-item">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0" />
                <span>Quality Gate &amp; Yardage Audit</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="work-discipline-card">
            <div className="card-num-watermark">02</div>
            <div className="card-top-icon">
              <span className="discipline-tag">PATTERN CAD</span>
            </div>
            <h3 className="card-discipline-title">Precision Plus-Size Grading</h3>
            <p className="card-discipline-desc">
              Specialized rise curve and thigh ease calculations engineered specifically for plus sizes (38, 40, 42, 44, 46, 48, 50, 52, 54) to ensure comfortable drape and zero waistband roll.
            </p>
            <div className="card-bullet-list">
              <div className="card-bullet-item">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0" />
                <span>Marker Nesting &lt; 0.8% Scrap</span>
              </div>
              <div className="card-bullet-item">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0" />
                <span>WIP Batch Ticket Generation</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="work-discipline-card">
            <div className="card-num-watermark">03</div>
            <div className="card-top-icon">
              <span className="discipline-tag">ASSEMBLY</span>
            </div>
            <h3 className="card-discipline-title">Heavy Juki Stitching &amp; Trims</h3>
            <p className="card-discipline-desc">
              Reinforced twin-needle lap seaming, bar-tacked stress points, anti-burst pocketing, and heavy-gauge YKK brass zippers rated for extended industrial wear.
            </p>
            <div className="card-bullet-list">
              <div className="card-bullet-item">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0" />
                <span>Piece-Rate Contractor Work Orders</span>
              </div>
              <div className="card-bullet-item">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0" />
                <span>Real-Time Operator Productivity</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="work-discipline-card">
            <div className="card-num-watermark">04</div>
            <div className="card-top-icon">
              <span className="discipline-tag">WASH VATS</span>
            </div>
            <h3 className="card-discipline-title">Eco-Enzyme Washing &amp; QC Passed</h3>
            <p className="card-discipline-desc">
              Sustainable bio-enzyme and stone-wash tumblers producing signature whiskering without fabric fiber degradation. 100% garment inspection before final steam pressing.
            </p>
            <div className="card-bullet-list">
              <div className="card-bullet-item">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0" />
                <span>Finished Goods Depot Inward</span>
              </div>
              <div className="card-bullet-item">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0" />
                <span>Article True Cost Formulation</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
