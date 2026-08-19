import React, { useState } from "react";
import {
  Play,
  Pause,
  Eye,
  Clock,
  Volume2,
  ArrowRight,
} from "lucide-react";
import { PORTFOLIO_SHOWCASE } from "../data/mockData";
import { PortfolioItem, ProductCategory } from "../types";

interface PortfolioShowcaseProps {
  onOrderSimilar: (title: string, category: ProductCategory) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ onOrderSimilar }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeVoiceId, setActiveVoiceId] = useState<string | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? PORTFOLIO_SHOWCASE
      : PORTFOLIO_SHOWCASE.filter((item) => item.category === activeCategory);

  const toggleVoicePreview = (id: string, text: string) => {
    if (activeVoiceId === id) {
      window.speechSynthesis.cancel();
      setActiveVoiceId(null);
      return;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      utterance.onend = () => setActiveVoiceId(null);
      utterance.onerror = () => setActiveVoiceId(null);

      window.speechSynthesis.speak(utterance);
      setActiveVoiceId(id);
    } else {
      setActiveVoiceId(id);
      setTimeout(() => setActiveVoiceId(null), 3000);
    }
  };

  return (
    <section id="portofolio" className="py-16 md:py-24 bg-[#050505] text-[#e0e0e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Play className="w-3.5 h-3.5" />
            <span>Portofolio & Studi Kasus</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
            Contoh Karya Video AI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Abang Sehat Studio
            </span>
          </h2>
          <p className="mt-4 text-base text-white/50 leading-relaxed">
            Dibuat khusus untuk format vertikal (TikTok, Instagram Reels & Shopee Video) dengan hook tajam, visual estetik ultra-HD, dan narasi voiceover persuasif.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-cyan-500/40"
              }`}
            >
              Semua Portofolio
            </button>
            <button
              onClick={() => setActiveCategory("kuliner")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === "kuliner"
                  ? "bg-amber-500 text-black font-extrabold shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-amber-500/40"
              }`}
            >
              ☕ Kuliner & Kopi Aceh
            </button>
            <button
              onClick={() => setActiveCategory("fashion")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === "fashion"
                  ? "bg-purple-500 text-white font-extrabold shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-purple-500/40"
              }`}
            >
              👗 Fashion & Hijab
            </button>
            <button
              onClick={() => setActiveCategory("kerajinan")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === "kerajinan"
                  ? "bg-cyan-500 text-black font-extrabold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-cyan-500/40"
              }`}
            >
              🏺 Kerajinan Pinto Aceh
            </button>
            <button
              onClick={() => setActiveCategory("kecantikan")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === "kecantikan"
                  ? "bg-emerald-500 text-black font-extrabold shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-emerald-500/40"
              }`}
            >
              ✨ Kecantikan & Skincare
            </button>
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item: PortfolioItem) => {
            const isPlaying = activeVoiceId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-[#0d0d0f] overflow-hidden shadow-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Video Mockup Frame */}
                  <div className="relative aspect-16/9 bg-black overflow-hidden">
                    <img
                      src={item.videoThumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-between p-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold text-cyan-400 uppercase tracking-wider border border-cyan-500/30">
                          {item.platform}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] flex items-center gap-1 border border-emerald-500/30">
                            <Eye className="w-3 h-3" /> {item.viewsEstimate}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px] flex items-center gap-1 border border-white/10">
                            <Clock className="w-3 h-3" /> {item.duration}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="inline-block px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[9px] font-bold uppercase tracking-wider border border-cyan-500/30 mb-1">
                          {item.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <p className="text-xs text-white/60 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Audio Voiceover Demo Player */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Volume2 className="w-4 h-4 text-cyan-400" />
                          <span>Simulasi Suara AI: {item.audioVoiceType}</span>
                        </span>

                        <button
                          onClick={() => toggleVoicePreview(item.id, item.voiceoverSampleText)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isPlaying
                              ? "bg-rose-500 text-white animate-pulse"
                              : "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40"
                          }`}
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>Stop Narasi</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Dengar Narasi</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-white/70 italic bg-black/40 p-2.5 rounded-lg border border-white/5">
                        "{item.voiceoverSampleText}"
                      </p>
                    </div>

                    {/* AI Technology Stack Used */}
                    <div>
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1.5">
                        Teknologi AI yang Digunakan:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.aiTechUsed.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-md bg-white/5 text-cyan-300 border border-white/10 text-[10px] font-semibold font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onOrderSimilar(item.title, item.category)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 text-cyan-400 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Pesan Video Konsep Serupa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
