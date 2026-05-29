import { BRAND } from "@/lib/brand";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** 手機首頁細條公告 */
export function MobileHomeServices() {
  return (
    <Link
      href="/m/shop"
      className="flex items-center gap-2 border-b border-[var(--color-brand-dark)]/20 bg-brand-gradient px-3 py-2 text-on-brand-gradient active:opacity-90"
    >
      <span className="shrink-0 rounded bg-[var(--color-accent)]/90 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
        公告
      </span>
      <p className="min-w-0 flex-1 truncate text-xs">
        {BRAND.nameZh} · {BRAND.shortTagline} · 訂單可追蹤
      </p>
      <ChevronRight className="h-4 w-4 shrink-0 opacity-90" strokeWidth={2.5} />
    </Link>
  );
}
