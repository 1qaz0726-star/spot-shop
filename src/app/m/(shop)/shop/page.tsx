import { CatalogToolbar } from "@/components/catalog/CatalogToolbar";
import { ProductListing } from "@/components/catalog/ProductListing";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileHomeServices } from "@/components/mobile/MobileHomeServices";
import { MobileSearchSection } from "@/components/mobile/MobileSearchSection";
import { listActiveCategories, listActiveProducts } from "@/services/product.service";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function MobileShopPage({ searchParams }: Props) {
  const { q, category } = await searchParams;
  const [products, categories] = await Promise.all([
    listActiveProducts({ q, category }),
    listActiveCategories(),
  ]);

  const hasFilter = Boolean(q || category);

  return (
    <>
      <MobileHeader title="商城" showBack backHref="/m" />
      <MobileSearchSection catalogPath="/m/shop" />
      <MobileHomeServices />
      <CatalogToolbar categories={categories} basePath="/m/shop" variant="mobile" />

      {hasFilter && (
        <div className="flex items-center justify-between px-3 py-2">
          <p className="text-sm font-medium text-gray-700">搜尋結果</p>
          <Link href="/m/shop" className="text-xs text-[var(--color-brand)]">
            清除
          </Link>
        </div>
      )}

      <ProductListing
        products={products}
        productHrefPrefix="/m/products"
        emptyMessage={hasFilter ? "找不到符合的商品" : "尚無商品"}
      />
    </>
  );
}
