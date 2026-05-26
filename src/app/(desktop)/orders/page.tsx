import { OrdersList } from "@/components/buyer/OrdersList";
import { getSession } from "@/lib/session";
import { listUserOrders } from "@/services/order.service";
import { redirect } from "next/navigation";

export default async function DesktopOrdersPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/orders");

  const orders = await listUserOrders(session.id);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-bold">我的訂單</h1>
      <OrdersList orders={orders} />
    </div>
  );
}
