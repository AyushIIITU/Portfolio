// Fills prompt.md from workflow inputs. Writes $OUT/prompt.md (Codex reads the
// file) and the `text` step output (claude-code-action takes it inline).
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

const { OUT, TARGET_URL, TASK, GITHUB_OUTPUT, SDOS_SECRET_NAMES } = process.env;

// Only secret NAMES reach the model; Playwright MCP substitutes the values.
// Never read .secrets.env here: a multiline value would leak as a fake "name".
const secretNames = (SDOS_SECRET_NAMES ?? "").split(",").filter(Boolean);

// Written by the "Fetch story bundle" step: { stories: [...] } from SDOS or the inline input.
const bundle = JSON.parse(readFileSync(`${OUT}/bundle.json`, "utf8"));
const stories = JSON.stringify(bundle.stories ?? [], null, 2);

const text = readFileSync(new URL("./prompt.md", import.meta.url), "utf8")
  .replaceAll("{{TARGET_URL}}", TARGET_URL)
  .replaceAll("{{TASK}}", TASK || "test end to end")
  .replaceAll("{{STORIES}}", stories)
  .replaceAll("{{SECRET_NAMES}}", secretNames.length ? secretNames.join(", ") : "(none)");

writeFileSync(`${OUT}/prompt.md`, text);
const delimiter = `SDOS_${randomUUID()}`;
appendFileSync(GITHUB_OUTPUT, `text<<${delimiter}\n${text}\n${delimiter}\n`);
