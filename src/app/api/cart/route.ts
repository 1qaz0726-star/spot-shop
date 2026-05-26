import { getSession } from "@/lib/session";
import { addToCart, getCart, updateCartQuantity } from "@/services/cart.service";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "請先登入" }, { status: 401 });
  const cart = await getCart(session.id);
  return NextResponse.json(cart);
}

const addSchema = z.object({
  productId: z.string(),
  quantity: z.coerce.number().int().min(1).default(1),
});

const updateSchema = z.object({
  productId: z.string(),
  quantity: z.coerce.number().int().min(0),
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "請先登入" }, { status: 401 });

  const parsed = addSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "參數錯誤" }, { status: 400 });
  }

  try {
    const item = await addToCart(session.id, parsed.data.productId, parsed.data.quantity);
    return NextResponse.json(item);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "UNKNOWN";
    if (msg === "INSUFFICIENT_STOCK") {
      return NextResponse.json({ error: "庫存不足" }, { status: 400 });
    }
    return NextResponse.json({ error: "無法加入購物車" }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "請先登入" }, { status: 401 });

  const parsed = updateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "參數錯誤" }, { status: 400 });
  }

  try {
    const item = await updateCartQuantity(
      session.id,
      parsed.data.productId,
      parsed.data.quantity
    );
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "庫存不足" }, { status: 400 });
  }
}
