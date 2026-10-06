import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Specs read credentials as process.env.NAME; same file Playwright MCP uses.
const secrets = fileURLToPath(new URL("./.secrets.env", import.meta.url));
if (existsSync(secrets)) process.loadEnvFile(secrets);

export default defineConfig({
  // explore: specs the agent just wrote; replay: approved specs in e2e/sdos/.
  testDir: process.env.SPEC_DIR ?? "./specs",
  timeout: 60_000,
  retries: 1,
  // One output dir per leg so the baseline replay doesn't overwrite target traces.
  outputDir: `./test-results/${process.env.SDOS_LEG ?? "target"}`,
  use: {
    baseURL: process.env.BASE_URL ?? process.env.TARGET_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});
