"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProductFormData = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  images: string[];
};

type Props = {
  productId?: string;
  initial?: Partial<ProductFormData>;
};

export function ProductForm({ productId, initial }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageInput, setImageInput] = useState(
    initial?.images?.join("\n") ?? ""
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);

    const images = imageInput
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const body = {
      name: String(fd.get("name")),
      description: String(fd.get("description")),
      price: Number(fd.get("price")),
      stock: Number(fd.get("stock")),
      category: String(fd.get("category") || ""),
      status: String(fd.get("status")),
      images,
    };

    const url = productId ? `/api/products/${productId}` : "/api/products";
    const method = productId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      alert(typeof data.error === "string" ? data.error : "儲存失敗");
      return;
    }

    router.push("/seller/products");
    router.refresh();
  }

  async function handleDelete() {
    if (!productId || !confirm("確定刪除此商品？")) return;
    const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/seller/products");
      router.refresh();
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-5 rounded-xl bg-white p-6 shadow-sm">
      <div>
        <label className="text-sm font-medium">商品名稱</label>
        <input
          name="name"
          required
          defaultValue={initial?.name}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="text-sm font-medium">描述</label>
        <textarea
          name="description"
          required
          rows={6}
          defaultValue={initial?.description}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">價格（NT$）</label>
          <input
            name="price"
            type="number"
            min={1}
            required
            defaultValue={initial?.price}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium">庫存</label>
          <input
            name="stock"
            type="number"
            min={0}
            required
            defaultValue={initial?.stock ?? 0}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">分類</label>
        <input
          name="category"
          defaultValue={initial?.category}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          placeholder="例：3C 配件"
        />
      </div>
      <div>
        <label className="text-sm font-medium">狀態</label>
        <select
          name="status"
          defaultValue={initial?.status ?? "DRAFT"}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
        >
          <option value="DRAFT">草稿</option>
          <option value="ACTIVE">上架</option>
          <option value="ARCHIVED">封存</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">圖片網址（每行一張）</label>
        <textarea
          value={imageInput}
          onChange={(e) => setImageInput(e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-xs"
          placeholder="https://images.unsplash.com/..."
        />
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "儲存中…" : "儲存"}
        </Button>
        {productId && (
          <Button type="button" variant="danger" onClick={handleDelete}>
            刪除
          </Button>
        )}
      </div>
    </form>
  );
}
