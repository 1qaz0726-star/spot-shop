"use client";

import { Button } from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fd.get("email"),
        password: fd.get("password"),
      }),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "登入失敗");
      return;
    }

    const { user } = await res.json();
    if (user.role === "SELLER" && next.startsWith("/seller")) {
      router.push(next);
    } else if (user.role === "SELLER") {
      router.push("/seller");
    } else {
      router.push(next);
    }
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-bold">登入</h1>
      <p className="mt-2 text-sm text-gray-600">示範帳號見下方說明</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="buyer@demo.com"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">密碼</label>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="demo123"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "登入中…" : "登入"}
        </Button>
      </form>

      <div className="mt-8 rounded-lg bg-gray-50 p-4 text-xs text-gray-600">
        <p className="font-semibold text-gray-800">示範帳號（密碼皆為 demo123）</p>
        <p className="mt-2">買家：buyer@demo.com</p>
        <p>賣家：seller@demo.com</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
