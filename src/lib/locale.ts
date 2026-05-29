import { BRAND, SITE_NAV } from "@/lib/brand";
import { BRAND_PITCH, PITCH_BASE, PITCH_SITE_NAV } from "@/lib/brand-pitch";

export { PITCH_BASE };

export type Locale = "zh" | "zh-TW";

export function isPitchPath(pathname: string) {
  return pathname === PITCH_BASE || pathname.startsWith(`${PITCH_BASE}/`);
}

/** @deprecated 請改用 isPitchPath */
export function isEnPath(pathname: string) {
  return isPitchPath(pathname);
}

export function getBrandContent(locale: Locale) {
  return locale === "zh-TW" ? BRAND_PITCH : BRAND;
}

export function getSiteNav(locale: Locale) {
  return locale === "zh-TW" ? PITCH_SITE_NAV : SITE_NAV;
}

export function homePath(locale: Locale, mobile: boolean) {
  if (locale === "zh-TW") return PITCH_BASE;
  return mobile ? "/m" : "/";
}

export function aboutPath(locale: Locale, mobile: boolean) {
  if (locale === "zh-TW") return `${PITCH_BASE}/about`;
  return mobile ? "/m/about" : "/about";
}

export function partnershipPath(locale: Locale) {
  return locale === "zh-TW" ? `${PITCH_BASE}/partnership` : "/about";
}

export function shopPathForLocale(locale: Locale, mobile: boolean) {
  if (locale === "zh-TW") return "/";
  return mobile ? "/m/shop" : "/shop";
}

export function isPitchLocale(locale: Locale) {
  return locale === "zh-TW";
}
