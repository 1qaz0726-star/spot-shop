# 部署說明（給只會上傳 HTML 的人）

## 先搞懂差異

| 以前（純 HTML） | 現在（拓新集創 Nova Crest） |
|----------------|------------------|
| 幾個 `.html` 檔丟到主機 | 需要 **Node.js 程式** 在伺服器上跑 |
| 雙擊瀏覽器就能開 | 主機要執行 `npm start` 才會有網站 |
| 沒有資料庫 | 有 **商品、訂單、登入**（SQLite 資料庫） |

所以：**不能**只上傳 `index.html` 到沒有 Node 的虛擬主機。  
要選「支援 Node.js / Next.js」的平台，或用下面推薦的一鍵部署。

---

## 推薦方式一：Railway（較簡單，可沿用 SQLite）

適合：想少改設定、小流量商店。

### 準備

1. 註冊 [GitHub](https://github.com)
2. 把專案資料夾上傳成 GitHub 倉庫（不要用網頁上傳 `.env`，裡面有密碼）
3. 註冊 [Railway](https://railway.app)

### 部署步驟

1. Railway → **New Project** → **Deploy from GitHub repo** → 選你的倉庫  
2. 在專案 **Variables** 新增：
   ```
   DATABASE_URL=file:./data/prod.db
   SESSION_SECRET=請改成一組很長的隨機英文數字
   NODE_ENV=production
   UPLOAD_DIR=/app/data/uploads
   ```
3. **Settings** → **Deploy**：
   - Build Command: `npm run railway:build`（或 `npm install && npm run build`）
   - Start Command: `npm start`（會自動 `db push` + 首次 seed，**不要在 build 做 db push**）
4. 加 **Volume**（掛載持久化硬碟，資料庫才不會重開就消失）：
   - Mount Path: `/app/data`
   - 讓資料庫與上傳圖片都寫在這個目錄（`prod.db`、`uploads/products/`）  
5. 本專案啟動時會自動檢查資料庫，若為空會執行 `db:seed`（**不必找 Shell**）。
6. Railway 會給一個網址，例如 `https://xxx.up.railway.app`，那就是你的商城。

若需手動進容器：在畫布 **右鍵 spot-shop** → **Copy SSH Command**，本機安裝 [Railway CLI](https://docs.railway.com/cli) 後執行 `railway ssh`，再跑 `npm run db:seed`。

### 之後更新網站

改程式 → `git push` → Railway 會自動重新部署。

### 已掛 Volume 但部署後商品仍消失？

1. 點 **spot-shop 服務**（不是 Volume）→ **Variables**，確認有 `DATABASE_URL=file:./data/prod.db`（程式會依 `RAILWAY_VOLUME_MOUNT_PATH` 自動改寫成 Volume 內的 `prod.db`）。
2. 部署日誌應出現 `[ensure-seed] 商品數= N`（N > 3 表示你的商品還在）；若每次都是「資料庫為空，執行 seed」且商品數只有 3，代表 DB 沒寫進 Volume，請檢查 Mount Path 是否為 **`/app/data`**。
3. **不要**在 Volume 設定按「Wipe Volume」，會清空所有正式資料。

---

## 推薦方式二：Vercel（Next.js 官方最常見）

適合：願意用雲端資料庫（免費方案有 [Neon](https://neon.tech) PostgreSQL）。

> ⚠️ Vercel **不能** 長期用檔案型 SQLite（重開資料會不見），要改成 PostgreSQL。

### 資料庫改 PostgreSQL（一次性）

1. Neon 建立免費資料庫，複製連線字串  
2. 修改 `prisma/schema.prisma`：
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. 本機 `.env` 改成 Neon 的 `DATABASE_URL`，執行：
   ```bash
   npx prisma db push
   npm run db:seed
   ```

### 部署

1. 程式推到 GitHub  
2. 登入 [Vercel](https://vercel.com) → **Add New Project** → 匯入 GitHub 倉庫  
3. Environment Variables：
   - `DATABASE_URL` = Neon 連線字串  
   - `SESSION_SECRET` = 隨機長字串  
4. Deploy（Vercel 會自動 `npm run build`）  
5. 部署後在 Vercel 的 **Functions** 或本機對正式庫執行 seed（只需一次）

---

## 不適合的方式

- ❌ 只有「靜態網頁 / FTP 上傳 HTML」的虛擬主機（無 Node）  
- ❌ 直接雙擊電腦裡的檔案當正式站（只有你自己看得到）  
- ❌ 只上傳 `src` 資料夾、沒跑 `npm run build`

---

## 部署前檢查清單

- [ ] `.env` **不要** 推上 GitHub（已在 `.gitignore`）  
- [ ] `SESSION_SECRET` 改成夠長的隨機字串  
- [ ] 執行過 `npm run build` 本機沒錯誤  
- [ ] 正式環境跑過 seed 或已有賣家／商品資料  

---

## 自網域（選用）

在 Railway / Vercel 的 **Domains** 設定你的網域，到網域商 DNS 加 CNAME 指向平台指示的位址即可。

---

## 需要幫忙時

告訴我你打算用 **Railway** 還是 **Vercel**，以及有沒有自己的網域，我可以依你的選擇寫更細的逐步操作（含 Prisma 要改哪幾行）。
