"use client";

import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/m", label: "首頁", icon: Home, exact: true },
  { href: "/m/shop", label: "商城", icon: ShoppingBag, exact: false },
  { href: "/m/cart", label: "購物車", icon: ShoppingCart, exact: false },
  { href: "/m/account", label: "我的", icon: User, exact: false },
];

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white">
      <div className="flex h-14">
        {tabs.map(({ href, label, icon: Icon, exact }) => {
          const active = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              prefetch={true}
              className={cn(
                "nc-interactive nc-press flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px]",
                active ? "text-[var(--color-brand)]" : "text-gray-500"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform duration-300 nc-ease",
                  active && "scale-110"
                )}
                strokeWidth={active ? 2.5 : 2}
              />
              {label}
            </Link>
          );
        })}
      </div>
      <div
        aria-hidden
        className="bg-white"
        style={{ height: "env(safe-area-inset-bottom, 0px)" }}
      />
    </nav>
  );
}
