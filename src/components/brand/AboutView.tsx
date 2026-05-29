import type { Locale } from "@/lib/locale";
import { getBrandContent, partnershipPath, shopPathForLocale } from "@/lib/locale";
import Link from "next/link";

type Props = {
  platform: "desktop" | "mobile";
  locale?: Locale;
};

export function AboutView({ platform, locale = "zh" }: Props) {
  const isMobile = platform === "mobile";
  const brand = getBrandContent(locale);
  const isEn = locale === "en";

  return (
    <div className={isMobile ? "px-4 py-6" : "mx-auto max-w-3xl px-6 py-12"}>
      <p className="text-xs font-medium tracking-[0.25em] text-[var(--color-accent)]">
        {brand.nameEn}
      </p>
      <h1
        className={
          isMobile
            ? "mt-2 text-2xl font-bold text-[var(--color-brand)]"
            : "mt-2 text-3xl font-bold text-[var(--color-brand)]"
        }
      >
        {brand.about.headline}
      </h1>
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
        <h2 className="text-lg font-semibold text-[var(--color-brand)]">
          {isEn ? "Contact" : "聯絡我們"}
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          <li>LINE {brand.contact.line}</li>
          <li>
            <a href={`mailto:${brand.contact.email}`} className="text-[var(--color-brand)] hover:underline">
              {brand.contact.email}
            </a>
          </li>
          <li>{brand.contact.hours}</li>
        </ul>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        {isEn && (
          <Link
            href={partnershipPath("en")}
            className="text-sm font-medium text-[var(--color-brand)] hover:underline"
          >
            Partnership details →
          </Link>
        )}
        {!isEn && (
          <Link
            href={shopPathForLocale(locale, isMobile)}
            className="text-sm font-medium text-[var(--color-brand)] hover:underline"
          >
            前往商城選購 →
          </Link>
        )}
      </div>
    </div>
  );
}
