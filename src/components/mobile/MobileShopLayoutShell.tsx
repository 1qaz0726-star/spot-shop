"use client";

import { isMobileBrandPage } from "@/lib/mobile-chrome";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MobileTabBar } from "./MobileTabBar";

export function MobileShopLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const brandPage = isMobileBrandPage(pathname);

  return (
    <div
      className={cn(
        "min-h-screen",
        !brandPage && "pb-[calc(var(--spacing-mobile-tab)+env(safe-area-inset-bottom,0px))]"
      )}
    >
      {children}
      {!brandPage && <MobileTabBar />}
    </div>
  );
}
