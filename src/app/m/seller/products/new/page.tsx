import { ProductForm } from "@/components/seller/ProductForm";

export default function MobileNewProductPage() {
  return (
    <div>
      <h1 className="mb-4 text-lg font-bold">新增商品</h1>
      <ProductForm productsListPath="/m/seller/products" />
    </div>
  );
}
