import { existsSync, mkdirSync, statSync } from "fs";
import path from "path";

/**
 * Railway 有掛 Volume 時，強制 DB／上傳目錄寫在掛載點（避免 DATABASE_URL 設錯導致每次部署像新站）
 */
export function applyRailwayDataPaths() {
  const mount = process.env.RAILWAY_VOLUME_MOUNT_PATH?.trim();
  if (!mount) return getInfo();

  const dbFile = path.join(mount, "prod.db");
  process.env.DATABASE_URL = `file:${dbFile}`;

  if (!process.env.UPLOAD_DIR?.trim()) {
    process.env.UPLOAD_DIR = path.join(mount, "uploads");
  }

  mkdirSync(path.dirname(dbFile), { recursive: true });
  mkdirSync(path.join(mount, "uploads", "products"), { recursive: true });

  return getInfo();
}

export function getInfo() {
  const databaseUrl = process.env.DATABASE_URL ?? "";
  const dbFile = databaseUrl.startsWith("file:")
    ? databaseUrl.slice("file:".length)
    : "";
  const exists = dbFile ? existsSync(dbFile) : false;
  const sizeBytes = exists ? statSync(dbFile).size : 0;

  return {
    databaseUrl,
    dbFile,
    dbExists: exists,
    dbSizeBytes: sizeBytes,
    uploadDir: process.env.UPLOAD_DIR ?? "",
    volumeMount: process.env.RAILWAY_VOLUME_MOUNT_PATH ?? null,
  };
}

export function logDataPaths(label) {
  const info = getInfo();
  console.log(`[${label}] RAILWAY_VOLUME_MOUNT_PATH=`, info.volumeMount ?? "(未掛載)");
  console.log(`[${label}] DATABASE_URL=`, info.databaseUrl);
  console.log(`[${label}] DB 檔案=`, info.dbFile || "(非 SQLite)", "| 存在=", info.dbExists, "| 大小=", info.dbSizeBytes, "bytes");
  console.log(`[${label}] UPLOAD_DIR=`, info.uploadDir);
  return info;
}
