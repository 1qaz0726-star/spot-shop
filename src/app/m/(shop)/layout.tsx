import { MobileTabBar } from "@/components/mobile/MobileTabBar";

export default function MobileShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-20">
      {children}
      <MobileTabBar />
    </div>
  );
}
