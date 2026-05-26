import { AddToCartButton } from "@/components/shared/AddToCartButton";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { getProductBySlug } from "@/services/product.service";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function MobileProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <MobileHeader title="商品詳情" backHref="/m" showBack />
      <div className="relative aspect-square bg-white">
        {product.images[0] && (
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
      </div>

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

      <div className="fixed bottom-14 left-0 right-0 flex gap-2 border-t border-gray-200 bg-white p-3">
        <AddToCartButton
          productId={product.id}
          className="flex-1"
          redirectToLogin="/login?next=/m"
        />
      </div>
    </>
  );
}
