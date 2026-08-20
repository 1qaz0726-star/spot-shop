import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import "./globals.css";
import { ViewportRouter } from "@/components/shared/ViewportRouter";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: BRAND.title,
  description: BRAND.description,
  manifest: "/site.webmanifest",
  /** 分頁小圖：優先 favicon.ico（32px），並保留 app/icon.png 由 Next 自動處理 */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
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
