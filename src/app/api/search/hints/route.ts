import { listActiveCategories, listActiveProducts } from "@/services/product.service";
import { NextResponse } from "next/server";

/** 熱門搜尋：依上架商品名稱與分類動態產生 */
export async function GET() {
  const [products, categories] = await Promise.all([
    listActiveProducts(),
    listActiveCategories(),
  ]);

  const fromProducts = products.map((p) => p.name);
  const hot = [...new Set([...fromProducts, ...categories])].slice(0, 10);

  return NextResponse.json({ hot });
}
