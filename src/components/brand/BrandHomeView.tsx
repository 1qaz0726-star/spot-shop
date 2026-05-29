import { BRAND, shopPath } from "@/lib/brand";
import Link from "next/link";

type Props = {
  platform: "desktop" | "mobile";
};

export function BrandHomeView({ platform }: Props) {
  const isMobile = platform === "mobile";
  const shopHref = shopPath(isMobile);

  return (
    <div
      className={
        isMobile
          ? "relative flex min-h-[calc(100dvh-3.5rem-env(safe-area-inset-top,0px))] flex-col items-center justify-center px-6 pb-8 pt-4 text-center"
          : "relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6 py-16 text-center lg:py-24"
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span
          className={
            isMobile
              ? "select-none text-[3.5rem] font-bold leading-none tracking-[0.15em] text-[var(--color-brand)]/[0.06]"
              : "select-none text-[min(14vw,10rem)] font-bold leading-none tracking-[0.2em] text-[var(--color-brand)]/[0.05]"
          }
        >
          {BRAND.nameEn.toUpperCase()}
        </span>
      </div>

      <div className="relative mx-auto max-w-lg space-y-5 nc-animate-slide-up">
        <p className="text-xs font-medium tracking-[0.25em] text-[var(--color-accent)]">
          {BRAND.nameEn}
        </p>
        <h1
          className={
            isMobile
              ? "text-3xl font-bold tracking-tight text-[var(--color-brand)]"
              : "text-4xl font-bold tracking-tight text-[var(--color-brand)] lg:text-5xl"
          }
        >
          {BRAND.nameZh}
        </h1>
        <p className={isMobile ? "text-sm text-gray-600" : "text-lg text-gray-600"}>
          {BRAND.tagline}
        </p>
        <p className="text-sm leading-relaxed text-gray-500">{BRAND.about.intro}</p>
        <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400">{BRAND.footerLine}</p>
        <div className="pt-2">
          <Link
            href={shopHref}
            className="inline-flex rounded-lg bg-[var(--color-brand)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-dark)]"
          >
            進入商城
          </Link>
        </div>
      </div>
    </div>
  );
}
