import { CatalogToolbar } from "@/components/catalog/CatalogToolbar";
import { ProductListing } from "@/components/catalog/ProductListing";
import { BRAND } from "@/lib/brand";
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
      <section className="mb-6 flex items-center justify-between gap-6 overflow-hidden rounded-xl bg-brand-gradient px-8 py-6 text-on-brand-gradient shadow-md">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-[0.2em] text-[var(--color-accent)]">
            {BRAND.nameEn}
          </p>
          <h1 className="mt-1 text-xl font-bold md:text-2xl">{BRAND.tagline}</h1>
          <p className="mt-1 max-w-lg text-sm opacity-90">{BRAND.heroSub}</p>
        </div>
        <Link href="#products" className="btn-on-brand-gradient shrink-0 rounded-lg px-4 py-2 text-sm">
          立即選購
        </Link>
      </section>

      <section id="products">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">
            {hasFilter ? "搜尋結果" : "精選好物"}
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
