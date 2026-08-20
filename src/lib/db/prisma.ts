import "./data-path";
import { cache } from "react";
import type { PrismaClient } from "@prisma/client";
import { PrismaClient as PrismaNode } from "@prisma/client";
import { PrismaClient as PrismaWasm } from "@prisma/client/wasm";
import { PrismaD1 } from "@prisma/adapter-d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function isWorkerd() {
  return globalThis.navigator?.userAgent === "Cloudflare-Workers";
}

function getFilePrisma(): PrismaClient {
  const existing = globalForPrisma.prisma;
  if (existing) return existing;

  const client = new PrismaNode({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}

function d1Client(db: ConstructorParameters<typeof PrismaD1>[0]): PrismaClient {
  return new PrismaWasm({ adapter: new PrismaD1(db) }) as unknown as PrismaClient;
}

/** Workers 必須走 wasm + D1；本機 next build / dev 才可退回檔案 SQLite。 */
export const getDb = cache(async (): Promise<PrismaClient> => {
  try {
    const { env } = getCloudflareContext();
    if (env.DB) return d1Client(env.DB);
  } catch {
    // 非 Worker 請求
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (env.DB) return d1Client(env.DB);
  } catch {
    // 本機沒有 CF binding
  }

  if (isWorkerd()) {
    throw new Error("Cloudflare D1 binding DB is missing");
  }

  return getFilePrisma();
});
