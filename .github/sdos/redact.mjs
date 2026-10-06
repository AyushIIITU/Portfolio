// Scrubs credential values out of everything the workflow uploads. Playwright
// traces record fill() arguments and network bodies, so a test login would
// otherwise ship inside trace.zip to anyone with repo read access.
//
//   node redact.mjs              run in the workflow (needs `unzip` and `zip`)
//   node redact.mjs --self-test
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseEnv } from "node:util";
import assert from "node:assert/strict";

const MASK = "[REDACTED]";
// Trace resources (request/response bodies) often have no extension, so
// "text" means "no NUL bytes", not a file-name pattern. Media is skipped.
const MEDIA = /\.(png|jpe?g|webm|webp|gif|zip)$/i;
const isText = (buffer) => !buffer.subarray(0, 8192).includes(0);

/** Every form a value takes in the files we upload: raw, JSON-escaped, URL-encoded. */
export function variants(values) {
  const out = new Set();
  for (const value of values) {
    if (value.length < 4) continue; // Too short to redact without shredding unrelated text.
    out.add(value);
    out.add(JSON.stringify(value).slice(1, -1));
    out.add(encodeURIComponent(value));
    out.add(new URLSearchParams({ v: value }).toString().slice(2));
  }
  // Longest first so a value is not half-replaced by one of its own substrings.
  return [...out].sort((a, b) => b.length - a.length);
}

export function redactText(text, forms) {
  let out = text;
  for (const form of forms) out = out.split(form).join(MASK);
  return out;
}

/** Values from the dotenv file the prepare step wrote; same parser as process.loadEnvFile. */
export function secretValues(dotenv) {
  return Object.values(parseEnv(dotenv));
}

function walk(dir, visit) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, visit);
    else visit(path);
  }
}

function redactFile(path, forms) {
  if (MEDIA.test(path)) return;
  const buffer = readFileSync(path);
  if (!isText(buffer)) return;
  const text = buffer.toString("utf8");
  const clean = redactText(text, forms);
  if (clean !== text) writeFileSync(path, clean);
}

function redactZip(path, forms) {
  const dir = mkdtempSync(join(tmpdir(), "sdos-redact-"));
  try {
    execFileSync("unzip", ["-q", "-o", path, "-d", dir]);
    walk(dir, (file) => redactFile(file, forms));
    rmSync(path);
    execFileSync("zip", ["-q", "-r", "-X", path, "."], { cwd: dir });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function main() {
  const out = process.env.OUT;
  const secretsFile = `${out}/.secrets.env`;
  if (!existsSync(secretsFile)) return;
  // Multiline values: also redact each line, since files may split them.
  const values = secretValues(readFileSync(secretsFile, "utf8")).flatMap((v) => [v, ...v.split(/\r?\n/)]);
  const forms = variants(values);
  if (forms.length === 0) return;
  walk(out, (file) => {
    if (file === secretsFile || file.includes("node_modules")) return;
    if (file.endsWith(".zip")) redactZip(file, forms);
    else redactFile(file, forms);
  });
  console.log("credential values redacted from artifacts");
}

function selfTest() {
  const forms = variants(["p@ss w\"rd", "abc"]);
  assert.ok(!forms.includes("abc"), "short values are skipped");
  const trace = JSON.stringify({ method: "fill", params: { value: "p@ss w\"rd" } });
  assert.equal(redactText(trace, forms).includes("p@ss"), false);
  assert.equal(redactText("pw=p%40ss%20w%22rd&x=1", forms), `pw=${MASK}&x=1`);
  assert.equal(redactText("body: pw=p%40ss+w%22rd", forms), `body: pw=${MASK}`);
  assert.deepEqual(secretValues("A='x\"y'\nB=\"plain\"\nC='line1\nline2'\n"), [
    'x"y',
    "plain",
    "line1\nline2",
  ]);
  assert.equal(isText(Buffer.from("POST body pw=secret")), true);
  assert.equal(isText(Buffer.from([0x89, 0x50, 0x00, 0x01])), false);
  console.log("redact self-test ok");
}

if (process.argv[2] === "--self-test") selfTest();
else main();
