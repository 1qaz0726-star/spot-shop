import { OrdersList } from "@/components/buyer/OrdersList";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { getSession } from "@/lib/session";
import { listUserOrders } from "@/services/order.service";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function MobileOrdersPage() {
  const session = await getSession();

  return (
    <>
      <MobileHeader title="我的訂單" />
      <div className="p-3">
        {!session ? (
          <div className="py-16 text-center">
            <p className="text-gray-600">登入後可查看訂單</p>
            <Link href="/login?next=/m/orders" className="mt-4 inline-block">
              <Button>登入</Button>
            </Link>
          </div>
        ) : (
          <OrdersList orders={await listUserOrders(session.id)} />
        )}
      </div>
    </>
  );
}
