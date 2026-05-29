"use client";

import { AboutView } from "@/components/brand/AboutView";
import { EnSiteHeader } from "@/components/brand/EnSiteHeader";
import { PITCH_BASE } from "@/lib/brand-pitch";
import { useBrandPlatform } from "@/components/brand/ResponsiveBrandPlatform";

export function EnAboutPageClient() {
  const platform = useBrandPlatform();

  return (
    <>
      <EnSiteHeader platform={platform} title="關於我們" showBack backHref={PITCH_BASE} />
      <AboutView platform={platform} locale="zh-TW" />
    </>
  );
}
