import { ProductForm } from "@/components/seller/ProductForm";
import { getSession } from "@/lib/session";
import { getSellerProduct } from "@/services/product.service";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function MobileEditProductPage({ params }: Props) {
  const session = await getSession();
  const { id } = await params;
  const product = session ? await getSellerProduct(session.id, id) : null;
  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-4 text-lg font-bold">編輯商品</h1>
      <ProductForm
        productId={product.id}
        productsListPath="/m/seller/products"
        initial={{
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category ?? "",
          status: product.status,
          images: product.images.map((i) => i.url),
        }}
      />
    </div>
  );
}
