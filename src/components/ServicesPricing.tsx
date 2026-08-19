import React, { useState } from "react";
import {
  Sparkles,
  BookOpen,
  Video,
  Crown,
  CalendarSync,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { SERVICE_PACKAGES } from "../data/mockData";
import { ServicePackage } from "../types";

interface ServicesPricingProps {
  onSelectPackage: (packageId: string) => void;
}

export const ServicesPricing: React.FC<ServicesPricingProps> = ({ onSelectPackage }) => {
  const [filterCategory, setFilterCategory] = useState<"all" | "ebook" | "video" | "subscription">("all");

  const filteredPackages =
    filterCategory === "all"
      ? SERVICE_PACKAGES
      : SERVICE_PACKAGES.filter((p) => p.category === filterCategory);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="w-5 h-5" />;
      case "Crown":
        return <Crown className="w-5 h-5" />;
      case "Video":
        return <Video className="w-5 h-5" />;
      case "CalendarSync":
        return <CalendarSync className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="layanan" className="py-16 md:py-24 bg-[#050505] text-[#e0e0e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Daftar Paket & Harga Layanan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
            Pilihan Solusi Video AI & E-Book untuk{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              UMKM
            </span>
          </h2>
          <p className="mt-4 text-base text-white/50 leading-relaxed">
            Pilih paket panduan mandiri (E-book) atau serahkan pembuatan video kepada tim ahli kami (Done-For-You). Transparan, hemat, dan bergaransi kepuasan.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            <button
              onClick={() => setFilterCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterCategory === "all"
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-cyan-500/40"
              }`}
            >
              Semua Pilihan ({SERVICE_PACKAGES.length})
            </button>
            <button
              onClick={() => setFilterCategory("ebook")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterCategory === "ebook"
                  ? "bg-cyan-500 text-black font-extrabold shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-cyan-500/40"
              }`}
            >
              📚 E-Book & Panduan
            </button>
            <button
              onClick={() => setFilterCategory("subscription")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterCategory === "subscription"
                  ? "bg-purple-500 text-white font-extrabold shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-purple-500/40"
              }`}
            >
              👑 Langganan & Prioritas
            </button>
            <button
              onClick={() => setFilterCategory("video")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterCategory === "video"
                  ? "bg-emerald-500 text-black font-extrabold shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-emerald-500/40"
              }`}
            >
              🎬 Jasa Video Siap Tayang
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredPackages.map((pkg: ServicePackage) => {
            const isPopular = pkg.popular;
            const isVip = pkg.id === "priority-subscription";

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl bg-[#0d0d0f] flex flex-col justify-between transition-all duration-300 ${
                  isVip
                    ? "border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)] scale-[1.02] z-10"
                    : isPopular
                    ? "border border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                    : "border border-white/10 hover:border-cyan-500/40 shadow-md"
                }`}
              >
                {/* Top Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-md ${
                        isVip
                          ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950"
                          : isPopular
                          ? "bg-purple-600 text-white"
                          : "bg-white/10 text-white border border-white/20"
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-7">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isVip
                          ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
                          : isPopular
                          ? "bg-purple-500/10 border border-purple-500/30 text-purple-400"
                          : "bg-white/5 border border-white/10 text-white/70"
                      }`}
                    >
                      {getIcon(pkg.iconName)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-tight">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-white/40 font-medium">{pkg.tagline}</p>
                    </div>
                  </div>

                  <p className="text-xs text-white/60 mb-5 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Price */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                    {pkg.originalPrice && (
                      <span className="text-xs line-through text-white/30 font-medium block font-mono">
                        {formatRupiah(pkg.originalPrice)}
                      </span>
                    )}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {formatRupiah(pkg.price)}
                      </span>
                      {pkg.duration && (
                        <span className="text-xs font-semibold text-white/40">
                          / {pkg.duration}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-cyan-400 mt-1 block">
                      ✓ Pembayaran aman & auto-sync Google Sheet
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">
                      Fasilitas Termasuk:
                    </span>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recommended For Pill */}
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/70 leading-snug">
                    <strong className="text-cyan-400">Cocok untuk:</strong> {pkg.recommendedFor}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectPackage(pkg.id)}
                    id={`select-pkg-${pkg.id}`}
                    className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isVip
                        ? "bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white shadow-[0_10px_25px_-5px_rgba(6,182,212,0.4)] hover:scale-[1.02]"
                        : isPopular
                        ? "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-[0_10px_25px_-5px_rgba(168,85,247,0.4)]"
                        : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 text-white"
                    }`}
                  >
                    <span>Pilih Paket Ini</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantees Note */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0d0d0f] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Garansi Layanan & Pendampingan</h4>
              <p className="text-xs text-white/40">
                Pengerjaan terstruktur, format sesuai standar algoritma TikTok Shop & Reels 2026.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/6285277008899?text=Halo%20Abang%20Sehat%20Studio,%20saya%20ingin%20tanya%20paket%20custom%20untuk%20usaha%20saya"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 text-xs font-bold text-emerald-400 hover:bg-emerald-500/10 shrink-0 transition-colors"
          >
            Konsultasi Gratis via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
