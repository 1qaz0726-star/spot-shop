export function buildCatalogUrl(
  basePath: string,
  params: { q?: string; category?: string }
): string {
  const search = new URLSearchParams();
  if (params.category && params.category !== "全部") {
    search.set("category", params.category);
  }
  if (params.q?.trim()) {
    search.set("q", params.q.trim());
  }
  const qs = search.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}
