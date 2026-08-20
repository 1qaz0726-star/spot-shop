import { CheckoutForm } from "@/components/buyer/CheckoutForm";
import { getSession } from "@/lib/session";
import { getCart, getCartTotal } from "@/services/cart.service";
import { getDb } from "@/lib/db/prisma";
import { formatPrice } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function DesktopCheckoutPage() {
  const prisma = await getDb();
  const session = await getSession();
  if (!session) redirect("/login?next=/checkout");

  const cart = await getCart(session.id);
  if (cart.length === 0) redirect("/cart");

  const total = await getCartTotal(session.id);
  const address = await prisma.address.findFirst({
    where: { userId: session.id, isDefault: true },
  });

  const defaultShipping = address
    ? {
        shippingName: address.recipient,
        shippingPhone: address.phone,
        shippingAddress: `${address.city}${address.district}${address.street}`,
      }
    : undefined;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-bold">確認訂單</h1>
      <p className="mt-2 text-gray-600">合計 {formatPrice(total)}</p>
      <CheckoutForm defaultValues={defaultShipping} successRedirect="/orders" />
    </div>
  );
}
