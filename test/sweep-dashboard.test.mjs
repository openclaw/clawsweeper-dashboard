import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { renderSweepDashboard } from "../scripts/sweep-dashboard.mjs";

test("recently closed records are sorted before limiting", () => {
  const root = mkdtempSync(path.join(tmpdir(), "clawsweeper-state-test-"));
  try {
    const closedDir = path.join(root, "records", "openclaw-openclaw", "closed");
    mkdirSync(closedDir, { recursive: true });

    for (let index = 0; index < 15; index += 1) {
      writeClosedRecord({
        dir: closedDir,
        number: 100 + index,
        title: `Older close ${index}`,
        appliedAt: `2026-05-01T00:${String(index).padStart(2, "0")}:00.000Z`,
      });
    }
    writeClosedRecord({
      dir: closedDir,
      number: 999,
      title: "Newest close",
      appliedAt: "2026-05-02T00:00:00.000Z",
    });

    const dashboard = renderSweepDashboard(root);

    assert.match(
      dashboard,
      /\[#999\]\(https:\/\/github\.com\/openclaw\/openclaw\/pull\/999\)/,
    );
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
});

function writeClosedRecord({ dir, number, title, appliedAt }) {
  writeFileSync(
    path.join(dir, `${number}.md`),
    `---
number: ${number}
repository: openclaw/openclaw
type: pull_request
title: ${JSON.stringify(title)}
url: https://github.com/openclaw/openclaw/pull/${number}
applied_at: ${appliedAt}
decision: close
action_taken: closed
close_reason: implemented_on_main
---

# ${title}
`,
    "utf8",
  );
}
