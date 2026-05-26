"use client";

import {
  isMobilePath,
  isMobileViewport,
  MOBILE_MAX_WIDTH,
  readViewportOverride,
  shouldSkipViewportRouting,
  toDesktopPath,
  toMobilePath,
} from "@/lib/device";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * 依螢幕寬度在 / 與 /m 之間導向（UA 不再判斷）。
 * 手動切換版本時以 Cookie force_mobile / force_desktop 為準。
 */
export function ViewportRouter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (shouldSkipViewportRouting(pathname)) {
      setReady(true);
      return;
    }

    function sync() {
      const override = readViewportOverride();
      const narrow = isMobileViewport(window.innerWidth);
      const onMobile = isMobilePath(pathname);

      if (override === "mobile" && !onMobile) {
        router.replace(toMobilePath(pathname));
        return;
      }
      if (override === "desktop" && onMobile) {
        router.replace(toDesktopPath(pathname));
        return;
      }
      if (override) {
        setReady(true);
        return;
      }

      if (narrow && !onMobile) {
        router.replace(toMobilePath(pathname));
        return;
      }
      if (!narrow && onMobile) {
        router.replace(toDesktopPath(pathname));
        return;
      }

      setReady(true);
    }

    sync();

    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(sync, 150);
    };

    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname, router]);

  if (!ready && !shouldSkipViewportRouting(pathname)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-sm text-gray-500">
        載入中…
      </div>
    );
  }

  return <>{children}</>;
}

export { MOBILE_MAX_WIDTH };
