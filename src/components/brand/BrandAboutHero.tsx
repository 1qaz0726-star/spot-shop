import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  platform: "desktop" | "mobile";
  nameZh: string;
  nameEn: string;
  tagline: string;
  /** 洽談站等可顯示副標，例如合作品牌 */
  eyebrow?: string;
};

export function BrandAboutHero({ platform, nameZh, nameEn, tagline, eyebrow }: Props) {
  const isMobile = platform === "mobile";
  const logoSize = isMobile ? 72 : 96;

  return (
    <header
      className={cn(
        "flex flex-col items-center border-b border-gray-100 text-center",
        isMobile ? "px-4 pb-8 pt-2" : "pb-10 pt-4"
      )}
    >
      <Image
        src="/logo-mark-circle.png"
        alt=""
        width={logoSize}
        height={logoSize}
        className={cn(
          "rounded-full object-cover shadow-md",
          isMobile ? "h-[72px] w-[72px]" : "h-24 w-24"
        )}
        priority
      />

      {eyebrow && (
        <p className="mt-4 text-xs font-medium tracking-[0.2em] text-[var(--color-accent)]">
          {eyebrow}
        </p>
      )}

      <h1
        className={cn(
          "font-bold tracking-tight text-[var(--color-brand)]",
          eyebrow ? "mt-2" : "mt-5",
          isMobile ? "text-2xl" : "text-3xl"
        )}
      >
        {nameZh}
      </h1>

      <p
        className={cn(
          "mt-1 font-medium tracking-[0.25em] text-[var(--color-muted)]",
          isMobile ? "text-xs" : "text-sm"
        )}
      >
        {nameEn}
      </p>

      <p
        className={cn(
          "mt-3 font-medium text-gray-600",
          isMobile ? "max-w-xs text-sm" : "max-w-md text-base"
        )}
      >
        {tagline}
      </p>
    </header>
  );
}
