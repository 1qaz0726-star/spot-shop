import { SellerDashboardView } from "@/components/seller/SellerDashboardView";
import { getSession } from "@/lib/session";

export default async function MobileSellerDashboardPage() {
  const session = await getSession();
  if (!session) return null;

  return <SellerDashboardView sellerId={session.id} basePath="/m/seller" mobile />;
}
