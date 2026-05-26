import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(1, "請輸入商品名稱").max(120),
  description: z.string().min(1, "請輸入商品描述").max(5000),
  price: z.coerce.number().int().min(1, "價格須大於 0"),
  stock: z.coerce.number().int().min(0),
  category: z.string().max(60).optional(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]),
  images: z.array(z.string().url("圖片須為有效網址")).min(1, "至少一張圖片"),
});

export const productUpdateSchema = productCreateSchema.partial().extend({
  id: z.string().min(1),
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
