import { ViewportRouter } from "@/components/shared/ViewportRouter";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "現貨商城 | Spot Shop",
  description: "常態現貨銷售，快速出貨",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <ViewportRouter>{children}</ViewportRouter>
      </body>
    </html>
  );
}
