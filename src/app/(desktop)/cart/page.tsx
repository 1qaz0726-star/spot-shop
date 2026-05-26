import { CartClient } from "@/components/buyer/CartClient";
import { CartEmptyState } from "@/components/buyer/CartEmptyState";
import { getSession } from "@/lib/session";
import { getCart } from "@/services/cart.service";

export default async function DesktopCartPage() {
  const session = await getSession();
  const cart = session ? await getCart(session.id) : [];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-bold">購物車</h1>
      {!session ? (
        <CartEmptyState shopHref="/" loginHref="/login?next=/cart" showLogin />
      ) : cart.length === 0 ? (
        <CartEmptyState shopHref="/" />
      ) : (
        <CartClient initialCart={cart} checkoutPath="/checkout" />
      )}
    </div>
  );
}
