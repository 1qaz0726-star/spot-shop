"use client";

import { Suspense } from "react";
import { CategoryFilter } from "./CategoryFilter";

type Props = {
  categories: string[];
  basePath: string;
  variant: "desktop" | "mobile";
};

function ToolbarInner({ categories, basePath, variant }: Props) {
  if (variant === "mobile") {
    return (
      <div className="sticky top-12 z-30 border-b border-gray-100 bg-white shadow-sm">
        <CategoryFilter categories={categories} basePath={basePath} variant="mobile" />
      </div>
    );
  }

  return (
    <div className="mb-8 space-y-4">
      <CategoryFilter categories={categories} basePath={basePath} variant="desktop" />
    </div>
  );
}

export function CatalogToolbar(props: Props) {
  return (
    <Suspense fallback={<div className="h-10 animate-pulse rounded bg-gray-100" />}>
      <ToolbarInner {...props} />
    </Suspense>
  );
}
