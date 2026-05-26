import { CatalogToolbar } from "@/components/catalog/CatalogToolbar";
import { ProductListing } from "@/components/catalog/ProductListing";
import { listActiveCategories, listActiveProducts } from "@/services/product.service";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function DesktopHomePage({ searchParams }: Props) {
  const { q, category } = await searchParams;
  const [products, categories] = await Promise.all([
    listActiveProducts({ q, category }),
    listActiveCategories(),
  ]);

  const hasFilter = Boolean(q || category);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <section className="mb-6 flex items-center justify-between gap-6 overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-8 py-5 text-white">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider opacity-90">Spot Shop</p>
          <h1 className="mt-1 text-xl font-bold md:text-2xl">常態現貨 · 快速出貨</h1>
          <p className="mt-1 max-w-lg text-sm opacity-90">
            清楚標價、庫存透明 · 下單後 1–2 工作日出貨
          </p>
        </div>
        <Link
          href="#products"
          className="shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50"
        >
          立即選購
        </Link>
      </section>

      <section id="products">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">
            {hasFilter ? "搜尋結果" : "熱銷現貨"}
          </h2>
          {hasFilter && (
            <Link href="/" className="text-sm text-[var(--color-brand)] hover:underline">
              清除篩選
            </Link>
          )}
        </div>

        <CatalogToolbar categories={categories} basePath="/" variant="desktop" />

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
