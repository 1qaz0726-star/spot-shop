import { MobileTabBar } from "@/components/mobile/MobileTabBar";

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {children}
      <MobileTabBar />
    </div>
  );
}
