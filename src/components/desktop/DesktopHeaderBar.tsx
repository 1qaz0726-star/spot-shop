"use client";

import { BrandMenuDrawer } from "@/components/brand/BrandMenuDrawer";
import { isDesktopBrandPage } from "@/lib/brand-routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";

type SessionInfo = {
  name: string;
  role: "BUYER" | "SELLER";
} | null;

type Props = {
  session: SessionInfo;
};

export function DesktopHeaderBar({ session }: Props) {
  const pathname = usePathname();
  const brandPage = isDesktopBrandPage(pathname);

  return (
    <div className="ml-auto flex items-center gap-4 text-sm text-gray-700">
      {!brandPage && (
        <>
          <Link href="/orders" className="hidden hover:text-[var(--color-brand)] sm:inline">
            我的訂單
          </Link>
          <Link href="/cart" className="flex items-center gap-1 hover:text-[var(--color-brand)]">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">購物車</span>
          </Link>
          {!session && (
            <Link href="/login" className="hidden font-medium text-[var(--color-brand)] sm:inline">
              登入
            </Link>
          )}
        </>
      )}

      {!brandPage && session && (
        <span className="hidden text-gray-600 sm:inline">{session.name}</span>
      )}

      {!brandPage && session?.role === "SELLER" && (
        <Link
          href="/seller"
          className="hidden rounded-full bg-[var(--color-brand-dark)] px-3 py-1 text-white hover:bg-[var(--color-brand)] sm:inline"
        >
          賣家中心
        </Link>
      )}

      <BrandMenuDrawer platform="desktop" />
    </div>
  );
}
