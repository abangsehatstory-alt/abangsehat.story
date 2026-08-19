import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  RefreshCw,
  Copy,
  Check,
  ArrowRight,
  Lightbulb,
  FileText,
  Volume2,
  Film,
} from "lucide-react";
import { AIScriptResult, ProductCategory } from "../types";

interface AIScriptGeneratorProps {
  onOrderWithScript: (scriptSummary: string, category: ProductCategory) => void;
}

const PRESET_EXAMPLES = [
  {
    name: "Kopi Gayo Arabika Drip Bag",
    category: "kuliner" as ProductCategory,
    benefit: "Kopi asli dataran tinggi Gayo Aceh, praktis diseduh di mana saja dalam 1 menit.",
    platform: "TikTok & Reels",
  },
  {
    name: "Hijab Voal Motif Pinto Aceh",
    category: "fashion" as ProductCategory,
    benefit: "Bahan voal premium tidak licin, tegak di dahi, motif eksklusif khas warisan Aceh.",
    platform: "TikTok Shop & Shopee Video",
  },
  {
    name: "Bros Kerajinan Perak Aceh Handmade",
    category: "kerajinan" as ProductCategory,
    benefit: "Dibuat tangan oleh pengrajin lokal, dilapisi anti-karat, kemasan kotak kado mewah.",
    platform: "Instagram Reels & TikTok",
  },
  {
    name: "Serum Pencerah Alami Ekstrak Daun Pegagan",
    category: "kecantikan" as ProductCategory,
    benefit: "Menyamarkan noda hitam dan mencerahkan kulit kusam tanpa alkohol dan aman bumil.",
    platform: "Shopee Live & TikTok Shop",
  },
];

