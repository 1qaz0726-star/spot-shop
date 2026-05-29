import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

type Props = {
  platform: "desktop" | "mobile";
};

/** 品牌首頁背景：漸層、網格、光暈與幾何裝飾 */
export function BrandHomeBackdrop({ platform }: Props) {
  const isMobile = platform === "mobile";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* 基底漸層 */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-br from-[#eef4fa] via-white to-[#f5efe3]",
          "from-10% via-45% to-100%"
        )}
      />

      {/* 細網格 */}
      <div className="brand-home-grid absolute inset-0" />

      {/* 光暈 */}
      <div
        className={cn(
          "absolute rounded-full bg-[var(--color-brand)] blur-3xl",
          isMobile ? "-right-16 -top-16 h-48 w-48 opacity-[0.12]" : "-right-32 -top-32 h-[28rem] w-[28rem] opacity-[0.14]"
        )}
      />
      <div
        className={cn(
          "absolute rounded-full bg-[var(--color-accent)] blur-3xl",
          isMobile ? "-bottom-20 -left-12 h-40 w-40 opacity-[0.18]" : "-bottom-40 -left-32 h-96 w-96 opacity-[0.2]"
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1a5f7a] blur-3xl",
          isMobile ? "h-56 w-56 opacity-[0.06]" : "h-[32rem] w-[32rem] opacity-[0.08]"
        )}
      />

      {/* 對角金線 */}
      <div
        className={cn(
          "absolute bg-gradient-to-r from-transparent via-[var(--color-accent)]/35 to-transparent",
          isMobile ? "-left-8 top-[18%] h-px w-[120%] rotate-[-8deg]" : "-left-16 top-[22%] h-px w-[130%] rotate-[-6deg]"
        )}
      />
      <div
        className={cn(
          "absolute bg-gradient-to-r from-transparent via-[var(--color-brand)]/15 to-transparent",
          isMobile ? "-right-8 bottom-[28%] h-px w-[110%] rotate-[5deg]" : "-right-12 bottom-[30%] h-px w-[125%] rotate-[4deg]"
        )}
      />

      {/* Crest 山形輪廓（呼應 Nova Crest） */}
      <svg
        className={cn(
          "absolute left-1/2 -translate-x-1/2 text-[var(--color-brand)]",
          isMobile ? "bottom-[8%] h-32 w-[min(100%,20rem)] opacity-[0.08]" : "bottom-[6%] h-48 w-[min(90%,36rem)] opacity-[0.09]"
        )}
        viewBox="0 0 400 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 120 L80 40 L160 75 L240 20 L320 55 L400 120 Z"
          fill="currentColor"
        />
        <path
          d="M120 120 L200 55 L280 120"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.5"
          fill="none"
        />
      </svg>

      {/* 圓環裝飾 */}
      <div
        className={cn(
          "absolute rounded-full border border-[var(--color-brand)]/10",
          isMobile ? "right-[6%] top-[12%] h-24 w-24" : "right-[8%] top-[14%] h-40 w-40"
        )}
      />
      <div
        className={cn(
          "absolute rounded-full border border-[var(--color-accent)]/20",
          isMobile ? "left-[4%] bottom-[22%] h-16 w-16" : "left-[6%] bottom-[24%] h-28 w-28"
        )}
      />

      {/* 浮水印字 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "select-none font-bold leading-none tracking-[0.22em] text-[var(--color-brand)]",
            isMobile
              ? "text-[4rem] opacity-[0.04]"
              : "text-[min(16vw,11rem)] opacity-[0.035]"
          )}
        >
          {BRAND.nameEn.toUpperCase()}
        </span>
      </div>

      {/* 四角飾框 */}
      <div
        className={cn(
          "absolute border-l-2 border-t-2 border-[var(--color-brand)]/15",
          isMobile ? "left-4 top-4 h-10 w-10" : "left-8 top-8 h-16 w-16"
        )}
      />
      <div
        className={cn(
          "absolute border-r-2 border-t-2 border-[var(--color-brand)]/15",
          isMobile ? "right-4 top-4 h-10 w-10" : "right-8 top-8 h-16 w-16"
        )}
      />
      <div
        className={cn(
          "absolute border-b-2 border-l-2 border-[var(--color-accent)]/25",
          isMobile ? "bottom-4 left-4 h-10 w-10" : "bottom-8 left-8 h-16 w-16"
        )}
      />
      <div
        className={cn(
          "absolute border-b-2 border-r-2 border-[var(--color-accent)]/25",
          isMobile ? "bottom-4 right-4 h-10 w-10" : "bottom-8 right-8 h-16 w-16"
        )}
      />
    </div>
  );
}
