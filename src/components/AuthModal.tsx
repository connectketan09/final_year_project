import { useState } from 'react';
import { X, Lock, Mail, Building, User, Phone, CheckCircle, Shield, Eye, EyeOff } from 'lucide-react';
import { useERP } from '../context/ERPContext';
import type { UserRole } from '../types';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMode, setAuthModalMode, login } = useERP();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState<UserRole>('owner');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  // Pre-configured Quick Demo Credentials for Mentors & Evaluators
  const demoAccounts: {
    label: string;
    role: UserRole;
    name: string;
    company: string;
    email: string;
    icon: string;
    desc: string;
  }[] = [
    {
      label: '👑 Parshva Creation (Owner / Admin)',
      role: 'owner',
      name: 'Ketan Rajput (Admin)',
      company: 'UID Denims × Parshva Creation',
      email: 'admin@parshvacreation.in',
      icon: '👑',
      desc: 'Unrestricted full visibility: Costing BOM, Ledgers, P&L audit, and AI assistant.'
    },
    {
      label: '🏭 Unit 4B Floor Supervisor',
      role: 'employee',
      name: 'Suresh More (Floor Supervisor)',
      company: 'UID Denims Factory Unit 4B',
      email: 'supervisor@uidenims.in',
      icon: '🏭',
      desc: 'Operational floor view: WIP batches, stage transitions, machine RPM & QC checks.'
    },
    {
      label: '💼 Wholesale Retailer / Buyer',
      role: 'buyer',
      name: 'Prakash Shah (Wholesale Buyer)',
      company: 'Ketan Textiles & Menswear (Surat)',
      email: 'buyer@ketantextiles.com',
      icon: '💼',
      desc: 'B2B portal: Catalog, orders, invoices, statement downloads & payment proof upload.'
    },
    {
      label: '🧵 Master Tailor / Contractor',
      role: 'employee',
      name: 'Rafiq Ansari (Stitching Master)',
      company: 'Master Rafiq Jobwork Unit',
      email: 'stitching@rafiqjobwork.in',
      icon: '🧵',
      desc: 'Floor operations: Piece-rate work orders, bundle tracking, defect logs.'
    },
    {
      label: '💧 Dyeing & Wash Job-Worker',
      role: 'dyer_worker',
      name: 'Govind Patel (Washing Master)',
      company: 'Apex Industrial Dyeing & Washing',
      email: 'apexwash@gmail.com',
      icon: '💧',
      desc: 'Job-worker view: Wash vats, chemical recipes, shrinkage verification.'
    }
  ];

  const handleQuickLogin = (account: typeof demoAccounts[0]) => {
    login({
      name: account.name,
      email: account.email,
      role: account.role,
      company: account.company
    });
    setNotification(`Authenticated as ${account.name}! Permissions adjusted.`);
    setTimeout(() => {
      setNotification(null);
      closeAuthModal();
    }, 1200);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    login({
      name: email.split('@')[0].toUpperCase(),
      email: email,
      role: role,
      company: company || 'UID Denims Partner Network'
    });

    setNotification(`Welcome back, ${email.split('@')[0]}!`);
    setTimeout(() => {
      setNotification(null);
      closeAuthModal();
    }, 1200);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    login({
      name: name,
      email: email,
      role: role,
      company: company || `${name} Enterprises`
    });

    setNotification(`Account created! Logged in as ${name}.`);
    setTimeout(() => {
      setNotification(null);
      closeAuthModal();
    }, 1200);
  };

  return (
    <div className="auth-modal-backdrop" onClick={closeAuthModal}>
      <div
        className="auth-modal-card animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Header with Title and Close Button */}
        <div className="auth-modal-header">
          <div>
            <div className="auth-badge-row">
              <span className="auth-security-badge">
                <Shield className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                UID DENIMS SECURE ERP AUTH
              </span>
            </div>
            <h3 id="auth-modal-title" className="auth-modal-title">
              {authModalMode === 'login' ? 'Sign in to UID Denims' : 'Create Demo Account'}
            </h3>
            <p className="auth-modal-subtitle">
              {authModalMode === 'login'
                ? 'Select a pre-configured role chip or enter custom credentials.'
                : 'Register a new B2B wholesale buyer, contractor, or factory operator.'}
            </p>
          </div>
          <button
            className="auth-close-btn"
            onClick={closeAuthModal}
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-slate-500 hover:text-slate-900" />
          </button>
        </div>

        {/* Success / Notification Banner */}
        {notification && (
          <div className="auth-toast-success animate-fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="auth-tab-bar">
          <button
            type="button"
            className={`auth-tab-btn ${authModalMode === 'login' ? 'active' : ''}`}
            onClick={() => setAuthModalMode('login')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${authModalMode === 'signup' ? 'active' : ''}`}
            onClick={() => setAuthModalMode('signup')}
          >
            Create Account
          </button>
        </div>

        {/* 1-Click Quick Demo Login Chips (Visible in Login Mode) */}
        {authModalMode === 'login' && (
          <div className="quick-roles-container">
            <div className="quick-roles-label">
              <span>ONE-CLICK DEMO ROLES (FOR MENTOR PRESENTATION):</span>
            </div>
            <div className="quick-roles-grid">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  className="quick-role-chip"
                  onClick={() => handleQuickLogin(acc)}
                  title={acc.desc}
                >
                  <span className="role-icon-symbol">{acc.icon}</span>
                  <div className="role-chip-text">
                    <span className="role-chip-title">{acc.label}</span>
                    <span className="role-chip-desc">{acc.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Login Form */}
        {authModalMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="auth-form-body">
            <div className="auth-field-group">
              <label htmlFor="login-email" className="auth-label">
                Email Address or Username
              </label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" />
                <input
                  id="login-email"
                  type="text"
                  className="auth-input"
                  placeholder="admin@parshvacreation.in or phone"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-field-group">
              <div className="auth-label-row">
                <label htmlFor="login-password" className="auth-label">
                  Password
                </label>
                <button
                  type="button"
                  className="auth-forgot-link"
                  onClick={() => {
                    setPassword('uid2026demo');
                    setNotification('Demo password autofilled: uid2026demo');
                    setTimeout(() => setNotification(null), 2000);
                  }}
                >
                  Autofill Demo Password
                </button>
              </div>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                <span>Remember this terminal session</span>
              </label>
            </div>

            <div className="auth-submit-row">
              <button type="submit" className="auth-submit-btn">
                Log In to UID Denims
              </button>
            </div>
          </form>
        )}

        {/* Signup Form */}
        {authModalMode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="auth-form-body">
            <div className="auth-field-group">
              <label htmlFor="signup-name" className="auth-label">
                Full Name
              </label>
              <div className="auth-input-wrapper">
                <User className="auth-input-icon" />
                <input
                  id="signup-name"
                  type="text"
                  className="auth-input"
                  placeholder="e.g. Ketan Rajput"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-field-group">
              <label htmlFor="signup-company" className="auth-label">
                Business / Enterprise Name
              </label>
              <div className="auth-input-wrapper">
                <Building className="auth-input-icon" />
                <input
                  id="signup-company"
                  type="text"
                  className="auth-input"
                  placeholder="e.g. Parshva Creation Wholesale"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-grid-2col">
              <div className="auth-field-group">
                <label htmlFor="signup-email" className="auth-label">
                  Business Email
                </label>
                <div className="auth-input-wrapper">
                  <Mail className="auth-input-icon" />
                  <input
                    id="signup-email"
                    type="email"
                    className="auth-input"
                    placeholder="contact@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-field-group">
                <label htmlFor="signup-phone" className="auth-label">
                  WhatsApp Number (For Invoices)
                </label>
                <div className="auth-input-wrapper">
                  <Phone className="auth-input-icon" />
                  <input
                    id="signup-phone"
                    type="tel"
                    className="auth-input"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="auth-field-group">
              <label htmlFor="signup-role" className="auth-label">
                Account Operational Role
              </label>
              <select
                id="signup-role"
                className="auth-select"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
              >
                <option value="owner">Business Owner / Partner (Full Admin)</option>
                <option value="buyer">Wholesale B2B Buyer / Retailer</option>
                <option value="supplier">Mill / Raw Fabric Supplier</option>
                <option value="employee">Production Manager / Floor Supervisor</option>
                <option value="dyer_worker">Dyeing & Washing Job-Worker</option>
              </select>
            </div>

            <div className="auth-form-options">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked required />
                <span>I agree to MSBTE Diploma Academic Prototype terms</span>
              </label>
            </div>

            <div className="auth-submit-row">
              <button type="submit" className="auth-submit-btn">
                Create Account &amp; Enter Platform
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
