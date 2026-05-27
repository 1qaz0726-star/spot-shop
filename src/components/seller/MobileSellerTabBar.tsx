"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Package, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/m/seller", label: "總覽", icon: LayoutDashboard },
  { href: "/m/seller/products", label: "商品", icon: Package },
  { href: "/m/seller/products/new", label: "新增", icon: PlusCircle },
];

function isActive(pathname: string, href: string) {
  if (href === "/m/seller") return pathname === "/m/seller";
  if (href === "/m/seller/products/new") return pathname === "/m/seller/products/new";
  if (href === "/m/seller/products") {
    return pathname.startsWith("/m/seller/products") && pathname !== "/m/seller/products/new";
  }
  return false;
}

export function MobileSellerTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-gray-200 bg-white">
      {tabs.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px]",
              active ? "text-[var(--color-brand)]" : "text-gray-500"
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
