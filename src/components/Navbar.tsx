import { useState } from 'react';
import { useERP } from '../context/ERPContext';
import type { UserRole } from '../types';
import {
  RotateCcw,
  Sparkles,
  Users,
  Search,
  X,
  LogIn,
  UserPlus,
  ArrowRight
} from 'lucide-react';

export const Navbar = () => {
  const {
    role,
    setRole,
    currentUser,
    logout,
    openAuthModal,
    resetDemoData,
    setGuidedDemoOpen
  } = useERP();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const quickSearchItems = [
    { title: '8-Stage Connected Denim Workflow', target: 'workflow-demo', category: 'Workflow' },
    { title: 'BOM & Markup vs Margin Costing', target: 'costing', category: 'Costing' },
    { title: 'Plus-Size Inventory (Waist 38-54)', target: 'inventory', category: 'Inventory' },
    { title: 'Wholesale Invoicing & Ledgers', target: 'sales', category: 'Sales' },
    { title: 'Payment Proof Verification (UTR / Cheque)', target: 'sales', category: 'Settlement' },
    { title: 'Real-Time P&L & Operating Overheads', target: 'reports', category: 'Finance' },
    { title: 'UID AI Business Assistant', target: 'ai-assistant', category: 'AI Analytics' },
    { title: 'Role Access & Demo Login Station', target: 'auth-demo', category: 'Auth' }
  ];

  const filteredSearch = searchQuery.trim() === ''
    ? quickSearchItems
    : quickSearchItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSearchSelect = (targetId: string) => {
    setSearchOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="navbar-header editorial-navbar">
        <div className="navbar-container">
          {/* Left: Double-line Menu Icon || + Brand Identity */}
          <div className="nav-left-brand-group">
            <button
              className="editorial-double-bar-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              title="Toggle Menu Drawer"
              aria-label="Toggle menu"
            >
              <span className="double-bar-line"></span>
              <span className="double-bar-line"></span>
            </button>

            <a href="#overview" className="editorial-brand-link">
              <span className="brand-logo-text">UID DENIMS</span>
              <span className="brand-logo-dot"></span>
            </a>
          </div>

          {/* Center: Editorial Nav Links (Matching Reference Image) */}
          <nav className="desktop-nav editorial-center-nav" aria-label="Main navigation">
            <a href="#overview" className="editorial-nav-item active-nav">
              Home
            </a>
            <a href="#about" className="editorial-nav-item">
              About us
            </a>
            <a href="#work" className="editorial-nav-item">
              Work
            </a>
            <a href="#auth-demo" className="editorial-nav-item">
              Demo Access
            </a>
            <a href="#workflow-demo" className="editorial-nav-item highlight-workflow">
              Workflow Demo ↓
            </a>
          </nav>

          {/* Right: Search Icon Q, Auth Buttons & Role Tools */}
          <div className="nav-actions-group">
            {/* Search Icon (Q) matching reference image */}
            <button
              className="editorial-search-btn"
              onClick={() => setSearchOpen(true)}
              title="Search ERP modules & records"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-slate-800" />
            </button>

            {/* If logged in: User avatar pill & Sign Out */}
            {currentUser ? (
              <div className="nav-user-badge">
                <span className="nav-user-avatar">
                  {currentUser.role === 'owner' ? '👑' : currentUser.role === 'buyer' ? '💼' : '🏭'}
                </span>
                <span className="nav-user-name hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
                <button
                  className="nav-signout-btn"
                  onClick={logout}
                  title="Sign out of demo session"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              /* If not logged in: Log In & Sign Up buttons */
              <div className="nav-auth-buttons">
                <button
                  className="btn-editorial-login"
                  onClick={() => openAuthModal('login')}
                  title="Sign in to demo account"
                >
                  <LogIn className="w-3.5 h-3.5 mr-1" />
                  <span>Log In</span>
                </button>
                <button
                  className="btn-editorial-signup hidden sm:flex"
                  onClick={() => openAuthModal('signup')}
                  title="Create new demo account"
                >
                  <UserPlus className="w-3.5 h-3.5 mr-1" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            {/* Quick Role Switcher */}
            <div className="role-switcher-dropdown hidden lg:flex">
              <label htmlFor="roleSelect" className="sr-only">Switch User Role</label>
              <div className="role-select-wrapper">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <select
                  id="roleSelect"
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="role-native-select"
                  title="Test least-privilege permissions"
                >
                  <option value="owner">Owner / Admin</option>
                  <option value="employee">Floor Supervisor</option>
                  <option value="buyer">Wholesale Buyer</option>
                  <option value="supplier">Mill Supplier</option>
                  <option value="dyer_worker">Washing Contractor</option>
                </select>
              </div>
            </div>

            {/* Mentor Walkthrough Guide Modal Button */}
            <button
              className="btn-mentor-walkthrough"
              onClick={() => setGuidedDemoOpen(true)}
              title="Launch 10-step connected scenario for mentor evaluation"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">2-Min Guide</span>
            </button>

            {/* Demo Reset Button */}
            <button
              className="btn-reset-demo hidden sm:flex"
              onClick={resetDemoData}
              title="Restore baseline sample records"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer animate-fade-in">
            <div className="mobile-nav-links">
              <a href="#overview" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About us</a>
              <a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a>
              <a href="#auth-demo" onClick={() => setMobileMenuOpen(false)}>Demo Access &amp; Login</a>
              <a href="#workflow-demo" onClick={() => setMobileMenuOpen(false)}>Workflow Demo ↓</a>
            </div>
            <div className="mobile-auth-row">
              <button
                className="btn-editorial-login w-full"
                onClick={() => { setMobileMenuOpen(false); openAuthModal('login'); }}
              >
                Log In
              </button>
              <button
                className="btn-editorial-signup w-full"
                onClick={() => { setMobileMenuOpen(false); openAuthModal('signup'); }}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Spotlight Modal */}
      {searchOpen && (
        <div className="search-modal-backdrop" onClick={() => setSearchOpen(false)}>
          <div
            className="search-modal-card animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="search-input-header">
              <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                className="search-spotlight-input"
                placeholder="Search modules, costing BOM, inventory, ledgers, AI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                className="search-close-icon"
                onClick={() => setSearchOpen(false)}
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="search-results-list">
              <div className="search-results-header">QUICK NAVIGATION:</div>
              {filteredSearch.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="search-result-item"
                  onClick={() => handleSearchSelect(item.target)}
                >
                  <div className="result-text-group">
                    <span className="result-title">{item.title}</span>
                    <span className="result-category">{item.category}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-black" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
