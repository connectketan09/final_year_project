import { useERP } from '../context/ERPContext';
import { Sparkles, ShieldCheck, Award, Building, BookOpen } from 'lucide-react';

export const Footer = () => {
  const { setGuidedDemoOpen } = useERP();

  return (
    <footer className="footer-container">
      <div className="footer-top-grid">
        {/* Col 1: Project Identity */}
        <div className="footer-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="brand-mark-box w-7 h-7 text-xs">
              <span className="brand-mark-u">UID</span>
            </div>
            <span className="font-bold text-slate-900 tracking-wider">UID DENIMS ERP</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            An AI-Enabled Business Operating Platform connecting every stage of denim apparel manufacturing from fabric purchase to profit and loss.
          </p>
          <div className="text-[11px] font-mono text-slate-500">
            Industrial Prototype v1.0 • Final-Year Diploma Project
          </div>
        </div>

        {/* Col 2: Academic Affiliation */}
        <div className="footer-col">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Award className="w-4 h-4 text-blue-700" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Institution & Affiliation</h4>
          </div>
          <p className="text-xs font-semibold text-slate-800">Vidyalankar Polytechnic, Mumbai</p>
          <p className="text-xs text-slate-600">Department of Computer Engineering</p>
          <p className="text-xs text-slate-600">Maharashtra State Board of Technical Education (MSBTE)</p>
          <p className="text-xs text-slate-500 mt-1 font-mono">Academic Year: 2026 – 2027</p>
        </div>

        {/* Col 3: Student Development Team */}
        <div className="footer-col">
          <div className="flex items-center gap-1.5 mb-2.5">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Project Team (Students)</h4>
          </div>
          <ul className="text-xs space-y-1 font-mono text-slate-700">
            <li>• 24203B0059 – Ketan Rajput</li>
            <li>• 24203B0053 – Smaran Jage</li>
            <li>• 25203B1003 – Yash Pawar</li>
            <li>• 24203B0031 – Varun Shripati</li>
          </ul>
        </div>

        {/* Col 4: Industry Collaboration */}
        <div className="footer-col">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Building className="w-4 h-4 text-purple-700" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Industry Collaboration</h4>
          </div>
          <p className="text-xs font-semibold text-slate-800">UID Denims</p>
          <p className="text-xs text-slate-600">Men's Plus-Size Denim Apparel Specialist</p>
          <p className="text-xs text-slate-600 mt-1">In association with:</p>
          <p className="text-xs font-semibold text-slate-800">UID Tech by Parshva Creation</p>
          <button
            onClick={() => setGuidedDemoOpen(true)}
            className="btn-outline-compact mt-3 text-xs w-full justify-center"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch 2-Min Mentor Walkthrough</span>
          </button>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="text-[11px] text-slate-500">
          © 2026–2027 Vidyalankar Polytechnic • MSBTE Final Year Diploma Capstone Project.
        </div>
        <div className="text-[11px] text-slate-500 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>Educational Interactive Prototype • Illustrative Sample Records</span>
        </div>
      </div>
    </footer>
  );
};
