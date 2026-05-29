"use client";

import { EnSiteHeader } from "@/components/brand/EnSiteHeader";
import { PartnershipView } from "@/components/brand/PartnershipView";
import { useBrandPlatform } from "@/components/brand/ResponsiveBrandPlatform";

export function EnPartnershipPageClient() {
  const platform = useBrandPlatform();

  return (
    <>
      <EnSiteHeader platform={platform} title="Partnership" showBack backHref="/en" />
      <PartnershipView platform={platform} />
    </>
  );
}
