import { CatalogToolbar } from "@/components/catalog/CatalogToolbar";
import { HeaderSearch } from "@/components/catalog/HeaderSearch";
import { ProductListing } from "@/components/catalog/ProductListing";
import { BRAND } from "@/lib/brand";
import { listActiveCategories, listActiveProducts } from "@/services/product.service";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function DesktopShopPage({ searchParams }: Props) {
  const { q, category } = await searchParams;
  const [products, categories] = await Promise.all([
    listActiveProducts({ q, category }),
    listActiveCategories(),
  ]);

  const hasFilter = Boolean(q || category);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6">
        <p className="text-xs font-medium tracking-[0.2em] text-[var(--color-accent)]">{BRAND.nameEn}</p>
        <h1 className="mt-1 text-2xl font-bold text-[var(--color-brand)]">商城</h1>
        <p className="mt-1 text-sm text-gray-600">{BRAND.shortTagline}</p>
        <div className="mt-4 max-w-2xl">
          <HeaderSearch />
        </div>
      </div>

      <section id="products">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold">{hasFilter ? "搜尋結果" : "精選好物"}</h2>
          {hasFilter && (
            <Link href="/shop" className="text-sm text-[var(--color-brand)] hover:underline">
              清除篩選
            </Link>
          )}
        </div>

        <CatalogToolbar categories={categories} basePath="/shop" variant="desktop" />

        <ProductListing
          products={products}
          productHrefPrefix="/products"
          emptyMessage={
            hasFilter
              ? "找不到符合的商品，試試其他關鍵字或分類"
              : "尚無上架商品，請至賣家中心新增。"
          }
        />
      </section>
    </div>
  );
}
