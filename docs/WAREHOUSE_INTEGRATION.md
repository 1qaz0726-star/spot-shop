# 第三方倉儲 API 串接（預留）

> **目前尚未實作**，僅在程式中預留介面與資料欄位，供日後自動出貨使用。

## 資料庫預留

- `Order.warehouseRef`：倉儲系統回傳的出貨單號

## 程式位置

| 路徑 | 說明 |
|------|------|
| `src/integrations/warehouse/types.ts` | WMS 介面與請求/回應型別 |
| `src/integrations/warehouse/stub.provider.ts` | 佔位實作（開發用） |
| `src/services/order.service.ts` | 訂單成立後可在此呼叫 `createShipment` |

## 建議串接流程（參考主流電商）

1. 買家下單且付款成功 → `Order.status = PAID`
2. 背景工作呼叫 `WarehouseProvider.createShipment`
3. 成功後寫入 `warehouseRef`，狀態改為 `PROCESSING` / `SHIPPED`
4. Webhook 或輪詢更新物流狀態 → `DELIVERED`

## 實作時需替換

```ts
// src/integrations/warehouse/index.ts
export { RealWarehouseProvider } from "./real.provider";
```

並在 `order.service.ts` 的 `createOrderFromCart` 完成後（或排程）呼叫出貨 API。

## 環境變數（未來）

```
WAREHOUSE_API_URL=
WAREHOUSE_API_KEY=
WAREHOUSE_WEBHOOK_SECRET=
```
