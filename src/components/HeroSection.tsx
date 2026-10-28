import { FactoryIllustration } from './FactoryIllustration';
import { useERP } from '../context/ERPContext';
import {
  ArrowDown,
  Sparkles,
  Play
} from 'lucide-react';

export const HeroSection = () => {
  const { setGuidedDemoOpen, toggleAutoRun } = useERP();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="overview" className="hero-section">
      {/* Editorial Academic & Industry Banner */}
      <div className="academic-badge-row">
        <div className="academic-badge">
          <span className="dot-green"></span>
          <span>MSBTE DIPLOMA PROJECT 2026–2027 • VIDYALANKAR POLYTECHNIC</span>
        </div>
        <div className="industry-collab-badge">
          <span>PILOT INDUSTRY PARTNER: UID DENIMS × UID TECH BY PARSHVA CREATION</span>
        </div>
      </div>

      {/* Main Editorial Hero Text */}
      <div className="hero-content-container">
        <div className="hero-eyebrow-container">
          <span className="hero-subheading-tag">AN AI-ENABLED BUSINESS OPERATING PLATFORM</span>
        </div>

        <h1 className="hero-title">
          FROM FABRIC TO PROFIT
        </h1>

        <p className="hero-headline">
          Every stage of your denim business, connected in one intelligent platform.
        </p>

        <p className="hero-supporting-text">
          Track production, calculate true article costs, manage stock, record payments and understand business performance from one place.
        </p>

        {/* CTA Actions */}
        <div className="hero-cta-group">
          <button
            onClick={() => scrollToSection('workflow')}
            className="btn-hero-primary"
          >
            <span>Explore the Workflow</span>
            <ArrowDown className="w-4 h-4 ml-1.5" />
          </button>

          <button
            onClick={() => setGuidedDemoOpen(true)}
            className="btn-hero-secondary"
          >
            <Sparkles className="w-4 h-4 text-blue-600 mr-1.5" />
            <span>Open ERP Demo</span>
          </button>

          <button
            onClick={() => {
              toggleAutoRun();
              scrollToSection('workflow');
            }}
            className="btn-hero-ghost"
          >
            <Play className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
            <span>Run Pipeline Simulation</span>
          </button>
        </div>
      </div>

      {/* LIVE Illustrated Denim Factory Scene */}
      <div className="hero-illustration-wrapper">
        <FactoryIllustration
          onStationClick={() => {
            scrollToSection('workflow');
          }}
        />
      </div>

      {/* Core Highlights Bar */}
      <div className="hero-pillars-grid">
        <div className="pillar-item">
          <div className="pillar-num font-mono">01</div>
          <div>
            <h4 className="pillar-title">Connected Production</h4>
            <p className="pillar-desc">Raw denim fabric, washing vats, and stitching job orders joined into one audit trail.</p>
          </div>
        </div>

        <div className="pillar-item">
          <div className="pillar-num font-mono">02</div>
          <div>
            <h4 className="pillar-title">True Article Costing</h4>
            <p className="pillar-desc">Configurable formulas separating wholesale markups from true retail profit margins.</p>
          </div>
        </div>

        <div className="pillar-item">
          <div className="pillar-num font-mono">03</div>
          <div>
            <h4 className="pillar-title">Ledgers & Settlement</h4>
            <p className="pillar-desc">Accounts receivable, mill payables, UPI/bank verification with optional local proof.</p>
          </div>
        </div>

        <div className="pillar-item">
          <div className="pillar-num font-mono">04</div>
          <div>
            <h4 className="pillar-title">AI Business Assistant</h4>
            <p className="pillar-desc">Plain-language queries answered from live database records with permission boundaries.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
