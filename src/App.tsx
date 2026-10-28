import { ERPProvider } from './context/ERPContext';
import { Navbar } from './components/Navbar';
import { EditorialHeroCarousel } from './components/EditorialHeroCarousel';
import { EditorialAboutWork } from './components/EditorialAboutWork';
import { AuthSection } from './components/AuthSection';
import { AuthModal } from './components/AuthModal';
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
      <div className="app-container editorial-theme">
        {/* Editorial Navigation Bar (Matching Reference Images with ||, Search Q, Login/Signup) */}
        <Navbar />

        <main className="main-content">
          {/* Section 1: Editorial Hero Carousel (Exact visual recreation of Reference Images 1 & 2) */}
          <section id="overview" className="editorial-hero-wrapper">
            <EditorialHeroCarousel />
          </section>

          {/* Section 2: Editorial About Us & Manufacturing Disciplines (Work) */}
          <EditorialAboutWork />

          {/* Section 3: Login & Sign-Up Demonstration Station */}
          <AuthSection />

          {/* Section 4: Role-Based Least-Privilege Feedback Banner */}
          <RoleViewBanner />
          <PartnerPortalView />

          {/* ------------------------------------------------------------- */}
          {/* SECTION 5: WORKFLOW DEMO AT THE END OF THE WEBSITE           */}
          {/* ------------------------------------------------------------- */}
          <section id="workflow-demo" className="workflow-demo-master-wrapper">
            {/* Prominent Demo Station Callout Banner */}
            <div className="workflow-demo-banner-box">
              <div className="workflow-demo-banner-header">
                <span className="demo-live-badge">
                  <span className="live-dot-pulse" />
                  INTERACTIVE OPERATIONS DEMO STATION
                </span>
                <span className="demo-curriculum-tag">
                  MSBTE FINAL-YEAR PROJECT 2026–2027 • VIDYALANKAR POLYTECHNIC
                </span>
              </div>
              <h2 className="workflow-demo-heading">
                UID Denims ERP — Connected Operations Demo
              </h2>
              <p className="workflow-demo-subtext">
                Explore the complete 8-stage manufacturing workflow from fabric purchase to wholesale payment settlement and AI analytics.
              </p>
            </div>

            {/* 1. Connected 8-Stage Manufacturing Workflow Pipeline */}
            <WorkflowSection />

            {/* 2. Executive Cockpit Dashboard */}
            <DashboardSection />

            {/* 3. Production Costing & BOM Calculator (Markup vs Margin) */}
            <CostingSection />

            {/* 4. Tri-Tier Inventory Management (Finished Goods, WIP, Raw Materials) */}
            <InventorySection />

            {/* 5. Wholesale B2B Sales, Party Ledgers & Proof Settlement */}
            <SalesLedgerSection />

            {/* 6. Statutory P&L Statement, Operating Overheads & Audit Trail */}
            <ReportsSection />

            {/* 7. AI Business Assistant with Deterministic Analytical Queries */}
            <AIAssistantSection />
          </section>
        </main>

        {/* Global Modals */}
        <AuthModal />
        <GuidedDemoModal />

        {/* Academic Project Credits Footer */}
        <Footer />
      </div>
    </ERPProvider>
  );
}

export default App;
