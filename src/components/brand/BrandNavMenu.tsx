import type { Locale } from "@/lib/locale";
import { getSiteNav } from "@/lib/locale";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  platform: "desktop" | "mobile";
  locale?: Locale;
  className?: string;
  onNavigate?: () => void;
  animated?: boolean;
};

export function BrandNavMenu({
  platform,
  locale = "zh",
  className,
  onNavigate,
  animated,
}: Props) {
  const isMobile = platform === "mobile";
  const items = getSiteNav(locale);
  const isEn = locale === "en";

  return (
    <nav className={cn("w-full", className)} aria-label={isEn ? "Site navigation" : "網站導覽"}>
      <ul className="divide-y divide-gray-200/90 border-y border-gray-200/90">
        {items.map((item, index) => {
          const href = isMobile ? item.hrefMobile : item.hrefDesktop;
          const Icon = item.icon;
          return (
            <li
              key={href}
              className={animated ? "nc-animate-menu-item" : undefined}
              style={animated ? { animationDelay: `${80 + index * 70}ms` } : undefined}
            >
              <Link
                href={href}
                onClick={() => onNavigate?.()}
                className={cn(
                  "group nc-interactive flex items-center gap-4 bg-white/40 py-4",
                  "hover:bg-[var(--color-brand-light)]/60 active:bg-[var(--color-brand-light)]",
                  isMobile ? "px-1" : "px-2"
                )}
              >
                <span
                  className={cn(
                    "flex shrink-0 items-center justify-center rounded-full border border-gray-200",
                    "bg-white text-[var(--color-brand)] nc-interactive group-hover:border-[var(--color-brand)]/30",
                    "group-hover:scale-105",
                    isMobile ? "h-10 w-10" : "h-11 w-11"
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block font-medium tracking-[0.2em] text-[var(--color-brand)]",
                      isMobile ? "text-xs" : "text-sm"
                    )}
                  >
                    {item.labelEn}
                  </span>
                  {!isEn && (
                    <span className="mt-0.5 block text-sm text-gray-600">{item.labelZh}</span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
