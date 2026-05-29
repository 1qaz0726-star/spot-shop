export type DeviceType = "mobile" | "desktop";

/** 與 Tailwind `md` 對齊：寬度小於此值視為手機版 */
export const MOBILE_MAX_WIDTH = 767;

export function isMobileViewport(width: number): boolean {
  return width <= MOBILE_MAX_WIDTH;
}

export function isMobilePath(pathname: string): boolean {
  return pathname === "/m" || pathname.startsWith("/m/");
}

export function shouldSkipViewportRouting(pathname: string): boolean {
  const SKIP = ["/api", "/login", "/_next", "/favicon", "/en"];
  return SKIP.some((p) => pathname.startsWith(p));
}

export function toMobilePath(pathname: string): string {
  if (pathname === "/") return "/m";
  if (pathname.startsWith("/m")) return pathname;
  if (pathname.startsWith("/api") || pathname.startsWith("/login")) return pathname;
  if (pathname.startsWith("/seller")) return `/m${pathname}`;
  if (pathname.startsWith("/en")) return pathname;
  return `/m${pathname}`;
}

export function toDesktopPath(pathname: string): string {
  if (!pathname.startsWith("/m")) return pathname;
  if (pathname.startsWith("/m/seller")) return pathname.slice(2);
  const rest = pathname.slice(2) || "/";
  return rest === "/" ? "/" : rest;
}

export function readViewportOverride(): "mobile" | "desktop" | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie;
  if (cookies.includes("force_mobile=1")) return "mobile";
  if (cookies.includes("force_desktop=1")) return "desktop";
  return null;
}
