import { spawn } from "node:child_process";

process.env.NEXT_DIST_DIR = ".next-dev";

console.log(`[dev] Using Next dist dir: ${process.env.NEXT_DIST_DIR}`);

const child = spawn(process.execPath, ["./node_modules/next/dist/bin/next", "dev"], {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
});

child.on("error", (error) => {
  console.error("[dev] Failed to start Next.js dev server.", error);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
