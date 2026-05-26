import { getSession } from "@/lib/session";
import { listSellerProducts } from "@/services/product.service";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function SellerProductsPage() {
  const session = await getSession();
  if (!session) return null;

  const products = await listSellerProducts(session.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">商品管理</h1>
        <Link
          href="/seller/products/new"
          className="rounded-lg bg-[var(--color-brand)] px-4 py-2 text-sm text-white"
        >
          新增商品
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
              {p.images[0] && (
                <Image src={p.images[0].url} alt="" fill className="object-cover" sizes="64px" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">
                {formatPrice(p.price)} · 庫存 {p.stock} · {p.status}
              </p>
            </div>
            <Link href={`/seller/products/${p.id}/edit`} className="text-sm text-[var(--color-brand)]">
              編輯
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
