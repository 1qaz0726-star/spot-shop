import { BrandMenuDrawer } from "@/components/brand/BrandMenuDrawer";
import { BRAND } from "@/lib/brand";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";

export async function DesktopHeader() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-6">
        <Link href="/" className="shrink-0 leading-tight">
          <span className="block text-lg font-bold tracking-tight text-[var(--color-brand)]">
            {BRAND.nameZh}
          </span>
          <span className="block text-[10px] font-medium tracking-widest text-[var(--color-muted)]">
            {BRAND.nameEn}
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-4 text-sm text-gray-700">
          <Link href="/orders" className="hidden hover:text-[var(--color-brand)] sm:inline">
            我的訂單
          </Link>
          <Link href="/cart" className="flex items-center gap-1 hover:text-[var(--color-brand)]">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">購物車</span>
          </Link>
          {session ? (
            <span className="hidden items-center gap-1 text-gray-600 sm:flex">
              <User className="h-4 w-4" />
              {session.name}
            </span>
          ) : (
            <Link href="/login" className="hidden font-medium text-[var(--color-brand)] sm:inline">
              登入
            </Link>
          )}
          {session?.role === "SELLER" && (
            <Link
              href="/seller"
              className="hidden rounded-full bg-[var(--color-brand-dark)] px-3 py-1 text-white hover:bg-[var(--color-brand)] sm:inline"
            >
              賣家中心
            </Link>
          )}
          <BrandMenuDrawer platform="desktop" />
        </div>
      </div>
    </header>
  );
}
