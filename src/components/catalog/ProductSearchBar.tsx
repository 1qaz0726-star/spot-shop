"use client";

import { buildCatalogUrl } from "@/lib/catalog-url";
import {
  addSearchHistory,
  clearSearchHistory,
  getSearchHistory,
  removeSearchHistory,
} from "@/lib/search-history";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SearchSuggestionsPanel } from "./SearchSuggestionsPanel";

type Props = {
  catalogPath: string;
  className?: string;
  variant?: "header" | "mobile";
};

export function ProductSearchBar({
  catalogPath,
  className = "",
  variant = "header",
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rootRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [hotSearches, setHotSearches] = useState<string[]>([]);

  const isHeader = variant === "header";

  useEffect(() => {
    setValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  useEffect(() => {
    fetch("/api/search/hints")
      .then((r) => r.json())
      .then((data: { hot?: string[] }) => setHotSearches(data.hot ?? []))
      .catch(() => setHotSearches([]));
  }, []);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const navigateSearch = useCallback(
    (term: string) => {
      const q = term.trim();
      if (!q) return;

      const category = searchParams.get("category") ?? undefined;
      setHistory(addSearchHistory(q));
      setValue(q);
      setOpen(false);
      router.push(buildCatalogUrl(catalogPath, { q, category }));
    },
    [catalogPath, router, searchParams]
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    navigateSearch(value);
  }

  function clearInput() {
    setValue("");
    const category = searchParams.get("category") ?? undefined;
    if (searchParams.get("q")) {
      router.push(buildCatalogUrl(catalogPath, { category }));
    }
  }

  const panelOpen = open;

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <form
        onSubmit={submit}
        className={cn(
          "flex w-full overflow-hidden bg-white transition-shadow",
          isHeader
            ? "h-10 max-w-2xl rounded-md border border-gray-300 shadow-sm hover:border-gray-400"
            : "h-9 rounded-lg border border-gray-200 shadow-sm",
          panelOpen && "border-[var(--color-brand)] ring-2 ring-[var(--color-brand)]/20 shadow-md"
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
          <Search
            className={cn(
              "shrink-0 text-gray-400 transition-colors",
              isHeader ? "h-[18px] w-[18px]" : "h-4 w-4",
              panelOpen && "text-[var(--color-brand)]"
            )}
            strokeWidth={2}
          />
          <input
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder={isHeader ? "搜尋商品名稱、分類…" : "搜尋商品"}
            className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            autoComplete="off"
          />
          {value && (
            <button
              type="button"
              onClick={clearInput}
              className="shrink-0 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="清除輸入"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          type="submit"
          className={cn(
            "shrink-0 border-l font-medium text-white transition-colors",
            isHeader
              ? "border-[var(--color-brand-dark)] bg-[var(--color-brand)] px-5 text-sm hover:bg-[var(--color-brand-dark)]"
              : "border-[var(--color-brand-dark)] bg-[var(--color-brand)] px-4 text-xs hover:bg-[var(--color-brand-dark)]"
          )}
        >
          搜尋
        </button>
      </form>

      {panelOpen && (
        <div
          className={cn(
            "absolute left-0 right-0 z-[100] mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg",
            isHeader && "max-w-2xl"
          )}
        >
          <SearchSuggestionsPanel
            history={history}
            hotSearches={hotSearches}
            onSelect={navigateSearch}
            onRemoveHistory={(term) => setHistory(removeSearchHistory(term))}
            onClearHistory={() => {
              clearSearchHistory();
              setHistory([]);
            }}
          />
        </div>
      )}
    </div>
  );
}
