import { BrandHomeBackdrop } from "@/components/brand/BrandHomeBackdrop";
import type { Locale } from "@/lib/locale";
import { aboutPath, getBrandContent, shopPathForLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  platform: "desktop" | "mobile";
  locale?: Locale;
};

export function BrandHomeView({ platform, locale = "zh" }: Props) {
  const isMobile = platform === "mobile";
  const brand = getBrandContent(locale);
  const isEn = locale === "en";
  const shopHref = shopPathForLocale(locale, isMobile);
  const aboutHref = aboutPath(locale, isMobile);

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        isMobile
          ? "flex min-h-[calc(100dvh-3.5rem-env(safe-area-inset-top,0px))] flex-col items-center justify-center px-4 pb-8 pt-6"
          : "flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6 py-16 lg:min-h-[calc(100vh-4rem)] lg:py-20"
      )}
    >
      <BrandHomeBackdrop platform={platform} />

      <div
        className={cn(
          "relative z-10 w-full text-center nc-animate-slide-up",
          isMobile ? "max-w-md" : "max-w-xl"
        )}
      >
        <div
          className={cn(
            "mx-auto rounded-2xl border border-white/80 bg-white/75 shadow-xl backdrop-blur-md",
            "shadow-[var(--color-brand)]/8",
            isMobile ? "px-6 py-8" : "px-10 py-12 lg:px-12 lg:py-14"
          )}
        >
          <div className="mx-auto mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--color-accent)]" />
            <p className="text-xs font-medium tracking-[0.3em] text-[var(--color-accent)]">
              {brand.nameEn}
            </p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--color-accent)]" />
          </div>

          <h1
            className={cn(
              "font-bold tracking-tight text-[var(--color-brand)]",
              isMobile ? "text-3xl" : "text-4xl lg:text-[2.75rem] lg:leading-tight"
            )}
          >
            {isEn ? brand.nameEn : brand.nameZh}
          </h1>

          {!isEn && (
            <p className="mt-1 text-sm tracking-wide text-[var(--color-muted)]">{brand.nameEn}</p>
          )}

          <p className={cn("mt-3 font-medium text-gray-700", isMobile ? "text-sm" : "text-lg")}>
            {brand.tagline}
          </p>

          <p
            className={cn(
              "mx-auto mt-4 leading-relaxed text-gray-500",
              isMobile ? "max-w-xs text-sm" : "max-w-md text-sm"
            )}
          >
            {brand.about.intro}
          </p>

          <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
            {brand.footerLine}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {isEn ? (
              <Link
                href={aboutHref}
                className={cn(
                  "nc-interactive nc-press inline-flex rounded-lg bg-[var(--color-brand)] font-semibold text-white",
                  "shadow-md shadow-[var(--color-brand)]/25 hover:bg-[var(--color-brand-dark)] hover:shadow-lg",
                  isMobile ? "px-8 py-2.5 text-sm" : "px-10 py-3 text-sm"
                )}
              >
                Partnership inquiry
              </Link>
            ) : (
              <Link
                href={shopHref}
                className={cn(
                  "nc-interactive nc-press inline-flex rounded-lg bg-[var(--color-brand)] font-semibold text-white",
                  "shadow-md shadow-[var(--color-brand)]/25 hover:bg-[var(--color-brand-dark)] hover:shadow-lg",
                  isMobile ? "px-8 py-2.5 text-sm" : "px-10 py-3 text-sm"
                )}
              >
                進入商城
              </Link>
            )}
            <Link
              href={isEn ? "/en/partnership" : aboutHref}
              className="nc-interactive text-sm font-medium text-[var(--color-brand)] underline-offset-4 hover:underline"
            >
              {isEn ? "How we work" : "認識我們"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
