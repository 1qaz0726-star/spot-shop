import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const files = ["query_compiler_bg.wasm", "query_engine_bg.wasm", "query_compiler_bg.js"];
const srcDir = join(process.cwd(), "node_modules", ".prisma", "client");
const destDir = join(
  process.cwd(),
  ".open-next",
  "server-functions",
  "default",
  "node_modules",
  ".prisma",
  "client",
);

if (!existsSync(destDir)) {
  console.warn("copy-prisma-wasm: OpenNext prisma dest missing, skip");
  process.exit(0);
}

mkdirSync(destDir, { recursive: true });
for (const name of files) {
  const src = join(srcDir, name);
  if (!existsSync(src)) continue;
  copyFileSync(src, join(destDir, name));
  console.log("copied", name);
}

const loaderSrc = join(srcDir, "wasm-worker-loader.mjs");
if (existsSync(loaderSrc)) {
  copyFileSync(loaderSrc, join(destDir, "wasm-worker-loader.mjs"));
}
