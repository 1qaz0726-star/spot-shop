import { getSession } from "@/lib/session";
import { productCreateSchema } from "@/lib/validations/product";
import { deleteProduct, getSellerProduct, updateProduct } from "@/services/product.service";
import { Role, ProductStatus } from "@prisma/client";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const session = await getSession();
  if (!session || session.role !== Role.SELLER) {
    return NextResponse.json({ error: "需要賣家權限" }, { status: 403 });
  }
  const { id } = await params;
  const product = await getSellerProduct(session.id, id);
  if (!product) return NextResponse.json({ error: "找不到商品" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PATCH(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session || session.role !== Role.SELLER) {
    return NextResponse.json({ error: "需要賣家權限" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const partial = productCreateSchema.partial().safeParse(body);
  if (!partial.success) {
    return NextResponse.json({ error: partial.error.flatten() }, { status: 400 });
  }

  const product = await updateProduct(session.id, id, {
    ...partial.data,
    ...(partial.data.status && { status: partial.data.status as ProductStatus }),
  });
  if (!product) return NextResponse.json({ error: "找不到商品" }, { status: 404 });
  return NextResponse.json(product);
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await getSession();
  if (!session || session.role !== Role.SELLER) {
    return NextResponse.json({ error: "需要賣家權限" }, { status: 403 });
  }
  const { id } = await params;
  const ok = await deleteProduct(session.id, id);
  if (!ok) return NextResponse.json({ error: "找不到商品" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
