import { BrandHomeView } from "@/components/brand/BrandHomeView";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { BRAND } from "@/lib/brand";
import Link from "next/link";

export default function MobileBrandHomePage() {
  return (
    <>
      <MobileHeader title={BRAND.nameZh} showAccount={false} />
      <BrandHomeView platform="mobile" />
      <div className="px-4 pb-6 text-center">
        <form action="/api/device" method="POST">
          <input type="hidden" name="mode" value="desktop" />
          <button type="submit" className="text-xs text-gray-500 underline">
            切換至電腦版
          </button>
        </form>
      </div>
    </>
  );
}
