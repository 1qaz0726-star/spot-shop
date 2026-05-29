/** 拓新集創 Nova Crest — 全站品牌文案與聯絡資訊 */
export const BRAND = {
  nameZh: "拓新集創",
  nameEn: "Nova Crest",
  title: "拓新集創 | Nova Crest",
  description: "拓新集創 Nova Crest — 匯聚創新選品，嚴選現貨直送，讓好物更快抵達。",
  tagline: "匯聚創新 · 直達好物",
  shortTagline: "嚴選現貨 · 快速出貨",
  heroSub: "清楚標價、庫存透明 · 下單後 1–2 工作日出貨",
  contact: {
    line: "@novacrest",
    email: "service@novacrest.tw",
    hours: "週一至週五 09:00–18:00",
  },
} as const;

export function brandLabel(compact = false) {
  return compact ? BRAND.nameZh : `${BRAND.nameZh} ${BRAND.nameEn}`;
}
