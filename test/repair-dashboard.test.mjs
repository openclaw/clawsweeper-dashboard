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

test("repair dashboard groups owner action lanes by operator bucket", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-state-owner-"));
  const runsDir = path.join(root, "results", "runs");
  fs.mkdirSync(runsDir, { recursive: true });
  const records = [
    {
      repo: "openclaw/openclaw",
      cluster_id: "needs-policy",
      run_id: "100",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/100",
      workflow_conclusion: "success",
      result_status: "needs_human",
      published_at: "2026-06-01T10:00:00.000Z",
      needs_human: ["choose default retention policy"],
      fix_actions: [],
      apply_actions: [],
    },
    {
      repo: "openclaw/openclaw",
      cluster_id: "checks-running",
      run_id: "101",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/101",
      workflow_conclusion: "success",
      result_status: "planned",
      published_at: "2026-06-01T11:00:00.000Z",
      needs_human: [],
      fix_actions: [
        {
          action: "open_fix_pr",
          status: "opened",
          pr: "https://github.com/openclaw/openclaw/pull/77",
          url: "https://github.com/openclaw/openclaw/pull/77",
        },
      ],
      apply_actions: [
        {
          target: "#77",
          action: "merge_canonical",
          status: "blocked",
          classification: "fix_pr",
          reason: "checks are not clean: test: IN_PROGRESS",
        },
      ],
    },
    {
      repo: "openclaw/openclaw",
      cluster_id: "ready-merge",
      run_id: "102",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/102",
      workflow_conclusion: "success",
      result_status: "planned",
      published_at: "2026-06-01T12:00:00.000Z",
      needs_human: [],
      fix_actions: [
        {
          action: "open_fix_pr",
          status: "opened",
          pr: "https://github.com/openclaw/openclaw/pull/78",
          url: "https://github.com/openclaw/openclaw/pull/78",
        },
      ],
      apply_actions: [
        {
          target: "#78",
          action: "merge_canonical",
          status: "ready",
          classification: "fix_pr",
          reason: "issue implementation PR checks are green; merge intentionally blocked for this lane",
        },
      ],
    },
    {
      repo: "openclaw/openclaw",
      cluster_id: "recent-merged",
      run_id: "103",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/103",
      workflow_conclusion: "success",
      result_status: "planned",
      published_at: "2026-06-01T13:00:00.000Z",
      needs_human: [],
      fix_actions: [],
      apply_actions: [
        {
          target: "#79",
          action: "merge_canonical",
          status: "executed",
          classification: "fix_pr",
          title: "fix merged thing",
          merged_at: "2026-06-01T13:05:00.000Z",
        },
      ],
    },
  ];
  for (const record of records) {
    fs.writeFileSync(path.join(runsDir, `${record.run_id}.json`), JSON.stringify(record), "utf8");
  }

  const dashboard = renderRepairDashboard(root);

  assert.match(dashboard, /### Owner Action Dashboard/);
  assert.match(dashboard, /#### Recap/);
  assert.match(dashboard, /Flow: bot challenge -> repair\/fix -> checks\/review -> merge or close\./);
  assert.match(
    dashboard,
    /Current snapshot: 3 active lanes and 1 done lane from 4 latest clusters: 2 need Nico, 1 automation running, 0 ready\/autonomous\./,
  );
  assert.match(dashboard, /Nico first: \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\).*issue implementation PR checks are green/);
  assert.match(dashboard, /Automation first: \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\).*checks are not clean: test: IN_PROGRESS/);
  assert.match(dashboard, /Ready\/autonomous first: nothing is queued for autonomous action\./);
  assert.match(dashboard, /Done latest: \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\).*fix merged thing/);
  assert.match(dashboard, /\| Needs Nico \| 2 \| approve merge\/deploy/);
  assert.match(dashboard, /\| Automation Running \| 1 \| worker, repair, review, or checks still in motion \|/);
  assert.match(dashboard, /\| Done \| 1 \| recently merged or closed \|/);
  assert.match(dashboard, /\| needs_human \| 1 \|/);
  assert.match(dashboard, /\| waiting_checks \| 1 \|/);
  assert.match(dashboard, /\| ready_to_merge \| 1 \|/);
  assert.match(dashboard, /\| merged \| 1 \|/);
  assert.match(dashboard, /\| \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\) \|  \| needs_human \| choose default retention policy \|/);
  assert.match(dashboard, /\| \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\) \| \[#77\]\(https:\/\/github\.com\/openclaw\/openclaw\/pull\/77\) \| waiting_checks \| checks are not clean: test: IN_PROGRESS \|/);
  assert.match(dashboard, /\| \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\) \| \[#78\]\(https:\/\/github\.com\/openclaw\/openclaw\/pull\/78\) \| ready_to_merge \| issue implementation PR checks are green; merge intentionally blocked for this lane \|/);
});
