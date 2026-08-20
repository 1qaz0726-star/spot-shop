import { getDb } from "@/lib/db/prisma";
import { generateOrderNo } from "@/lib/utils";
import type { OrderSummary } from "@/types/order";
import { OrderStatus } from "@prisma/client";
import { getCart } from "./cart.service";

export async function createOrderFromCart(
  userId: string,
  shipping: {
    shippingName: string;
    shippingPhone: string;
    shippingAddress: string;
    note?: string;
  }
) {
  const prisma = await getDb();
  const cart = await getCart(userId);
  if (cart.length === 0) throw new Error("CART_EMPTY");

  const totalAmount = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const order = await prisma.$transaction(async (tx) => {
    for (const item of cart) {
      const updated = await tx.product.updateMany({
        where: { id: item.productId, stock: { gte: item.quantity } },
        data: { stock: { decrement: item.quantity } },
      });
      if (updated.count === 0) throw new Error("INSUFFICIENT_STOCK");
    }

    const created = await tx.order.create({
      data: {
        orderNo: generateOrderNo(),
        userId,
        status: OrderStatus.PAID,
        totalAmount,
        shippingName: shipping.shippingName,
        shippingPhone: shipping.shippingPhone,
        shippingAddress: shipping.shippingAddress,
        note: shipping.note,
        items: {
          create: cart.map((item) => ({
            productId: item.productId,
            productName: item.product.name,
            productImage: item.product.images[0]?.url ?? null,
            unitPrice: item.product.price,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    await tx.cartItem.deleteMany({ where: { userId } });
    return created;
  });

  return order;
}

export async function listUserOrders(userId: string): Promise<OrderSummary[]> {
  const prisma = await getDb();
  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return orders.map((o) => ({
    id: o.id,
    orderNo: o.orderNo,
    status: o.status,
    totalAmount: o.totalAmount,
    createdAt: o.createdAt,
    itemCount: o.items.reduce((s, i) => s + i.quantity, 0),
    firstItemImage: o.items[0]?.productImage ?? null,
  }));
}

export async function getOrderDetail(userId: string, orderId: string) {
  const prisma = await getDb();
  return prisma.order.findFirst({
    where: { id: orderId, userId },
    include: { items: true },
  });
}
