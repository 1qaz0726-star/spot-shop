"use client";

import { EnSiteHeader } from "@/components/brand/EnSiteHeader";
import { PITCH_BASE } from "@/lib/brand-pitch";
import { PartnershipView } from "@/components/brand/PartnershipView";
import { useBrandPlatform } from "@/components/brand/ResponsiveBrandPlatform";

export function EnPartnershipPageClient() {
  const platform = useBrandPlatform();

  return (
    <>
      <EnSiteHeader platform={platform} title="授權說明" showBack backHref={PITCH_BASE} />
      <PartnershipView platform={platform} />
    </>
  );
}
