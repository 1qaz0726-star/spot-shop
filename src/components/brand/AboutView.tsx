import { BrandAboutHero } from "@/components/brand/BrandAboutHero";
import { BRAND_PITCH } from "@/lib/brand-pitch";
import type { Locale } from "@/lib/locale";
import { getBrandContent, isPitchLocale, partnershipPath, shopPathForLocale } from "@/lib/locale";
import Link from "next/link";

type Props = {
  platform: "desktop" | "mobile";
  locale?: Locale;
};

export function AboutView({ platform, locale = "zh" }: Props) {
  const isMobile = platform === "mobile";
  const pitch = isPitchLocale(locale);
  const brand = pitch ? BRAND_PITCH : getBrandContent("zh");

  return (
    <div className={isMobile ? "pb-6" : "mx-auto max-w-3xl pb-12"}>
      <BrandAboutHero
        platform={platform}
        nameZh={brand.nameZh}
        nameEn={brand.nameEn}
        tagline={brand.tagline}
        eyebrow={pitch ? BRAND_PITCH.productBrand : undefined}
      />

      <div className={isMobile ? "px-4 pt-8" : "px-6 pt-10"}>
        <h2 className="text-lg font-semibold text-[var(--color-brand)]">
          {pitch ? "我們的背景" : "關於我們"}
        </h2>
        <p className="mt-4 leading-relaxed text-gray-700">{brand.about.intro}</p>

        {brand.about.story.map((para, i) => (
          <p key={i} className="mt-4 leading-relaxed text-gray-600">
            {para}
          </p>
        ))}

        <div
          className={
            isMobile ? "mt-8 grid gap-4" : "mt-12 grid gap-6 sm:grid-cols-3"
          }
        >
          {brand.about.values.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <h3 className="font-semibold text-[var(--color-brand)]">{v.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{v.desc}</p>
            </div>
          ))}
        </div>

        <section
          id="contact"
          className="mt-12 scroll-mt-24 rounded-xl bg-[var(--color-brand-light)]/50 p-6"
        >
          <h2 className="text-lg font-semibold text-[var(--color-brand)]">聯絡我們</h2>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>
              <a href={`mailto:${brand.contact.email}`} className="text-[var(--color-brand)] hover:underline">
                {brand.contact.email}
              </a>
            </li>
            <li>{brand.contact.hours}</li>
          </ul>
        </section>

        <div className="mt-8 flex flex-wrap gap-4">
          {pitch && (
            <Link
              href={partnershipPath(locale)}
              className="text-sm font-medium text-[var(--color-brand)] hover:underline"
            >
              查看授權說明 →
            </Link>
          )}
          {!pitch && (
            <Link
              href={shopPathForLocale(locale, isMobile)}
              className="text-sm font-medium text-[var(--color-brand)] hover:underline"
            >
              前往商城選購 →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
