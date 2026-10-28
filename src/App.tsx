import { ERPProvider } from './context/ERPContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RoleViewBanner, PartnerPortalView } from './components/RoleViews';
import { WorkflowSection } from './components/WorkflowSection';
import { DashboardSection } from './components/DashboardSection';
import { CostingSection } from './components/CostingSection';
import { InventorySection } from './components/InventorySection';
import { SalesLedgerSection } from './components/SalesLedgerSection';
import { ReportsSection } from './components/ReportsSection';
import { AIAssistantSection } from './components/AIAssistantSection';
import { GuidedDemoModal } from './components/GuidedDemoModal';
import { Footer } from './components/Footer';

export function App() {
  return (
    <ERPProvider>
      <div className="app-container">
        {/* Navigation bar with branding, role selector, guide and reset actions */}
        <Navbar />

        <main className="main-content">
          {/* Hero Section with Live Animated Factory Scene */}
          <HeroSection />

          {/* Role Access Feedback Banner & Specialized Partner View */}
          <RoleViewBanner />
          <PartnerPortalView />

          {/* Interactive 8-Stage Connected Denim Workflow */}
          <WorkflowSection />

          {/* Executive Cockpit & Owner Dashboard */}
          <DashboardSection />

          {/* Production Costing Calculator Engine (BOM & Pricing Formula) */}
          <CostingSection />

          {/* Multi-Stage Inventory (Finished Goods, WIP, Raw Materials) */}
          <InventorySection />

          {/* Commercial Transactions: Sales Invoicing, Ledgers & Proof Settlement */}
          <SalesLedgerSection />

          {/* Statutory Reports, Transparent P&L, Overheads & Audit Log */}
          <ReportsSection />

          {/* AI Business Assistant over Authorized Records */}
          <AIAssistantSection />

          {/* 2-Minute Mentor Step-by-Step Scenario Modal */}
          <GuidedDemoModal />
        </main>

        {/* Academic Affiliation, Team Credits & Disclaimers */}
        <Footer />
      </div>
    </ERPProvider>
  );
}

export default App;
