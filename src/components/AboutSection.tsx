import React from "react";
import {
  Sparkles,
  Target,
  Clock,
  DollarSign,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Video,
  XCircle,
} from "lucide-react";
import { BUSINESS_IDENTITY } from "../data/mockData";

export const AboutSection: React.FC = () => {
  return (
    <section id="tentang" className="py-16 md:py-24 bg-[#08080a] border-y border-white/10 text-[#e0e0e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Latar Belakang & Identitas Usaha</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
            Membantu UMKM Naik Kelas Lewat Kekuatan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Video AI
            </span>
          </h2>
          <p className="mt-4 text-base text-white/50 leading-relaxed">
            Semakin banyak UMKM beralih ke pemasaran digital, namun terbentur biaya produksi konvensional yang mahal dan kerumitan teknis. Abang Sehat Studio hadir sebagai solusi cerdas.
          </p>
        </div>

        {/* Business Identity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-[#0d0d0f] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Identitas Studio</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                <strong className="text-white">{BUSINESS_IDENTITY.name}</strong> — {BUSINESS_IDENTITY.type}.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-cyan-400 font-semibold font-mono">
              📍 {BUSINESS_IDENTITY.location}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d0d0f] border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Target Pasar Utama</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Pelaku UMKM di bidang <strong className="text-white">Kuliner, Fashion, Kerajinan Tangan, dan Kecantikan/Skincare</strong> usia 22–45 tahun yang aktif di TikTok & Marketplace.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-purple-400 font-semibold">
              🎯 Fokus Khusus Segmen Usaha Mikro & Kecil
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d0d0f] border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Tagline & Filosofi</h3>
              <p className="text-sm font-semibold text-emerald-300 italic mb-2">
                "{BUSINESS_IDENTITY.tagline}"
              </p>
              <p className="text-xs text-white/50">
                Memberikan visual premium setara brand besar dengan biaya ramah kantong pelaku UMKM nusantara.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-emerald-400 font-semibold">
              🚀 Cepat • Murah • Berkualitas
            </div>
          </div>
        </div>

        {/* Problem vs Solution Grid */}
        <div className="bg-[#0d0d0f] rounded-3xl p-6 sm:p-10 border border-white/10 mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold block mb-1">
              Tantangan Nyata UMKM Indonesia
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Masalah yang Kami Selesaikan
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-rose-500/40 transition-all">
              <div className="flex items-center gap-3 mb-3 text-rose-400">
                <AlertTriangle className="w-5 h-5" />
                <h4 className="font-bold text-white text-base">Keterbatasan Alat & Skill</h4>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Banyak pemilik UMKM kesulitan membuat video estetik karena tidak punya kamera profesional, lighting studio, maupun keahlian software video editing rumit.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-rose-500/40 transition-all">
              <div className="flex items-center gap-3 mb-3 text-rose-400">
                <DollarSign className="w-5 h-5" />
                <h4 className="font-bold text-white text-base">Biaya Konvensional Terlalu Mahal</h4>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Menyewa videografer, model, sewa studio, dan editor bisa menghabiskan jutaan rupiah per video—terlalu memberatkan cashflow usaha mikro dan kecil.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-rose-500/40 transition-all">
              <div className="flex items-center gap-3 mb-3 text-rose-400">
                <Clock className="w-5 h-5" />
                <h4 className="font-bold text-white text-base">Tertinggal Tren Video Shopping</h4>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Konsumen di TikTok Shop dan Shopee Live jauh lebih cepat membeli setelah menonton video. UMKM tanpa konten video tertinggal jauh dalam penjualan.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison: Conventional Videography vs Abang Sehat Studio AI */}
        <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#0d0d0f]">
          <div className="bg-black/60 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                Komparasi Keunggulan
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 tracking-tight">
                Jasa Video Konvensional vs {BUSINESS_IDENTITY.name}
              </h3>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold self-start sm:self-auto">
              ⚡ Hemat Waktu & Biaya Hingga 85%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Conventional */}
            <div className="p-6 sm:p-8 bg-rose-950/10">
              <div className="flex items-center gap-2 mb-6">
                <XCircle className="w-5 h-5 text-rose-400" />
                <h4 className="font-bold text-white text-lg">Videografer Konvensional</h4>
              </div>
              <ul className="space-y-4 text-xs text-white/60">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 text-xs font-bold border border-rose-500/30">✕</span>
                  <span>Waktu pengerjaan lama (1–2 minggu karena jadwal syuting & editing manual).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 text-xs font-bold border border-rose-500/30">✕</span>
                  <span>Biaya mahal (sewa kamera, lighting, model talent, transport & lokasi).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 text-xs font-bold border border-rose-500/30">✕</span>
                  <span>Revisi sulit dan memakan biaya tambahan jika perlu syuting ulang.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 text-xs font-bold border border-rose-500/30">✕</span>
                  <span>Fokus seringkali hanya pada brand besar dengan anggaran melimpah.</span>
                </li>
              </ul>
            </div>

            {/* Abang Sehat Studio AI */}
            <div className="p-6 sm:p-8 bg-cyan-950/10">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                <h4 className="font-bold text-cyan-300 text-lg">{BUSINESS_IDENTITY.name} (AI)</h4>
              </div>
              <ul className="space-y-4 text-xs text-white/80 font-medium">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 text-xs font-bold border border-cyan-500/30">✓</span>
                  <span><strong className="text-white">Super Cepat (1–3 Hari Kerja)</strong> langsung siap tayang di medsos & marketplace.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 text-xs font-bold border border-cyan-500/30">✓</span>
                  <span><strong className="text-white">Biaya Sangat Terjangkau</strong> dengan kualitas visual setara brand ternama.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 text-xs font-bold border border-cyan-500/30">✓</span>
                  <span><strong className="text-white">Revisi Fleksibel</strong> melalui tuning prompt AI tanpa ribet syuting ulang.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 text-xs font-bold border border-cyan-500/30">✓</span>
                  <span><strong className="text-white">Fokus Khusus UMKM</strong> dengan gaya bahasa ramah pembeli lokal Indonesia.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
