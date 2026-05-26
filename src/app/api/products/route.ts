import { getSession } from "@/lib/session";
import { productCreateSchema } from "@/lib/validations/product";
import { createProduct, listActiveProducts } from "@/services/product.service";
import { Role, ProductStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const products = await listActiveProducts({
    category: searchParams.get("category") ?? undefined,
    q: searchParams.get("q") ?? undefined,
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== Role.SELLER) {
    return NextResponse.json({ error: "需要賣家權限" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = productCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const product = await createProduct(session.id, {
    ...parsed.data,
    status: parsed.data.status as ProductStatus,
  });
  return NextResponse.json(product, { status: 201 });
}
