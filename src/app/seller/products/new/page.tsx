import { ProductForm } from "@/components/seller/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">新增商品</h1>
      <ProductForm productsListPath="/seller/products" />
    </div>
  );
}
