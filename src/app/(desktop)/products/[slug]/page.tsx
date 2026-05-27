import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { AddToCartButton } from "@/components/shared/AddToCartButton";
import { getProductBySlug } from "@/services/product.service";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Truck, Shield, RotateCcw } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export default async function DesktopProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-12 lg:grid-cols-2">
        <ProductImageGallery images={product.images} alt={product.name} variant="desktop" />

        <div>
          {product.category && (
            <span className="text-sm text-gray-500">{product.category}</span>
          )}
          <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-3xl font-bold text-[var(--color-brand)]">
            {formatPrice(product.price)}
          </p>
          <p className="mt-2 text-sm text-emerald-600">現貨 {product.stock} 件 · 賣家：{product.seller.name}</p>

          <div className="mt-8 flex gap-4">
            <AddToCartButton productId={product.id} className="flex-1 !px-6 !py-3 !text-base" />
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 rounded-xl border border-gray-100 bg-white p-4 text-sm">
            <div className="flex flex-col items-center gap-2 text-center text-gray-600">
              <Truck className="h-5 w-5 text-[var(--color-brand)]" />
              <span>1–2 工作日出貨</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center text-gray-600">
              <Shield className="h-5 w-5 text-[var(--color-brand)]" />
              <span>正品保障</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center text-gray-600">
              <RotateCcw className="h-5 w-5 text-[var(--color-brand)]" />
              <span>7 天鑑賞</span>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="border-b border-gray-200 pb-2 text-lg font-semibold">商品詳情</h2>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-700">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
