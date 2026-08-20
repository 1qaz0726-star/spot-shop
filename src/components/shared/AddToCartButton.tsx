"use client";

import { Button } from "@/components/ui/Button";
import { apiErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  productId: string;
  className?: string;
  label?: string;
  redirectToLogin?: string;
};

export function AddToCartButton({
  productId,
  className,
  label = "加入購物車",
  redirectToLogin = "/login",
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (res.status === 401) {
        router.push(redirectToLogin);
        return;
      }
      if (!res.ok) {
        alert(apiErrorMessage(await res.json(), "加入失敗"));
        return;
      }
      router.refresh();
      alert("已加入購物車");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button className={className} onClick={handleClick} disabled={loading}>
      {loading ? "處理中…" : label}
    </Button>
  );
}
