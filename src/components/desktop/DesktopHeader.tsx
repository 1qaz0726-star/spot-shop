import { BrandLogoLink } from "@/components/brand/BrandLogoLink";
import { DesktopHeaderBar } from "@/components/desktop/DesktopHeaderBar";
import { BRAND } from "@/lib/brand";
import { getSession } from "@/lib/session";

export async function DesktopHeader() {
  const session = await getSession();

  const sessionInfo = session
    ? { name: session.name, role: session.role as "BUYER" | "SELLER" }
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-6">
        <BrandLogoLink href="/" nameZh={BRAND.nameZh} nameEn={BRAND.nameEn} />

        <DesktopHeaderBar session={sessionInfo} />
      </div>
    </header>
  );
}
