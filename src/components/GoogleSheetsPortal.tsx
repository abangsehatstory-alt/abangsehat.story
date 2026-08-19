import React, { useState } from "react";
import {
  Database,
  X,
  FileSpreadsheet,
  RefreshCw,
  Search,
  ExternalLink,
  Code,
  Check,
  Copy,
  Sliders,
  Sparkles,
} from "lucide-react";
import { OrderLead, GoogleSheetConfig } from "../types";

interface GoogleSheetsPortalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderLead[];
  sheetConfig: GoogleSheetConfig;
  onUpdateStatus: (id: string, status: OrderLead["status"]) => void;
  onSaveConfig: (config: GoogleSheetConfig) => void;
  onRefreshData: () => void;
}

export const GoogleSheetsPortal: React.FC<GoogleSheetsPortalProps> = ({
  isOpen,
  onClose,
  orders,
  sheetConfig,
  onUpdateStatus,
  onSaveConfig,
  onRefreshData,
}) => {
  const [activeTab, setActiveTab] = useState<"records" | "config" | "script">("records");
  const [searchQuery, setSearchQuery] = useState("");
  const [sheetIdInput, setSheetIdInput] = useState(sheetConfig.spreadsheetId || "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms");
  const [webhookInput, setWebhookInput] = useState(sheetConfig.webhookUrl || "");
  const [copiedScript, setCopiedScript] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase();
    return (
      o.clientName.toLowerCase().includes(q) ||
      o.businessName.toLowerCase().includes(q) ||
      o.packageType.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q) ||
      o.phone.toLowerCase().includes(q)
    );
  });

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getStatusBadge = (status: OrderLead["status"]) => {
    switch (status) {
      case "Selesai":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            ✓ Selesai
          </span>
        );
      case "Sedang Diproses":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            ⚡ Sedang Diproses
          </span>
        );
      case "Dihubungi":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
            💬 Dihubungi
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            ⏳ Pesanan Masuk
          </span>
        );
    }
  };

  const appsScriptCode = `// Google Apps Script: Abang Sehat Studio CRM
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Pastikan Header Kolom jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "ID Pesanan",
        "Waktu Masuk",
        "Nama Klien",
        "Nama Usaha",
        "Kategori UMKM",
        "No. WhatsApp",
        "Email",
        "Paket Jasa",
        "Total Biaya",
        "Status",
        "Catatan Khusus"
      ]);
      sheet.getRange("A1:K1").setFontWeight("bold").setBackground("#0f172a").setFontColor("#38bdf8");
    }
    
    sheet.appendRow([
      data.id || "ORD-" + new Date().getTime(),
      new Date().toLocaleString("id-ID"),
      data.clientName,
      data.businessName,
      data.category,
      data.phone,
      data.email,
      data.packageType,
      data.price,
      "Pesanan Masuk",
      data.notes
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data berhasil dicatat ke Google Spreadsheet!"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      spreadsheetId: sheetIdInput,
      spreadsheetUrl: sheetConfig.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${sheetIdInput}/edit`,
      sheetName: sheetConfig.sheetName,
      webhookUrl: webhookInput,
      autoSync: true,
      lastSyncTime: new Date().toLocaleTimeString("id-ID"),
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl bg-[#0d0d0f] rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden my-8 text-[#e0e0e0] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#050505] via-[#101018] to-[#050505] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Google Spreadsheet Database CRM
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  ONLINE LIVE SYNC
                </span>
              </div>
              <p className="text-xs text-white/50">
                Pencatatan data pesanan, nomor kontak UMKM, dan status pengerjaan video AI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={onRefreshData}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-cyan-400 border border-white/10 transition-colors cursor-pointer"
              title="Refresh Data Sheet"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 px-6 bg-[#08080a]">
          <button
            onClick={() => setActiveTab("records")}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "records"
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Daftar Pesanan ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("script")}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "script"
                ? "border-purple-400 text-purple-400"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Kode Google Apps Script Webhook</span>
          </button>

          <button
            onClick={() => setActiveTab("config")}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "config"
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Pengaturan URL Spreadsheet</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === "records" && (
            <div className="space-y-4">
              {/* Search & Actions Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    placeholder="Cari nama pemesan, usaha, atau ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder:text-white/30 focus:outline-hidden focus:border-cyan-400"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <a
                    href={`https://docs.google.com/spreadsheets/d/${sheetConfig.spreadsheetId}/edit`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Buka di Google Sheets</span>
                  </a>
                </div>
              </div>

              {/* Data Table */}
              <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0a0a0d]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-white/80">
                    <thead className="bg-white/5 border-b border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">ID Pesanan</th>
                        <th className="py-3 px-4">Klien & Usaha UMKM</th>
                        <th className="py-3 px-4">Kategori</th>
                        <th className="py-3 px-4">Kontak WhatsApp</th>
                        <th className="py-3 px-4">Paket Dipilih</th>
                        <th className="py-3 px-4">Investasi</th>
                        <th className="py-3 px-4">Status Produksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                              {ord.id}
                              <span className="block text-[10px] text-white/30 font-normal">
                                {ord.timestamp}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-bold text-white block">{ord.clientName}</span>
                              <span className="text-[11px] text-white/50">{ord.businessName}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-medium capitalize">
                                {ord.category}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-xs">
                              <a
                                href={`https://wa.me/${ord.phone.replace(/\D/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:underline flex items-center gap-1"
                              >
                                {ord.phone}
                              </a>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-white">{ord.packageType}</span>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">
                              {formatRupiah(ord.price)}
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={ord.status}
                                onChange={(e) =>
                                  onUpdateStatus(ord.id, e.target.value as OrderLead["status"])
                                }
                                className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/15 text-[11px] font-semibold text-white focus:outline-hidden focus:border-cyan-400"
                              >
                                <option value="Pesanan Masuk">Pesanan Masuk</option>
                                <option value="Dihubungi">Dihubungi</option>
                                <option value="Sedang Diproses">Sedang Diproses</option>
                                <option value="Selesai">Selesai</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-white/40">
                            Tidak ada data pesanan yang sesuai dengan kata kunci pencarian.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/40 pt-2 font-mono">
                <span>Total: {filteredOrders.length} Pesanan Terdata</span>
                <span>Auto-sync aktif: {sheetConfig.lastSyncTime || "Realtime"}</span>
              </div>
            </div>
          )}

          {activeTab === "script" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-purple-300 mb-1">
                    Panduan Integrasi Google Apps Script (Webhook Otomatis)
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Salin script di bawah ini ke <strong>Extensions &gt; Apps Script</strong> pada Google Spreadsheet Anda. Deploy sebagai Web App dengan akses "Anyone" agar form pemesanan langsung menulis baris baru tanpa perantara.
                  </p>
                </div>
                <button
                  onClick={handleCopyScript}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                >
                  {copiedScript ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Script</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Area */}
              <div className="rounded-2xl border border-white/10 bg-black/80 p-4 font-mono text-xs text-cyan-300 overflow-x-auto">
                <pre>{appsScriptCode}</pre>
              </div>
            </div>
          )}

          {activeTab === "config" && (
            <form onSubmit={handleSaveSettings} className="space-y-5 max-w-xl">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70">
                Hubungkan Google Spreadsheet Anda sendiri dengan memasukkan Spreadsheet ID dan Webhook URL dari Google Apps Script.
              </div>

              {saveSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-300 font-bold">
                  ✓ Konfigurasi Google Spreadsheet berhasil disimpan!
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-1.5">
                  Google Spreadsheet ID
                </label>
                <input
                  type="text"
                  value={sheetIdInput}
                  onChange={(e) => setSheetIdInput(e.target.value)}
                  placeholder="Contoh: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:outline-hidden focus:border-cyan-400"
                />
                <span className="text-[10px] text-white/40 mt-1 block">
                  Dapat ditemukan di URL: https://docs.google.com/spreadsheets/d/<strong>[SPREADSHEET_ID]</strong>/edit
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-1.5">
                  Google Apps Script Webhook URL (Opsional)
                </label>
                <input
                  type="text"
                  value={webhookInput}
                  onChange={(e) => setWebhookInput(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:outline-hidden focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-[0_10px_25px_-5px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
              >
                Simpan Konfigurasi Spreadsheet
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
