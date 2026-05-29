import { Home, Info, Handshake, Mail } from "lucide-react";
import type { SiteNavItem } from "@/lib/brand";

/** 洽談站 URL 前綴 */
export const PITCH_BASE = "/zh-TW";

/** /zh-TW 路徑：給 74STREET 團隊看的 SUSUBAG 嘖嘖代理授權洽談（繁中） */
export const BRAND_PITCH = {
  nameZh: "拓新集創",
  nameEn: "Nova Crest",
  title: "拓新集創 | SUSUBAG 台灣嘖嘖代理授權洽談",
  description:
    "拓新集創 Nova Crest 誠摯向 74STREET 騎士街洽談 SUSUBAG 於台灣嘖嘖之正式代理授權與上架合作。",
  productName: "SUSUBAG",
  productBrand: "74STREET · 騎士街",
  tagline: "誠摯申請 · 台灣嘖嘖代理授權",
  shortTagline: "SUSUBAG · 嘖嘖台灣市場",
  heroSub: "致 74STREET 團隊 — 感謝您們在國際市場的用心設計與募資成果",
  footerLine: "正式授權 · 透明條款 · 尊重品牌",
  about: {
    headline: "我們是拓新集創",
    intro:
      "我們是「拓新集創 Nova Crest」，專注於將具設計力與實用性的好物，以清楚、可追蹤的方式帶進台灣市場。在拜訪貴品牌與 SUSUBAG 的 Kickstarter 募資頁後，我們非常認同「一包三型、快速切換、防盜與防水」的產品定位，也理解貴團隊對品質與形象的重視。",
    story: [
      "我們並非只想「轉賣」或模糊授權邊界的灰色操作；我們希望取得貴方明確書面授權，在台灣以嘖嘖為主要募資管道，完整呈現 SUSUBAG 的設計故事、規格與售後承諾，讓台灣消費者與貴品牌長期信任一致。",
      "團隊具備嘖嘖專案規劃、繁中素材、客服話術、金流與出貨協調經驗；若貴方願意進一步討論，我們可於一週內提供簡要執行大綱（時程、預算區間、授權範圍草案）供內部評估。",
    ],
    values: [
      { title: "尊重原品牌", desc: "文案、視覺、定價策略皆先送審，不擅自改動核心訊息" },
      { title: "授權清楚", desc: "區域、檔期、分潤與庫存責任以書面約定，避免雙方認知落差" },
      { title: "嘖嘖實戰", desc: "熟悉台灣募資節奏、加購品結構與出貨高峰管理" },
    ],
  },
  partnership: {
    headline: "SUSUBAG 嘖嘖代理授權 — 合作說明",
    intro:
      "以下為我們希望與 74STREET 洽談的核心內容；若方向與貴司規劃相符，懇請回覆或安排線上會議，我們將依貴方模板補齊正式授權文件。",
    bullets: [
      "授權標的：SUSUBAG（及雙方書面同意之型號／顏色／配件組合）",
      "授權區域：台灣（含嘖嘖募資與募資結束後之約定通路；其他地區另議）",
      "主要通路：嘖嘖（Zec Zec）募資；是否同步於我方現貨商城，依貴方意願與庫存政策決定",
      "我方需要：正式代理／經銷授權書、產品規格與檢驗資料、建議零售價、供貨條件、品牌素材包、售後與保固政策",
      "我方可提供：繁中募資頁、影片字幕協力、客服與訂單報表、金流代收、台灣本地出貨／倉儲協調（細節可共擬）",
      "時程：尊重貴方 Kickstarter／全球檔期；台灣嘖嘖檔期與備貨量由雙方共同確認後啟動",
    ],
    cta:
      "若貴團隊願意評估台灣嘖嘖代理，我們非常期待能成為 SUSUBAG 在台灣的長期夥伴。請不吝回信或來信，我們將立即安排簡報與授權條款討論。",
  },
  contact: {
    email: "beicheng0528@gmail.com",
    hours: "週一至週五 · 09:00–18:00（GMT+8）",
  },
} as const;

export const PITCH_SITE_NAV: SiteNavItem[] = [
  { labelZh: "首頁", labelEn: "首頁", hrefDesktop: PITCH_BASE, hrefMobile: PITCH_BASE, icon: Home },
  {
    labelZh: "關於我們",
    labelEn: "關於我們",
    hrefDesktop: `${PITCH_BASE}/about`,
    hrefMobile: `${PITCH_BASE}/about`,
    icon: Info,
  },
  {
    labelZh: "授權說明",
    labelEn: "授權說明",
    hrefDesktop: `${PITCH_BASE}/partnership`,
    hrefMobile: `${PITCH_BASE}/partnership`,
    icon: Handshake,
  },
  {
    labelZh: "聯絡",
    labelEn: "聯絡",
    hrefDesktop: `${PITCH_BASE}/about#contact`,
    hrefMobile: `${PITCH_BASE}/about#contact`,
    icon: Mail,
  },
];
