import { BRAND } from "@/lib/brand";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

export default async function SellerLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login?next=/seller");
  if (session.role !== Role.SELLER) redirect("/");

  return (
    <div className="min-h-screen bg-gray-100">
      <aside className="fixed left-0 top-0 hidden h-full w-56 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="border-b border-gray-100 p-4">
          <p className="text-xs font-medium text-[var(--color-brand)]">{BRAND.nameZh}</p>
          <p className="text-[10px] text-gray-400">{BRAND.nameEn} · 賣家中心</p>
          <p className="mt-1 font-semibold">{session.name}</p>
        </div>
        <nav className="flex-1 space-y-1 p-3 text-sm">
          <Link href="/seller" className="block rounded-lg px-3 py-2 hover:bg-gray-50">
            總覽
          </Link>
          <Link href="/seller/products" className="block rounded-lg px-3 py-2 hover:bg-gray-50">
            商品管理
          </Link>
          <Link href="/seller/products/new" className="block rounded-lg px-3 py-2 hover:bg-gray-50">
            新增商品
          </Link>
        </nav>
        <div className="border-t border-gray-100 p-3 text-sm">
          <Link href="/" className="text-[var(--color-brand)] hover:underline">
            返回 {BRAND.nameZh}
          </Link>
        </div>
      </aside>
      <main className="min-h-screen p-4 md:ml-56 md:p-8">{children}</main>
    </div>
  );
}
