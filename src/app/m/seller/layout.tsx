import { MobileSellerTabBar } from "@/components/seller/MobileSellerTabBar";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

export default async function MobileSellerLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login?next=/m/seller");
  if (session.role !== Role.SELLER) redirect("/m");

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white px-3 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">賣家中心</p>
            <p className="font-semibold">{session.name}</p>
          </div>
          <Link href="/m" className="text-xs text-[var(--color-brand)]">
            回商城
          </Link>
        </div>
      </header>
      <main className="p-3">{children}</main>
      <MobileSellerTabBar />
    </div>
  );
}
