import { PageSkeleton } from "@/components/shared/PageSkeleton";

export default function MobileLoading() {
  return (
    <>
      <div className="h-12 animate-pulse border-b border-gray-100 bg-white" />
      <PageSkeleton rows={4} />
    </>
  );
}
