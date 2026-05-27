"use client";

import { Home, ShoppingCart, Package, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/m", label: "首頁", icon: Home },
  { href: "/m/cart", label: "購物車", icon: ShoppingCart },
  { href: "/m/orders", label: "訂單", icon: Package },
  { href: "/m/account", label: "我的", icon: User },
];

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white">
      <div className="flex h-14">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/m" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              prefetch={true}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px]",
                active ? "text-[var(--color-brand)]" : "text-gray-500"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </div>
      {/* iPhone 底部安全區：與購買列 bottom 計算對齊 */}
      <div
        aria-hidden
        className="bg-white"
        style={{ height: "env(safe-area-inset-bottom, 0px)" }}
      />
    </nav>
  );
}
