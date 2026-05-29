import { BRAND_EN } from "@/lib/brand-en";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: BRAND_EN.title,
  description: BRAND_EN.description,
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <main>{children}</main>
      <footer className="border-t border-gray-100 bg-[var(--color-surface)] py-6 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} {BRAND_EN.nameEn}</p>
        <p className="mt-2">
          <Link href="/" className="text-[var(--color-brand)] hover:underline">
            繁體中文站
          </Link>
          {" · "}
          <a
            href={`mailto:${BRAND_EN.contact.email}`}
            className="text-[var(--color-brand)] hover:underline"
          >
            {BRAND_EN.contact.email}
          </a>
        </p>
      </footer>
    </div>
  );
}
