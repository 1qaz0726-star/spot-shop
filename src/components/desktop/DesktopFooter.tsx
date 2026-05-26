import Link from "next/link";

export function DesktopFooter() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-8 px-6 py-12 text-sm text-gray-600">
        <div>
          <h4 className="mb-3 font-semibold text-gray-900">購物說明</h4>
          <ul className="space-y-2">
            <li>現貨商品 1–2 工作日出貨</li>
            <li>7 天鑑賞期（未拆封）</li>
            <li>宅配 / 超商取貨</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-gray-900">客服</h4>
          <ul className="space-y-2">
            <li>LINE @spotshop</li>
            <li>service@spotshop.demo</li>
            <li>週一至週五 09:00–18:00</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-gray-900">關於</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/account" className="hover:underline">
                會員中心
              </Link>
            </li>
            <li>隱私權政策</li>
            <li>服務條款</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-gray-900">切換版本</h4>
          <form action="/api/device" method="POST">
            <input type="hidden" name="mode" value="mobile" />
            <button type="submit" className="text-[var(--color-brand)] hover:underline">
              切換至手機版
            </button>
          </form>
        </div>
      </div>
      <p className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Spot Shop 現貨商城
      </p>
    </footer>
  );
}
