import { useState } from 'react';
import { useERP } from '../context/ERPContext';
import type { WorkflowStageId } from '../types';

interface FactoryIllustrationProps {
  onStationClick?: (stageId: WorkflowStageId) => void;
}

export const FactoryIllustration = ({ onStationClick }: FactoryIllustrationProps) => {
  const { activeStageId, setActiveStageId } = useERP();
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  const handleSelect = (stageId: WorkflowStageId) => {
    setActiveStageId(stageId);
    if (onStationClick) onStationClick(stageId);
  };

  return (
    <div className="factory-scene-wrapper">
      <div className="factory-status-bar">
        <div className="factory-status-left">
          <span className="live-indicator-pulse"></span>
          <span className="live-status-text">LIVE DENIM FACTORY FLOOR — UNIT 4B (MUMBAI)</span>
          <span className="live-tag">LOT: LOT-DEN-8820</span>
        </div>
        <div className="factory-status-right">
          <span className="stat-pill">Speed: 120 RPM</span>
          <span className="stat-pill">Shrinkage: 4.2%</span>
          <span className="stat-pill active">QC Pass: 98.5%</span>
          <span className="stat-pill">Batch: 150 Pcs</span>
        </div>
      </div>

      <div className="factory-svg-container">
        <svg
          viewBox="0 0 1200 440"
          className="factory-svg"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Interactive animated illustration of UID Denims apparel production line from fabric to finished stock"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="denimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#172554" />
            </linearGradient>

            <linearGradient id="fabricRollGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>

            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>

            <linearGradient id="vatDrumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="conveyorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Pattern for floor grid */}
            <pattern id="floorGrid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 0 20 L 40 20 M 20 0 L 20 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
            </pattern>

            {/* Drop Shadow Filter */}
            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.08" floodColor="#0F172A" />
            </filter>
          </defs>

          {/* 1. FACTORY ARCHITECTURE / BACKGROUND */}
          {/* Floor */}
          <rect x="0" y="360" width="1200" height="80" fill="#F8FAFC" />
          <rect x="0" y="360" width="1200" height="80" fill="url(#floorGrid)" opacity="0.6" />
          <line x1="0" y1="360" x2="1200" y2="360" stroke="#CBD5E1" strokeWidth="2" />

          {/* Overhead industrial ductwork & pipes */}
          <path d="M 0 45 L 1200 45" stroke="#E2E8F0" strokeWidth="8" strokeLinecap="round" />
          <path d="M 180 45 L 180 85 M 400 45 L 400 95 M 650 45 L 650 85 M 900 45 L 900 95 M 1080 45 L 1080 85" stroke="#CBD5E1" strokeWidth="3" />
          {/* Subtle lamps */}
          <g>
            {[200, 420, 670, 880, 1060].map((cx, idx) => (
              <g key={idx} transform={`translate(${cx}, 50)`}>
                <line x1="0" y1="0" x2="0" y2="25" stroke="#94A3B8" strokeWidth="1.5" />
                <path d="M -16 25 L 16 25 L 10 33 L -10 33 Z" fill="#475569" />
                <polygon points="-8,33 8,33 12,65 -12,65" fill="#FEF08A" opacity="0.15" />
              </g>
            ))}
          </g>

          {/* 2. MAIN CONVEYOR / FABRIC FLOW TRACK (Connecting stations) */}
          <g className="conveyor-track">
            {/* Support pillars */}
            <rect x="180" y="320" width="12" height="40" fill="#94A3B8" rx="2" />
            <rect x="420" y="320" width="12" height="40" fill="#94A3B8" rx="2" />
            <rect x="670" y="320" width="12" height="40" fill="#94A3B8" rx="2" />
            <rect x="880" y="320" width="12" height="40" fill="#94A3B8" rx="2" />

            {/* Conveyor bed */}
            <rect x="120" y="310" width="940" height="12" rx="4" fill="url(#conveyorGrad)" />
            {/* Animated conveyor belt dashes */}
            <line
              x1="120"
              y1="316"
              x2="1060"
              y2="316"
              stroke="#94A3B8"
              strokeWidth="4"
              strokeDasharray="12 12"
              className="animated-conveyor-belt"
            />
          </g>

          {/* 3. CONTINUOUS DENIM FABRIC WEBBING */}
          {/* Blue fabric flowing between machines */}
          <path
            d="M 160 270 Q 220 280 290 275 L 320 275 Q 360 250 400 275 L 530 275 Q 580 290 630 280 L 760 280 Q 820 275 880 280"
            fill="none"
            stroke="#1D4ED8"
            strokeWidth="6"
            strokeLinecap="round"
            className="flowing-denim-ribbon"
          />

          {/* ============================================================== */}
          {/* STATION 1: PURCHASE & RAW FABRIC UNROLLING                     */}
          {/* ============================================================== */}
          <g
            className={`station-group ${activeStageId === 'purchase' ? 'active-station' : ''}`}
            onClick={() => handleSelect('purchase')}
            onMouseEnter={() => setHoveredStation('purchase')}
            onMouseLeave={() => setHoveredStation(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Station backdrop glow on hover/active */}
            <rect
              x="30"
              y="110"
              width="210"
              height="240"
              rx="12"
              fill={activeStageId === 'purchase' ? '#F0FDF4' : hoveredStation === 'purchase' ? '#F8FAFC' : 'transparent'}
              stroke={activeStageId === 'purchase' ? '#22C55E' : hoveredStation === 'purchase' ? '#94A3B8' : '#E2E8F0'}
              strokeWidth={activeStageId === 'purchase' ? '2' : '1'}
              strokeDasharray={activeStageId === 'purchase' ? 'none' : '4 4'}
            />

            {/* Station Badge Header */}
            <g transform="translate(45, 128)">
              <circle cx="8" cy="8" r="5" fill="#22C55E" className="blinking-led" />
              <text x="20" y="12" fill="#0F172A" fontWeight="700" fontSize="12" fontFamily="Space Grotesk, sans-serif">
                01 PURCHASE
              </text>
              <text x="20" y="24" fill="#64748B" fontSize="9" fontFamily="Inter, sans-serif">
                Raw Denim Unwinding
              </text>
            </g>

            {/* Heavy A-frame Stand for Denim Roll */}
            <polygon points="60,330 90,210 110,210 140,330 120,330 100,240 80,330" fill="#475569" />
            <polygon points="120,330 150,210 170,210 200,330 180,330 160,240 140,330" fill="#64748B" />

            {/* Rotating Large Denim Roll */}
            <g transform="translate(130, 210)" className="rotating-denim-roll">
              {/* Outer roll cylinder */}
              <circle cx="0" cy="0" r="48" fill="url(#fabricRollGrad)" stroke="#0F172A" strokeWidth="2.5" />
              {/* Concentric rings to simulate rolled denim layers */}
              <circle cx="0" cy="0" r="38" fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="18 8" />
              <circle cx="0" cy="0" r="28" fill="none" stroke="#93C5FD" strokeWidth="2" strokeDasharray="14 6" />
              <circle cx="0" cy="0" r="18" fill="none" stroke="#DBEAFE" strokeWidth="1.5" />
              {/* Cardboard core spool */}
              <circle cx="0" cy="0" r="9" fill="#D97706" stroke="#78350F" strokeWidth="2" />
              <circle cx="0" cy="0" r="3" fill="#451A03" />
            </g>

            {/* Fabric feeder rollers */}
            <g transform="translate(195, 260)">
              <rect x="0" y="0" width="8" height="40" rx="3" fill="#334155" />
              <circle cx="4" cy="10" r="7" fill="#CBD5E1" stroke="#475569" strokeWidth="2" className="subtle-roller-spin" />
              <circle cx="4" cy="30" r="7" fill="#CBD5E1" stroke="#475569" strokeWidth="2" className="subtle-roller-spin" />
            </g>

            {/* Worker 1: Unloader / Material Inspector */}
            <g transform="translate(68, 230)" className="worker-sway">
              {/* Body / Torso with Apron */}
              <path d="M 12 40 L 28 40 L 32 80 L 8 80 Z" fill="#1E3A8A" />
              {/* Denim Apron Straps */}
              <line x1="14" y1="40" x2="22" y2="60" stroke="#B45309" strokeWidth="2" />
              <line x1="26" y1="40" x2="18" y2="60" stroke="#B45309" strokeWidth="2" />
              {/* Legs */}
              <rect x="10" y="80" width="8" height="30" fill="#334155" />
              <rect x="22" y="80" width="8" height="30" fill="#334155" />
              {/* Boots */}
              <ellipse cx="12" cy="110" rx="6" ry="3" fill="#0F172A" />
              <ellipse cx="26" cy="110" rx="6" ry="3" fill="#0F172A" />
              {/* Head & Cap */}
              <circle cx="20" cy="24" r="11" fill="#FBBF24" />
              <path d="M 8 20 Q 20 12 32 20 L 34 22 L 8 22 Z" fill="#0284C7" />
              {/* Animated Arm guiding the fabric roll */}
              <g className="worker-arm-motion">
                <path d="M 28 46 Q 44 48 48 35" fill="none" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
                <circle cx="48" cy="35" r="4" fill="#FBBF24" />
              </g>
            </g>

            {/* Spec Tag attached to Roll */}
            <g transform="translate(145, 155)">
              <rect x="0" y="0" width="60" height="26" rx="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
              <text x="6" y="11" fill="#0F172A" fontSize="7.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                LOT-8820
              </text>
              <text x="6" y="21" fill="#059669" fontSize="7" fontWeight="600" fontFamily="JetBrains Mono, monospace">
                1250M • 14.5oz
              </text>
            </g>
          </g>

          {/* ============================================================== */}
          {/* STATION 2: DYEING & WASHING ROTARY DRUM                        */}
          {/* ============================================================== */}
          <g
            className={`station-group ${activeStageId === 'dyeing' ? 'active-station' : ''}`}
            onClick={() => handleSelect('dyeing')}
            onMouseEnter={() => setHoveredStation('dyeing')}
            onMouseLeave={() => setHoveredStation(null)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x="260"
              y="110"
              width="210"
              height="240"
              rx="12"
              fill={activeStageId === 'dyeing' ? '#F0FDF4' : hoveredStation === 'dyeing' ? '#F8FAFC' : 'transparent'}
              stroke={activeStageId === 'dyeing' ? '#22C55E' : hoveredStation === 'dyeing' ? '#94A3B8' : '#E2E8F0'}
              strokeWidth={activeStageId === 'dyeing' ? '2' : '1'}
              strokeDasharray={activeStageId === 'dyeing' ? 'none' : '4 4'}
            />

            {/* Station Badge Header */}
            <g transform="translate(275, 128)">
              <circle cx="8" cy="8" r="5" fill="#22C55E" className="blinking-led" />
              <text x="20" y="12" fill="#0F172A" fontWeight="700" fontSize="12" fontFamily="Space Grotesk, sans-serif">
                02 DYEING
              </text>
              <text x="20" y="24" fill="#64748B" fontSize="9" fontFamily="Inter, sans-serif">
                Indigo Wash Vat
              </text>
            </g>

            {/* Industrial Washing Machine Housing */}
            <rect x="290" y="170" width="150" height="150" rx="14" fill="#E2E8F0" stroke="#334155" strokeWidth="2.5" />
            <rect x="300" y="180" width="130" height="130" rx="10" fill="#CBD5E1" />

            {/* Circular Drum Portal */}
            <circle cx="365" cy="245" r="48" fill="#1E293B" stroke="#475569" strokeWidth="4" />

            {/* Rotating Perforated Drum Inside */}
            <g transform="translate(365, 245)" className="rotating-dye-drum">
              {/* Indigo dye liquid level */}
              <circle cx="0" cy="0" r="44" fill="url(#vatDrumGrad)" />
              {/* Drum cross struts */}
              <line x1="-40" y1="0" x2="40" y2="0" stroke="#94A3B8" strokeWidth="2.5" opacity="0.6" />
              <line x1="0" y1="-40" x2="0" y2="40" stroke="#94A3B8" strokeWidth="2.5" opacity="0.6" />
              <line x1="-28" y1="-28" x2="28" y2="28" stroke="#94A3B8" strokeWidth="2" opacity="0.5" />
              <line x1="-28" y1="28" x2="28" y2="-28" stroke="#94A3B8" strokeWidth="2" opacity="0.5" />
              {/* Tumble garment silhouettes */}
              <rect x="-18" y="-14" width="18" height="12" rx="2" fill="#172554" transform="rotate(25)" />
              <rect x="5" y="8" width="16" height="10" rx="2" fill="#1E3A8A" transform="rotate(-40)" />
            </g>

            {/* Front Glass Reflection & Rim */}
            <circle cx="365" cy="245" r="44" fill="none" stroke="#93C5FD" strokeWidth="2" opacity="0.5" />
            <path d="M 335 220 A 40 40 0 0 1 385 210" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.6" strokeLinecap="round" />

            {/* Digital Control Panel on Machine */}
            <g transform="translate(305, 186)">
              <rect x="0" y="0" width="48" height="18" rx="3" fill="#0F172A" />
              <text x="5" y="13" fill="#22C55E" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                60°C
              </text>
              <circle cx="40" cy="9" r="3" fill="#EF4444" className="blinking-led" />
            </g>

            {/* Pressure gauge */}
            <g transform="translate(390, 186)">
              <circle cx="12" cy="12" r="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
              <line x1="12" y1="12" x2="18" y2="8" stroke="#DC2626" strokeWidth="2" className="gauge-needle-twitch" />
            </g>

            {/* Machine feet */}
            <rect x="305" y="320" width="20" height="16" fill="#334155" rx="2" />
            <rect x="405" y="320" width="20" height="16" fill="#334155" rx="2" />

            {/* Steam bubbles rising */}
            <g className="rising-steam">
              <circle cx="360" cy="160" r="3" fill="#93C5FD" opacity="0.4" />
              <circle cx="370" cy="150" r="4" fill="#93C5FD" opacity="0.3" />
              <circle cx="364" cy="138" r="5" fill="#93C5FD" opacity="0.2" />
            </g>
          </g>

          {/* ============================================================== */}
          {/* STATION 3: STITCHING MACHINE & MASTER TAILOR                   */}
          {/* ============================================================== */}
          <g
            className={`station-group ${activeStageId === 'stitching' ? 'active-station' : ''}`}
            onClick={() => handleSelect('stitching')}
            onMouseEnter={() => setHoveredStation('stitching')}
            onMouseLeave={() => setHoveredStation(null)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x="490"
              y="110"
              width="220"
              height="240"
              rx="12"
              fill={activeStageId === 'stitching' ? '#F0FDF4' : hoveredStation === 'stitching' ? '#F8FAFC' : 'transparent'}
              stroke={activeStageId === 'stitching' ? '#22C55E' : hoveredStation === 'stitching' ? '#94A3B8' : '#E2E8F0'}
              strokeWidth={activeStageId === 'stitching' ? '2' : '1'}
              strokeDasharray={activeStageId === 'stitching' ? 'none' : '4 4'}
            />

            {/* Station Badge Header */}
            <g transform="translate(505, 128)">
              <circle cx="8" cy="8" r="5" fill="#22C55E" className="blinking-led" />
              <text x="20" y="12" fill="#0F172A" fontWeight="700" fontSize="12" fontFamily="Space Grotesk, sans-serif">
                03 STITCHING
              </text>
              <text x="20" y="24" fill="#64748B" fontSize="9" fontFamily="Inter, sans-serif">
                Heavy Juki Sewing
              </text>
            </g>

            {/* Sewing Table */}
            <rect x="520" y="250" width="130" height="14" rx="2" fill="#F1F5F9" stroke="#334155" strokeWidth="2" />
            {/* Table legs */}
            <rect x="530" y="264" width="8" height="66" fill="#475569" />
            <rect x="635" y="264" width="8" height="66" fill="#475569" />
            <rect x="525" y="325" width="20" height="6" fill="#0F172A" rx="2" />
            <rect x="630" y="325" width="20" height="6" fill="#0F172A" rx="2" />
            {/* Foot pedal */}
            <rect x="565" y="320" width="30" height="8" rx="2" fill="#1E293B" transform="rotate(-6 565 320)" />

            {/* Industrial Sewing Machine Head */}
            <g transform="translate(535, 190)">
              {/* Machine Body Arm */}
              <path
                d="M 15 50 L 15 20 Q 15 10 30 10 L 80 10 Q 95 10 95 25 L 95 38 L 85 38 L 85 24 L 32 24 L 32 50 Z"
                fill="#334155"
                stroke="#0F172A"
                strokeWidth="2"
              />
              {/* Hand wheel */}
              <rect x="8" y="15" width="8" height="28" rx="3" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1.5" />
              {/* Golden Thread Spool Holder */}
              <line x1="28" y1="10" x2="28" y2="-12" stroke="#94A3B8" strokeWidth="2" />
              <rect x="22" y="-12" width="12" height="14" rx="2" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
              {/* Thread feeding path */}
              <path d="M 28 -12 Q 60 -18 85 24 L 85 45" fill="none" stroke="#F59E0B" strokeWidth="1" />
              {/* Reciprocating Needle Bar */}
              <g className="needle-reciprocating">
                <line x1="85" y1="38" x2="85" y2="58" stroke="#CBD5E1" strokeWidth="3" />
                <polygon points="83,58 87,58 85,62" fill="#0F172A" />
              </g>
              {/* Presser foot */}
              <rect x="80" y="55" width="10" height="5" fill="#94A3B8" />
            </g>

            {/* Denim Jean Leg being stitched */}
            <path
              d="M 570 246 Q 625 246 660 252 L 675 270 L 610 270 Z"
              fill="#1E3A8A"
              stroke="#172554"
              strokeWidth="1.5"
            />
            {/* Yellow stitch line */}
            <line x1="575" y1="248" x2="650" y2="250" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="4 2" />

            {/* Worker 2: Tailor Operator */}
            <g transform="translate(635, 205)" className="worker-sway">
              {/* Stool */}
              <ellipse cx="20" cy="95" rx="14" ry="4" fill="#334155" />
              <line x1="20" y1="95" x2="20" y2="125" stroke="#475569" strokeWidth="4" />
              {/* Torso & Uniform */}
              <path d="M 8 35 L 28 35 L 34 80 L 12 80 Z" fill="#047857" />
              {/* Head */}
              <circle cx="16" cy="18" r="11" fill="#FBBF24" />
              <path d="M 6 15 Q 16 8 26 15 L 26 18 L 6 18 Z" fill="#065F46" />
              {/* Legs seated */}
              <rect x="10" y="80" width="22" height="10" fill="#1E293B" rx="3" />
              <rect x="25" y="88" width="8" height="30" fill="#1E293B" />
              {/* Animated hands guiding the seam */}
              <g className="tailor-hand-motion">
                <path d="M 12 42 Q -8 44 -25 40" fill="none" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
                <circle cx="-25" cy="40" r="4" fill="#FBBF24" />
              </g>
            </g>

            {/* Rate & Batch Label */}
            <g transform="translate(515, 155)">
              <rect x="0" y="0" width="75" height="24" rx="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
              <text x="6" y="10" fill="#0F172A" fontSize="7.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                WO-ST-101
              </text>
              <text x="6" y="19" fill="#2563EB" fontSize="7" fontWeight="600" fontFamily="JetBrains Mono, monospace">
                RATE: ₹120 / PC
              </text>
            </g>
          </g>

          {/* ============================================================== */}
          {/* STATION 4: FINISHING, RIVETING & QUALITY CHECK                 */}
          {/* ============================================================== */}
          <g
            className={`station-group ${activeStageId === 'finishing' ? 'active-station' : ''}`}
            onClick={() => handleSelect('finishing')}
            onMouseEnter={() => setHoveredStation('finishing')}
            onMouseLeave={() => setHoveredStation(null)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x="730"
              y="110"
              width="210"
              height="240"
              rx="12"
              fill={activeStageId === 'finishing' ? '#F0FDF4' : hoveredStation === 'finishing' ? '#F8FAFC' : 'transparent'}
              stroke={activeStageId === 'finishing' ? '#22C55E' : hoveredStation === 'finishing' ? '#94A3B8' : '#E2E8F0'}
              strokeWidth={activeStageId === 'finishing' ? '2' : '1'}
              strokeDasharray={activeStageId === 'finishing' ? 'none' : '4 4'}
            />

            {/* Station Badge Header */}
            <g transform="translate(745, 128)">
              <circle cx="8" cy="8" r="5" fill="#22C55E" className="blinking-led" />
              <text x="20" y="12" fill="#0F172A" fontWeight="700" fontSize="12" fontFamily="Space Grotesk, sans-serif">
                04 FINISHING
              </text>
              <text x="20" y="24" fill="#64748B" fontSize="9" fontFamily="Inter, sans-serif">
                Hardware & QC Passed
              </text>
            </g>

            {/* Inspection Table */}
            <rect x="750" y="240" width="130" height="14" rx="2" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
            <rect x="760" y="254" width="8" height="76" fill="#64748B" />
            <rect x="860" y="254" width="8" height="76" fill="#64748B" />

            {/* Finished Denim Jeans on Table */}
            <g transform="translate(775, 215)">
              {/* Waistband & legs folded */}
              <path d="M 0 20 L 50 20 L 45 42 L 5 42 Z" fill="#1E3A8A" stroke="#0F172A" strokeWidth="1.5" />
              {/* YKK Brass Zipper & Button */}
              <circle cx="25" cy="24" r="2.5" fill="#F59E0B" />
              <line x1="25" y1="26" x2="25" y2="35" stroke="#F59E0B" strokeWidth="1.5" />
              {/* Copper Rivets at pocket corners */}
              <circle cx="8" cy="23" r="1.5" fill="#D97706" />
              <circle cx="42" cy="23" r="1.5" fill="#D97706" />
              {/* UID Leather Patch */}
              <rect x="35" y="16" width="12" height="7" rx="1" fill="#78350F" />
            </g>

            {/* Overhead QC Spotlight with Cone of Light */}
            <g transform="translate(815, 140)">
              <path d="M 0 0 L 0 20 L -12 25 L 12 25 Z" fill="#334155" />
              <polygon points="-8,25 8,25 35,95 -35,95" fill="#22C55E" opacity="0.12" />
            </g>

            {/* Worker 3: Quality Inspector with Clipboard */}
            <g transform="translate(865, 205)" className="worker-sway">
              {/* Torso */}
              <path d="M 8 35 L 26 35 L 30 75 L 6 75 Z" fill="#4338CA" />
              {/* Legs */}
              <rect x="8" y="75" width="8" height="45" fill="#1E293B" />
              <rect x="20" y="75" width="8" height="45" fill="#1E293B" />
              {/* Head */}
              <circle cx="17" cy="18" r="11" fill="#FBBF24" />
              <circle cx="17" cy="17" r="12" fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.4" />
              {/* Arm holding measuring tape / QC Stamp */}
              <g className="worker-qc-stamp">
                <path d="M 10 42 Q -8 40 -20 30" fill="none" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
                <rect x="-24" y="24" width="8" height="10" rx="2" fill="#22C55E" />
              </g>
            </g>

            {/* Glowing QC PASS Badge */}
            <g transform="translate(755, 160)">
              <rect x="0" y="0" width="70" height="22" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5" />
              <circle cx="10" cy="11" r="4" fill="#22C55E" />
              <text x="18" y="14" fill="#15803D" fontSize="8" fontWeight="800" fontFamily="Space Grotesk, sans-serif">
                QC PASSED ✓
              </text>
            </g>
          </g>

          {/* ============================================================== */}
          {/* STATION 5: FINISHED INVENTORY & RACKS                          */}
          {/* ============================================================== */}
          <g
            className={`station-group ${activeStageId === 'inventory' ? 'active-station' : ''}`}
            onClick={() => handleSelect('inventory')}
            onMouseEnter={() => setHoveredStation('inventory')}
            onMouseLeave={() => setHoveredStation(null)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x="960"
              y="110"
              width="215"
              height="240"
              rx="12"
              fill={activeStageId === 'inventory' ? '#F0FDF4' : hoveredStation === 'inventory' ? '#F8FAFC' : 'transparent'}
              stroke={activeStageId === 'inventory' ? '#22C55E' : hoveredStation === 'inventory' ? '#94A3B8' : '#E2E8F0'}
              strokeWidth={activeStageId === 'inventory' ? '2' : '1'}
              strokeDasharray={activeStageId === 'inventory' ? 'none' : '4 4'}
            />

            {/* Station Badge Header */}
            <g transform="translate(975, 128)">
              <circle cx="8" cy="8" r="5" fill="#22C55E" className="blinking-led" />
              <text x="20" y="12" fill="#0F172A" fontWeight="700" fontSize="12" fontFamily="Space Grotesk, sans-serif">
                05 INVENTORY
              </text>
              <text x="20" y="24" fill="#64748B" fontSize="9" fontFamily="Inter, sans-serif">
                Plus-Size Depot
              </text>
            </g>

            {/* Warehouse Industrial Cantilever Shelving Rack */}
            <g transform="translate(980, 160)">
              {/* Outer frame */}
              <rect x="0" y="0" width="10" height="170" fill="#3B82F6" />
              <rect x="160" y="0" width="10" height="170" fill="#3B82F6" />
              {/* Diagonal bracing */}
              <line x1="0" y1="0" x2="160" y2="55" stroke="#93C5FD" strokeWidth="2" opacity="0.5" />
              <line x1="160" y1="55" x2="0" y2="110" stroke="#93C5FD" strokeWidth="2" opacity="0.5" />
              <line x1="0" y1="110" x2="160" y2="165" stroke="#93C5FD" strokeWidth="2" opacity="0.5" />

              {/* Shelf 1 (Top) */}
              <rect x="0" y="45" width="170" height="6" fill="#CBD5E1" stroke="#475569" strokeWidth="1" />
              {/* Stacks of folded denim jeans size 38 & 40 */}
              <g transform="translate(20, 16)">
                {[0, 6, 12, 18, 24].map((offsetY, idx) => (
                  <rect key={idx} x="0" y={offsetY} width="42" height="5" rx="1.5" fill="#1E3A8A" stroke="#172554" strokeWidth="0.5" />
                ))}
                <text x="12" y="18" fill="#FFFFFF" fontSize="6.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                  SZ 38
                </text>
              </g>
              <g transform="translate(80, 16)">
                {[0, 6, 12, 18].map((offsetY, idx) => (
                  <rect key={idx} x="0" y={offsetY} width="42" height="5" rx="1.5" fill="#1D4ED8" stroke="#172554" strokeWidth="0.5" />
                ))}
                <text x="12" y="16" fill="#FFFFFF" fontSize="6.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                  SZ 40
                </text>
              </g>

              {/* Shelf 2 (Middle) */}
              <rect x="0" y="105" width="170" height="6" fill="#CBD5E1" stroke="#475569" strokeWidth="1" />
              {/* Stacks of jeans size 42 & 44 */}
              <g transform="translate(20, 75)">
                {[0, 6, 12].map((offsetY, idx) => (
                  <rect key={idx} x="0" y={offsetY} width="42" height="5" rx="1.5" fill="#1E3A8A" stroke="#172554" strokeWidth="0.5" />
                ))}
                {/* Low stock tag */}
                <circle cx="50" cy="12" r="4" fill="#EF4444" className="blinking-led" />
                <text x="10" y="14" fill="#FFFFFF" fontSize="6.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                  SZ 42!
                </text>
              </g>
              <g transform="translate(80, 70)">
                {[0, 6, 12, 18, 24].map((offsetY, idx) => (
                  <rect key={idx} x="0" y={offsetY} width="42" height="5" rx="1.5" fill="#2563EB" stroke="#172554" strokeWidth="0.5" />
                ))}
                <text x="12" y="18" fill="#FFFFFF" fontSize="6.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                  SZ 44
                </text>
              </g>

              {/* Shelf 3 (Bottom - Heavy Dispatch Box) */}
              <rect x="0" y="165" width="170" height="6" fill="#CBD5E1" stroke="#475569" strokeWidth="1" />
              {/* Dispatch Corrugated Carton */}
              <g transform="translate(25, 120)">
                <rect x="0" y="0" width="55" height="42" fill="#D97706" stroke="#92400E" strokeWidth="1.5" rx="2" />
                <line x1="0" y1="18" x2="55" y2="18" stroke="#B45309" strokeWidth="1" />
                <rect x="8" y="6" width="22" height="8" fill="#FFFFFF" />
                {/* Barcode representation */}
                <line x1="12" y1="8" x2="12" y2="12" stroke="#000" strokeWidth="1" />
                <line x1="15" y1="8" x2="15" y2="12" stroke="#000" strokeWidth="1.5" />
                <line x1="19" y1="8" x2="19" y2="12" stroke="#000" strokeWidth="1" />
                <line x1="23" y1="8" x2="23" y2="12" stroke="#000" strokeWidth="2" />
              </g>

              {/* Oscillating Barcode Laser Scanner Beam */}
              <g className="barcode-laser-sweep">
                <line x1="110" y1="30" x2="40" y2="75" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                <circle cx="40" cy="75" r="2" fill="#EF4444" />
              </g>
            </g>

            {/* Total Stock Counter Badge */}
            <g transform="translate(1060, 120)">
              <rect x="0" y="0" width="95" height="24" rx="4" fill="#0F172A" />
              <text x="8" y="15" fill="#22C55E" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                STOCK: 160 PCS
              </text>
            </g>
          </g>
        </svg>
      </div>

      <div className="factory-caption-bar">
        <span className="caption-pill">Click any factory workstation above to inspect its live data & connected records</span>
      </div>
    </div>
  );
};
