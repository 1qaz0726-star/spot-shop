import { z } from "zod";

export const checkoutSchema = z.object({
  shippingName: z.string().min(1, "請填寫收件人"),
  shippingPhone: z.string().min(8, "請填寫有效電話"),
  shippingAddress: z.string().min(5, "請填寫完整地址"),
  note: z.string().max(500).optional(),
});
