import { existsSync, mkdirSync } from "fs";
import path from "path";

/** 與 scripts/data-path.mjs 相同邏輯，供 Next.js 執行時使用 */
export function applyRailwayDataPaths() {
  const mount = process.env.RAILWAY_VOLUME_MOUNT_PATH?.trim();
  if (!mount) return;

  const dbFile = path.join(mount, "prod.db");
  process.env.DATABASE_URL = `file:${dbFile}`;

  if (!process.env.UPLOAD_DIR?.trim()) {
    process.env.UPLOAD_DIR = path.join(mount, "uploads");
  }

  mkdirSync(path.dirname(dbFile), { recursive: true });
  mkdirSync(path.join(mount, "uploads", "products"), { recursive: true });
}

applyRailwayDataPaths();
