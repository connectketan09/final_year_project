import { useState } from 'react';
import { Shield, Lock, Mail, User, Building, Phone, CheckCircle, Key, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useERP } from '../context/ERPContext';
import type { UserRole } from '../types';

export function AuthSection() {
  const { currentUser, role, login, logout } = useERP();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupCompany, setSignupCompany] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('owner');
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const demoPresets: {
    role: UserRole;
    name: string;
    company: string;
    email: string;
    badge: string;
    description: string;
  }[] = [
    {
      role: 'owner',
      name: 'Ketan Rajput (Admin)',
      company: 'UID Denims × Parshva Creation',
      email: 'admin@parshvacreation.in',
      badge: '👑 Owner / Super-Admin',
      description: 'Full end-to-end access across costing, BOM, ledgers, P&L statement, and AI assistant.'
    },
    {
      role: 'employee',
      name: 'Suresh More (Supervisor)',
      company: 'UID Denims Unit 4B',
      email: 'supervisor@uidenims.in',
      badge: '🏭 Production Floor Supervisor',
      description: 'Stage transitions, WIP tracking, defect scrap logging, machine speed monitoring.'
    },
    {
      role: 'buyer',
      name: 'Prakash Shah (Buyer)',
      company: 'Ketan Textiles & Menswear (Surat)',
      email: 'buyer@ketantextiles.com',
      badge: '💼 Wholesale B2B Retailer',
      description: 'Restricted B2B Portal: Wholesale catalog, wholesale order placing, ledger statement, UTR upload.'
    },
    {
      role: 'supplier',
      name: 'Arvind Fabric Mills Rep',
      company: 'Arvind Mills Ltd. (Ahmedabad)',
      email: 'orders@arvindmills.com',
      badge: '🧵 Raw Fabric Mill Supplier',
      description: 'Supplier Inward Portal: Lot dispatch, yarn test reports, fabric bill tracking.'
    },
    {
      role: 'dyer_worker',
      name: 'Govind Patel (Wash Master)',
      company: 'Apex Industrial Dyeing & Washing',
      email: 'apexwash@gmail.com',
      badge: '💧 Washing & Dyeing Partner',
      description: 'Contractor portal: Enzyme wash vats, lot recipes, shrinkage audit, job-work billing.'
    }
  ];

  const handleQuickLogin = (preset: typeof demoPresets[0]) => {
    login({
      name: preset.name,
      email: preset.email,
      role: preset.role,
      company: preset.company
    });
    setToastMessage(`Logged in as ${preset.name}! Active role set to ${preset.role.toUpperCase()}`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name: loginEmail.split('@')[0].toUpperCase(),
      email: loginEmail || 'demo@uidenims.in',
      role: 'owner',
      company: 'UID Denims Enterprise'
    });
    setToastMessage(`Authentication successful! Welcome to UID Denims ERP.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name: signupName || 'New User',
      email: signupEmail || 'user@example.com',
      role: signupRole,
      company: signupCompany || 'Partner Enterprise'
    });
    setToastMessage(`Account created for ${signupName}! Logged in as ${signupRole.toUpperCase()}.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section id="auth-demo" className="section-container auth-section-container">
      {/* Editorial Section Header */}
      <div className="section-header-row">
        <div>
          <div className="section-eyebrow">
            <span className="badge-tag">AUTHENTICATION &amp; ACCESS CONTROL</span>
            <span className="badge-sub">Least-Privilege Security</span>
          </div>
          <h2 className="section-title">Login &amp; Sign-Up Demonstration</h2>
          <p className="section-subtitle">
            Test role-based access for business owners, factory floor supervisors, wholesale retail buyers, and job-work washing contractors.
          </p>
        </div>

        {/* Current Active Session Status */}
        {currentUser && (
          <div className="active-session-pill">
            <div className="session-avatar-dot" />
            <div>
              <span className="session-user-name">{currentUser.name}</span>
              <span className="session-user-role">({role.toUpperCase()}) • {currentUser.company}</span>
            </div>
            <button
              className="btn-logout-compact"
              onClick={logout}
              title="End session"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="auth-toast-bar animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Two Column Grid: Left is 1-Click Role Presets, Right is Interactive Form */}
      <div className="auth-station-grid">
        {/* Left Column: Quick Role Presets for Evaluator */}
        <div className="auth-presets-card">
          <div className="presets-card-header">
            <Key className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="presets-title">1-Click Evaluator Roles</h3>
              <p className="presets-desc">Click any role below to instantly load demo credentials and apply access boundaries:</p>
            </div>
          </div>

          <div className="presets-list">
            {demoPresets.map((preset) => {
              const isActive = role === preset.role && currentUser?.role === preset.role;
              return (
                <button
                  key={preset.email}
                  type="button"
                  className={`preset-item-btn ${isActive ? 'is-active-preset' : ''}`}
                  onClick={() => handleQuickLogin(preset)}
                >
                  <div className="preset-item-top">
                    <span className="preset-badge">{preset.badge}</span>
                    {isActive && <span className="active-tag-pill">ACTIVE SESSION</span>}
                  </div>
                  <span className="preset-name">{preset.name}</span>
                  <span className="preset-company">{preset.company}</span>
                  <p className="preset-permissions">{preset.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Login / Sign-Up Form Card */}
        <div className="auth-form-card">
          {/* Card Top Tabs */}
          <div className="auth-card-tabs">
            <button
              type="button"
              className={`auth-card-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Sign In to Platform
            </button>
            <button
              type="button"
              className={`auth-card-tab ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Register New Account
            </button>
          </div>

          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="auth-card-form">
              <div className="form-info-callout">
                <Shield className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                <span>Simulated authentication protecting financial ledgers &amp; confidential article BOM calculations.</span>
              </div>

              <div className="auth-field-group">
                <label className="auth-label">Business Email or Terminal ID</label>
                <div className="auth-input-wrapper">
                  <Mail className="auth-input-icon" />
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="admin@parshvacreation.in"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-field-group">
                <div className="auth-label-row">
                  <label className="auth-label">Password</label>
                  <button
                    type="button"
                    className="auth-forgot-link"
                    onClick={() => setLoginPassword('uid2026demo')}
                  >
                    Autofill Demo Password
                  </button>
                </div>
                <div className="auth-input-wrapper">
                  <Lock className="auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>
              </div>

              <div className="auth-form-options">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Keep session active across factory tablets</span>
                </label>
              </div>

              <button type="submit" className="auth-primary-submit">
                <span>Authorize &amp; Sign In</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="auth-card-form">
              <div className="form-info-callout">
                <User className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                <span>Create a verified enterprise profile to access wholesale buying or job-work orders.</span>
              </div>

              <div className="auth-field-group">
                <label className="auth-label">Full Name</label>
                <div className="auth-input-wrapper">
                  <User className="auth-input-icon" />
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="e.g. Ketan Rajput"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-field-group">
                <label className="auth-label">Firm / Business Trade Name</label>
                <div className="auth-input-wrapper">
                  <Building className="auth-input-icon" />
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="e.g. Ketan Wholesale Menswear"
                    value={signupCompany}
                    onChange={(e) => setSignupCompany(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-grid-2col">
                <div className="auth-field-group">
                  <label className="auth-label">Email</label>
                  <div className="auth-input-wrapper">
                    <Mail className="auth-input-icon" />
                    <input
                      type="email"
                      className="auth-input"
                      placeholder="buyer@domain.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="auth-field-group">
                  <label className="auth-label">WhatsApp Contact</label>
                  <div className="auth-input-wrapper">
                    <Phone className="auth-input-icon" />
                    <input
                      type="tel"
                      className="auth-input"
                      placeholder="+91 98765 43210"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="auth-field-group">
                <label className="auth-label">Business Operational Role</label>
                <select
                  className="auth-select"
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value as UserRole)}
                >
                  <option value="owner">Business Owner / Partner (Full Admin)</option>
                  <option value="buyer">Wholesale B2B Retailer / Buyer</option>
                  <option value="supplier">Mill Fabric Supplier</option>
                  <option value="employee">Production Floor Supervisor</option>
                  <option value="dyer_worker">Dyeing &amp; Wash Contractor</option>
                </select>
              </div>

              <button type="submit" className="auth-primary-submit">
                <span>Create Account &amp; Log In</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
