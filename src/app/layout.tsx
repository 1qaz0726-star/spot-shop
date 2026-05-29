import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import "./globals.css";
import { ViewportRouter } from "@/components/shared/ViewportRouter";

export const metadata: Metadata = {
  title: BRAND.title,
  description: BRAND.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="antialiased">
        <ViewportRouter>{children}</ViewportRouter>
      </body>
    </html>
  );
}
