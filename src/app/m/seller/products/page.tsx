import { SellerProductsView } from "@/components/seller/SellerProductsView";
import { getSession } from "@/lib/session";

export default async function MobileSellerProductsPage() {
  const session = await getSession();
  if (!session) return null;

  return <SellerProductsView sellerId={session.id} basePath="/m/seller" mobile />;
}
