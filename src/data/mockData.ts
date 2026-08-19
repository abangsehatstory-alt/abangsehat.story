import { ServicePackage, PortfolioItem } from "../types";

export const BUSINESS_IDENTITY = {
  name: "Abang Sehat Studio",
  type: "Jasa kreatif digital berbasis teknologi AI (produksi video promosi & edukasi)",
  tagline: "Video Keren, UMKM Makin Dikenal — Cepat, Murah, Berkualitas dengan AI",
  location: "Banda Aceh, Aceh (Melayani secara online ke seluruh Indonesia)",
  email: "abangsehat.story@gmail.com",
  phone: "+62 852-7700-8899",
  whatsapp: "6285277008899",
  address: "Jl. Teuku Nyak Arief, Syiah Kuala, Kota Banda Aceh, Aceh 23111",
  targetMarket: {
    age: "22 – 45 tahun",
    gender: "Pria & Wanita",
    status: "Pemilik/Pengelola UMKM (Kuliner, Fashion, Kerajinan Tangan, Kecantikan)",
    habits: "Aktif berjualan di TikTok, Instagram, Shopee Live, Facebook; butuh video promosi cepat tanpa ribet dan ramah kantong."
  }
};

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: "ebook-promo",
    name: "E-Book Promosi Produk",
    tagline: "Panduan Lengkap & Strategi Video Promosi AI",
    category: "ebook",
    price: 280000,
    originalPrice: 450000,
    badge: "Best Value",
    description: "Keseluruhan panduan lengkap pembuatan video promosi produk menggunakan AI untuk meningkatkan penjualan di TikTok, IG Reels, dan Shopee.",
    features: [
      "Modul E-Book Keseluruhan Panduan (PDF Interaktif)",
      "Bank 50+ Prompt AI Siap Pakai (Midjourney, Runway, Kling, CapCut)",
      "Template Copywriting Hook 3 Detik Pertama",
      "Panduan Voiceover AI Multi-Bahasa (Indonesia & Daerah)",
      "Akses Grup Komunitas & Update Prompt AI"
    ],
    recommendedFor: "UMKM yang ingin belajar mandiri membuat video iklan produk dengan modal hemat.",
    iconName: "BookOpen"
  },
  {
    id: "ebook-tutorial",
    name: "E-Book Edukasi / Tutorial Produk",
    tagline: "Panduan Video Cara Pakai & Unboxing AI",
    category: "ebook",
    price: 335000,
    originalPrice: 550000,
    badge: "Terpopuler",
    popular: true,
    description: "Keseluruhan panduan mendalam membuat video tutorial cara pemakaian, animasi langkah produksi, dan unboxing otomatis berbasis AI.",
    features: [
      "Modul E-Book Keseluruhan Panduan Tutorial & Edukasi",
      "Formula Video Unboxing Tanpa Harus Tampil Wajah",
      "Struktur Video Cara Pakai yang Mengubah Penonton Jadi Pembeli",
      "Template Storyboard 4-Scene untuk TikTok Shop & Shopee Live",
      "Bonus: 30 Sound Effect & Audio Narasi AI Komersial",
      "Daftar Rekomendasi Tool AI Gratis & Berbayar Terbaik"
    ],
    recommendedFor: "UMKM Skincare, Fashion, Alat Dapur & Kerajinan yang butuh edukasi produk ke pembeli.",
    iconName: "Sparkles"
  },
  {
    id: "priority-subscription",
    name: "Paket Langganan E-Book Prioritas (1 Bulan)",
    tagline: "Panduan Lengkap + Konsultasi & Mentoring 1 Bulan",
    category: "subscription",
    price: 1000000,
    originalPrice: 1850000,
    badge: "VIP Mentoring",
    description: "Paket VIP komprehensif: Dapatkan kedua E-book lengkap ditambah pendampingan & konsultasi intensif langsung selama 1 bulan penuh bersama tim Abang Sehat Studio.",
    features: [
      "Semua Akses E-Book Promosi + Edukasi Lengkap",
      "Konsultasi 1-on-1 via WhatsApp & Google Meet (1 Bulan Penuh)",
      "Bedah Akun & Review Skrip Video Khusus Produk UMKM Anda",
      "Bantuan Perbaikan Prompt AI & Optimasi Video Iklan",
      "Prioritas Pengerjaan Jasa Video Studio Diskon Khusus 30%",
      "Garansi Bimbingan Sampai Bisa Rilis Video Promosi Pertama"
    ],
    recommendedFor: "Pemilik UMKM yang ingin langsung praktik dengan bimbingan praktisi ahli dan hasil terjamin.",
    iconName: "Crown"
  },
  {
    id: "service-promo-video",
    name: "Jasa Pembuatan Video Promosi AI (DFY)",
    tagline: "Video 15-30 Detik Siap Posting Tanpa Ribet",
    category: "video",
    price: 175000,
    originalPrice: 350000,
    badge: "Done-For-You",
    duration: "1-2 Hari Kerja",
    description: "Kami yang buatkan video promosi produk Anda dari awal hingga akhir menggunakan AI canggih: visual estetik, naskah hook, voiceover jernih, dan musik.",
    features: [
      "1 Video Promosi 15–30 Detik Format Vertikal (9:16)",
      "Visual AI Ultra-HD Khusus Produk Anda",
      "Voiceover AI Bahasa Indonesia / Inggris / Daerah",
      "Background Music Komersial Bebas Hak Cipta",
      "Revisi Minor 2x via Prompt Tuning",
      "File Dikirim via Google Drive Full HD 1080p"
    ],
    recommendedFor: "UMKM yang tidak sempat bikin konten dan ingin langsung terima beres video siap tayang.",
    iconName: "Video"
  },
  {
    id: "service-subscription-monthly",
    name: "Paket Langganan Video Bulanan (10 Video)",
    tagline: "Konten Rutin & Konsisten Setiap Minggu",
    category: "subscription",
    price: 1450000,
    originalPrice: 2250000,
    badge: "Hemat 45%",
    duration: "1 Bulan",
    description: "Paket langganan 8–12 video promosi & edukasi per bulan agar feeds medsos dan toko online UMKM Anda selalu aktif dan relevan.",
    features: [
      "10 Video AI Promosi + Edukasi per Bulan",
      "Kalender Konten & Rekomendasi Jadwal Posting",
      "Voiceover AI Multi-Gaya (Santai, Antusias, Elegan)",
      "Gratis Custom Subtitle / Captions Berwarna",
      "Revisi Cepat & Dedicated Support WhatsApp",
      "Laporan Analisis Kinerja Konten Bulanan"
    ],
    recommendedFor: "UMKM aktif yang ingin konsisten posting di TikTok Shop, Shopee Live & Reels.",
    iconName: "CalendarSync"
  }
];

