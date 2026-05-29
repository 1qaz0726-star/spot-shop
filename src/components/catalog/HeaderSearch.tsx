"use client";

import { Suspense } from "react";
import { ProductSearchBar } from "./ProductSearchBar";

export function HeaderSearch() {
  return (
    <Suspense
      fallback={
        <div className="h-10 max-w-2xl flex-1 animate-pulse rounded-md bg-gray-100" />
      }
    >
      <ProductSearchBar catalogPath="/shop" variant="header" className="flex-1" />
    </Suspense>
  );
}