export const AIScriptGenerator: React.FC<AIScriptGeneratorProps> = ({ onOrderWithScript }) => {
  const [productName, setProductName] = useState("Kopi Gayo Arabika Drip Bag");
  const [category, setCategory] = useState<ProductCategory>("kuliner");
  const [productBenefit, setProductBenefit] = useState(
    "Kopi asli dataran tinggi Gayo Aceh, praktis diseduh di mana saja dalam 1 menit tanpa ampas."
  );
  const [platform, setPlatform] = useState("TikTok Shop & Reels");
  const [targetAudience, setTargetAudience] = useState("Pecinta kopi praktis, pekerja kantor & mahasiswa usia 20-40 th");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIScriptResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!productName.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/gemini/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          category,
          productBenefit,
          platform,
          targetAudience,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setResult(resData.data);
      } else {
        // Fallback rich structured sample
        setResult({
          title: `Konsep Video Viral: ${productName}`,
          hookHeadline: `Jangan ngaku pecinta ${category} kalau belum cobain ${productName} yang lagi viral ini! ☕✨`,
          storyboard: [
            {
              scene: 1,
              visual: `Close-up cinematic kemasan ${productName} dibuka dengan lighting hangat dan uap menggoda.`,
              voiceover: `Pagi-pagi mager tapi butuh asupan semangat? Tenang, cukup 1 menit aja!`,
              duration: "0-4s",
            },
            {
              scene: 2,
              visual: `Proses unboxing & demonstrasi pemakaian praktis ${productBenefit}.`,
              voiceover: `Nggak ribet, kualitas ${productBenefit} langsung terasa di tegukan pertama.`,
              duration: "4-12s",
            },
            {
              scene: 3,
              visual: `Testimoni ekspresi puas konsumen saat menikmati produk dan penampakan kemasan eksklusif.`,
              voiceover: `Ribuan UMKM sudah buktikan khasiatnya. Sekarang giliran kamu yang rasakan bedanya!`,
              duration: "12-20s",
            },
            {
              scene: 4,
              visual: `Tampilan harga promo, voucher diskon gratis ongkir dan icon keranjang kuning/checkout.`,
              voiceover: `Klik keranjang kuning di bawah sekarang sebelum promo diskon gajian habis!`,
              duration: "20-25s",
            },
          ],
          callToAction: `Segera klik link bio atau checkout di TikTok Shop sekarang untuk dapat harga spesial!`,
          aiPromptVideo: `Cinematic commercial shot of ${productName}, 8k resolution, soft ambient lighting, macro close-up pouring action, high aesthetic, photorealistic, viral TikTok product style.`,
          audioSuggestion: `Lagu lofi ceria up-beat dengan tempo sedang, Voiceover Pria/Wanita ramah bersemangat.`,
          tipsUMKM: [
            "Gunakan 3 detik pertama untuk visual hook sebelum penonton scroll.",
            "Sematkan teks diskon atau voucher gratis ongkir di pojok atas video.",
            "Posting di jam sibuk pembeli online (12.00 siang & 19.30 malam WIB).",
          ],
        });
      }
    } catch {
      setResult({
        title: `Konsep Video Promosi AI: ${productName}`,
        hookHeadline: `Satu-satunya produk ${category} yang bikin pelanggan auto repeat order!`,
        storyboard: [
          {
            scene: 1,
            visual: `Visual hook dramatis memperlihatkan problem yang sering dialami pembeli.`,
            voiceover: `Sering kecewa sama produk yang biasa-biasa aja? Ini rahasianya!`,
            duration: "0-3s",
          },
          {
            scene: 2,
            visual: `Macro shot keunggulan utama: ${productBenefit}`,
            voiceover: `Dibuat dengan standar kualitas terbaik untuk hasil maksimal.`,
            duration: "3-10s",
          },
          {
            scene: 3,
            visual: `Call to action dengan diskon spesial UMKM.`,
            voiceover: `Pesan sekarang sebelum kehabisan stok hari ini!`,
            duration: "10-15s",
          },
        ],
        callToAction: "Order sekarang melalui link di bio / WhatsApp!",
        aiPromptVideo: `Hyper-realistic advertising shot of ${productName}, commercial product showcase, cinematic lighting, 4k.`,
        audioSuggestion: "Modern upbeat acoustic with warm narration",
        tipsUMKM: ["Perhatikan lighting natural produk", "Gunakan subtitle font tebal yang mudah dibaca"],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const textToCopy = `=== ${result.title} ===
Hook: ${result.hookHeadline}

Storyboard:
${result.storyboard.map((s) => `[Scene ${s.scene} - ${s.duration}]\nVisual: ${s.visual}\nVoiceover: "${s.voiceover}"`).join("\n\n")}

CTA: ${result.callToAction}
AI Video Prompt: ${result.aiPromptVideo}
Musik: ${result.audioSuggestion}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyPreset = (preset: (typeof PRESET_EXAMPLES)[0]) => {
    setProductName(preset.name);
    setCategory(preset.category);
    setProductBenefit(preset.benefit);
    setPlatform(preset.platform);
  };

  return (
    <section id="ai-generator" className="py-16 md:py-24 bg-[#08080a] border-t border-white/10 text-[#e0e0e0] relative overflow-hidden">
      {/* Glow Ambient Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-cyan-600/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Creative Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
            Generator Konsep Video & Naskah AI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Gratis
            </span>
          </h2>
          <p className="mt-3 text-white/50 text-sm sm:text-base leading-relaxed">
            Ketik nama dan keunggulan produk UMKM Anda, biarkan AI merancang naskah hook 3 detik, storyboard visual, prompt AI video, hingga rekomendasi voiceover dalam hitungan detik!
          </p>
        </div>

        {/* Preset Quick Buttons */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-white/40 mr-2 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-cyan-400" /> Coba Contoh Preset:
          </span>
          {PRESET_EXAMPLES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-xs font-medium text-white/80 transition-all cursor-pointer"
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Main Grid: Input Form & Generated Result */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Product Specs */}
          <div className="lg:col-span-5 bg-[#0d0d0f] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Detail Produk UMKM Anda</span>
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1">
                  Nama Produk <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Contoh: Kopi Gayo Arabika Drip Bag"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder:text-white/30 text-xs focus:outline-hidden focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1">
                    Kategori UMKM
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-hidden focus:border-cyan-400"
                  >
                    <option value="kuliner">Kuliner & Minuman</option>
                    <option value="fashion">Fashion & Hijab</option>
                    <option value="kerajinan">Kerajinan & Seni</option>
                    <option value="kecantikan">Kecantikan & Skincare</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1">
                    Target Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-hidden focus:border-cyan-400"
                  >
                    <option value="TikTok Shop & Reels">TikTok Shop & Reels</option>
                    <option value="Shopee Video & Live">Shopee Video & Live</option>
                    <option value="Instagram Feed & Story">Instagram Feed & Story</option>
                    <option value="Semua Platform">Semua Platform Medsos</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1">
                  Keunggulan / Manfaat Utama Produk
                </label>
                <textarea
                  rows={3}
                  value={productBenefit}
                  onChange={(e) => setProductBenefit(e.target.value)}
                  placeholder="Ceritakan keistimewaan produk, bahan, atau promo yang ingin diangkat..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white placeholder:text-white/30 text-xs leading-relaxed focus:outline-hidden focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1">
                  Target Konsumen
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Misal: Pecinta kopi, ibu muda, remaja TikTok"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white placeholder:text-white/30 text-xs focus:outline-hidden focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                id="ai-generate-submit-btn"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_10px_25px_-5px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-cyan-200" />
                    <span>AI Sedang Meracik Konsep Video...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-200" />
                    <span>Generate Naskah & Visual AI</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Output: Interactive Storyboard & Prompt Result */}
          <div className="lg:col-span-7 bg-[#0d0d0f] border border-white/10 rounded-2xl p-6 min-h-[420px] flex flex-col justify-between shadow-2xl">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 animate-bounce shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Gemini AI Sedang Bekerja...</h4>
                <p className="text-xs text-white/40 mt-1 max-w-sm">
                  Menyusun naskah hook 3 detik, skenario visual 4 scene, dan prompt AI video khusus untuk {productName}.
                </p>
              </div>
            ) : result ? (
              <div className="space-y-5">
                {/* Result Header */}
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono font-bold uppercase tracking-wider">
                      ✨ Hasil Konsep Siap Produksi
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1.5">
                      {result.title}
                    </h3>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/80 border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-cyan-400">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Naskah</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Hook 3 Detik Headline Box */}
                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30">
                  <span className="text-[10px] font-mono text-purple-300 uppercase tracking-widest block mb-1 font-bold">
                    🔥 Hook 3 Detik Pertama (Stop Scrolling):
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-purple-100 italic">
                    "{result.hookHeadline}"
                  </p>
                </div>

                {/* Storyboard 3-4 Scenes */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2 flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Storyboard Scene Breakdown</span>
                  </h4>
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {result.storyboard.map((scene) => (
                      <div
                        key={scene.scene}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs"
                      >
                        <div className="flex items-center justify-between text-cyan-400 font-bold mb-1">
                          <span>Scene {scene.scene}</span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/60">
                            {scene.duration}
                          </span>
                        </div>
                        <p className="text-white/70 mb-1">
                          <strong className="text-white">Visual:</strong> {scene.visual}
                        </p>
                        <p className="text-emerald-400">
                          <strong className="text-emerald-300">Voiceover:</strong> "{scene.voiceover}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audio & AI Prompt info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Rekomendasi Audio & Voice:</span>
                    </div>
                    <p className="text-[11px] text-white/60">{result.audioSuggestion}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                    <div className="flex items-center gap-1.5 text-purple-400 font-semibold mb-1">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Call to Action (CTA):</span>
                    </div>
                    <p className="text-[11px] text-white/60">{result.callToAction}</p>
                  </div>
                </div>

                {/* Direct Action to Order Studio */}
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-white/40 text-center sm:text-left">
                    Ingin naskah ini dibuatkan langsung jadi video AI siap tayang?
                  </span>
                  <button
                    onClick={() =>
                      onOrderWithScript(
                        `Konsep: ${result.title} | Hook: ${result.hookHeadline}`,
                        category
                      )
                    }
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  >
                    <span>Pesan Video dengan Naskah Ini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white">Siap Membuat Ide Konten Anda</h4>
                <p className="text-xs text-white/40 mt-1 max-w-sm">
                  Isi formulir di sebelah kiri dan klik tombol <strong>Generate Naskah & Visual AI</strong> untuk melihat racikan konsep video kreatif.
                </p>
                <button
                  onClick={() => handleGenerate()}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-cyan-400 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Coba Generate Contoh Kopi Gayo</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
