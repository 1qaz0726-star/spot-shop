import { MobileHeader } from "@/components/mobile/MobileHeader";
import { LogoutButton } from "@/components/shared/LogoutButton";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { ChevronRight, Package, MapPin, Headphones } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default async function MobileAccountPage() {
  const session = await getSession();

  const menu = [
    { href: "/m/orders", icon: Package, label: "我的訂單" },
    { href: "#", icon: MapPin, label: "收件地址" },
    { href: "#", icon: Headphones, label: "客服中心" },
  ];

  return (
    <>
      <MobileHeader title="我的" />
      {!session ? (
        <div className="px-4 py-16 text-center">
          <p className="text-gray-600">登入以管理帳號與訂單</p>
          <Link href="/login?next=/m/account" className="mt-4 inline-block">
            <Button>登入</Button>
          </Link>
          <p className="mt-4 text-xs text-gray-400">示範：buyer@demo.com / demo123</p>
        </div>
      ) : (
        <>
          <div className="bg-brand-gradient px-4 py-6 text-on-brand-gradient">
            <p className="text-lg font-bold">{session.name}</p>
            <p className="text-sm opacity-90">{session.email}</p>
          </div>

          <ul className="mt-2 bg-white">
            {menu.map(({ href, icon: Icon, label }) => (
              <li key={label} className="border-b border-gray-50">
                <Link href={href} className="flex items-center justify-between px-4 py-4">
                  <span className="flex items-center gap-3 text-sm">
                    <Icon className="h-5 w-5 text-gray-500" />
                    {label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </li>
            ))}
            {session.role === "SELLER" && (
              <li className="border-b border-gray-50">
                <Link href="/m/seller" className="flex items-center justify-between px-4 py-4 text-sm">
                  賣家中心
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </li>
            )}
          </ul>

          <div className="mt-6 px-4">
            <LogoutButton />
          </div>
        </>
      )}
    </>
  );
}
