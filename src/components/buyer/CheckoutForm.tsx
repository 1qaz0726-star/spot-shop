"use client";

import { Button } from "@/components/ui/Button";
import { apiErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  defaultValues?: {
    shippingName: string;
    shippingPhone: string;
    shippingAddress: string;
  };
  successRedirect: string;
};

export function CheckoutForm({ defaultValues, successRedirect }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const body = {
      shippingName: String(fd.get("shippingName")),
      shippingPhone: String(fd.get("shippingPhone")),
      shippingAddress: String(fd.get("shippingAddress")),
      note: String(fd.get("note") || ""),
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);
    if (!res.ok) {
      alert(apiErrorMessage(await res.json(), "下單失敗"));
      return;
    }
    router.push(successRedirect);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-xl border border-gray-200 bg-white p-6">
      <div>
        <label className="text-sm text-gray-600">收件人</label>
        <input
          name="shippingName"
          required
          defaultValue={defaultValues?.shippingName}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="text-sm text-gray-600">電話</label>
        <input
          name="shippingPhone"
          required
          defaultValue={defaultValues?.shippingPhone}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="text-sm text-gray-600">地址</label>
        <textarea
          name="shippingAddress"
          required
          rows={2}
          defaultValue={defaultValues?.shippingAddress}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="text-sm text-gray-600">備註（選填）</label>
        <input name="note" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" />
      </div>
      <p className="text-xs text-gray-500">示範環境：送出即視為付款完成（現貨訂單）</p>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "處理中…" : "確認下單"}
      </Button>
    </form>
  );
}
