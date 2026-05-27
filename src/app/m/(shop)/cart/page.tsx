import { CartClient } from "@/components/buyer/CartClient";
import { CartEmptyState } from "@/components/buyer/CartEmptyState";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { getSession } from "@/lib/session";
import { getCart } from "@/services/cart.service";

export default async function MobileCartPage() {
  const session = await getSession();
  const cart = session ? await getCart(session.id) : [];

  return (
    <>
      <MobileHeader title="購物車" backHref="/m" showBack />
      <div className="p-3">
        {!session ? (
          <CartEmptyState shopHref="/m" loginHref="/login?next=/m/cart" showLogin />
        ) : cart.length === 0 ? (
          <CartEmptyState shopHref="/m" />
        ) : (
          <CartClient initialCart={cart} checkoutPath="/m/checkout" />
        )}
      </div>
    </>
  );
}
