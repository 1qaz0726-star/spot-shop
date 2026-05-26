import { getSession } from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/shared/LogoutButton";

export default async function DesktopAccountPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/account");

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-bold">會員中心</h1>
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <dl className="space-y-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">姓名</dt>
            <dd className="font-medium">{session.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Email</dt>
            <dd>{session.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">身分</dt>
            <dd>{session.role === "SELLER" ? "賣家" : "買家"}</dd>
          </div>
        </dl>
        <div className="mt-8 flex gap-4">
          <Link href="/orders" className="text-[var(--color-brand)] hover:underline">
            查看訂單
          </Link>
          {session.role === "SELLER" && (
            <Link href="/seller" className="text-[var(--color-brand)] hover:underline">
              賣家中心
            </Link>
          )}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
