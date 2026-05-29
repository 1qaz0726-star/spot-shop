import { BrandHomeView } from "@/components/brand/BrandHomeView";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { BRAND } from "@/lib/brand";

export default function MobileBrandHomePage() {
  return (
    <>
      <MobileHeader title={BRAND.nameZh} showAccount={false} />
      <div className="brand-home-page">
        <BrandHomeView platform="mobile" />
      </div>
    </>
  );
}
