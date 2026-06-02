import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  nameZh: string;
  nameEn: string;
  /** 手機頂欄較緊湊 */
  compact?: boolean;
  /** 僅顯示中文名（手機洽談頂欄） */
  hideSubtitle?: boolean;
  className?: string;
};

export function BrandLogoLink({ href, nameZh, nameEn, compact, hideSubtitle, className }: Props) {
  const logoSize = compact ? 32 : 44;

  return (
    <Link
      href={href}
      className={cn("flex shrink-0 items-center gap-2.5 leading-tight", className)}
    >
      <Image
        src="/logo-mark-circle.png"
        alt=""
        width={logoSize}
        height={logoSize}
        className={cn(
          "shrink-0 rounded-full object-cover shadow-sm",
          compact ? "h-8 w-8" : "h-10 w-10 sm:h-11 sm:w-11"
        )}
        priority
      />
      <span className="min-w-0">
        <span
          className={cn(
            "block font-bold tracking-tight text-[var(--color-brand)]",
            compact ? "text-[15px]" : "text-lg"
          )}
        >
          {nameZh}
        </span>
        {!hideSubtitle && (
          <span
            className={cn(
              "block font-medium tracking-widest text-[var(--color-muted)]",
              compact ? "text-[10px] tracking-wide" : "text-[10px]"
            )}
          >
            {nameEn}
          </span>
        )}
      </span>
    </Link>
  );
}
