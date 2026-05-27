import { MobileTabBar } from "@/components/mobile/MobileTabBar";

export default function MobileShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-[calc(var(--spacing-mobile-tab)+env(safe-area-inset-bottom,0px))]">
      {children}
      <MobileTabBar />
    </div>
  );
}
