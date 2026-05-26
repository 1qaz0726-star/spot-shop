export function PageSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-3 p-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-3 rounded-xl bg-white p-3">
          <div className="h-20 w-20 shrink-0 rounded-lg bg-gray-200" />
          <div className="flex flex-1 flex-col gap-2 py-1">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/3 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
