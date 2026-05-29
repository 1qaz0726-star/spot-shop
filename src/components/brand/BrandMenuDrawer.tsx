"use client";

import { BrandNavMenu } from "@/components/brand/BrandNavMenu";
import type { Locale } from "@/lib/locale";
import { getBrandContent } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const CLOSE_MS = 280;

type Props = {
  platform: "desktop" | "mobile";
  locale?: Locale;
  className?: string;
};

export function BrandMenuDrawer({ platform, locale = "zh", className }: Props) {
  const brand = getBrandContent(locale);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const visible = open || closing;

  const close = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, CLOSE_MS);
  }, []);

  const show = useCallback(() => {
    setClosing(false);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, close]);

  return (
    <>
      <button
        type="button"
        onClick={show}
        className={cn(
          "nc-interactive nc-press inline-flex items-center justify-center rounded-lg p-2 text-[var(--color-brand)]",
          "hover:bg-[var(--color-brand-light)]",
          className
        )}
        aria-label={locale === "en" ? "Open menu" : "開啟選單"}
        aria-expanded={open}
      >
        <Menu
          className={cn("h-6 w-6 transition-transform duration-300 nc-ease", open && "rotate-90 opacity-70")}
          strokeWidth={2}
        />
      </button>

      {visible && (
        <div
          className="fixed inset-0 z-[200]"
          role="dialog"
          aria-modal="true"
          aria-label={locale === "en" ? "Site menu" : "網站選單"}
        >
          <div
            className={cn(
              "absolute inset-0 bg-[var(--color-brand-dark)]/20 backdrop-blur-[2px]",
              closing ? "nc-animate-fade-out" : "nc-animate-fade-in"
            )}
            onClick={close}
            aria-hidden
          />

          <div
            className={cn(
              "relative flex h-full flex-col bg-white",
              closing ? "nc-animate-fade-out" : "nc-animate-scale-in"
            )}
          >
            <div className="safe-area-top flex items-center justify-end px-3 py-2">
              <button
                type="button"
                onClick={close}
                className="nc-interactive nc-press rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                aria-label={locale === "en" ? "Close menu" : "關閉選單"}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <span className="select-none text-[min(18vw,7rem)] font-bold tracking-[0.2em] text-[var(--color-brand)]/[0.05]">
                {brand.nameEn.toUpperCase()}
              </span>
            </div>

            <div className="relative flex flex-1 flex-col items-center justify-center px-6 pb-16">
              <BrandNavMenu
                platform={platform}
                locale={locale}
                className="w-full max-w-xs"
                animated={open && !closing}
                onNavigate={close}
              />
              <p
                className={cn(
                  "mt-10 text-center text-[10px] uppercase tracking-[0.2em] text-gray-400",
                  open && !closing && "nc-animate-fade-in"
                )}
                style={open && !closing ? { animationDelay: "320ms" } : undefined}
              >
                {brand.footerLine}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
