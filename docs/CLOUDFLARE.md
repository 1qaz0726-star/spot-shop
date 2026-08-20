# Cloudflare Workers 部署（拓新集創 / nova-crest-shop）

本站改走 **全新** Cloudflare Workers（OpenNext），**沒有動**既有 `nuk-house-*`、`dac-*` 資源。

## 公開網址

https://nova-crest-shop.1qaz0726.workers.dev

## 新資源

| 類型 | 名稱 | ID / 備註 |
|------|------|-----------|
| Worker | `nova-crest-shop` | 網站 |
| D1 | `nova-crest-db` | `4db3a0cd-c457-45b7-a137-2e57c4015216` |
| R2 | `nova-crest-uploads` | 商品圖 |
| R2 | `nova-crest-inc-cache` | Next incremental cache |

## 部署（Windows 必讀）

OpenNext **不能**從含中文的路徑建置（例如 `Desktop\平台` 會 `STATUS_STACK_BUFFER_OVERRUN`）。實際部署目錄：

`C:\Users\User\tmp\nova-crest-shop`

改完 `Desktop\平台` 的程式後，把檔案 copy 到該目錄再跑：

```bash
npm run deploy
```

這會：OpenNext build → 複製 Prisma WASM → wrangler deploy。

首次 D1（已做過，不必重跑除非重建資料庫）：

```bash
npm run db:d1:migrate
npm run db:d1:seed
```

遠端 D1 SQL **不要**包 `BEGIN`/`COMMIT`。

## 示範帳號

- 賣家：`seller@demo.com` / `demo123`
- 買家：`buyer@demo.com` / `demo123`
