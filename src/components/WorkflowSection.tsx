import { Fragment } from 'react';
import { useERP } from '../context/ERPContext';
import type { WorkflowStageId } from '../types';
import {
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  FileSpreadsheet,
  TrendingUp,
  CreditCard,
  Package,
  Scissors,
  Droplets,
  ShoppingBag
} from 'lucide-react';

export const WorkflowSection = () => {
  const {
    workflowStages,
    activeStageId,
    setActiveStageId,
    isAutoRunning,
    toggleAutoRun,
    nextStage,
    prevStage,
    executeGuidedStep,
    setGuidedDemoOpen
  } = useERP();

  const activeStage = workflowStages.find((s) => s.id === activeStageId) || workflowStages[0];
  const activeIndex = workflowStages.findIndex((s) => s.id === activeStageId);

  const getStageIcon = (id: WorkflowStageId) => {
    switch (id) {
      case 'purchase':
        return <ShoppingBag className="w-5 h-5" />;
      case 'dyeing':
        return <Droplets className="w-5 h-5" />;
      case 'stitching':
        return <Scissors className="w-5 h-5" />;
      case 'finishing':
        return <Sparkles className="w-5 h-5" />;
      case 'inventory':
        return <Package className="w-5 h-5" />;
      case 'sales':
        return <Layers className="w-5 h-5" />;
      case 'payments':
        return <CreditCard className="w-5 h-5" />;
      case 'reports':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <FileSpreadsheet className="w-5 h-5" />;
    }
  };

  return (
    <section id="workflow" className="section-container workflow-section">
      <div className="section-header-row">
        <div>
          <div className="section-eyebrow">
            <span className="badge-tag">END-TO-END PIPELINE</span>
            <span className="badge-sub">Single Source of Truth</span>
          </div>
          <h2 className="section-title">Connected Denim Workflow</h2>
          <p className="section-subtitle">
            Unlike isolated spreadsheets, every step automatically feeds data, costs, and inventory into the next stage.
          </p>
        </div>

        {/* Workflow Controls */}
        <div className="workflow-controls-bar">
          <button
            onClick={prevStage}
            className="btn-icon"
            title="Previous Stage"
            aria-label="Previous Stage"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={toggleAutoRun}
            className={`btn-primary-compact ${isAutoRunning ? 'btn-active-run' : ''}`}
            title={isAutoRunning ? 'Pause auto-runner' : 'Auto run demo workflow'}
          >
            {isAutoRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Demo</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Run Demo Workflow</span>
              </>
            )}
          </button>

          <button
            onClick={nextStage}
            className="btn-icon"
            title="Next Stage"
            aria-label="Next Stage"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setGuidedDemoOpen(true)}
            className="btn-outline-compact ml-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>2-Min Mentor Guide</span>
          </button>
        </div>
      </div>

      {/* Horizontal Timeline (Desktop) & Vertical (Mobile) */}
      <div className="timeline-container">
        <div className="timeline-track">
          {workflowStages.map((stage, idx) => {
            const isActive = stage.id === activeStageId;
            const isCompleted = idx < activeIndex;

            return (
              <Fragment key={stage.id}>
                <div
                  className={`timeline-step-card ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
                  onClick={() => setActiveStageId(stage.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveStageId(stage.id);
                    }
                  }}
                  aria-pressed={isActive}
                >
                  <div className="step-card-top">
                    <span className="step-num-badge">
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> : `0${stage.stepNumber}`}
                    </span>
                    <span className="step-status-pill">
                      {isActive ? 'Active' : isCompleted ? 'Linked' : 'Queued'}
                    </span>
                  </div>

                  <div className="step-icon-box">
                    {getStageIcon(stage.id)}
                  </div>

                  <h3 className="step-card-title">{stage.name}</h3>
                  <p className="step-card-actor">{stage.actor}</p>
                </div>

                {idx < workflowStages.length - 1 && (
                  <div className={`timeline-connector ${idx < activeIndex ? 'connector-completed' : ''}`}>
                    <div className="connector-line"></div>
                    <ArrowRight className="connector-arrow" />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep Inspector Panel */}
      <div className="stage-inspector-card">
        <div className="stage-inspector-header">
          <div className="inspector-title-area">
            <div className="stage-badge-large">
              <span>STAGE {activeStage.stepNumber} OF 8</span>
            </div>
            <h3 className="stage-headline">{activeStage.name}</h3>
            <p className="stage-purpose-desc">{activeStage.purpose}</p>
          </div>

          <div className="stage-action-box">
            <span className="actor-tag">
              <strong>Owner/Station:</strong> {activeStage.actor}
            </span>
            <button
              onClick={() => executeGuidedStep(activeIndex)}
              className="btn-accent-simulate"
              title="Simulate live state update for this stage"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulate {activeStage.name} Entry</span>
            </button>
          </div>
        </div>

        {/* 3-Column Info Breakdown */}
        <div className="stage-inspector-grid">
          {/* Column 1: Live Sample Records */}
          <div className="inspector-panel-col">
            <h4 className="panel-col-title">
              <FileSpreadsheet className="w-4 h-4 text-blue-600" />
              <span>Live Example Records</span>
            </h4>
            <div className="inspector-records-list">
              {activeStage.sampleDataSummary.map((rec, rIdx) => (
                <div key={rIdx} className="record-item-row">
                  <span className="record-item-label">{rec.label}</span>
                  <span className="record-item-val font-mono">{rec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Data Handshake (Inputs & Outputs) */}
          <div className="inspector-panel-col">
            <h4 className="panel-col-title">
              <Layers className="w-4 h-4 text-green-600" />
              <span>Connected Data In/Out</span>
            </h4>
            <div className="data-handshake-box">
              <div className="handshake-block">
                <span className="handshake-label">INPUTS RECEIVED:</span>
                <ul className="handshake-list">
                  {activeStage.inputs.map((inp, iIdx) => (
                    <li key={iIdx}>• {inp}</li>
                  ))}
                </ul>
              </div>
              <div className="handshake-block">
                <span className="handshake-label">OUTPUTS GENERATED:</span>
                <ul className="handshake-list output-list">
                  {activeStage.outputs.map((out, oIdx) => (
                    <li key={oIdx}>✓ {out}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3: Financial & Downstream Link */}
          <div className="inspector-panel-col">
            <h4 className="panel-col-title">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Financial Impact & Next Flow</span>
            </h4>
            <div className="financial-impact-box">
              <div className="impact-statement">
                <span className="impact-badge">Cost & Ledger Impact</span>
                <p>{activeStage.financialImpact}</p>
              </div>

              <div className="forward-flow-statement">
                <span className="forward-badge">Forwarded to Next Stage</span>
                <p>{activeStage.nextStageFlow}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
