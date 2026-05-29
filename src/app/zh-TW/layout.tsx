import { BRAND_PITCH } from "@/lib/brand-pitch";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: BRAND_PITCH.title,
  description: BRAND_PITCH.description,
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <main>{children}</main>
      <footer className="border-t border-gray-100 bg-[var(--color-surface)] py-6 text-center text-xs text-gray-500">
        <p>
          © {new Date().getFullYear()} {BRAND_PITCH.nameZh} · {BRAND_PITCH.productName} 授權洽談頁
        </p>
        <p className="mt-2">
          <Link href="/" className="text-[var(--color-brand)] hover:underline">
            返回官網首頁
          </Link>
          {" · "}
          <a
            href={`mailto:${BRAND_PITCH.contact.email}?subject=${encodeURIComponent(
              "SUSUBAG 台灣嘖嘖代理授權洽談"
            )}`}
            className="text-[var(--color-brand)] hover:underline"
          >
            {BRAND_PITCH.contact.email}
          </a>
        </p>
      </footer>
    </div>
  );
}
