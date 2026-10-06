// Deterministic judge. The LLM explores and writes specs; this script, not the
// model, decides whether a failure is a regression. Replays every spec on the
// target, then on the baseline, and writes e2e-out/results.json.
//
//   explore: findings come from the agent's findings.json; verdicts from replay.
//   replay:  no agent; each failing spec becomes a finding with Playwright's error.
//
//   node classify.mjs              run in the workflow
//   node classify.mjs --self-test  check the verdict table and report parsing
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";

// Matches E2eSpecPathSchema in SDOS: flat files only, so ingest never follows a path out.
const SPEC_KEY = /^specs\/[A-Za-z0-9._-]+\.spec\.ts$/;
const ANSI = /\u001b\[[0-9;]*m/g;

/** @returns {"regression"|"fails_on_both"|"not_reproduced"|"unverified"} */
export function verdict(specFile, target, baseline) {
  if (!specFile || !(specFile in target)) return "unverified";
  if (target[specFile] === "passed") return "not_reproduced";
  if (!baseline) return "unverified";
  // A spec that errored before reporting on baseline counts as failing there.
  return baseline[specFile] === "passed" ? "regression" : "fails_on_both";
}

/**
 * Playwright JSON report -> per-file status, plus the first failure per file.
 * Nested spec files are skipped: SDOS only accepts flat `specs/<name>.spec.ts`.
 */
export function readReport(report) {
  const status = {};
  const failures = {};
  const walk = (suite) => {
    for (const spec of suite.specs ?? []) {
      const key = `specs/${spec.file}`;
      if (!SPEC_KEY.test(key)) continue;
      status[key] = status[key] === "failed" || !spec.ok ? "failed" : "passed";
      if (!spec.ok && !failures[key]) {
        const error = spec.tests
          ?.flatMap((t) => t.results ?? [])
          .map((r) => r.error?.message)
          .find(Boolean);
        failures[key] = {
          title: spec.title,
          message: (error ?? "Test failed").replace(ANSI, "").slice(0, 4000),
        };
      }
    }
    (suite.suites ?? []).forEach(walk);
  };
  (report.suites ?? []).forEach(walk);
  return { status, failures };
}

/** `// sdos-story: <id>` on a spec's first line; "none" or absent -> null. */
export function storyIdOf(source) {
  const match = /^\/\/\s*sdos-story:\s*(\S+)/.exec(source);
  return match && match[1] !== "none" ? match[1].slice(0, 64) : null;
}

/** Replay mode: one finding per spec that fails on target. */
export function replayFindings(target, failures, readSpec) {
  return Object.entries(target)
    .filter(([, s]) => s === "failed")
    .map(([key], i) => ({
      id: `r${i + 1}`,
      title: `Approved spec fails: ${failures[key]?.title ?? key}`.slice(0, 300),
      storyId: storyIdOf(readSpec(key) ?? ""),
      severity: "high",
      steps: [],
      expected: "The approved spec passes, as it did when it was approved.",
      actual: failures[key]?.message ?? "Test failed",
      specFile: key,
      screenshot: null,
    }));
}

function runLeg(leg, baseURL) {
  const r = spawnSync(
    "playwright",
    ["test", "--config", `${process.env.OUT}/playwright.config.mjs`, "--reporter=json"],
    {
      env: { ...process.env, BASE_URL: baseURL, SDOS_LEG: leg },
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    },
  );
  try {
    return readReport(JSON.parse(r.stdout));
  } catch {
    console.error(`[${leg}] no JSON report:\n${r.stderr}`);
    return { status: {}, failures: {} };
  }
}

function main() {
  const { OUT, MODE, SPEC_DIR, TARGET_URL, BASELINE_URL } = process.env;
  const findingsPath = `${OUT}/findings.json`;
  const agent =
    MODE === "explore" && existsSync(findingsPath)
      ? JSON.parse(readFileSync(findingsPath, "utf8"))
      : null;

  const target = runLeg("target", TARGET_URL);
  const baseline = BASELINE_URL ? runLeg("baseline", BASELINE_URL).status : null;

  const readSpec = (key) => {
    const file = `${SPEC_DIR}/${key.slice("specs/".length)}`;
    return existsSync(file) ? readFileSync(file, "utf8") : null;
  };
  const findings =
    MODE === "explore"
      ? (agent?.findings ?? [])
      : replayFindings(target.status, target.failures, readSpec);

  const results = {
    version: 1,
    agentOutputMissing: MODE === "explore" && agent === null,
    summary: agent?.summary ?? null,
    target: target.status,
    baseline,
    findings: findings.map((f) => ({ ...f, verdict: verdict(f.specFile, target.status, baseline) })),
  };
  writeFileSync(`${OUT}/results.json`, JSON.stringify(results, null, 2));
  console.log(
    results.findings.map((f) => `${f.verdict.padEnd(15)} ${f.title}`).join("\n") ||
      "no findings",
  );
}

function selfTest() {
  const t = { "specs/a.spec.ts": "failed", "specs/b.spec.ts": "passed" };
  assert.equal(verdict("specs/a.spec.ts", t, { "specs/a.spec.ts": "passed" }), "regression");
  assert.equal(verdict("specs/a.spec.ts", t, { "specs/a.spec.ts": "failed" }), "fails_on_both");
  assert.equal(verdict("specs/a.spec.ts", t, {}), "fails_on_both");
  assert.equal(verdict("specs/a.spec.ts", t, null), "unverified");
  assert.equal(verdict("specs/b.spec.ts", t, null), "not_reproduced");
  assert.equal(verdict(null, t, null), "unverified");
  assert.equal(verdict("specs/missing.spec.ts", t, null), "unverified");

  const report = {
    suites: [
      {
        specs: [
          { file: "a.spec.ts", title: "checkout", ok: true },
          {
            file: "a.spec.ts",
            title: "discount",
            ok: false,
            tests: [{ results: [{ error: { message: "\u001b[31mExpected 90\u001b[39m" } }] }],
          },
        ],
      },
      {
        suites: [
          { specs: [{ file: "b.spec.ts", title: "b", ok: true }] },
          { specs: [{ file: "nested/c.spec.ts", title: "c", ok: false }] },
        ],
      },
    ],
  };
  const parsed = readReport(report);
  assert.deepEqual(parsed.status, { "specs/a.spec.ts": "failed", "specs/b.spec.ts": "passed" });
  assert.deepEqual(parsed.failures["specs/a.spec.ts"], { title: "discount", message: "Expected 90" });

  assert.equal(storyIdOf("// sdos-story: 7f3a\nimport"), "7f3a");
  assert.equal(storyIdOf("// sdos-story: none\n"), null);
  assert.equal(storyIdOf("import x"), null);

  const replay = replayFindings(parsed.status, parsed.failures, () => "// sdos-story: s-9\n");
  assert.equal(replay.length, 1);
  assert.equal(replay[0].specFile, "specs/a.spec.ts");
  assert.equal(replay[0].storyId, "s-9");
  assert.equal(replay[0].actual, "Expected 90");
  console.log("classify self-test ok");
}

if (process.argv[2] === "--self-test") selfTest();
else main();
