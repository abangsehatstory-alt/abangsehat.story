import React from "react";
import {
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  AlertTriangle,
  Users,
  Award,
} from "lucide-react";
import { SWOT_DATA, BUSINESS_IDENTITY } from "../data/mockData";

export const SwotAndStrategy: React.FC = () => {
  return (
    <section id="swot" className="py-16 md:py-24 bg-[#08080a] border-t border-white/10 text-[#e0e0e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Rencana Strategis & Analisis Pasar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
            Target Pasar & Analisis SWOT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Bisnis
            </span>
          </h2>
          <p className="mt-4 text-base text-white/50 leading-relaxed">
            Pemetaan komprehensif profil konsumen UMKM potensial serta analisis kekuatan, kelemahan, peluang, dan ancaman operasional studio jasa video AI.
          </p>
        </div>

        {/* Target Market Demographic Cards */}
        <div className="bg-[#0d0d0f] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                Segmentasi Konsumen (Target Market)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Profil Pelaku UMKM Sasaran
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                Usia & Gender
              </span>
              <p className="text-base font-extrabold text-white">
                {BUSINESS_IDENTITY.targetMarket.age}
              </p>
              <p className="text-xs text-white/50 mt-1">{BUSINESS_IDENTITY.targetMarket.gender}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                Sektor Usaha Utama
              </span>
              <p className="text-sm font-extrabold text-cyan-400">
                Kuliner, Fashion, Kerajinan & Skincare
              </p>
              <p className="text-xs text-white/50 mt-1">Pemilik & pengelola usaha mikro/kecil</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                Aktivitas Platform
              </span>
              <p className="text-sm font-bold text-purple-300">
                TikTok Shop, Shopee Live, IG Reels
              </p>
              <p className="text-xs text-white/50 mt-1">Aktif berjualan di media sosial</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                Kebutuhan Utama
              </span>
              <p className="text-sm font-bold text-emerald-400">
                Efisiensi Waktu & Anggaran Hemat
              </p>
              <p className="text-xs text-white/50 mt-1">Ingin tampil profesional dengan modal terjangkau</p>
            </div>
          </div>
        </div>

        {/* 4-Box SWOT Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strength */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#0d0d0f] border border-emerald-500/30 shadow-xl hover:border-emerald-500/60 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Kekuatan Internal
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">Strength (Kekuatan)</h3>
              </div>
            </div>
            <div className="space-y-3">
              {SWOT_DATA.strengths.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs">
                  <h4 className="font-bold text-emerald-300 mb-0.5">✓ {item.title}</h4>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weakness */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#0d0d0f] border border-amber-500/30 shadow-xl hover:border-amber-500/60 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  Kelemahan Internal
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">Weakness (Kelemahan)</h3>
              </div>
            </div>
            <div className="space-y-3">
              {SWOT_DATA.weaknesses.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs">
                  <h4 className="font-bold text-amber-300 mb-0.5">! {item.title}</h4>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunity */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#0d0d0f] border border-cyan-500/30 shadow-xl hover:border-cyan-500/60 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  Peluang Eksternal
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">Opportunity (Peluang)</h3>
              </div>
            </div>
            <div className="space-y-3">
              {SWOT_DATA.opportunities.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs">
                  <h4 className="font-bold text-cyan-300 mb-0.5">★ {item.title}</h4>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Threat */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#0d0d0f] border border-rose-500/30 shadow-xl hover:border-rose-500/60 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold">
                  Ancaman Eksternal
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">Threat (Ancaman)</h3>
              </div>
            </div>
            <div className="space-y-3">
              {SWOT_DATA.threats.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs">
                  <h4 className="font-bold text-rose-300 mb-0.5">⚠️ {item.title}</h4>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
