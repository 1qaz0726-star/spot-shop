import { formatPrice } from "@/lib/utils";
import { listSellerProducts } from "@/services/product.service";
import Link from "next/link";

type Props = {
  sellerId: string;
  basePath: string;
  mobile?: boolean;
};

export async function SellerDashboardView({ sellerId, basePath, mobile }: Props) {
  const products = await listSellerProducts(sellerId);
  const active = products.filter((p) => p.status === "ACTIVE").length;

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h1 className={mobile ? "text-lg font-bold" : "text-2xl font-bold"}>總覽</h1>
        {mobile && (
          <Link
            href={`${basePath}/products/new`}
            className="shrink-0 rounded-lg bg-[var(--color-brand)] px-3 py-1.5 text-xs font-medium text-white"
          >
            新增商品
          </Link>
        )}
      </div>
      <div className={`mt-4 gap-3 ${mobile ? "grid grid-cols-2" : "mt-6 grid grid-cols-3 gap-4"}`}>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">商品總數</p>
          <p className="mt-1 text-2xl font-bold">{products.length}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">上架中</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{active}</p>
        </div>
        {!mobile && (
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">倉儲串接</p>
            <p className="mt-2 text-sm text-amber-600">預留中（見 docs）</p>
          </div>
        )}
      </div>

      <h2 className={`font-semibold ${mobile ? "mt-6 text-base" : "mt-10 text-lg"}`}>最近商品</h2>
      {mobile ? (
        <ul className="mt-3 space-y-2">
          {products.slice(0, 5).map((p) => (
            <li key={p.id} className="rounded-xl border border-gray-100 bg-white p-3">
              <p className="line-clamp-1 text-sm font-medium">{p.name}</p>
              <p className="mt-1 text-xs text-gray-500">
                {formatPrice(p.price)} · 庫存 {p.stock} · {p.status}
              </p>
              <Link
                href={`${basePath}/products/${p.id}/edit`}
                className="mt-2 inline-block text-xs text-[var(--color-brand)]"
              >
                編輯
              </Link>
            </li>
          ))}
        </ul>
      ) : (
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
                  <Link href={`${basePath}/products/${p.id}/edit`} className="text-[var(--color-brand)]">
                    編輯
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
