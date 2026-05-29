import { DesktopHeaderBar } from "@/components/desktop/DesktopHeaderBar";
import { BRAND } from "@/lib/brand";
import { getSession } from "@/lib/session";
import Link from "next/link";

export async function DesktopHeader() {
  const session = await getSession();

  const sessionInfo = session
    ? { name: session.name, role: session.role as "BUYER" | "SELLER" }
    : null;

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

        <DesktopHeaderBar session={sessionInfo} />
      </div>
    </header>
  );
}