export const PORTFOLIO_SHOWCASE: PortfolioItem[] = [
  {
    id: "port-1",
    title: "Promosi Kopi Gayo Arabika Premium",
    category: "kuliner",
    duration: "25 Detik",
    platform: "TikTok & Shopee Video",
    description: "Visual cinematic biji kopi diseduh dengan uap aroma hangat, lighting hangat, dan voiceover mendalam yang menggugah selera pecinta kopi nusantara.",
    videoThumbnail: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    viewsEstimate: "45.2K Views",
    aiTechUsed: ["Runway Gen-3", "Midjourney v6", "ElevenLabs Voice AI", "CapCut Pro"],
    voiceoverSampleText: "Rasakan keaslian biji kopi Arabika Gayo pegunungan Aceh, dipanggang sempurna dengan aroma yang menenangkan setiap pagi Anda.",
    audioVoiceType: "Suara Pria Bariton Hangat & Ramah"
  },
  {
    id: "port-2",
    title: "Tutorial Hijab Voal Bungong Seulanga",
    category: "fashion",
    duration: "28 Detik",
    platform: "Instagram Reels & TikTok Shop",
    description: "Animasi AI model anggun memperagakan 3 cara melipat dan memakai hijab voal anti-kusut dalam waktu kurang dari 30 detik.",
    videoThumbnail: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    viewsEstimate: "82.9K Views",
    aiTechUsed: ["Pika Labs", "Midjourney AI Avatar", "Suno Background Beats"],
    voiceoverSampleText: "Nggak perlu bingung styling hijab pas buru-buru! Cukup 3 langkah simpel ini, hijab tetap rapi tegak paripurna seharian.",
    audioVoiceType: "Suara Wanita Ceria & Enerjik"
  },
  {
    id: "port-3",
    title: "Unboxing & Filosofi Kerajinan Pinto Aceh",
    category: "kerajinan",
    duration: "30 Detik",
    platform: "TikTok, Shopee Live & IG",
    description: "Video unboxing elegan dengan makro visual ukiran khas motif Pinto Aceh berlapis emas, disertai narasi sejarah singkat dan nilai kulturalnya.",
    videoThumbnail: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    viewsEstimate: "31.4K Views",
    aiTechUsed: ["Kling AI", "Magnific Upscaler", "Gemini Scripting"],
    voiceoverSampleText: "Bukan sekadar perhiasan, motif Pinto Aceh adalah simbol keramahtamahan dan keteguhan hati. Sentuhan warisan agung di jemari Anda.",
    audioVoiceType: "Suara Pria Inspiratif & Elegan"
  },
  {
    id: "port-4",
    title: "Review & Khasiat Serum Glow Herbal Aceh",
    category: "kecantikan",
    duration: "20 Detik",
    platform: "TikTok Shop & Reels",
    description: "Visual mikro partikel serum menyerap ke pori-pori kulit secara instan dengan efek glowing bercahaya alami dan teks hook diskon gajian.",
    videoThumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    viewsEstimate: "115.8K Views",
    aiTechUsed: ["Midjourney Micro", "Luma Dream Machine", "Topaz Video AI"],
    voiceoverSampleText: "Kulit kusam bikin insecure pas foto bareng? Serum herbal alami ini bikin kulit kenyal dan cerah dalam 7 hari tanpa rasa lengket!",
    audioVoiceType: "Suara Wanita Muda Fresh & Persuasif"
  }
];

