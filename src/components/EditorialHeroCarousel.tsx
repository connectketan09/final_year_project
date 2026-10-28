import { useState, useEffect } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Play, Sparkles } from 'lucide-react';
import { useERP } from '../context/ERPContext';

export function EditorialHeroCarousel() {
  const { openAuthModal } = useERP();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const totalSlides = 3;

  // Optional subtle auto-rotation (can be paused or manually controlled)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 7000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="editorial-carousel-wrapper">
      {/* Slide 1: Denim Production (Direct adaptation of Reference Image 1) */}
      {currentSlide === 0 && (
        <div className="editorial-slide slide-1 animate-fade-in">
          <div className="slide-content-stage">
            {/* SVG Vector Factory Illustration Matching Image 1 */}
            <svg
              viewBox="0 0 1100 480"
              className="editorial-svg-scene"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Illustration of denim production with worker carrying denim batting and spinning machine"
            >
              <defs>
                {/* Clean Flat Colors Matching Reference */}
                <pattern id="curlyCotton" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 5 10 Q 10 5 15 10 Q 20 15 15 20 Q 10 15 5 10" fill="none" stroke="#64748B" strokeWidth="0.8" opacity="0.4" />
                </pattern>
              </defs>

              {/* Floor Baseline */}
              <line x1="20" y1="410" x2="1080" y2="410" stroke="#CBD5E1" strokeWidth="1.5" />

              {/* ---------------------------------------------------- */}
              {/* MACHINE 1 (LEFT): Denim Intake & Carding Machine    */}
              {/* ---------------------------------------------------- */}
              <g id="intake-machine" transform="translate(60, 180)">
                {/* Back Plate & Machine Uprights */}
                <rect x="25" y="0" width="10" height="150" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.5" />
                <rect x="245" y="0" width="10" height="150" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.5" />

                {/* Top Fluffy Material Hopper */}
                <path
                  d="M 35 40 Q 50 30 65 38 Q 80 25 95 38 Q 110 25 125 38 Q 140 25 155 38 Q 170 25 185 38 Q 200 25 215 38 Q 230 25 245 40 L 245 50 L 35 50 Z"
                  fill="#F8FAFC"
                  stroke="#1E293B"
                  strokeWidth="2"
                />

                {/* Main Machine Housing Box (Mint Green) */}
                <rect x="15" y="45" width="250" height="65" rx="4" fill="#34B779" stroke="#1E293B" strokeWidth="2.5" />
                {/* Side highlight panels */}
                <rect x="0" y="45" width="15" height="65" rx="3" fill="#2E9E68" stroke="#1E293B" strokeWidth="2.5" />
                <rect x="265" y="45" width="15" height="65" rx="3" fill="#2E9E68" stroke="#1E293B" strokeWidth="2.5" />
                <line x1="15" y1="45" x2="15" y2="110" stroke="#1E293B" strokeWidth="2.5" />
                <line x1="265" y1="45" x2="265" y2="110" stroke="#1E293B" strokeWidth="2.5" />

                {/* Bottom Roller with fluffy marks */}
                <g transform="translate(25, 120)">
                  <rect x="15" y="0" width="200" height="55" rx="27.5" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2.5" />
                  {/* Texture loops */}
                  <path d="M 50 15 Q 55 10 60 15 Q 65 20 60 25" fill="none" stroke="#64748B" strokeWidth="1.5" />
                  <path d="M 90 30 Q 95 25 100 30 Q 105 35 100 40" fill="none" stroke="#64748B" strokeWidth="1.5" />
                  <path d="M 140 18 Q 145 13 150 18" fill="none" stroke="#64748B" strokeWidth="1.5" />
                  <path d="M 175 32 Q 180 27 185 32" fill="none" stroke="#64748B" strokeWidth="1.5" />

                  {/* Left & Right Hubs */}
                  <rect x="0" y="22" width="15" height="12" fill="#1E293B" rx="2" />
                  <rect x="215" y="22" width="15" height="12" fill="#1E293B" rx="2" />
                  {/* Vertical bracket legs */}
                  <line x1="8" y1="10" x2="8" y2="45" stroke="#1E293B" strokeWidth="4" />
                  <line x1="222" y1="10" x2="222" y2="45" stroke="#1E293B" strokeWidth="4" />
                  {/* Wheel bases */}
                  <circle cx="8" cy="46" r="5" fill="#1E293B" />
                  <circle cx="222" cy="46" r="5" fill="#1E293B" />
                </g>

                {/* Legs down to floor */}
                <rect x="28" y="110" width="6" height="115" fill="#1E293B" />
                <rect x="246" y="110" width="6" height="115" fill="#1E293B" />
                <circle cx="31" cy="225" r="7" fill="#1E293B" />
                <circle cx="249" cy="225" r="7" fill="#1E293B" />
              </g>

              {/* ---------------------------------------------------- */}
              {/* CHARACTER 1 (CENTER): Male Worker Carrying Batting   */}
              {/* ---------------------------------------------------- */}
              <g id="worker-carrier" transform="translate(370, 100)">
                {/* Legs (walking pose) */}
                {/* Right Leg (forward) */}
                <polygon points="120,240 100,320 80,320 100,240" fill="#34B779" stroke="#1E293B" strokeWidth="2.5" />
                <polygon points="78,320 102,320 104,332 60,332" fill="#1E293B" />

                {/* Left Leg (backward) */}
                <polygon points="135,240 165,315 145,315 115,240" fill="#34B779" stroke="#1E293B" strokeWidth="2.5" />
                <polygon points="143,315 168,315 174,330 135,330" fill="#1E293B" />

                {/* Torso & Green Sleeves */}
                <path d="M 105,80 L 140,80 L 150,160 L 95,160 Z" fill="#34B779" stroke="#1E293B" strokeWidth="2.5" />

                {/* Apron Over Torso */}
                <path d="M 112,85 L 138,85 L 145,240 L 95,240 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                {/* Apron Straps */}
                <line x1="116" y1="85" x2="116" y2="60" stroke="#1E293B" strokeWidth="2.5" />
                <line x1="134" y1="85" x2="134" y2="60" stroke="#1E293B" strokeWidth="2.5" />

                {/* Head, Face & Cap */}
                <circle cx="125" cy="50" r="18" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                {/* Cap */}
                <path d="M 107,45 Q 125,28 143,45 L 140,50 L 110,50 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                {/* Smile / Features */}
                <path d="M 125,48 Q 130,52 133,48" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
                <circle cx="128" cy="44" r="1.5" fill="#1E293B" />
                {/* Ear */}
                <circle cx="114" cy="50" r="3.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />

                {/* Big White Cotton/Denim Batting Block Held in Arms */}
                <g transform="translate(10, 85) rotate(-22)">
                  <rect x="0" y="0" width="180" height="90" rx="22" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                  {/* Subtle curly texture marks */}
                  <path d="M 25 30 Q 30 25 35 30" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 65 60 Q 70 55 75 60" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 105 25 Q 110 20 115 25" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 135 65 Q 140 60 145 65" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 70 25 Q 75 20 80 25" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Arms Wrapping the block */}
                <path d="M 98,105 Q 105,170 120,180" fill="none" stroke="#34B779" strokeWidth="16" strokeLinecap="round" />
                <path d="M 98,105 Q 105,170 120,180" fill="none" stroke="#1E293B" strokeWidth="2.5" />
                <circle cx="120" cy="180" r="7" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
              </g>

              {/* ---------------------------------------------------- */}
              {/* MACHINE 2 (RIGHT): 4-Can Multi-Spool Spinning Unit   */}
              {/* ---------------------------------------------------- */}
              <g id="spinning-machine" transform="translate(560, 85)">
                {/* Base Platform */}
                <rect x="0" y="270" width="360" height="40" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2.5" />
                <rect x="25" y="255" width="310" height="15" fill="#94A3B8" stroke="#1E293B" strokeWidth="2" />

                {/* Back Machine Housing Frame */}
                <rect x="20" y="70" width="320" height="185" fill="#F1F5F9" stroke="#1E293B" strokeWidth="2.5" />

                {/* 4 Green Upper Compartment Modules */}
                <rect x="35" y="115" width="60" height="45" rx="3" fill="#34B779" stroke="#1E293B" strokeWidth="2" />
                <rect x="110" y="115" width="60" height="45" rx="3" fill="#34B779" stroke="#1E293B" strokeWidth="2" />
                <rect x="185" y="115" width="60" height="45" rx="3" fill="#34B779" stroke="#1E293B" strokeWidth="2" />
                <rect x="260" y="115" width="60" height="45" rx="3" fill="#34B779" stroke="#1E293B" strokeWidth="2" />

                {/* Digital / Valve meters on green boxes */}
                <rect x="52" y="125" width="26" height="14" fill="#93C5FD" stroke="#1E293B" strokeWidth="1.5" />
                <rect x="127" y="125" width="26" height="14" fill="#93C5FD" stroke="#1E293B" strokeWidth="1.5" />
                <rect x="202" y="125" width="26" height="14" fill="#93C5FD" stroke="#1E293B" strokeWidth="1.5" />
                <rect x="277" y="125" width="26" height="14" fill="#93C5FD" stroke="#1E293B" strokeWidth="1.5" />

                {/* Dark Mid Horizontal Dividing Bar */}
                <rect x="20" y="65" width="320" height="50" fill="#1E293B" />
                {/* 4 Upper Rectangular Blocks in dark bar */}
                <rect x="45" y="75" width="40" height="30" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.5" rx="2" />
                <rect x="120" y="75" width="40" height="30" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.5" rx="2" />
                <rect x="195" y="75" width="40" height="30" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.5" rx="2" />
                <rect x="270" y="75" width="40" height="30" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.5" rx="2" />

                {/* Top Green Accent Bar */}
                <rect x="10" y="45" width="340" height="20" fill="#34B779" stroke="#1E293B" strokeWidth="2.5" />

                {/* Top Thread Spindles (6 Curved Holders) */}
                <line x1="20" y1="12" x2="340" y2="12" stroke="#1E293B" strokeWidth="2.5" />
                {/* Spools */}
                <path d="M 25,45 Q 25,12 40,12 Q 55,12 55,45 Z" fill="none" stroke="#1E293B" strokeWidth="2.5" />
                <path d="M 75,45 Q 75,12 90,12 Q 105,12 105,45 Z" fill="none" stroke="#1E293B" strokeWidth="2.5" />
                <path d="M 125,45 Q 125,12 140,12 Q 155,12 155,45 Z" fill="none" stroke="#1E293B" strokeWidth="2.5" />
                <path d="M 175,45 Q 175,12 190,12 Q 205,12 205,45 Z" fill="none" stroke="#1E293B" strokeWidth="2.5" />
                <path d="M 225,45 Q 225,12 240,12 Q 255,12 255,45 Z" fill="none" stroke="#1E293B" strokeWidth="2.5" />
                <path d="M 275,45 Q 275,12 290,12 Q 305,12 305,45 Z" fill="none" stroke="#1E293B" strokeWidth="2.5" />
                <path d="M 315,45 Q 315,12 330,12 Q 345,12 345,45 Z" fill="none" stroke="#1E293B" strokeWidth="2.5" />

                {/* Vertical threads dropping down */}
                <line x1="90" y1="12" x2="90" y2="75" stroke="#1E293B" strokeWidth="1" />
                <line x1="140" y1="12" x2="140" y2="75" stroke="#1E293B" strokeWidth="1" />
                <line x1="190" y1="12" x2="190" y2="75" stroke="#1E293B" strokeWidth="1" />
                <line x1="240" y1="12" x2="240" y2="75" stroke="#1E293B" strokeWidth="1" />
                <line x1="290" y1="12" x2="290" y2="75" stroke="#1E293B" strokeWidth="1" />

                {/* 4 Bottom White Collection Cans */}
                {/* Can 1 */}
                <rect x="35" y="180" width="60" height="75" rx="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                <line x1="35" y1="210" x2="95" y2="210" stroke="#CBD5E1" strokeWidth="1.5" />
                {/* Feeder tube 1 */}
                <path d="M 65 160 Q 65 175 75 180" fill="none" stroke="#1E293B" strokeWidth="3" />

                {/* Can 2 */}
                <rect x="110" y="180" width="60" height="75" rx="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                <line x1="110" y1="210" x2="170" y2="210" stroke="#CBD5E1" strokeWidth="1.5" />
                {/* Feeder tube 2 */}
                <path d="M 140 160 Q 140 175 150 180" fill="none" stroke="#1E293B" strokeWidth="3" />

                {/* Can 3 */}
                <rect x="185" y="180" width="60" height="75" rx="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                <line x1="185" y1="210" x2="245" y2="210" stroke="#CBD5E1" strokeWidth="1.5" />
                {/* Feeder tube 3 */}
                <path d="M 215 160 Q 215 175 225 180" fill="none" stroke="#1E293B" strokeWidth="3" />

                {/* Can 4 */}
                <rect x="260" y="180" width="60" height="75" rx="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                <line x1="260" y1="210" x2="320" y2="210" stroke="#CBD5E1" strokeWidth="1.5" />
                {/* Feeder tube 4 */}
                <path d="M 290 160 Q 290 175 300 180" fill="none" stroke="#1E293B" strokeWidth="3" />
              </g>

              {/* ---------------------------------------------------- */}
              {/* CHARACTER 2 (RIGHT): Female Worker Reaching Up      */}
              {/* ---------------------------------------------------- */}
              <g id="worker-operator" transform="translate(900, 140)">
                {/* Legs */}
                <polygon points="40,240 35,310 45,310 50,240" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />
                <polygon points="55,240 65,310 75,310 65,240" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />
                {/* Shoes */}
                <polygon points="25,310 47,310 48,318 20,318" fill="#1E293B" />
                <polygon points="62,310 82,310 85,318 58,318" fill="#1E293B" />

                {/* White Apron Dress */}
                <path d="M 38,60 L 65,60 L 78,240 L 25,240 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />

                {/* Head, Face & Cap */}
                <circle cx="50" cy="30" r="15" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                {/* Cap */}
                <path d="M 35,26 Q 50,14 65,26 L 62,30 L 38,30 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                {/* Face outline / eye */}
                <circle cx="45" cy="28" r="1.5" fill="#1E293B" />
                <path d="M 40,34 Q 45,38 48,35" fill="none" stroke="#1E293B" strokeWidth="1.5" />

                {/* Left Arm reaching up to machine spool */}
                <path d="M 42,65 Q 25,20 -5,8" fill="none" stroke="#34B779" strokeWidth="14" strokeLinecap="round" />
                <path d="M 42,65 Q 25,20 -5,8" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
                <circle cx="-5" cy="8" r="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />

                {/* Right Arm guiding thread */}
                <path d="M 55,68 Q 20,40 -2,45" fill="none" stroke="#34B779" strokeWidth="14" strokeLinecap="round" />
                <path d="M 55,68 Q 20,40 -2,45" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
                <circle cx="-2" cy="45" r="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
              </g>
            </svg>
          </div>

          {/* Bottom Editorial Caption Bar (Exactly as in Reference Image 1) */}
          <div className="editorial-bottom-bar">
            <button
              className="editorial-learn-btn"
              onClick={() => scrollToSection('about')}
              title="Learn more about UID Denims"
            >
              <ArrowDown className="w-4 h-4 mr-1.5" />
              <span>LEARN MORE</span>
            </button>

            <h2 className="editorial-main-title">
              Denim production
            </h2>

            <div className="editorial-nav-controls">
              <button
                className="carousel-btn prev-btn"
                onClick={handlePrev}
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span>PREV</span>
              </button>
              <button
                className="carousel-btn next-btn"
                onClick={handleNext}
                aria-label="Next slide"
              >
                <span>NEXT</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide 2: Denim Industry (Direct adaptation of Reference Image 2) */}
      {currentSlide === 1 && (
        <div className="editorial-slide slide-2 animate-fade-in">
          <div className="slide-content-stage grid-layout-slide2">
            {/* Left Hero Column: Play button, ruler line, huge typography, pill button */}
            <div className="slide2-left-column">
              <div className="play-line-wrapper">
                <button
                  className="editorial-play-btn"
                  onClick={() => scrollToSection('workflow-demo')}
                  title="Watch Workflow Demo at bottom"
                >
                  <Play className="w-6 h-6 fill-black text-black ml-0.5" />
                </button>
                <div className="editorial-vertical-line" />
              </div>

              <div className="slide2-text-group">
                <h1 className="editorial-huge-headline">
                  Denim<br />
                  Industry
                </h1>
                <p className="editorial-sub-lead">
                  Modern plus-size denim manufacturing engineered from fabric roll to audited B2B delivery.
                </p>
                <button
                  className="editorial-pill-btn"
                  onClick={() => scrollToSection('about')}
                >
                  LEARN MORE
                </button>
              </div>
            </div>

            {/* Right Hero Column: Worker carrying bolt + large green rolling machine (Image 2) */}
            <div className="slide2-illustration-container">
              <svg
                viewBox="0 0 760 480"
                className="editorial-svg-scene"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Illustration of denim worker carrying selvedge roll and industrial rolling inspection machine"
              >
                {/* Floor Baseline */}
                <line x1="20" y1="410" x2="740" y2="410" stroke="#CBD5E1" strokeWidth="1.5" />

                {/* ---------------------------------------------------- */}
                {/* WORKER 1 (LEFT): Male Worker Carrying Denim Roll     */}
                {/* ---------------------------------------------------- */}
                <g id="worker-roller" transform="translate(60, 110)">
                  {/* Legs (walking pose) */}
                  <polygon points="110,230 85,310 65,310 90,230" fill="#34B779" stroke="#1E293B" strokeWidth="2.5" />
                  <polygon points="63,310 88,310 88,322 45,322" fill="#1E293B" />

                  <polygon points="125,230 160,310 140,310 105,230" fill="#34B779" stroke="#1E293B" strokeWidth="2.5" />
                  <polygon points="138,310 165,310 170,322 130,322" fill="#1E293B" />

                  {/* Body & Apron */}
                  <path d="M 98,75 L 132,75 L 140,230 L 90,230 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                  {/* Green collar */}
                  <polygon points="110,75 120,95 130,75" fill="#34B779" stroke="#1E293B" strokeWidth="1.5" />

                  {/* Head */}
                  <circle cx="118" cy="45" r="16" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                  <path d="M 104,40 Q 118,25 132,40 L 130,45 L 106,45 Z" fill="#1E293B" />
                  <circle cx="123" cy="42" r="1.5" fill="#1E293B" />
                  <path d="M 120,48 Q 124,52 127,49" fill="none" stroke="#1E293B" strokeWidth="1.5" />

                  {/* Rolled Denim Bolt Held Horizontally */}
                  <g transform="translate(15, 120)">
                    <rect x="0" y="0" width="180" height="42" rx="2" fill="#34B779" stroke="#1E293B" strokeWidth="2.5" />
                    {/* Metal cap left */}
                    <ellipse cx="6" cy="21" rx="6" ry="21" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.5" />
                    {/* Metal cap right */}
                    <ellipse cx="180" cy="21" rx="6" ry="21" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.5" />
                  </g>

                  {/* Arms holding the roll */}
                  <path d="M 92,95 Q 85,140 100,150" fill="none" stroke="#34B779" strokeWidth="14" strokeLinecap="round" />
                  <path d="M 92,95 Q 85,140 100,150" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="100" cy="150" r="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
                </g>

                {/* ---------------------------------------------------- */}
                {/* MACHINE (RIGHT): Large Green Rolling & Winding Machine*/}
                {/* ---------------------------------------------------- */}
                <g id="rolling-machine" transform="translate(320, 150)">
                  {/* Left Side Console Body (Dark Charcoal) */}
                  <path
                    d="M 20,40 L 45,40 L 85,85 L 85,260 L 0,260 L 0,85 Z"
                    fill="#334155"
                    stroke="#1E293B"
                    strokeWidth="2.5"
                  />
                  {/* Console Controls / Dials */}
                  <g transform="translate(12, 160)">
                    <rect x="0" y="0" width="30" height="50" rx="3" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.5" />
                    <circle cx="15" cy="12" r="4" fill="#34B779" />
                    <circle cx="15" cy="25" r="4" fill="#94A3B8" />
                    <circle cx="15" cy="38" r="4" fill="#94A3B8" />
                  </g>
                  {/* Base support bars */}
                  <rect x="85" y="240" width="310" height="20" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2" />
                  <rect x="95" y="245" width="20" height="15" fill="#334155" />
                  <rect x="118" y="245" width="12" height="15" fill="#1E293B" />

                  {/* Big Green Denim Sheet (Curved 3D cloth roll) */}
                  <path
                    d="M 45,40 L 320,40 L 340,240 L 85,240 Z"
                    fill="#34B779"
                    stroke="#1E293B"
                    strokeWidth="2.5"
                  />
                  {/* Fabric Top Roll Lip */}
                  <path d="M 40,40 Q 180,28 320,40" fill="none" stroke="#25A26B" strokeWidth="4" />

                  {/* Horizontal Metal Inspection Bar */}
                  <line x1="85" y1="120" x2="330" y2="120" stroke="#E2E8F0" strokeWidth="4" />
                  <circle cx="85" cy="120" r="5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />

                  {/* Lower Guide Roller */}
                  <rect x="75" y="160" width="12" height="20" rx="4" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2" />
                  <line x1="87" y1="170" x2="335" y2="170" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />

                  {/* Female Worker on Right smoothing the cloth */}
                  <g transform="translate(290, -10)">
                    {/* Legs */}
                    <line x1="70" y1="210" x2="70" y2="270" stroke="#1E293B" strokeWidth="2.5" />
                    <line x1="85" y1="210" x2="85" y2="270" stroke="#1E293B" strokeWidth="2.5" />
                    {/* Shoes */}
                    <polygon points="55,270 73,270 74,278 50,278" fill="#1E293B" />
                    <polygon points="75,270 93,270 95,278 70,278" fill="#1E293B" />

                    {/* White dress */}
                    <path d="M 55,60 L 80,60 L 95,210 L 40,210 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />

                    {/* Head & Hat */}
                    <circle cx="65" cy="30" r="16" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                    <path d="M 48,25 Q 65,12 82,25 L 80,30 L 50,30 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
                    <circle cx="58" cy="28" r="1.5" fill="#1E293B" />

                    {/* Green Sleeve & Arm reaching out to smooth fabric */}
                    <path d="M 52,65 Q 20,70 -35,70" fill="none" stroke="#34B779" strokeWidth="14" strokeLinecap="round" />
                    <path d="M 52,65 Q 20,70 -35,70" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="-35" cy="70" r="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />

                    {/* Second hand resting on guide bar */}
                    <path d="M 60,75 Q 30,105 5,115" fill="none" stroke="#34B779" strokeWidth="14" strokeLinecap="round" />
                    <path d="M 60,75 Q 30,105 5,115" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="5" cy="115" r="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
                  </g>
                </g>
              </svg>
            </div>
          </div>

          {/* Bottom Pagination Dots & Next/Prev Controls */}
          <div className="editorial-bottom-bar slide2-bottom-bar">
            <div className="carousel-dots-group">
              <button
                className="dot-indicator"
                onClick={() => setCurrentSlide(0)}
                aria-label="Slide 1"
              />
              <button
                className="dot-indicator active"
                onClick={() => setCurrentSlide(1)}
                aria-label="Slide 2"
              />
              <button
                className="dot-indicator"
                onClick={() => setCurrentSlide(2)}
                aria-label="Slide 3"
              />
            </div>

            <div className="editorial-nav-controls">
              <button
                className="carousel-btn prev-btn"
                onClick={handlePrev}
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span>PREV</span>
              </button>
              <button
                className="carousel-btn next-btn"
                onClick={handleNext}
                aria-label="Next slide"
              >
                <span>NEXT</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide 3: Plus-Size Fit & Grading (Engineering Focus) */}
      {currentSlide === 2 && (
        <div className="editorial-slide slide-3 animate-fade-in">
          <div className="slide-content-stage grid-layout-slide2">
            <div className="slide2-left-column">
              <div className="play-line-wrapper">
                <button
                  className="editorial-play-btn"
                  onClick={() => openAuthModal('login')}
                  title="Open Demo Login"
                >
                  <Sparkles className="w-6 h-6 text-emerald-600 ml-0.5" />
                </button>
                <div className="editorial-vertical-line" />
              </div>

              <div className="slide2-text-group">
                <span className="slide-tag-eyebrow">WAIST 38" TO 54" PLUS-SIZE APPAREL</span>
                <h1 className="editorial-huge-headline">
                  Precision<br />
                  Grading
                </h1>
                <p className="editorial-sub-lead">
                  Automated denim shrinkage compensation and nesting algorithms cutting fabric scrap below 0.8%.
                </p>
                <div className="slide-btn-row">
                  <button
                    className="editorial-pill-btn"
                    onClick={() => scrollToSection('workflow-demo')}
                  >
                    TEST WORKFLOW DEMO
                  </button>
                  <button
                    className="editorial-ghost-btn"
                    onClick={() => openAuthModal('login')}
                  >
                    LOGIN TO DEMO
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Technical CAD Table & Worker Vector */}
            <div className="slide2-illustration-container">
              <svg
                viewBox="0 0 760 480"
                className="editorial-svg-scene"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Plus-size denim pattern cutting table and precision grading tools"
              >
                <line x1="20" y1="410" x2="740" y2="410" stroke="#CBD5E1" strokeWidth="1.5" />

                {/* Laser CAD Cutting Table */}
                <g transform="translate(100, 180)">
                  {/* Table Surface */}
                  <rect x="0" y="70" width="520" height="24" rx="4" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2.5" />
                  <rect x="40" y="94" width="16" height="135" fill="#334155" />
                  <rect x="460" y="94" width="16" height="135" fill="#334155" />
                  <rect x="250" y="94" width="16" height="135" fill="#475569" />

                  {/* Denim Fabric Layer on Table */}
                  <rect x="30" y="55" width="450" height="15" rx="3" fill="#34B779" stroke="#1E293B" strokeWidth="2" />

                  {/* Pattern markers on the cutting bed */}
                  <g transform="translate(60, 10)">
                    <rect x="0" y="0" width="100" height="42" rx="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="3 3" />
                    <text x="12" y="24" fill="#0F172A" fontSize="12" fontWeight="700" fontFamily="Space Grotesk, sans-serif">WAIST 42"</text>
                  </g>

                  <g transform="translate(180, 5)">
                    <rect x="0" y="0" width="120" height="48" rx="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="3 3" />
                    <text x="14" y="26" fill="#0F172A" fontSize="12" fontWeight="700" fontFamily="Space Grotesk, sans-serif">WAIST 46"</text>
                  </g>

                  <g transform="translate(320, 0)">
                    <rect x="0" y="0" width="130" height="52" rx="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="3 3" />
                    <text x="15" y="28" fill="#0F172A" fontSize="12" fontWeight="700" fontFamily="Space Grotesk, sans-serif">WAIST 50"</text>
                  </g>

                  {/* Automated Overhead Laser Cutter Bridge */}
                  <line x1="20" y1="-30" x2="490" y2="-30" stroke="#1E293B" strokeWidth="4" />
                  <g transform="translate(230, -35)">
                    <rect x="0" y="0" width="30" height="20" rx="3" fill="#1E293B" />
                    <line x1="15" y1="20" x2="15" y2="85" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2 2" />
                    <circle cx="15" cy="85" r="3" fill="#EF4444" />
                  </g>
                </g>

                {/* Master Cutter Character on Right */}
                <g transform="translate(560, 130)">
                  <polygon points="50,220 40,280 50,280 60,220" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />
                  <polygon points="65,220 75,280 85,280 75,220" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />
                  <polygon points="30,280 52,280 53,288 25,288" fill="#1E293B" />
                  <polygon points="65,280 87,280 88,288 60,288" fill="#1E293B" />

                  <path d="M 45,55 L 75,55 L 82,220 L 35,220 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                  <circle cx="60" cy="25" r="16" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                  <path d="M 45,22 Q 60,8 75,22 L 72,26 L 47,26 Z" fill="#1E293B" />
                  <circle cx="55" cy="23" r="1.5" fill="#1E293B" />

                  {/* Arm holding tablet */}
                  <path d="M 50,60 Q 20,70 -15,85" fill="none" stroke="#34B779" strokeWidth="14" strokeLinecap="round" />
                  <path d="M 50,60 Q 20,70 -15,85" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
                  {/* Tablet */}
                  <rect x="-35" y="70" width="30" height="40" rx="3" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
                  <rect x="-32" y="74" width="24" height="32" rx="2" fill="#34B779" />
                </g>
              </svg>
            </div>
          </div>

          <div className="editorial-bottom-bar slide2-bottom-bar">
            <div className="carousel-dots-group">
              <button
                className="dot-indicator"
                onClick={() => setCurrentSlide(0)}
                aria-label="Slide 1"
              />
              <button
                className="dot-indicator"
                onClick={() => setCurrentSlide(1)}
                aria-label="Slide 2"
              />
              <button
                className="dot-indicator active"
                onClick={() => setCurrentSlide(2)}
                aria-label="Slide 3"
              />
            </div>

            <div className="editorial-nav-controls">
              <button
                className="carousel-btn prev-btn"
                onClick={handlePrev}
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span>PREV</span>
              </button>
              <button
                className="carousel-btn next-btn"
                onClick={handleNext}
                aria-label="Next slide"
              >
                <span>NEXT</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
