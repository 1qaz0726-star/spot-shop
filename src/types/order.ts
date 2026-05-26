import type { OrderStatus } from "@prisma/client";

export type OrderSummary = {
  id: string;
  orderNo: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: Date;
  itemCount: number;
  firstItemImage: string | null;
};

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "待付款",
  PAID: "已付款",
  PROCESSING: "處理中",
  SHIPPED: "已出貨",
  DELIVERED: "已送達",
  CANCELLED: "已取消",
};
