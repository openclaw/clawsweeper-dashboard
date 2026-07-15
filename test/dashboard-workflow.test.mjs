import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("dashboard checkouts stay within the scheduled concurrency window", () => {
  const workflow = fs.readFileSync(".github/workflows/dashboard.yml", "utf8");
  assert.match(workflow, /schedule:[\s\S]*- cron: "7 \* \* \* \*"/);
  assert.doesNotMatch(workflow, /cron: "\*\/15/);
  assert.match(workflow, /cancel-in-progress: true/);
  assert.match(
    workflow,
    /path: state-repo[\s\S]*?fetch-depth: 1[\s\S]*?ref: state[\s\S]*?path: state[\s\S]*?fetch-depth: 1/,
  );
  assert.doesNotMatch(workflow, /fetch-depth: 0/);
});
