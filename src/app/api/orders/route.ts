import { getSession } from "@/lib/session";
import { checkoutSchema } from "@/lib/validations/order";
import { createOrderFromCart, listUserOrders } from "@/services/order.service";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "請先登入" }, { status: 401 });
  const orders = await listUserOrders(session.id);
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "請先登入" }, { status: 401 });

  const parsed = checkoutSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const order = await createOrderFromCart(session.id, parsed.data);
    return NextResponse.json(order, { status: 201 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    if (msg === "CART_EMPTY") {
      return NextResponse.json({ error: "購物車是空的" }, { status: 400 });
    }
    if (msg === "INSUFFICIENT_STOCK") {
      return NextResponse.json({ error: "部分商品庫存不足" }, { status: 400 });
    }
    return NextResponse.json({ error: "下單失敗" }, { status: 500 });
  }
}
