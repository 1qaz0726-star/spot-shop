import { CatalogToolbar } from "@/components/catalog/CatalogToolbar";
import { ProductListing } from "@/components/catalog/ProductListing";
import { BRAND } from "@/lib/brand";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileHomeServices } from "@/components/mobile/MobileHomeServices";
import { MobileSearchSection } from "@/components/mobile/MobileSearchSection";
import { listActiveCategories, listActiveProducts } from "@/services/product.service";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function MobileHomePage({ searchParams }: Props) {
  const { q, category } = await searchParams;
  const [products, categories] = await Promise.all([
    listActiveProducts({ q, category }),
    listActiveCategories(),
  ]);

  const hasFilter = Boolean(q || category);

  return (
    <>
      <MobileHeader title={BRAND.nameZh} />
      <MobileSearchSection catalogPath="/m" />
      <MobileHomeServices />
      <CatalogToolbar categories={categories} basePath="/m" variant="mobile" />

      {hasFilter && (
        <div className="flex items-center justify-between px-3 py-2">
          <p className="text-sm font-medium text-gray-700">搜尋結果</p>
          <Link href="/m" className="text-xs text-[var(--color-brand)]">
            清除
          </Link>
        </div>
      )}

      <ProductListing
        products={products}
        productHrefPrefix="/m/products"
        emptyMessage={hasFilter ? "找不到符合的商品" : "尚無商品"}
      />

      <div className="px-4 py-6 text-center">
        <form action="/api/device" method="POST">
          <input type="hidden" name="mode" value="desktop" />
          <button type="submit" className="text-xs text-gray-500 underline">
            切換至電腦版
          </button>
        </form>
      </div>
    </>
  );
}
