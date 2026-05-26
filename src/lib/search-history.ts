const STORAGE_KEY = "spot_shop_search_history";
const MAX_ITEMS = 10;

export function getSearchHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

export function addSearchHistory(term: string): string[] {
  const t = term.trim();
  if (!t || typeof window === "undefined") return getSearchHistory();

  const next = [t, ...getSearchHistory().filter((x) => x !== t)].slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function removeSearchHistory(term: string): string[] {
  if (typeof window === "undefined") return [];
  const next = getSearchHistory().filter((x) => x !== term);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function clearSearchHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
