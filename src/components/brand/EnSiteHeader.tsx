import { BrandMenuDrawer } from "@/components/brand/BrandMenuDrawer";
import { BRAND_PITCH, PITCH_BASE } from "@/lib/brand-pitch";
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
    <header className="safe-area-top sticky top-0 z-50 border-b border-gray-200 bg-white">
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
            ← 返回
          </Link>
        ) : (
          <Link href={PITCH_BASE} className="shrink-0 leading-tight">
            <span
              className={
                isMobile
                  ? "block text-sm font-bold text-[var(--color-brand)]"
                  : "block text-lg font-bold tracking-tight text-[var(--color-brand)]"
              }
            >
              {BRAND_PITCH.nameZh}
            </span>
            {!isMobile && (
              <span className="block text-[10px] font-medium tracking-widest text-[var(--color-muted)]">
                {BRAND_PITCH.nameEn}
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
          <BrandMenuDrawer platform={platform} locale="zh-TW" />
        </div>
      </div>
    </header>
  );
}
