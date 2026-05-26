import { DesktopFooter } from "@/components/desktop/DesktopFooter";
import { DesktopHeader } from "@/components/desktop/DesktopHeader";

export default function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <DesktopHeader />
      <main>{children}</main>
      <DesktopFooter />
    </div>
  );
}
