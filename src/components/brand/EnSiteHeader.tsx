import { BrandMenuDrawer } from "@/components/brand/BrandMenuDrawer";
import { BRAND_EN } from "@/lib/brand-en";
import Link from "next/link";

type Props = {
  platform: "desktop" | "mobile";
  title?: string;
  showBack?: boolean;
  backHref?: string;
};

export function EnSiteHeader({ platform, title, showBack, backHref }: Props) {
  const isMobile = platform === "mobile";

  return (
    <header className="safe-area-top sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div
        className={
          isMobile
            ? "mx-auto flex h-11 max-w-3xl items-center gap-2 px-3"
            : "mx-auto flex h-14 max-w-7xl items-center gap-4 px-6"
        }
      >
        {showBack && backHref ? (
          <Link
            href={backHref}
            className="shrink-0 text-sm text-[var(--color-brand)] hover:underline"
          >
            ← Back
          </Link>
        ) : (
          <Link href="/en" className="min-w-0 flex-1 leading-tight">
            <span
              className={
                isMobile
                  ? "block text-sm font-bold text-[var(--color-brand)]"
                  : "block text-lg font-bold text-[var(--color-brand)]"
              }
            >
              {BRAND_EN.nameEn}
            </span>
            {!isMobile && (
              <span className="block text-[10px] tracking-widest text-[var(--color-muted)]">
                {BRAND_EN.nameZh}
              </span>
            )}
          </Link>
        )}

        {title && (
          <h1
            className={
              isMobile
                ? "min-w-0 flex-1 truncate text-center text-base font-semibold"
                : "hidden"
            }
          >
            {title}
          </h1>
        )}

        {!isMobile && title && (
          <h1 className="flex-1 text-center text-base font-semibold text-gray-800">{title}</h1>
        )}

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <BrandMenuDrawer platform={platform} locale="en" />
        </div>
      </div>
    </header>
  );
}
