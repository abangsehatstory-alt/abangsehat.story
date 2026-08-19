import React, { useState } from "react";
import { Video, Database, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { BUSINESS_IDENTITY } from "../data/mockData";

interface NavbarProps {
  onOpenOrder: (packageId?: string) => void;
  onOpenSheetsModal: () => void;
  activeSection: string;
  totalOrders: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOrder,
  onOpenSheetsModal,
  activeSection,
  totalOrders,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Tentang Usaha", href: "#tentang" },
    { label: "Paket & E-Book", href: "#layanan" },
    { label: "AI Generator", href: "#ai-generator" },
    { label: "Portofolio Video", href: "#portofolio" },
    { label: "Analisis SWOT", href: "#swot" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white">
                  {BUSINESS_IDENTITY.name}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                  </span>
                  AI Studio
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-medium">
                Banda Aceh • Melayani Seluruh Indonesia
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-all ${
                  activeSection === item.href.slice(1)
                    ? "text-cyan-400 font-bold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Google Sheets Database Status Pill */}
            <button
              onClick={onOpenSheetsModal}
              id="nav-sheets-db-btn"
              className="bg-white/5 border border-white/10 hover:border-cyan-500/50 px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-cyan-400 flex items-center gap-2 transition-all cursor-pointer hover:bg-white/10"
              title="Buka Database & Integrasi Google Spreadsheet"
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Google Sheet DB</span>
              <span className="px-1.5 py-0.5 text-[10px] bg-cyan-500/20 text-cyan-300 rounded-full font-mono font-bold border border-cyan-500/30">
                {totalOrders} Data
              </span>
            </button>

            {/* WA Quick Contact */}
            <a
              href={`https://wa.me/${BUSINESS_IDENTITY.whatsapp}?text=Halo%20Abang%20Sehat%20Studio,%20saya%20tertarik%20dengan%20jasa%20video%20AI%20dan%20E-book%20UMKM.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
              title="Hubungi via WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Order CTA */}
            <button
              onClick={() => onOpenOrder()}
              id="nav-order-cta-btn"
              className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-[0_10px_25px_-5px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center gap-1.5 hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>Konsultasi & Pesan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSheetsModal}
              className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Sheet DB</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white/70 hover:text-white bg-white/5 border border-white/10"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 space-y-2 bg-[#0d0d0f]/95 rounded-b-2xl p-4 mt-1 border border-white/10">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-white/70 hover:text-cyan-400 hover:bg-white/5 rounded-lg"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrder();
                }}
                className="w-full py-3 rounded-xl text-center font-bold text-white bg-gradient-to-r from-cyan-600 to-cyan-500 shadow-[0_10px_25px_-5px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 text-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>Pesan Jasa & E-Book Sekarang</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