export const SWOT_DATA = {
  strengths: [
    { title: "Biaya Produksi Rendah", desc: "Berbasis AI generatif mutakhir, memangkas biaya sewa alat, studio, dan kru hingga 85%." },
    { title: "Proses Cepat 1–3 Hari", desc: "Video siap tayang jauh lebih kilat dibanding videografi konvensional yang memakan waktu berminggu-minggu." },
    { title: "Fleksibel untuk Revisi", desc: "Perubahan visual dan naskah mudah disesuaikan via prompt tuning tanpa perlu syuting ulang." },
    { title: "Model Bisnis Recurring", desc: "Menghasilkan pendapatan berulang melalui paket langganan bulanan 8-12 video & konsultasi prioritas." }
  ],
  weaknesses: [
    { title: "Perlu Sentuhan Kurasi Manual", desc: "Hasil AI mentah kadang memerlukan editing halus & color grading manual agar terlihat natural." },
    { title: "Ketergantungan Tools AI", desc: "Bergantung pada kestabilan API dan biaya langganan software AI generatif internasional." },
    { title: "Edukasi Pasar UMKM", desc: "Belum semua pelaku UMKM tradisional memahami kehebatan dan efisiensi konten berbasis AI." }
  ],
  opportunities: [
    { title: "Pertumbuhan UMKM Digital", desc: "Jutaan UMKM di Indonesia wajib go-digital dan butuh ribuan konten setiap harinya." },
    { title: "Ledakan Tren Video Shopping", desc: "TikTok Shop, Shopee Video & Shopee Live mewajibkan konten video untuk meraup omset besar." },
    { title: "Teknologi AI Makin Canggih", desc: "Akses AI yang kian terjangkau memungkinkan studio memberikan harga lebih kompetitif ke UMKM." }
  ],
  threats: [
    { title: "Kemunculan Kompetitor Jasa AI", desc: "Semakin banyak agensi baru yang mulai melirik ceruk pasar video AI." },
    { title: "Perubahan Algoritma Medsos", desc: "Platform media sosial sering memperbarui aturan format video dan kebijakan konten iklan." },
    { title: "Kebijakan Platform AI", desc: "Perubahan regulasi hak cipta atau kenaikan harga langganan tool AI pihak ketiga." }
  ]
};

export const APPS_SCRIPT_TEMPLATE = `/**
 * Google Apps Script Web App untuk Abang Sehat Studio
 * Simpan data pesanan / prospek UMKM langsung ke Google Spreadsheet
 */

function doPost(e) {
  try {
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var contents = JSON.parse(e.postData.contents);
    var data = contents.data;
    
    // Cek apakah header sudah ada, jika belum buat header
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "ID Pesanan",
        "Waktu Pendaftaran",
        "Nama Klien",
        "Nama Usaha UMKM",
        "Kategori",
        "No. WhatsApp",
        "Email",
        "Paket Dipilih",
        "Harga (Rp)",
        "Catatan Khusus",
        "Status Pesanan"
      ]);
      sheet.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#EEF2FF");
    }
    
    // Tambahkan baris baru dari data website
    sheet.appendRow([
      data.id || ("ORD-" + new Date().getTime()),
      data.timestamp || new Date().toLocaleString("id-ID"),
      data.clientName || "-",
      data.businessName || "-",
      data.category || "-",
      data.phone || "-",
      data.email || "-",
      data.packageType || "-",
      data.price || 0,
      data.notes || "-",
      data.status || "Baru"
    ]);
    
    lock.releaseLock();
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data berhasil ditambahkan ke Google Spreadsheet Abang Sehat Studio!"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
`;
