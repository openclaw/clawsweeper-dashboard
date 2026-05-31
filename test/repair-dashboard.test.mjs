import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { renderRepairDashboard } from "../scripts/repair-dashboard.mjs";

test("repair dashboard links shorthand targets through the source repo", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-state-repair-"));
  const runsDir = path.join(root, "results", "runs");
  fs.mkdirSync(runsDir, { recursive: true });
  fs.writeFileSync(
    path.join(runsDir, "run.json"),
    JSON.stringify({
      repo: "openclaw/openclaw",
      cluster_id: "repair-target-links",
      run_id: "12345",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/12345",
      workflow_conclusion: "success",
      published_at: "2026-05-02T19:00:00.000Z",
      needs_human: ["manual review required"],
      fix_actions: [
        {
          target: "#789",
          status: "blocked",
          reason: "needs inspection",
        },
        {
          target: "#901",
          action: "repair_contributor_branch",
          status: "blocked",
          reason: "needs branch repair",
          url: "https://github.com/openclaw/openclaw/pull/901",
        },
      ],
      apply_actions: [
        {
          target: "#123",
          action: "close_duplicate",
          status: "executed",
          title: "duplicate report",
          closed_at: "2026-05-02T19:01:00.000Z",
        },
        {
          target: "https://github.com/openclaw/openclaw/pull/456",
          action: "close_superseded",
          status: "executed",
          title: "superseded PR",
          closed_at: "2026-05-02T19:00:00.000Z",
        },
      ],
    }),
    "utf8",
  );

  const dashboard = renderRepairDashboard(root);

  assert.match(dashboard, /\[#123\]\(https:\/\/github\.com\/openclaw\/openclaw\/issues\/123\)/);
  assert.match(dashboard, /\[#789\]\(https:\/\/github\.com\/openclaw\/openclaw\/issues\/789\)/);
  assert.match(dashboard, /\[#456\]\(https:\/\/github\.com\/openclaw\/openclaw\/pull\/456\)/);
  assert.match(dashboard, /\[#901\]\(https:\/\/github\.com\/openclaw\/openclaw\/pull\/901\)/);
  assert.doesNotMatch(dashboard, /\[#123\]\(#123\)/);
  assert.doesNotMatch(dashboard, /\[#789\]\(#789\)/);

  // Cluster column in "Clusters Needing Inspection" must be plain text, not a link
  assert.match(dashboard, /\| repair-target-links \|/);
  assert.doesNotMatch(
    dashboard,
    /\| \[repair-target-links\][^\n]* \| [^\n]* \| [^\n]* \| \[repair-target-links\]/,
  );

  // Cluster column in "Latest Repair Closures" must be plain text; Report column has the link
  assert.doesNotMatch(
    dashboard,
    /\| \[repair-target-links\][^\n]* \| \[repair-target-links\]/,
  );
});
