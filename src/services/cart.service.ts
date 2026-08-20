import { getDb } from "@/lib/db/prisma";
import { ProductStatus } from "@prisma/client";

export async function getCart(userId: string) {
  const prisma = await getDb();
  return prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: {
        include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
      },
    },
    orderBy: { id: "asc" },
  });
}

export async function addToCart(userId: string, productId: string, quantity = 1) {
  const prisma = await getDb();
  const product = await prisma.product.findFirst({
    where: { id: productId, status: ProductStatus.ACTIVE },
  });
  if (!product) throw new Error("PRODUCT_NOT_FOUND");
  if (product.stock < quantity) throw new Error("INSUFFICIENT_STOCK");

  return prisma.cartItem.upsert({
    where: { userId_productId: { userId, productId } },
    create: { userId, productId, quantity },
    update: { quantity: { increment: quantity } },
    include: { product: { include: { images: { take: 1 } } } },
  });
}

export async function updateCartQuantity(userId: string, productId: string, quantity: number) {
  const prisma = await getDb();
  if (quantity <= 0) {
    await prisma.cartItem.deleteMany({ where: { userId, productId } });
    return null;
  }
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || product.stock < quantity) throw new Error("INSUFFICIENT_STOCK");

  return prisma.cartItem.update({
    where: { userId_productId: { userId, productId } },
    data: { quantity },
  });
}

export async function clearCart(userId: string) {
  const prisma = await getDb();
  await prisma.cartItem.deleteMany({ where: { userId } });
}

export async function getCartTotal(userId: string) {
  const items = await getCart(userId);
  return items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
}
