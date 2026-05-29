import { BRAND_PITCH } from "@/lib/brand-pitch";
import { aboutPath } from "@/lib/locale";
import Link from "next/link";

type Props = {
  platform: "desktop" | "mobile";
};

export function PartnershipView({ platform }: Props) {
  const isMobile = platform === "mobile";
  const p = BRAND_PITCH.partnership;

  return (
    <div className={isMobile ? "px-4 py-6" : "mx-auto max-w-3xl px-6 py-12"}>
      <p className="text-xs font-medium tracking-[0.25em] text-[var(--color-accent)]">
        {BRAND_PITCH.productName} · {BRAND_PITCH.productBrand}
      </p>
      <h1
        className={
          isMobile
            ? "mt-2 text-2xl font-bold text-[var(--color-brand)]"
            : "mt-2 text-3xl font-bold text-[var(--color-brand)]"
        }
      >
        {p.headline}
      </h1>
      <p className="mt-4 leading-relaxed text-gray-700">{p.intro}</p>

      <ul className="mt-8 space-y-4">
        {p.bullets.map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4 text-sm leading-relaxed text-gray-700 shadow-sm"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
            {item}
          </li>
        ))}
      </ul>

      <p className="mt-8 leading-relaxed text-gray-600">{p.cta}</p>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href={`mailto:${BRAND_PITCH.contact.email}?subject=${encodeURIComponent(
            "SUSUBAG 台灣嘖嘖代理授權洽談 — 拓新集創"
          )}`}
          className="nc-interactive nc-press inline-flex rounded-lg bg-[var(--color-brand)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-brand-dark)]"
        >
          來信洽談
        </a>
        <Link
          href={aboutPath("zh-TW", isMobile)}
          className="inline-flex items-center text-sm font-medium text-[var(--color-brand)] hover:underline"
        >
          關於我們與聯絡方式 →
        </Link>
      </div>
    </div>
  );
}
