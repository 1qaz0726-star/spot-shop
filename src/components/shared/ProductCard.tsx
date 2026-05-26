import { formatPrice } from "@/lib/utils";
import type { ProductListItem } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: ProductListItem;
  href: string;
  layout?: "grid" | "row";
};

export function ProductCard({ product, href, layout = "grid" }: Props) {
  if (layout === "row") {
    return (
      <Link href={href} className="flex gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="96px" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-400">無圖</div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h3 className="line-clamp-2 text-sm font-medium">{product.name}</h3>
          <p className="mt-1 text-base font-bold text-[var(--color-brand)]">{formatPrice(product.price)}</p>
          <p className="text-xs text-gray-500">現貨 {product.stock} 件</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-square shrink-0 overflow-hidden bg-gray-50">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">無圖片</div>
        )}
        {product.category && (
          <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
            {product.category}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        {/* 固定兩行高度，同一排商品價格才能對齊 */}
        <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-medium leading-snug text-gray-900">
          {product.name}
        </h3>
        <p className="mt-2 text-lg font-bold leading-none text-[var(--color-brand)]">
          {formatPrice(product.price)}
        </p>
        <p className="mt-1 text-xs text-emerald-600">現貨供應</p>
      </div>
    </Link>
  );
}
