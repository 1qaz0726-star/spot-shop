import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isMobilePath,
  shouldSkipViewportRouting,
  toDesktopPath,
  toMobilePath,
} from "@/lib/device";

/**
 * 僅處理使用者手動「切換手機/電腦版」的 Cookie。
 * 一般裝置切換改由客戶端 ViewportRouter 依螢幕寬度判斷。
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldSkipViewportRouting(pathname)) {
    return NextResponse.next();
  }

  const forceDesktop = request.cookies.get("force_desktop")?.value === "1";
  const forceMobile = request.cookies.get("force_mobile")?.value === "1";

  if (!forceDesktop && !forceMobile) {
    return NextResponse.next();
  }

  const onMobile = isMobilePath(pathname);
  const wantMobile = forceMobile && !forceDesktop;

  if (wantMobile && !onMobile) {
    const url = request.nextUrl.clone();
    url.pathname = toMobilePath(pathname);
    return NextResponse.redirect(url);
  }

  if (!wantMobile && forceDesktop && onMobile) {
    const url = request.nextUrl.clone();
    url.pathname = toDesktopPath(pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
