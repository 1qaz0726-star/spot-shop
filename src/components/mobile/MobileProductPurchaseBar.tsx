"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  productId: string;
  stock: number;
  slug: string;
};

export function MobileProductPurchaseBar({ productId, stock, slug }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState<"cart" | "buy" | null>(null);

  const loginNext = `/login?next=/m/products/${slug}`;
  const maxQty = Math.max(1, stock);

  function clampQty(n: number) {
    return Math.min(maxQty, Math.max(1, n));
  }

  async function submit(mode: "cart" | "buyNow") {
    setLoading(mode === "buyNow" ? "buy" : "cart");
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity, buyNow: mode === "buyNow" }),
      });
      if (res.status === 401) {
        router.push(loginNext);
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? "操作失敗");
        return;
      }
      if (mode === "buyNow") {
        router.push("/m/checkout");
        return;
      }
      router.refresh();
      alert("已加入購物車");
    } finally {
      setLoading(null);
    }
  }

  return (
    <section
      className={cn(
        "fixed left-0 right-0 z-40 border-t border-gray-200 bg-white",
        "shadow-[0_-4px_16px_rgba(0,0,0,0.06)]",
        "bottom-[calc(var(--spacing-mobile-tab)+env(safe-area-inset-bottom,0px))]"
      )}
    >
      <div className="flex h-[var(--spacing-mobile-purchase)] items-center gap-2 px-3">
        <div className="flex shrink-0 items-center rounded-lg border border-gray-200 bg-gray-50">
          <button
            type="button"
            aria-label="減少數量"
            disabled={quantity <= 1 || loading !== null}
            onClick={() => setQuantity((q) => clampQty(q - 1))}
            className="nc-interactive nc-press flex h-10 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-white disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span
            key={quantity}
            className="min-w-[2rem] text-center text-sm font-semibold tabular-nums nc-animate-scale-in"
          >
            {quantity}
          </span>
          <button
            type="button"
            aria-label="增加數量"
            disabled={quantity >= maxQty || loading !== null}
            onClick={() => setQuantity((q) => clampQty(q + 1))}
            className="nc-interactive nc-press flex h-10 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-white disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="flex min-w-0 flex-1 gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={loading !== null || stock < 1}
            onClick={() => submit("cart")}
            className="!h-10 min-w-0 flex-1 !rounded-lg !px-2 !py-0 !text-xs font-semibold sm:!text-sm"
          >
            {loading === "cart" ? "處理中…" : "加入購物車"}
          </Button>
          <Button
            type="button"
            disabled={loading !== null || stock < 1}
            onClick={() => submit("buyNow")}
            className="!h-10 min-w-0 flex-1 !rounded-lg !px-2 !py-0 !text-xs font-semibold sm:!text-sm"
          >
            {loading === "buy" ? "處理中…" : "直接購買"}
          </Button>
        </div>
      </div>
    </section>
  );
}
