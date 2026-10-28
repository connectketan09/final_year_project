import { useState } from 'react';
import { useERP } from '../context/ERPContext';
import type { UserRole } from '../types';
import {
  RotateCcw,
  Sparkles,
  Users,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

export const Navbar = () => {
  const { role, setRole, resetDemoData, setGuidedDemoOpen } = useERP();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Costing', href: '#costing' },
    { label: 'Inventory', href: '#inventory' },
    { label: 'Sales & Ledgers', href: '#sales' },
    { label: 'Reports', href: '#reports' },
    { label: 'AI Assistant', href: '#ai-assistant' }
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo & Identity */}
        <a href="#overview" className="brand-logo-group">
          <div className="brand-mark-box">
            <span className="brand-mark-u">UID</span>
          </div>
          <div className="brand-text-group">
            <span className="brand-title">UID DENIMS ERP</span>
            <span className="brand-sub">FROM FABRIC TO PROFIT</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Tools: Role Selector & Reset */}
        <div className="nav-actions-group">
          {/* Role Switcher */}
          <div className="role-switcher-dropdown">
            <label htmlFor="roleSelect" className="sr-only">Switch User Role</label>
            <div className="role-select-wrapper">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <select
                id="roleSelect"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="role-native-select"
                title="Select user role to test least-privilege permissions"
              >
                <option value="owner">Owner / Admin</option>
                <option value="employee">Employee</option>
                <option value="buyer">Buyer / Retailer</option>
                <option value="supplier">Supplier</option>
                <option value="dyer_worker">Dyer / Job Worker</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* 2-Min Demo Walkthrough Button */}
          <button
            onClick={() => setGuidedDemoOpen(true)}
            className="btn-mentor-walkthrough"
            title="Launch 10-step connected scenario for mentor evaluation"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">2-Min Demo Guide</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={resetDemoData}
            className="btn-reset-demo"
            title="Restore baseline sample records"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer md:hidden">
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setGuidedDemoOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="btn-primary-compact justify-center"
              >
                <Sparkles className="w-4 h-4" />
                <span>2-Minute Mentor Guide</span>
              </button>
              <button
                onClick={() => {
                  resetDemoData();
                  setMobileMenuOpen(false);
                }}
                className="btn-outline-compact justify-center"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Demo Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
