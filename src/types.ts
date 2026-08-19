export type ProductCategory = "kuliner" | "fashion" | "kerajinan" | "kecantikan" | "lainnya";

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  category: "ebook" | "video" | "subscription";
  price: number;
  originalPrice?: number;
  duration?: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  recommendedFor: string;
  description: string;
  iconName: string;
}

export type OrderStatus =
  | "Baru"
  | "Pesanan Masuk"
  | "Dihubungi"
  | "Diproses AI"
  | "Sedang Diproses"
  | "Revisi"
  | "Selesai"
  | "Terkirim";

export interface OrderLead {
  id: string;
  timestamp: string;
  clientName: string;
  businessName: string;
  category: ProductCategory;
  phone: string;
  email: string;
  packageType: string;
  price: number;
  notes: string;
  status: OrderStatus;
  syncedToGoogleSheet: boolean;
}

export interface GoogleSheetConfig {
  spreadsheetUrl: string;
  webhookUrl: string;
  sheetName: string;
  autoSync: boolean;
  spreadsheetId?: string;
  lastSyncTime?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ProductCategory;
  duration: string;
  platform: string;
  description: string;
  videoThumbnail: string;
  videoUrl?: string;
  viewsEstimate: string;
  aiTechUsed: string[];
  voiceoverSampleText: string;
  audioVoiceType: string;
}

export interface AIScriptResult {
  title: string;
  hookHeadline: string;
  storyboard: {
    scene: number;
    visual: string;
    voiceover: string;
    duration: string;
  }[];
  callToAction: string;
  aiPromptVideo: string;
  audioSuggestion: string;
  tipsUMKM: string[];
}
