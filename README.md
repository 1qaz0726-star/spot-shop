# 現貨商城 (Spot Shop)

獨立現貨銷售網站：買家購物、賣家商品管理，電腦版與手機版 **分開設計**（非單一 RWD 拉伸）。

## 功能

- **買家**：瀏覽商品、購物車、結帳、訂單查詢、會員中心
- **賣家**：商品 CRUD（名稱、描述、圖片網址、價格、庫存、上下架）
- **裝置**：依螢幕寬度（≤767px 為手機版）導向 `/` 或 `/m`，可手動切換版本
- **倉儲**：預留第三方 WMS 串接，見 [docs/WAREHOUSE_INTEGRATION.md](docs/WAREHOUSE_INTEGRATION.md)

## 專案結構

```
src/
├── app/              # 路由（desktop 買家、m 手機買家、seller 賣家、api）
├── components/       # UI（desktop / mobile / seller / buyer / shared）
├── services/         # 業務邏輯
├── lib/              # 工具、session、驗證
├── integrations/     # 外部串接（倉儲 stub）
└── types/
prisma/               # 資料庫 schema
docs/                 # 文件
```

## 開始使用

```bash
npm install
npx prisma db push
npm run db:seed
npm run dev
```

瀏覽 http://localhost:3000

### 示範帳號（密碼：`demo123`）

| 角色 | Email |
|------|-------|
| 買家 | buyer@demo.com |
| 賣家 | seller@demo.com |

## 部署上線

這不是純 HTML，無法只上傳檔案到一般虛擬主機。  
請看 **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**（Railway 較簡單 / Vercel 需雲端資料庫）。

本機先確認能正式跑：

```bash
npm run build
npm start
```

## 技術

- Next.js 15 (App Router) + TypeScript
- Prisma + SQLite
- Tailwind CSS 4
