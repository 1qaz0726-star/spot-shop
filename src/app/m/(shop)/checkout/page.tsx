import { CheckoutForm } from "@/components/buyer/CheckoutForm";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { getSession } from "@/lib/session";
import { getCart, getCartTotal } from "@/services/cart.service";
import { getDb } from "@/lib/db/prisma";
import { formatPrice } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function MobileCheckoutPage() {
  const prisma = await getDb();
  const session = await getSession();
  if (!session) redirect("/login?next=/m/checkout");

  const cart = await getCart(session.id);
  if (cart.length === 0) redirect("/m/cart");

  const total = await getCartTotal(session.id);
  const address = await prisma.address.findFirst({
    where: { userId: session.id, isDefault: true },
  });

  return (
    <>
      <MobileHeader title="確認訂單" backHref="/m/cart" showBack />
      <div className="p-3">
        <p className="mb-4 text-center text-lg font-bold">{formatPrice(total)}</p>
        <CheckoutForm
          defaultValues={
            address
              ? {
                  shippingName: address.recipient,
                  shippingPhone: address.phone,
                  shippingAddress: `${address.city}${address.district}${address.street}`,
                }
              : undefined
          }
          successRedirect="/m/orders"
        />
      </div>
    </>
  );
}
