import { ProductCard } from "@/components/shared/ProductCard";
import type { ProductListItem } from "@/types/product";

type Props = {
  products: ProductListItem[];
  productHrefPrefix: string;
  emptyMessage?: string;
};

export function ProductListing({
  products,
  productHrefPrefix,
  emptyMessage = "找不到符合的商品",
}: Props) {
  if (products.length === 0) {
    return <p className="py-16 text-center text-gray-500">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-2 items-stretch gap-2 p-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 md:p-0">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          href={`${productHrefPrefix}/${p.slug}`}
        />
      ))}
    </div>
  );
}
