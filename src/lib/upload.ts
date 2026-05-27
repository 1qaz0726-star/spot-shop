import { mkdir } from "fs/promises";
import path from "path";

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export function getUploadRoot() {
  return process.env.UPLOAD_DIR || path.join(process.cwd(), "data", "uploads");
}

export function getProductsUploadDir() {
  return path.join(getUploadRoot(), "products");
}

export async function ensureProductsUploadDir() {
  await mkdir(getProductsUploadDir(), { recursive: true });
}

export function isAllowedImageUrl(url: string): boolean {
  if (url.startsWith("/api/uploads/products/")) return true;
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
