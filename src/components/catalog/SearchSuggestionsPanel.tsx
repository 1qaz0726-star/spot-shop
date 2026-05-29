"use client";

import { Clock, Flame, Trash2, X } from "lucide-react";

type Props = {
  history: string[];
  hotSearches: string[];
  onSelect: (term: string) => void;
  onRemoveHistory: (term: string) => void;
  onClearHistory: () => void;
};

export function SearchSuggestionsPanel({
  history,
  hotSearches,
  onSelect,
  onRemoveHistory,
  onClearHistory,
}: Props) {
  const showHistory = history.length > 0;
  const showHot = hotSearches.length > 0;

  if (!showHistory && !showHot) {
    return (
      <p className="px-4 py-6 text-center text-sm text-gray-400">輸入關鍵字或點選熱門搜尋</p>
    );
  }

  return (
    <div className="max-h-[min(70vh,420px)] overflow-y-auto py-2">
      {showHistory && (
        <section className="px-3 pb-2">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              最近搜尋
            </span>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={onClearHistory}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-3 w-3" />
              全部清除
            </button>
          </div>
          <ul className="space-y-0.5">
            {history.map((term) => (
              <li key={term} className="group flex items-center rounded-md hover:bg-gray-50">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onSelect(term)}
                  className="min-w-0 flex-1 truncate px-3 py-2 text-left text-sm text-gray-800"
                >
                  {term}
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onRemoveHistory(term)}
                  className="mr-2 shrink-0 rounded p-1 text-gray-300 opacity-0 hover:bg-gray-100 hover:text-gray-600 group-hover:opacity-100"
                  aria-label={`移除 ${term}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {showHistory && showHot && <div className="mx-3 border-t border-gray-100" />}

      {showHot && (
        <section className="px-3 pt-2">
          <span className="mb-2 flex items-center gap-1.5 px-1 text-xs font-semibold text-gray-500">
            <Flame className="h-3.5 w-3.5 text-[var(--color-brand)]" />
            熱門搜尋
          </span>
          <div className="flex flex-wrap gap-2 px-1 pb-1">
            {hotSearches.map((term) => (
              <button
                key={term}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSelect(term)}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 transition hover:border-[var(--color-brand)]/30 hover:bg-[var(--color-brand-light)] hover:text-[var(--color-brand)]"
              >
                {term}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
