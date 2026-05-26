import { getSession } from "@/lib/session";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type Props = {
  title?: string;
  backHref?: string;
  showBack?: boolean;
};

export async function MobileHeader({ title = "現貨商城", backHref, showBack }: Props) {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 flex h-12 items-center justify-between border-b border-gray-100 bg-white px-3 safe-area-top">
      <div className="flex w-10 items-center">
        {showBack && backHref ? (
          <Link href={backHref} className="p-1 text-gray-700">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        ) : (
          <Link href="/m" className="text-sm font-bold text-[var(--color-brand)]">
            商城
          </Link>
        )}
      </div>
      <h1 className="flex-1 truncate text-center text-base font-semibold">{title}</h1>
      <div className="flex w-10 justify-end">
        {session ? (
          <Link href="/m/account" className="text-xs text-gray-600">
            我
          </Link>
        ) : (
          <Link href="/login" className="text-xs font-medium text-[var(--color-brand)]">
            登入
          </Link>
        )}
      </div>
    </header>
  );
}
