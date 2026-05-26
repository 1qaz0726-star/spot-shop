import { getSession } from "@/lib/session";
import { listSellerProducts } from "@/services/product.service";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default async function SellerDashboardPage() {
  const session = await getSession();
  if (!session) return null;

  const products = await listSellerProducts(session.id);
  const active = products.filter((p) => p.status === "ACTIVE").length;

  return (
    <div>
      <h1 className="text-2xl font-bold">總覽</h1>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">商品總數</p>
          <p className="mt-2 text-3xl font-bold">{products.length}</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">上架中</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">{active}</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">倉儲串接</p>
          <p className="mt-2 text-sm text-amber-600">預留中（見 docs）</p>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-semibold">最近商品</h2>
      <table className="mt-4 w-full overflow-hidden rounded-xl bg-white text-sm shadow-sm">
        <thead className="bg-gray-50 text-left text-gray-500">
          <tr>
            <th className="p-3">名稱</th>
            <th className="p-3">價格</th>
            <th className="p-3">庫存</th>
            <th className="p-3">狀態</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {products.slice(0, 5).map((p) => (
            <tr key={p.id} className="border-t border-gray-100">
              <td className="p-3 font-medium">{p.name}</td>
              <td className="p-3">{formatPrice(p.price)}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3">{p.status}</td>
              <td className="p-3">
                <Link href={`/seller/products/${p.id}/edit`} className="text-[var(--color-brand)]">
                  編輯
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
