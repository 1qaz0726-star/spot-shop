import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Props = {
  shopHref: string;
  loginHref?: string;
  showLogin?: boolean;
};

export function CartEmptyState({ shopHref, loginHref = "/login", showLogin }: Props) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
        <ShoppingBag className="h-8 w-8 text-[var(--color-brand)]" />
      </div>
      <p className="mt-4 font-medium text-gray-800">購物車是空的</p>
      <p className="mt-1 text-sm text-gray-500">去挑選現貨商品吧</p>
      <Link href={shopHref} className="mt-6">
        <Button>去逛逛</Button>
      </Link>
      {showLogin && (
        <Link href={loginHref} className="mt-3 text-sm text-[var(--color-brand)] hover:underline">
          登入以同步購物車
        </Link>
      )}
    </div>
  );
}
