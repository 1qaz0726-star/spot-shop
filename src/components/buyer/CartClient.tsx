"use client";

import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

type CartItem = {
  productId: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    images: { url: string }[];
  };
};

type Props = {
  initialCart: CartItem[];
  checkoutPath: string;
};

export function CartClient({ initialCart, checkoutPath }: Props) {
  const router = useRouter();
  const total = initialCart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  async function updateQty(productId: string, quantity: number) {
    await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    router.refresh();
  }

  return (
    <div className="mt-2">
      <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
        {initialCart.map((item) => (
          <li key={item.productId} className="flex gap-4 p-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
              {item.product.images[0] && (
                <Image src={item.product.images[0].url} alt="" fill className="object-cover" sizes="80px" />
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <p className="font-medium">{item.product.name}</p>
              <p className="text-[var(--color-brand)]">{formatPrice(item.product.price)}</p>
              <div className="mt-auto flex items-center gap-2">
                <button
                  type="button"
                  className="h-8 w-8 rounded border text-lg"
                  onClick={() => updateQty(item.productId, item.quantity - 1)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  className="h-8 w-8 rounded border text-lg"
                  onClick={() => updateQty(item.productId, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-lg font-bold">小計 {formatPrice(total)}</p>
        <Link href={checkoutPath}>
          <Button size="lg">前往結帳</Button>
        </Link>
      </div>
    </div>
  );
}
