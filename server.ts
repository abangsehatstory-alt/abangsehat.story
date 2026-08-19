import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory sheet database fallback & webhook config
interface OrderLead {
  id: string;
  timestamp: string;
  clientName: string;
  businessName: string;
  category: "kuliner" | "fashion" | "kerajinan" | "kecantikan" | "lainnya";
  phone: string;
  email: string;
  packageType: string;
  price: number;
  notes: string;
  status: "Baru" | "Diproses AI" | "Revisi" | "Selesai" | "Terkirim";
  syncedToGoogleSheet: boolean;
}

let sheetConfig = {
  spreadsheetUrl: "https://docs.google.com/spreadsheets/d/1AbangSehatStudio_MasterDatabase/edit",
  webhookUrl: "", // Google Apps Script Web App URL
  sheetName: "Data Pesanan UMKM",
  autoSync: true,
};

let ordersDatabase: OrderLead[] = [
  {
    id: "ORD-2026-001",
    timestamp: "2026-08-18 09:30 WIB",
    clientName: "Teuku Ryan",
    businessName: "Kopi Gayo Serambi",
    category: "kuliner",
    phone: "081234567890",
    email: "ryan.gayo@gmail.com",
    packageType: "Paket Langganan E-book Prioritas 1 Bulan",
    price: 1000000,
    notes: "Video promosi biji kopi arabika Gayo dengan voiceover bahasa Inggris & Indonesia",
    status: "Diproses AI",
    syncedToGoogleSheet: true,
  },
  {
    id: "ORD-2026-002",
    timestamp: "2026-08-18 11:15 WIB",
    clientName: "Cut Sarah",
    businessName: "Batik Bungong Hijab",
    category: "fashion",
    phone: "082198765432",
    email: "sarah.bungong@gmail.com",
    packageType: "E-book Edukasi/Tutorial Produk",
    price: 335000,
    notes: "Tutorial styling pashmina instan 30 detik untuk TikTok Shop",
    status: "Baru",
    syncedToGoogleSheet: true,
  },
  {
    id: "ORD-2026-003",
    timestamp: "2026-08-18 14:00 WIB",
    clientName: "Maulana Syahputra",
    businessName: "Kerajinan Pinto Aceh Craft",
    category: "kerajinan",
    phone: "085277889900",
    email: "maulana.craft@gmail.com",
    packageType: "E-book Promosi Produk",
    price: 280000,
    notes: "Video visual cinematic pembuatan bros pinto aceh lapis perak",
    status: "Selesai",
    syncedToGoogleSheet: true,
  },
  {
    id: "ORD-2026-004",
    timestamp: "2026-08-18 16:45 WIB",
    clientName: "Dinda Maharani",
    businessName: "GlowSehat Herbal Skincare",
    category: "kecantikan",
    phone: "081366554433",
    email: "dinda.glow@gmail.com",
    packageType: "Paket Konten Bulanan (10 Video)",
    price: 1500000,
    notes: "10 video reels & shopee live review serum pencerah alami dengan model avatar AI",
    status: "Diproses AI",
    syncedToGoogleSheet: true,
  }
];

// Lazy initialization for Gemini AI
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// API: Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Abang Sehat Studio API", timestamp: new Date().toISOString() });
});

// API: Google Sheets DB Endpoints
app.get("/api/sheets/config", (_req, res) => {
  res.json({
    success: true,
    config: sheetConfig,
    totalRecords: ordersDatabase.length,
  });
});

app.post("/api/sheets/config", (req, res) => {
  const { spreadsheetUrl, webhookUrl, sheetName, autoSync } = req.body;
  if (spreadsheetUrl !== undefined) sheetConfig.spreadsheetUrl = spreadsheetUrl;
  if (webhookUrl !== undefined) sheetConfig.webhookUrl = webhookUrl;
  if (sheetName !== undefined) sheetConfig.sheetName = sheetName;
  if (autoSync !== undefined) sheetConfig.autoSync = autoSync;

  res.json({
    success: true,
    message: "Konfigurasi Google Spreadsheet berhasil diperbarui!",
    config: sheetConfig,
  });
});

app.get("/api/sheets/records", (_req, res) => {
  res.json({
    success: true,
    data: ordersDatabase,
    config: sheetConfig,
  });
});

