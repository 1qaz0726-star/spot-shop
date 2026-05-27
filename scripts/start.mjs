import { spawn } from "child_process";
import { applyRailwayDataPaths, logDataPaths } from "./data-path.mjs";

applyRailwayDataPaths();
logDataPaths("start");

const child = spawn("npx", ["next", "start"], {
  stdio: "inherit",
  env: process.env,
  shell: true,
});

child.on("exit", (code) => process.exit(code ?? 0));
