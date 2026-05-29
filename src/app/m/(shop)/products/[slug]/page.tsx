import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { BRAND } from "@/lib/brand";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileProductPurchaseBar } from "@/components/mobile/MobileProductPurchaseBar";
import { getProductBySlug } from "@/services/product.service";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function MobileProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <MobileHeader title="商品詳情" backHref="/m" showBack />

      {/* 留白 = 固定購買列高度（Tab 留白由 shop layout 處理） */}
      <div className="pb-[var(--spacing-mobile-purchase)]">
        <ProductImageGallery images={product.images} alt={product.name} variant="mobile" />

        <div className="bg-white px-4 py-4">
          <p className="text-xl font-bold text-[var(--color-brand)]">{formatPrice(product.price)}</p>
          <h1 className="mt-2 text-base font-semibold leading-snug">{product.name}</h1>
          <p className="mt-2 text-xs text-emerald-600">現貨 {product.stock} · {product.seller.name}</p>
        </div>

        <div className="mt-2 bg-white px-4 py-3 text-sm">
          <h2 className="font-semibold text-gray-800">出貨與保障</h2>
          <ul className="mt-2 space-y-1 text-gray-600">
            <li>· 現貨 1–2 工作日出貨</li>
            <li>· 7 天鑑賞期（未拆封）</li>
            <li>
              · 客服信箱{" "}
              <a href={`mailto:${BRAND.contact.email}`} className="text-[var(--color-brand)]">
                {BRAND.contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-2 bg-white px-4 py-4">
          <h2 className="text-sm font-semibold">商品說明</h2>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-700">
            {product.description}
          </p>
        </div>
      </div>

      <MobileProductPurchaseBar
        productId={product.id}
        stock={product.stock}
        slug={slug}
      />
    </>
  );
}
