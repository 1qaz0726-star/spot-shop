/**
 * 從品牌 logo 裁切上方圖章，產生 favicon / PWA 圖示
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

const whiteBg = { r: 255, g: 255, b: 255, alpha: 1 };

async function writePng(outPath, size) {
  await emblem
    .clone()
    .resize(size, size, { fit: "contain", background: whiteBg })
    .png()
    .toFile(outPath);
  console.log("wrote", outPath);
}

await mkdir(appDir, { recursive: true });
await mkdir(publicDir, { recursive: true });

await writePng(path.join(appDir, "icon.png"), 512);
await writePng(path.join(appDir, "apple-icon.png"), 180);
await writePng(path.join(publicDir, "favicon.ico"), 32);
await writePng(path.join(publicDir, "icon-32.png"), 32);
await writePng(path.join(publicDir, "icon-192.png"), 192);
await writePng(path.join(publicDir, "icon-512.png"), 512);
