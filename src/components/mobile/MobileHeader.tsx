import { BrandLogoLink } from "@/components/brand/BrandLogoLink";
import { BrandMenuDrawer } from "@/components/brand/BrandMenuDrawer";
import { BRAND } from "@/lib/brand";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type Props = {
  title?: string;
  backHref?: string;
  showBack?: boolean;
  /** 品牌首頁／關於頁不顯示右上角「我」 */
  showAccount?: boolean;
};

export async function MobileHeader({
  title = BRAND.nameZh,
  backHref,
  showBack,
  showAccount = true,
}: Props) {
  const session = await getSession();

  const accountLink = session ? (
    <Link href="/m/account" className="px-1 text-xs text-gray-600">
      我
    </Link>
  ) : (
    <Link href="/login" className="px-1 text-xs font-medium text-[var(--color-brand)]">
      登入
    </Link>
  );

  return (
    <header className="safe-area-top sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="flex h-11 items-center gap-1 px-2">
        {showBack && backHref ? (
          <>
            <div className="flex w-9 shrink-0 items-center">
              <Link href={backHref} className="p-1 text-gray-700" aria-label="返回">
                <ChevronLeft className="h-6 w-6" />
              </Link>
            </div>
            <h1 className="min-w-0 flex-1 truncate text-center text-base font-semibold">{title}</h1>
            <div className="flex shrink-0 items-center gap-0.5">
              <BrandMenuDrawer platform="mobile" />
              {showAccount && accountLink}
            </div>
          </>
        ) : (
          <>
            <BrandLogoLink
              href="/m"
              nameZh={BRAND.nameZh}
              nameEn={BRAND.nameEn}
              compact
              className="min-w-0 flex-1 pl-1"
            />
            <div className="flex shrink-0 items-center gap-0.5">
              <BrandMenuDrawer platform="mobile" />
              {showAccount && accountLink}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
