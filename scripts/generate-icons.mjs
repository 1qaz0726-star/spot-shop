/**
 * 從品牌 logo 裁切圖章，產生「圓形白底＋置中圖章」的 favicon / 頂欄圖
 * 執行：npm install --no-save sharp@0.33.5 && node scripts/generate-icons.mjs
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "public", "brand-logo-source.png");
const appDir = path.join(root, "src", "app");
const publicDir = path.join(root, "public");

const meta = await sharp(source).metadata();
const w = meta.width ?? 1024;
const h = meta.height ?? 1024;
const cropSize = Math.round(Math.min(w, h * 0.52));
const left = Math.round((w - cropSize) / 2);
const emblem = sharp(source).extract({
  left: Math.max(0, left),
  top: 0,
  width: Math.min(cropSize, w),
  height: Math.min(cropSize, h),
});

const transparentBg = { r: 0, g: 0, b: 0, alpha: 0 };

/** 輸出圓形圖示：白圓底 + 置中圖章（Chrome / Google 分頁用） */
async function writeCircularPng(outPath, size) {
  const emblemSize = Math.round(size * 0.68);
  const emblemPng = await emblem
    .clone()
    .resize(emblemSize, emblemSize, { fit: "contain", background: transparentBg })
    .png()
    .toBuffer();

  const r = size / 2;
  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${r}" cy="${r}" r="${r}" fill="#ffffff"/>
      <circle cx="${r}" cy="${r}" r="${r - 0.5}" fill="none" stroke="#1e3a5f" stroke-opacity="0.12" stroke-width="1"/>
    </svg>`
  );

  const offset = Math.round((size - emblemSize) / 2);
  await sharp(circleSvg)
    .png()
    .composite([{ input: emblemPng, left: offset, top: offset }])
    .png()
    .toFile(outPath);
  console.log("wrote", outPath);
}

await mkdir(appDir, { recursive: true });
await mkdir(publicDir, { recursive: true });

await writeCircularPng(path.join(appDir, "icon.png"), 512);
await writeCircularPng(path.join(appDir, "apple-icon.png"), 180);
await writeCircularPng(path.join(publicDir, "favicon.ico"), 32);
await writeCircularPng(path.join(publicDir, "icon-32.png"), 32);
await writeCircularPng(path.join(publicDir, "icon-192.png"), 192);
await writeCircularPng(path.join(publicDir, "icon-512.png"), 512);
await writeCircularPng(path.join(publicDir, "logo-mark-circle.png"), 96);
