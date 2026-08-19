import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  Database,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  Phone,
  Mail,
  FileText,
  Tag,
} from "lucide-react";
import confetti from "canvas-confetti";
import { SERVICE_PACKAGES, BUSINESS_IDENTITY } from "../data/mockData";
import { OrderLead, ProductCategory } from "../types";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
  initialNotes?: string;
  initialCategory?: ProductCategory;
  onOrderSuccess: (newOrder: OrderLead) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialPackageId,
  initialNotes = "",
  initialCategory = "kuliner",
  onOrderSuccess,
}) => {
  const [selectedPackageId, setSelectedPackageId] = useState(
    initialPackageId || "priority-subscription"
  );
  const [clientName, setClientName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState<ProductCategory>(initialCategory);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState(initialNotes);

  const [loading, setLoading] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<OrderLead | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (initialPackageId) setSelectedPackageId(initialPackageId);
    if (initialNotes) setNotes(initialNotes);
    if (initialCategory) setCategory(initialCategory);
  }, [initialPackageId, initialNotes, initialCategory]);

  if (!isOpen) return null;

  const currentPkg =
    SERVICE_PACKAGES.find((p) => p.id === selectedPackageId) || SERVICE_PACKAGES[0];

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) {
      setErrorMessage("Nama lengkap dan No. WhatsApp wajib diisi.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/sheets/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          businessName: businessName || "UMKM Mandiri",
          category,
          phone,
          email: email || "-",
          packageType: currentPkg.name,
          price: currentPkg.price,
          notes: notes || "Tidak ada catatan tambahan.",
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.order) {
        setSubmittedOrder(resData.order);
        onOrderSuccess(resData.order);

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      } else {
        setErrorMessage(resData.message || "Gagal menyimpan data ke Google Spreadsheet.");
      }
    } catch (err: any) {
      setErrorMessage("Gagal terhubung ke server database: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedOrder(null);
    setClientName("");
    setBusinessName("");
    setPhone("");
    setEmail("");
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#0d0d0f] rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden my-8 text-[#e0e0e0]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#050505] via-[#101018] to-[#050505] p-6 sm:p-7 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1">
                <Database className="w-3.5 h-3.5" />
                <span>Terhubung Database Google Spreadsheet</span>
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Formulir Pemesanan & Konsultasi Video AI
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedOrder ? (
          /* Success Screen */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-2">
                ✓ ID Pesanan: {submittedOrder.id}
              </span>
              <h4 className="text-2xl font-bold text-white tracking-tight">
                Pemesanan Berhasil Dicatat!
              </h4>
              <p className="text-xs text-white/60 mt-2 max-w-md mx-auto">
                Data pesanan Anda telah tersimpan secara real-time ke dalam <strong className="text-cyan-400">Database Google Spreadsheet {BUSINESS_IDENTITY.name}</strong>.
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/40 font-semibold">Nama Pemesan:</span>
                <span className="font-bold text-white">{submittedOrder.clientName}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/40 font-semibold">Usaha UMKM:</span>
                <span className="font-bold text-white">{submittedOrder.businessName}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/40 font-semibold">Paket:</span>
                <span className="font-bold text-cyan-400">{submittedOrder.packageType}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-white/40 font-semibold">Total Investasi:</span>
                <span className="font-black text-white text-sm">
                  {formatRupiah(submittedOrder.price)}
                </span>
              </div>
            </div>

            {/* WhatsApp Direct Link */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/${BUSINESS_IDENTITY.whatsapp}?text=Halo%20Abang%20Sehat%20Studio,%20saya%20sudah%20mengisi%20form%20di%20website.%0A%0AID%20Pesanan:%20${submittedOrder.id}%0ANama:%20${encodeURIComponent(submittedOrder.clientName)}%0AUsaha:%20${encodeURIComponent(submittedOrder.businessName)}%0APaket:%20${encodeURIComponent(submittedOrder.packageType)}%0ATotal:%20${encodeURIComponent(formatRupiah(submittedOrder.price))}%0A%0AMohon%20konfirmasi%20proses%20selanjutnya.%20Terima%20kasih!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4)] transition-all hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Konfirmasi via WhatsApp Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleReset}
                className="w-full py-2.5 text-xs font-semibold text-white/50 hover:text-white cursor-pointer"
              >
                Tutup & Kembali ke Beranda
              </button>
            </div>
          </div>
        ) : (
          /* Order Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300 font-medium">
                {errorMessage}
              </div>
            )}

            {/* Package Selector */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2 flex items-center gap-1.5 font-bold">
                <Tag className="w-3.5 h-3.5 text-cyan-400" />
                <span>Pilih Paket Jasa / E-Book</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICE_PACKAGES.map((pkg) => (
                  <label
                    key={pkg.id}
                    className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                      selectedPackageId === pkg.id
                        ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="packageSelect"
                      value={pkg.id}
                      checked={selectedPackageId === pkg.id}
                      onChange={() => setSelectedPackageId(pkg.id)}
                      className="mt-0.5 text-cyan-400 accent-cyan-400"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">{pkg.name}</span>
                      </div>
                      <span className="text-xs font-black text-cyan-400 block mt-0.5 font-mono">
                        {formatRupiah(pkg.price)}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Client and Business Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-white/40" />
                  <span>Nama Lengkap Anda <span className="text-rose-400">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Teuku Ryan"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder:text-white/30 text-xs focus:outline-hidden focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1.5 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-white/40" />
                  <span>Nama Usaha / Brand UMKM</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Kopi Gayo Serambi"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder:text-white/30 text-xs focus:outline-hidden focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Category & Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1.5">
                  Kategori UMKM
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-hidden focus:border-cyan-400"
                >
                  <option value="kuliner">Kuliner & Minuman</option>
                  <option value="fashion">Fashion & Hijab</option>
                  <option value="kerajinan">Kerajinan Tangan</option>
                  <option value="kecantikan">Kecantikan & Skincare</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-white/40" />
                  <span>No. WhatsApp <span className="text-rose-400">*</span></span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="08123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder:text-white/30 text-xs focus:outline-hidden focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1.5 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-white/40" />
                  <span>Email (Opsional)</span>
                </label>
                <input
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder:text-white/30 text-xs focus:outline-hidden focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Notes / Special Request */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1.5 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-white/40" />
                <span>Catatan Khusus / Deskripsi Produk yang Mau Dibuatkan Video</span>
              </label>
              <textarea
                rows={2}
                placeholder="Ceritakan gambaran produk, gaya suara voiceover, atau target pembeli..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white placeholder:text-white/30 text-xs focus:outline-hidden focus:border-cyan-400 leading-relaxed"
              />
            </div>

            {/* Total Price Summary Bar */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono block">
                  Total Investasi Paket:
                </span>
                <span className="text-xl font-black text-white">
                  {formatRupiah(currentPkg.price)}
                </span>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Auto-Sync ke Google Sheet</span>
                </span>
                <p className="text-[10px] text-white/30">Garansi Layanan Abang Sehat Studio</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              id="order-submit-btn"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-widest transition-all shadow-[0_10px_25px_-5px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
            >
              {loading ? (
                <span>Menyimpan ke Google Spreadsheet...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Konfirmasi & Simpan ke Database Spreadsheet</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
