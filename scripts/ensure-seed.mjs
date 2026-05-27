/**
 * 正式環境啟動：在 Volume 上建立 DB → 若無資料則 seed
 * （Build 階段掛不了 Volume，不可在 build 做 db push）
 */
import { execSync } from "child_process";
import { mkdirSync } from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function run(cmd) {
  execSync(cmd, { stdio: "inherit", env: process.env });
}

try {
  mkdirSync("./data", { recursive: true });
  mkdirSync("./data/uploads/products", { recursive: true });
  console.log("[ensure-seed] prisma db push …");
  run("npx prisma db push --skip-generate");

  const count = await prisma.user.count();
  if (count === 0) {
    console.log("[ensure-seed] 資料庫為空，執行 seed …");
    run("npm run db:seed");
  } else {
    console.log("[ensure-seed] 已有資料，略過 seed");
  }
} catch (e) {
  console.error("[ensure-seed] 失敗:", e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
