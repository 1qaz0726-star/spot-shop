/**
 * OpenNext on Windows fails at:
 * copyfile '.open-next/.build/open-next.config.edge.mjs' -> '.open-next/middleware/open-next.config.mjs'
 * because the edge config is compiled to a temp dir and never lands in .build.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSync } from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configEntry = path.join(root, "open-next.config.ts");

function compileEdge(outfile) {
  fs.mkdirSync(path.dirname(outfile), { recursive: true });
  buildSync({
    entryPoints: [configEntry],
    outfile,
    bundle: true,
    format: "esm",
    target: ["es2020"],
    conditions: ["worker", "browser"],
    platform: "browser",
    external: ["node:crypto"],
    define: { "process.env.NODE_ENV": '"production"' },
  });
}

const origCopyFileSync = fs.copyFileSync;
fs.copyFileSync = function patchedCopyFileSync(src, dest, mode) {
  const srcStr = String(src);
  const destStr = String(dest);
  const isEdgeConfig =
    srcStr.includes("open-next.config.edge.mjs") && destStr.includes(`${path.sep}middleware${path.sep}`);
  if (isEdgeConfig && !fs.existsSync(srcStr)) {
    compileEdge(srcStr);
  }
  return origCopyFileSync.call(fs, src, dest, mode);
};
