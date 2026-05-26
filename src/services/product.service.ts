import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/utils";
import type { ProductDetail, ProductListItem } from "@/types/product";
import { ProductStatus } from "@prisma/client";

function mapListItem(p: {
  id: string;
  slug: string;
  name: string;
  price: number;
  stock: number;
  category: string | null;
  images: { url: string }[];
}): ProductListItem {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    stock: p.stock,
    category: p.category,
    imageUrl: p.images[0]?.url ?? null,
  };
}

export type ProductListFilters = {
  category?: string;
  q?: string;
};

export async function listActiveCategories(): Promise<string[]> {
  const rows = await prisma.product.groupBy({
    by: ["category"],
    where: { status: ProductStatus.ACTIVE, category: { not: null } },
  });
  return rows
    .map((r) => r.category)
    .filter((c): c is string => Boolean(c))
    .sort((a, b) => a.localeCompare(b, "zh-Hant"));
}

export async function listActiveProducts(
  filters?: string | ProductListFilters
): Promise<ProductListItem[]> {
  const category =
    typeof filters === "string" ? filters : filters?.category?.trim() || undefined;
  const q = typeof filters === "string" ? undefined : filters?.q?.trim() || undefined;

  const products = await prisma.product.findMany({
    where: {
      status: ProductStatus.ACTIVE,
      ...(category && category !== "全部" ? { category } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q } },
              { description: { contains: q } },
              { category: { contains: q } },
            ],
          }
        : {}),
    },
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
    orderBy: { updatedAt: "desc" },
  });
  return products.map(mapListItem);
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const p = await prisma.product.findFirst({
    where: { slug, status: ProductStatus.ACTIVE },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      seller: { select: { name: true } },
    },
  });
  if (!p) return null;
  return {
    ...mapListItem(p),
    description: p.description,
    images: p.images.map((i) => ({ id: i.id, url: i.url, alt: i.alt })),
    seller: p.seller,
  };
}

export async function listSellerProducts(sellerId: string) {
  return prisma.product.findMany({
    where: { sellerId },
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getSellerProduct(sellerId: string, productId: string) {
  return prisma.product.findFirst({
    where: { id: productId, sellerId },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function createProduct(
  sellerId: string,
  data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    category?: string;
    status: ProductStatus;
    images: string[];
  }
) {
  let slug = slugify(data.name);
  const exists = await prisma.product.findUnique({ where: { slug } });
  if (exists) slug = `${slug}-${Date.now().toString(36)}`;

  return prisma.product.create({
    data: {
      slug,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category: data.category,
      status: data.status,
      sellerId,
      images: {
        create: data.images.map((url, i) => ({ url, sortOrder: i, alt: data.name })),
      },
    },
    include: { images: true },
  });
}

export async function updateProduct(
  sellerId: string,
  productId: string,
  data: Partial<{
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    status: ProductStatus;
    images: string[];
  }>
) {
  const existing = await prisma.product.findFirst({
    where: { id: productId, sellerId },
  });
  if (!existing) return null;

  return prisma.$transaction(async (tx) => {
    if (data.images) {
      await tx.productImage.deleteMany({ where: { productId } });
      await tx.productImage.createMany({
        data: data.images.map((url, i) => ({
          productId,
          url,
          sortOrder: i,
          alt: data.name ?? existing.name,
        })),
      });
    }

    return tx.product.update({
      where: { id: productId },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.stock !== undefined && { stock: data.stock }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.status !== undefined && { status: data.status }),
      },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    });
  });
}

export async function deleteProduct(sellerId: string, productId: string) {
  const existing = await prisma.product.findFirst({
    where: { id: productId, sellerId },
  });
  if (!existing) return false;
  await prisma.product.delete({ where: { id: productId } });
  return true;
}
