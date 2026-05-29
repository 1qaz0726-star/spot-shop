import type { LucideIcon } from "lucide-react";
import { Home, Info, ShoppingBag, Mail } from "lucide-react";

/** 拓新集創 Nova Crest — 全站品牌文案與聯絡資訊 */
export const BRAND = {
  nameZh: "拓新集創",
  nameEn: "Nova Crest",
  title: "拓新集創 | Nova Crest",
  description: "拓新集創 Nova Crest — 匯聚創新選品，嚴選現貨直送，讓好物更快抵達。",
  tagline: "匯聚創新 · 直達好物",
  shortTagline: "嚴選現貨 · 快速出貨",
  heroSub: "清楚標價、庫存透明 · 下單後 1–2 工作日出貨",
  footerLine: "嚴選現貨電商 · 設計、選品與出貨一站整合",
  about: {
    headline: "關於我們",
    intro:
      "拓新集創相信，好的商品不只是交易，而是品牌與生活之間的連結。我們從選品、品質到出貨，為買家與賣家打造清楚、可信任的現貨平台。",
    story: [
      "我們專注於「常態現貨」——庫存透明、標價清楚，讓每一次下單都安心。無論是日常用品或特色選品，團隊以嚴謹的品管與快速的物流，縮短你與好物之間的距離。",
      "對賣家而言，拓新集創提供簡潔好用的上架工具與訂單管理；對買家而言，則是乾淨的購物體驗與可追蹤的訂單。我們持續優化平台，並預留倉儲與第三方系統串接，陪伴品牌一起成長。",
    ],
    values: [
      { title: "嚴選品質", desc: "每件商品清楚標示庫存與出貨時程" },
      { title: "創新體驗", desc: "電腦與手機分開設計，購物更順手" },
      { title: "誠信透明", desc: "價格、狀態、訂單進度一目了然" },
    ],
  },
  contact: {
    line: "@novacrest",
    email: "service@novacrest.tw",
    hours: "週一至週五 09:00–18:00",
  },
} as const;

export type SiteNavItem = {
  labelZh: string;
  labelEn: string;
  hrefDesktop: string;
  hrefMobile: string;
  icon: LucideIcon;
};

export const SITE_NAV: SiteNavItem[] = [
  { labelZh: "首頁", labelEn: "HOME", hrefDesktop: "/", hrefMobile: "/m", icon: Home },
  { labelZh: "關於", labelEn: "ABOUT", hrefDesktop: "/about", hrefMobile: "/m/about", icon: Info },
  { labelZh: "商城", labelEn: "SHOP", hrefDesktop: "/shop", hrefMobile: "/m/shop", icon: ShoppingBag },
  {
    labelZh: "聯絡",
    labelEn: "CONTACT",
    hrefDesktop: "/about#contact",
    hrefMobile: "/m/about#contact",
    icon: Mail,
  },
];

export function brandLabel(compact = false) {
  return compact ? BRAND.nameZh : `${BRAND.nameZh} ${BRAND.nameEn}`;
}

export function shopPath(mobile: boolean) {
  return mobile ? "/m/shop" : "/shop";
}
