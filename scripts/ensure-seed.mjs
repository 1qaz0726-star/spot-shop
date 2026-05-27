/**
 * 正式環境啟動：在 Volume 上建立 DB → 若無資料則 seed
 * （Build 階段掛不了 Volume，不可在 build 做 db push）
 */
import { execSync } from "child_process";
import { applyRailwayDataPaths, logDataPaths } from "./data-path.mjs";

applyRailwayDataPaths();
logDataPaths("ensure-seed");

function run(cmd) {
  execSync(cmd, { stdio: "inherit", env: process.env });
}

const { PrismaClient } = await import("@prisma/client");
const prisma = new PrismaClient();

try {
  console.log("[ensure-seed] prisma db push …");
  run("npx prisma db push --skip-generate");

  const [userCount, productCount] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
  ]);
  console.log("[ensure-seed] 使用者數=", userCount, "| 商品數=", productCount);

  if (userCount === 0) {
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
