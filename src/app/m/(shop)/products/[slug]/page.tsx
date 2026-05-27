import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { AddToCartButton } from "@/components/shared/AddToCartButton";
import { MobileHeader } from "@/components/mobile/MobileHeader";
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

      {/* 底部留白：加入購物車列 + 底部 Tab，避免說明被擋住 */}
      <div className="pb-[calc(8.5rem+env(safe-area-inset-bottom,0px))]">
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
            <li>· 客服 LINE @spotshop</li>
          </ul>
        </div>

        <div className="mt-2 bg-white px-4 py-4">
          <h2 className="text-sm font-semibold">商品說明</h2>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-700">
            {product.description}
          </p>
        </div>
      </div>

      <div className="fixed bottom-14 left-0 right-0 z-40 border-t border-gray-200 bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        <AddToCartButton
          productId={product.id}
          className="flex-1"
          redirectToLogin={`/login?next=/m/products/${slug}`}
        />
      </div>
    </>
  );
}
