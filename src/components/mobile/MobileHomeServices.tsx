import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** 手機首頁細條公告（蝦皮式） */
export function MobileHomeServices() {
  return (
    <Link
      href="/m"
      className="flex items-center gap-2 border-b border-orange-600/10 bg-gradient-to-r from-[#ee4d2d] to-[#f05d40] px-3 py-2 text-white active:opacity-90"
    >
      <span className="shrink-0 rounded bg-white/25 px-1.5 py-0.5 text-[10px] font-bold leading-none">
        公告
      </span>
      <p className="min-w-0 flex-1 truncate text-xs">
        全館現貨 · 下單後 1–2 工作日出貨 · 訂單可追蹤
      </p>
      <ChevronRight className="h-4 w-4 shrink-0 opacity-90" strokeWidth={2.5} />
    </Link>
  );
}
