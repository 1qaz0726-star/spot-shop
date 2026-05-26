import { PrismaClient, ProductStatus, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("demo123", 10);

  const seller = await prisma.user.upsert({
    where: { email: "seller@demo.com" },
    update: {},
    create: {
      email: "seller@demo.com",
      password: hash,
      name: "示範賣家",
      role: Role.SELLER,
      phone: "0912345678",
    },
  });

  const buyer = await prisma.user.upsert({
    where: { email: "buyer@demo.com" },
    update: {},
    create: {
      email: "buyer@demo.com",
      password: hash,
      name: "示範買家",
      role: Role.BUYER,
      phone: "0987654321",
      addresses: {
        create: {
          label: "住家",
          recipient: "示範買家",
          phone: "0987654321",
          city: "台北市",
          district: "信義區",
          street: "信義路五段7號",
          isDefault: true,
        },
      },
    },
  });

  const products = [
    {
      slug: "wireless-earbuds-pro",
      name: "無線藍牙耳機 Pro",
      description:
        "主動降噪、30 小時續航、IPX5 防水。附充電盒與三組耳塞，適合通勤與運動。現貨供應，下單後 1–2 個工作日出貨。",
      price: 2490,
      stock: 120,
      category: "3C 配件",
      images: [
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800",
      ],
    },
    {
      slug: "organic-cotton-tee",
      name: "有機棉素色 T 恤",
      description:
        "100% 有機棉，透氣舒適。多色可選，版型略寬鬆。建議手洗或放入洗衣袋低溫烘乾。",
      price: 680,
      stock: 200,
      category: "服飾",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      ],
    },
    {
      slug: "stainless-water-bottle",
      name: "雙層不鏽鋼保溫瓶 500ml",
      description:
        "保冷 24 小時、保溫 12 小時。食品級不鏽鋼內膽，附防滑杯套。",
      price: 890,
      stock: 85,
      category: "居家生活",
      images: [
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800",
      ],
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        price: p.price,
        stock: p.stock,
        category: p.category,
        status: ProductStatus.ACTIVE,
        sellerId: seller.id,
        images: {
          create: p.images.map((url, i) => ({
            url,
            sortOrder: i,
            alt: p.name,
          })),
        },
      },
    });
  }

  console.log("Seed OK — seller:", seller.email, "buyer:", buyer.email);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
