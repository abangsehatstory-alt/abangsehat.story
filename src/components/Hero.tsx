import React from "react";
import { Sparkles, Play, Zap, ShieldCheck, Database, CheckCircle2, TrendingUp, MapPin, ArrowRight } from "lucide-react";
import { BUSINESS_IDENTITY } from "../data/mockData";

interface HeroProps {
  onOpenOrder: (packageId?: string) => void;
  onOpenSheetsModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrder, onOpenSheetsModal }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-[#050505] text-[#e0e0e0]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-25 blur-3xl -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-cyan-600 mix-blend-screen filter"></div>
        <div className="absolute top-10 right-1/4 w-96 h-96 rounded-full bg-purple-600 mix-blend-screen filter"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Berbasis Banda Aceh — Melayani Indonesia
          </div>

          <button
            onClick={onOpenSheetsModal}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 hover:border-cyan-500/40 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Database Google Spreadsheet Terhubung</span>
          </button>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: Headline & Call To Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tighter text-white mb-6">
              Video Keren,<br />
              UMKM Makin{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Dikenal.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/50 max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0">
              Produksi video promosi & edukasi kilat hanya dalam <strong>1-3 hari kerja</strong>. Cepat, murah, dan berkualitas tinggi menggunakan teknologi Artificial Intelligence untuk UMKM Kuliner, Fashion, Kerajinan, & Skincare.
            </p>

            {/* CTA Buttons + Pricing Anchor */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 mb-8">
              <button
                onClick={() => onOpenOrder()}
                id="hero-order-now-btn"
                className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white px-8 py-4 rounded-xl font-bold shadow-[0_10px_25px_-5px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02]"
              >
                <Sparkles className="w-5 h-5 text-cyan-100" />
                <span>Mulai Produksi Video</span>
              </button>

              <div className="flex flex-col text-left">
                <span className="text-[11px] text-white/40 uppercase tracking-tight">Investasi Mulai Dari</span>
                <span className="text-xl font-black text-white tracking-tight">Rp280.000</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-white/60">
              <a
                href="#ai-generator"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-cyan-300 transition-all font-semibold"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Coba AI Script Generator Gratis</span>
              </a>
              <a
                href="#portofolio"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Play className="w-3.5 h-3.5 text-purple-400" />
                <span>Lihat 4 Contoh Portofolio</span>
              </a>
            </div>
          </div>

          {/* Right Column: Immersive Video Preview Card & Quick Metric Stack */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-xl opacity-25"></div>

            {/* Video Frame */}
            <div className="relative aspect-video bg-[#0d0d0f] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group">
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80"
                alt="Preview Video AI"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90"></div>

              {/* Play Button Simulation */}
              <div className="flex flex-col items-center gap-4 z-10">
                <button
                  onClick={() => onOpenOrder("service-promo-video")}
                  className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 hover:border-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                >
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </button>
                <span className="text-xs font-bold text-white/90 uppercase tracking-widest">
                  Preview Video AI Siap Tayang
                </span>
              </div>

              {/* Video Timeline Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
                <div className="flex flex-col gap-1">
                  <div className="h-1 w-36 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-cyan-500 animate-pulse"></div>
                  </div>
                  <span className="text-[10px] font-mono text-white/40 tracking-tighter">
                    RENDERING_SEQUENCE: 00:24 / 00:30
                  </span>
                </div>
                <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-md text-[9px] text-purple-300 font-bold tracking-wider">
                  AI VOICEOVER ACTIVE
                </div>
              </div>
            </div>

            {/* Quick 3-Tier Summary Stack */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div
                onClick={() => onOpenOrder("priority-subscription")}
                className="bg-white/5 border border-white/10 hover:border-purple-500/50 p-3.5 rounded-xl transition-all cursor-pointer hover:bg-white/10"
              >
                <div className="text-purple-400 font-bold mb-1 text-xs tracking-tight">Subscription</div>
                <div className="text-white text-base font-black">Rp1jt<span className="text-[10px] font-medium text-white/40">/bln</span></div>
                <div className="text-[9px] uppercase tracking-wide text-white/30 truncate">8-12 Konten Video</div>
              </div>

              <div
                onClick={() => onOpenOrder("ebook-tutorial")}
                className="bg-white/5 border border-white/10 hover:border-cyan-500/50 p-3.5 rounded-xl transition-all cursor-pointer hover:bg-white/10"
              >
                <div className="text-cyan-400 font-bold mb-1 text-xs tracking-tight">Tutorial</div>
                <div className="text-white text-base font-black">Rp335k</div>
                <div className="text-[9px] uppercase tracking-wide text-white/30 truncate">Video Edukasi Produk</div>
              </div>

              <div
                onClick={() => onOpenOrder("ebook-promo")}
                className="bg-white/5 border border-white/10 hover:border-emerald-500/50 p-3.5 rounded-xl transition-all cursor-pointer hover:bg-white/10"
              >
                <div className="text-emerald-400 font-bold mb-1 text-xs tracking-tight">Promo</div>
                <div className="text-white text-base font-black">Rp280k</div>
                <div className="text-[9px] uppercase tracking-wide text-white/30 truncate">Video Media Sosial</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid Banner */}
        <div className="bg-[#0d0d0f]/90 rounded-2xl border border-white/10 p-6 sm:p-8 backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Produksi Kilat 1-3 Hari</h4>
                <p className="text-xs text-white/40 mt-0.5">Video siap tayang untuk TikTok Shop & Reels</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Hemat Biaya Hingga 85%</h4>
                <p className="text-xs text-white/40 mt-0.5">Tanpa sewa studio & kamera profesional</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Voiceover & Prompt AI</h4>
                <p className="text-xs text-white/40 mt-0.5">Multi-bahasa & hook persuasif pembeli</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Google Sheet Database</h4>
                <p className="text-xs text-white/40 mt-0.5">Pencatatan & status pengerjaan transparan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
