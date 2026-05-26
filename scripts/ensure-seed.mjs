/**
 * 正式環境啟動前：若尚無使用者則執行 seed（免 Railway Shell）
 */
import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
  const count = await prisma.user.count();
  if (count === 0) {
    console.log("[ensure-seed] 資料庫為空，執行 npm run db:seed …");
    execSync("npm run db:seed", { stdio: "inherit" });
  } else {
    console.log("[ensure-seed] 已有資料，略過 seed");
  }
} catch (e) {
  console.error("[ensure-seed] 失敗:", e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
