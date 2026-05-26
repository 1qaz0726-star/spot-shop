"use client";

import { ProductSearchBar } from "@/components/catalog/ProductSearchBar";
import { Suspense } from "react";

type Props = {
  catalogPath: string;
};

export function MobileSearchSection({ catalogPath }: Props) {
  return (
    <div className="border-b border-gray-100 bg-white px-3 py-2.5">
      <Suspense fallback={<div className="h-9 animate-pulse rounded-lg bg-gray-100" />}>
        <ProductSearchBar catalogPath={catalogPath} variant="mobile" />
      </Suspense>
    </div>
  );
}
