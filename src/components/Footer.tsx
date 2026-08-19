import React from "react";
import {
  Video,
  Database,
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
  Instagram,
  FileSpreadsheet,
} from "lucide-react";
import { BUSINESS_IDENTITY } from "../data/mockData";

interface FooterProps {
  onOpenOrder: () => void;
  onOpenSheetsModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrder, onOpenSheetsModal }) => {
  return (
    <footer className="bg-[#050505] text-[#e0e0e0] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                <span className="text-white font-black text-xl">A</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  {BUSINESS_IDENTITY.name}
                </span>
                <span className="block text-[10px] text-cyan-400 font-mono uppercase tracking-widest font-bold">
                  Kreatif Digital Berbasis AI
                </span>
              </div>
            </div>

            <p className="text-xs text-white/50 leading-relaxed max-w-sm">
              "{BUSINESS_IDENTITY.tagline}" — Solusi produksi video promosi, konten edukasi, dan e-book panduan mandiri untuk UMKM Indonesia dengan teknologi Artificial Intelligence.
            </p>

            <div className="pt-2 text-xs text-white/60 space-y-1.5 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{BUSINESS_IDENTITY.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Pengerjaan Kilat: 1 - 3 Hari Kerja</span>
              </div>
            </div>
          </div>

          {/* Col 3: Layanan & E-Book */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-4">
              Layanan Utama
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <a href="#layanan" className="hover:text-cyan-400 transition-colors">
                  E-Book Video Promosi (Rp280k)
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-cyan-400 transition-colors">
                  E-Book Video Edukasi (Rp335k)
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-cyan-400 transition-colors">
                  Paket Langganan UMKM (Rp1jt/bln)
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-cyan-400 transition-colors">
                  Video Promosi Siap Tayang
                </a>
              </li>
              <li>
                <a href="#ai-generator" className="hover:text-cyan-400 transition-colors">
                  AI Script Generator Gratis
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Integrasi Database */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-4">
              Integrasi Database
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <button
                  onClick={onOpenSheetsModal}
                  className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Google Spreadsheet CRM</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSheetsModal}
                  className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Webhook Apps Script</span>
                </button>
              </li>
              <li>
                <a
                  href={`https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>Lihat Lembar Spreadsheet &rarr;</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Kontak & Pemesanan */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold mb-4">
              Pemesanan Cepat
            </h4>
            <div className="space-y-3">
              <button
                onClick={onOpenOrder}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold text-xs shadow-[0_10px_25px_-5px_rgba(6,182,212,0.4)] flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                <span>Pesan Jasa Video</span>
              </button>

              <a
                href={`https://wa.me/${BUSINESS_IDENTITY.whatsapp}?text=Halo%20Abang%20Sehat%20Studio,%20saya%20tertarik%20konsultasi%20pembuatan%20video%20AI%20UMKM`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Studio</span>
              </a>

              <p className="text-[10px] text-white/30 text-center">
                Respons cepat 08.00 - 21.00 WIB
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} {BUSINESS_IDENTITY.name}. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-cyan-400 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              Live Connected Google Sheets
            </span>
            <span>Banda Aceh, Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
