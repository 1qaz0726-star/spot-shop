import { BRAND, SITE_NAV } from "@/lib/brand";
import { BRAND_EN, EN_SITE_NAV } from "@/lib/brand-en";

export type Locale = "zh" | "en";

export function isEnPath(pathname: string) {
  return pathname === "/en" || pathname.startsWith("/en/");
}

export function getBrandContent(locale: Locale) {
  return locale === "en" ? BRAND_EN : BRAND;
}

export function getSiteNav(locale: Locale) {
  return locale === "en" ? EN_SITE_NAV : SITE_NAV;
}

export function homePath(locale: Locale, mobile: boolean) {
  if (locale === "en") return "/en";
  return mobile ? "/m" : "/";
}

export function aboutPath(locale: Locale, mobile: boolean) {
  if (locale === "en") return "/en/about";
  return mobile ? "/m/about" : "/about";
}

export function partnershipPath(locale: Locale) {
  return locale === "en" ? "/en/partnership" : "/about";
}

export function shopPathForLocale(locale: Locale, mobile: boolean) {
  if (locale === "en") return "/shop";
  return mobile ? "/m/shop" : "/shop";
}
