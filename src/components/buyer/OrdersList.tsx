import { ORDER_STATUS_LABEL, type OrderSummary } from "@/types/order";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

type Props = {
  orders: OrderSummary[];
};

export function OrdersList({ orders }: Props) {
  if (orders.length === 0) {
    return <p className="mt-12 text-center text-gray-500">尚無訂單</p>;
  }

  return (
    <ul className="mt-8 space-y-4">
      {orders.map((o) => (
        <li key={o.id} className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              {o.firstItemImage && (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <Image src={o.firstItemImage} alt="" fill className="object-cover" sizes="64px" />
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">訂單編號 {o.orderNo}</p>
                <p className="font-medium">{formatPrice(o.totalAmount)}</p>
                <p className="text-sm text-gray-600">共 {o.itemCount} 件</p>
              </div>
            </div>
            <span className="rounded-full bg-[var(--color-brand-light)] px-3 py-1 text-sm text-[var(--color-brand-dark)]">
              {ORDER_STATUS_LABEL[o.status]}
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            {new Date(o.createdAt).toLocaleString("zh-TW")}
          </p>
        </li>
      ))}
    </ul>
  );
}
