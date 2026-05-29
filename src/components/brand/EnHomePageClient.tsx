"use client";

import { BrandHomeView } from "@/components/brand/BrandHomeView";
import { EnSiteHeader } from "@/components/brand/EnSiteHeader";
import { useBrandPlatform } from "@/components/brand/ResponsiveBrandPlatform";

export function EnHomePageClient() {
  const platform = useBrandPlatform();

  return (
    <>
      <EnSiteHeader platform={platform} />
      <div className="brand-home-page">
        <BrandHomeView platform={platform} locale="zh-TW" />
      </div>
    </>
  );
}
