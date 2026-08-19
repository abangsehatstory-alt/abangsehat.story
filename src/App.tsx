import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { ServicesPricing } from "./components/ServicesPricing";
import { AIScriptGenerator } from "./components/AIScriptGenerator";
import { PortfolioShowcase } from "./components/PortfolioShowcase";
import { SwotAndStrategy } from "./components/SwotAndStrategy";
import { OrderModal } from "./components/OrderModal";
import { GoogleSheetsPortal } from "./components/GoogleSheetsPortal";
import { Footer } from "./components/Footer";
import { OrderLead, GoogleSheetConfig, ProductCategory } from "./types";
import { Database, MessageSquare, Sparkles } from "lucide-react";
import { BUSINESS_IDENTITY } from "./data/mockData";

export default function App() {
  const [orders, setOrders] = useState<OrderLead[]>([]);
  const [sheetConfig, setSheetConfig] = useState<GoogleSheetConfig>({
    spreadsheetUrl: "https://docs.google.com/spreadsheets/d/1AbangSehatStudio_MasterDatabase/edit",
    webhookUrl: "",
    sheetName: "Data Pesanan UMKM",
    autoSync: true,
  });

  // Modals state
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [sheetsModalOpen, setSheetsModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>("priority-subscription");
  const [orderNotes, setOrderNotes] = useState<string>("");
  const [orderCategory, setOrderCategory] = useState<ProductCategory>("kuliner");
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Load orders & config from server
  const fetchRecords = async () => {
    try {
      const res = await fetch("/api/sheets/records");
      const data = await res.json();
      if (data.success) {
        if (data.data) setOrders(data.data);
        if (data.config) setSheetConfig(data.config);
      }
    } catch (err) {
      console.warn("Failed to fetch sheet records:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleOpenOrder = (packageId?: string) => {
    if (packageId) setSelectedPackageId(packageId);
    setOrderNotes("");
    setOrderModalOpen(true);
  };

  const handleOrderWithScript = (scriptSummary: string, category: ProductCategory) => {
    setSelectedPackageId("service-promo-video");
    setOrderNotes(`Menggunakan skrip AI yang digenerate:\n${scriptSummary}`);
    setOrderCategory(category);
    setOrderModalOpen(true);
  };

  const handleOrderSimilar = (title: string, category: ProductCategory) => {
    setSelectedPackageId("service-promo-video");
    setOrderNotes(`Request gaya video serupa dengan portofolio: ${title}`);
    setOrderCategory(category);
    setOrderModalOpen(true);
  };

  const handleOrderSuccess = (newOrder: OrderLead) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleUpdateStatus = async (id: string, newStatus: OrderLead["status"]) => {
    try {
      const res = await fetch(`/api/sheets/records/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleSaveConfig = async (newConfig: GoogleSheetConfig) => {
    try {
      const res = await fetch("/api/sheets/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      const data = await res.json();
      if (data.success && data.config) {
        setSheetConfig(data.config);
      }
    } catch (err) {
      console.error("Failed to save sheet config:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Banner for Google Sheet Database Integration */}
      <div className="bg-gradient-to-r from-cyan-950/80 via-[#0a0a12] to-purple-950/80 text-cyan-300 text-xs py-2 px-4 text-center font-medium border-b border-cyan-500/20 flex items-center justify-center gap-2 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="text-white/80">
          Website terintegrasi langsung dengan <strong className="text-cyan-400">Database Google Spreadsheet</strong> untuk pencatatan otomatis pesanan UMKM.
        </span>
        <button
          onClick={() => setSheetsModalOpen(true)}
          className="text-cyan-400 hover:text-cyan-300 ml-2 font-bold cursor-pointer underline transition-colors"
        >
          Buka Database Sheet &rarr;
        </button>
      </div>

      {/* Main Navbar */}
      <Navbar
        onOpenOrder={handleOpenOrder}
        onOpenSheetsModal={() => setSheetsModalOpen(true)}
        activeSection={activeSection}
        totalOrders={orders.length}
      />

      {/* Hero Section */}
      <Hero
        onOpenOrder={handleOpenOrder}
        onOpenSheetsModal={() => setSheetsModalOpen(true)}
      />

      {/* Identitas & Latar Belakang Usaha */}
      <AboutSection />

      {/* Paket Layanan & E-Book */}
      <ServicesPricing onSelectPackage={(pkgId) => handleOpenOrder(pkgId)} />

      {/* AI Video Script & Concept Generator */}
      <AIScriptGenerator onOrderWithScript={handleOrderWithScript} />

      {/* Portofolio Video Showcase */}
      <PortfolioShowcase onOrderSimilar={handleOrderSimilar} />

      {/* Analisis SWOT & Target Pasar */}
      <SwotAndStrategy />

      {/* Footer */}
      <Footer
        onOpenOrder={handleOpenOrder}
        onOpenSheetsModal={() => setSheetsModalOpen(true)}
      />

      {/* Order & Consultation Modal */}
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialPackageId={selectedPackageId}
        initialNotes={orderNotes}
        initialCategory={orderCategory}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Google Spreadsheet CRM Portal Modal */}
      <GoogleSheetsPortal
        isOpen={sheetsModalOpen}
        onClose={() => setSheetsModalOpen(false)}
        orders={orders}
        sheetConfig={sheetConfig}
        onUpdateStatus={handleUpdateStatus}
        onSaveConfig={handleSaveConfig}
        onRefreshData={fetchRecords}
      />

      {/* Floating Action Quick Access (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={() => setSheetsModalOpen(true)}
          className="p-3.5 rounded-full bg-[#0d0d12] hover:bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
          title="Buka Database Google Sheet"
        >
          <Database className="w-5 h-5" />
        </button>

        <a
          href={`https://wa.me/${BUSINESS_IDENTITY.whatsapp}?text=Halo%20Abang%20Sehat%20Studio,%20saya%20tertarik%20dengan%20jasa%20video%20AI%20dan%20E-Book%20UMKM`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center transition-all hover:scale-110"
          title="Chat WhatsApp Studio"
        >
          <MessageSquare className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
