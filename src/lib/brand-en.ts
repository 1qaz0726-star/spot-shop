import { Home, Info, Handshake, Mail } from "lucide-react";
import type { SiteNavItem } from "@/lib/brand";

export const BRAND_EN = {
  nameZh: "拓新集創",
  nameEn: "Nova Crest",
  title: "Nova Crest | Brand Partnership",
  description:
    "Nova Crest partners with international brands for licensed product launches on Zec Zec and curated retail in Taiwan.",
  tagline: "Innovation together · Delivered with care",
  shortTagline: "Curated in-stock · Fast fulfillment",
  heroSub: "Transparent inventory · Clear pricing · Reliable shipping",
  footerLine: "Product licensing · Zec Zec launches · Taiwan market expertise",
  about: {
    headline: "About Nova Crest",
    intro:
      "Nova Crest (拓新集創) connects international brands with audiences in Taiwan through thoughtful curation, clear operations, and campaign-ready launches.",
    story: [
      "We focus on in-stock, ready-to-ship assortments with transparent availability—so every collaboration starts from clarity, not guesswork.",
      "Our team handles positioning, launch assets, and fulfillment coordination for campaigns on Zec Zec, one of Taiwan’s leading crowdfunding and e-commerce platforms.",
    ],
    values: [
      { title: "Brand-safe", desc: "Licensed listings with agreed territories and assets" },
      { title: "Launch-ready", desc: "Structured timelines for crowdfunding and retail" },
      { title: "Transparent", desc: "Clear terms, reporting, and communication" },
    ],
  },
  partnership: {
    headline: "Partnership & Licensing",
    intro:
      "We are reaching out to explore authorization for selected products to be listed and sold through our channels in Taiwan, including Zec Zec campaigns.",
    bullets: [
      "Territory: Taiwan (online); other regions by mutual agreement",
      "Channels: Zec Zec crowdfunding / flash sales, and our curated storefront when applicable",
      "What we need: product specs, MOQ, wholesale or licensing terms, brand assets, and authorization letter if required",
      "What we offer: localized presentation, campaign support, inventory planning, and fulfillment coordination",
    ],
    cta: "If this aligns with your export or licensing goals, we would be glad to share a brief deck and discuss next steps.",
  },
  contact: {
    line: "@novacrest",
    email: "service@novacrest.tw",
    hours: "Mon–Fri · 09:00–18:00 (GMT+8)",
  },
} as const;

export const EN_SITE_NAV: SiteNavItem[] = [
  { labelZh: "首頁", labelEn: "HOME", hrefDesktop: "/en", hrefMobile: "/en", icon: Home },
  {
    labelZh: "關於",
    labelEn: "ABOUT",
    hrefDesktop: "/en/about",
    hrefMobile: "/en/about",
    icon: Info,
  },
  {
    labelZh: "合作",
    labelEn: "PARTNERSHIP",
    hrefDesktop: "/en/partnership",
    hrefMobile: "/en/partnership",
    icon: Handshake,
  },
  {
    labelZh: "聯絡",
    labelEn: "CONTACT",
    hrefDesktop: "/en/about#contact",
    hrefMobile: "/en/about#contact",
    icon: Mail,
  },
];
