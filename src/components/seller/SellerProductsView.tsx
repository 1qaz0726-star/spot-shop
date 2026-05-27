import { formatPrice } from "@/lib/utils";
import { listSellerProducts } from "@/services/product.service";
import Image from "next/image";
import Link from "next/link";

type Props = {
  sellerId: string;
  basePath: string;
  mobile?: boolean;
};

export async function SellerProductsView({ sellerId, basePath, mobile }: Props) {
  const products = await listSellerProducts(sellerId);

  return (
    <div>
      <div className={`flex items-center justify-between gap-2 ${mobile ? "" : ""}`}>
        <h1 className={mobile ? "text-lg font-bold" : "text-2xl font-bold"}>商品管理</h1>
        <Link
          href={`${basePath}/products/new`}
          className="shrink-0 rounded-lg bg-[var(--color-brand)] px-3 py-1.5 text-xs text-white md:px-4 md:py-2 md:text-sm"
        >
          新增商品
        </Link>
      </div>

      <div className={`space-y-3 ${mobile ? "mt-4" : "mt-6"}`}>
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 md:gap-4 md:p-4"
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100 md:h-16 md:w-16">
              {p.images[0] && (
                <Image src={p.images[0].url} alt="" fill className="object-cover" sizes="64px" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium">{p.name}</p>
              <p className="mt-0.5 text-xs text-gray-500 md:text-sm">
                {formatPrice(p.price)} · 庫存 {p.stock} · {p.status}
              </p>
            </div>
            <Link
              href={`${basePath}/products/${p.id}/edit`}
              className="shrink-0 text-xs text-[var(--color-brand)] md:text-sm"
            >
              編輯
            </Link>
          </div>
        ))}
        {products.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-500">尚無商品，點右上角新增</p>
        )}
      </div>
    </div>
  );
}