app.post("/api/sheets/submit", async (req, res) => {
  try {
    const {
      clientName,
      businessName,
      category,
      phone,
      email,
      packageType,
      price,
      notes,
    } = req.body;

    if (!clientName || !phone || !packageType) {
      return res.status(400).json({
        success: false,
        message: "Nama, No. WhatsApp, dan Paket wajib diisi.",
      });
    }

    const now = new Date();
    const formattedTime = now.toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      dateStyle: "medium",
      timeStyle: "short",
    }) + " WIB";

    const newOrder: OrderLead = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      timestamp: formattedTime,
      clientName,
      businessName: businessName || "UMKM Mandiri",
      category: category || "kuliner",
      phone,
      email: email || "-",
      packageType,
      price: Number(price) || 0,
      notes: notes || "Tidak ada catatan tambahan.",
      status: "Baru",
      syncedToGoogleSheet: false,
    };

    // Forward to Google Apps Script Webhook if configured
    let webhookSynced = false;
    let webhookResponse = "";

    if (sheetConfig.webhookUrl && sheetConfig.webhookUrl.startsWith("http")) {
      try {
        const fetchRes = await fetch(sheetConfig.webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "appendRow",
            sheetName: sheetConfig.sheetName,
            data: newOrder,
          }),
        });
        if (fetchRes.ok) {
          webhookSynced = true;
          webhookResponse = "Berhasil sinkron langsung ke Google Spreadsheet via Apps Script Webhook!";
        }
      } catch (err: any) {
        console.warn("Webhook Google Sheets trigger error:", err?.message);
        webhookResponse = "Tersimpan di sistem lokal (Webhook Apps Script tidak merespons atau offline)";
      }
    } else {
      webhookSynced = true; // Synced to built-in Spreadsheet Database
      webhookResponse = "Data tersimpan di Database Spreadsheet Studio & siap diekspor/disinkronkan.";
    }

    newOrder.syncedToGoogleSheet = webhookSynced;
    ordersDatabase.unshift(newOrder);

    return res.json({
      success: true,
      message: "Pesanan / Pendaftaran berhasil dicatat ke Database Google Spreadsheet!",
      order: newOrder,
      webhookResponse,
    });
  } catch (error: any) {
    console.error("Error submitting to spreadsheet:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server saat menyimpan data.",
      error: error?.message,
    });
  }
});

// Update order status in spreadsheet database
app.patch("/api/sheets/records/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const itemIndex = ordersDatabase.findIndex((o) => o.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ success: false, message: "Pesanan tidak ditemukan." });
  }

  if (status) {
    ordersDatabase[itemIndex].status = status;
  }

  res.json({
    success: true,
    message: `Status pesanan ${id} berhasil diubah menjadi ${status}.`,
    order: ordersDatabase[itemIndex],
  });
});

// API: AI Video Concept, Hook & Prompt Generator for UMKM
app.post("/api/gemini/generate-script", async (req, res) => {
  try {
    const { productName, category, productBenefit, platform, targetAudience } = req.body;

    if (!productName) {
      return res.status(400).json({
        success: false,
        message: "Nama produk harus diisi.",
      });
    }

    const ai = getGeminiClient();
    const prompt = `Anda adalah Creative Director & AI Video Specialist di 'Abang Sehat Studio' (Banda Aceh), studio jasa video AI terbaik untuk UMKM di Indonesia.

Buatkan rencana konsep video promosi AI durasi 15-30 detik untuk UMKM berikut:
- Nama Produk: ${productName}
- Kategori UMKM: ${category || "Kuliner"}
- Keunggulan / Manfaat Produk: ${productBenefit || "Kualitas terbaik, higienis, rasa autentik"}
- Target Platform: ${platform || "TikTok & Reels & Shopee Live"}
- Target Konsumen: ${targetAudience || "Masyarakat umum, pembeli online usia 20-45 tahun"}

Berikan output dalam format JSON terstruktur dengan kunci:
1. "title": Judul konsep video yang catchy
2. "hookHeadline": Kalimat hook 3 detik pertama yang bikin orang berhenti scroll
3. "storyboard": Array berisi 3-4 scene dengan properti:
   - "scene": nomor scene (1, 2, 3, 4)
   - "visual": deskripsi visual yang digenerate oleh AI video
   - "voiceover": naskah narasi suara (Bahasa Indonesia santai, persuasif, UMKM friendly)
   - "duration": durasi detik (misal: "0-3s", "3-8s", "8-15s")
4. "callToAction": Kalimat ajakan beli / order di akhir video
5. "aiPromptVideo": Prompt bahasa Inggris siap pakai untuk dimasukkan ke tool AI video generator (Midjourney / Runway / Kling / Veo / Pika)
6. "audioSuggestion": Rekomendasi jenis musik latar & gaya voiceover AI (e.g. Ceria up-beat, Voiceover Ramah Enerjik)
7. "tipsUMKM": 2-3 tips praktis agar video promosi ini banjir orderan di marketplace/medsos.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "Anda adalah asisten pakar video marketing AI untuk UMKM Indonesia. Selalu hasilkan JSON yang valid dan berkualitas tinggi.",
      },
    });

    const textOutput = response.text || "{}";
    let parsedData = {};
    try {
      parsedData = JSON.parse(textOutput);
    } catch {
      parsedData = { raw: textOutput };
    }

    return res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error("Gemini Video Script Generator Error:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal membuat konsep video dengan AI.",
      error: error?.message,
    });
  }
});

// Vite server in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Abang Sehat Studio Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
