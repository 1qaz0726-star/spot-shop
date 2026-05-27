"use client";

import { buildCatalogUrl } from "@/lib/catalog-url";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  categories: string[];
  basePath: string;
  variant?: "desktop" | "mobile";
};

export function CategoryFilter({ categories, basePath, variant = "desktop" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "全部";
  const q = searchParams.get("q") ?? undefined;

  const chips = ["全部", ...categories];

  function select(category: string) {
    router.push(buildCatalogUrl(basePath, { category, q }));
  }

  return (
    <div
      className={cn(
        "flex gap-2",
        variant === "mobile"
          ? "overflow-x-auto px-3 py-2"
          : "mb-8 flex-wrap"
      )}
    >
      {chips.map((c) => {
        const active = activeCategory === c || (c === "全部" && !searchParams.get("category"));
        return (
          <button
            key={c}
            type="button"
            onClick={() => select(c)}
            className={cn(
              "shrink-0 rounded-full border text-sm transition",
              variant === "mobile" ? "px-3 py-1 text-xs" : "px-4 py-1.5",
              active
                ? "border-[var(--color-brand)] bg-[var(--color-brand-light)] font-medium text-[var(--color-brand)]"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            )}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
