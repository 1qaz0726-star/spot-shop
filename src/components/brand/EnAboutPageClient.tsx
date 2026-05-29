"use client";

import { AboutView } from "@/components/brand/AboutView";
import { EnSiteHeader } from "@/components/brand/EnSiteHeader";
import { useBrandPlatform } from "@/components/brand/ResponsiveBrandPlatform";

export function EnAboutPageClient() {
  const platform = useBrandPlatform();

  return (
    <>
      <EnSiteHeader platform={platform} title="About" showBack backHref="/en" />
      <AboutView platform={platform} locale="en" />
    </>
  );
}
