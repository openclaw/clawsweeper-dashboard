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
      cluster_id: "repair-active",
      run_id: "114",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/114",
      workflow_status: "in_progress",
      workflow_conclusion: "success",
      result_status: "planned",
      published_at: "2026-06-01T10:30:00.000Z",
      needs_human: [],
      fix_actions: [
        {
          target: "#49",
          action: "execute_fix",
          status: "planned",
          reason: "repair queued in the durable record",
        },
      ],
      apply_actions: [],
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
      cluster_id: "completed-merge",
      run_id: "103",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/103",
      workflow_conclusion: "success",
      result_status: "planned",
      published_at: "2026-06-01T13:00:00.000Z",
      needs_human: [],
      fix_actions: [],
      apply_actions: [
        {
          target: "#98",
          action: "merge_canonical",
          status: "blocked",
          classification: "fix_pr",
          reason: "checks are not clean: test: FAILURE",
        },
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
    {
      repo: "openclaw/openclaw",
      cluster_id: "automation-failed",
      run_id: "104",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/104",
      workflow_conclusion: "failure",
      result_status: "blocked",
      published_at: "2026-06-01T14:00:00.000Z",
      needs_human: [],
      fix_actions: [
        {
          action: "repair_contributor_branch",
          status: "failed",
          reason: "repair validation failed",
        },
      ],
      apply_actions: [],
    },
    {
      repo: "openclaw/openclaw",
      cluster_id: "reviewed-no-action",
      run_id: "105",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/105",
      workflow_conclusion: "success",
      result_status: "planned",
      published_at: "2026-06-01T15:00:00.000Z",
      needs_human: [],
      summary: "current main already contains the fix",
      fix_actions: [],
      apply_actions: [],
    },
    {
      repo: "openclaw/openclaw",
      cluster_id: "repair-open",
      run_id: "106",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/106",
      workflow_conclusion: "success",
      result_status: "planned",
      published_at: "2026-06-01T16:00:00.000Z",
      needs_human: [],
      fix_actions: [
        {
          action: "open_fix_pr",
          status: "opened",
          pr: "https://github.com/openclaw/openclaw/pull/80",
          url: "https://github.com/openclaw/openclaw/pull/80",
        },
      ],
      apply_actions: [],
    },
    {
      repo: "openclaw/openclaw",
      cluster_id: "merge-not-authorized",
      run_id: "107",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/107",
      workflow_conclusion: "success",
      result_status: "planned",
      published_at: "2026-06-01T17:00:00.000Z",
      needs_human: [],
      fix_actions: [
        {
          action: "repair_contributor_branch",
          status: "pushed",
          pr: "https://github.com/openclaw/openclaw/pull/81",
        },
      ],
      apply_actions: [
        {
          target: "#81",
          action: "merge_canonical",
          status: "blocked",
          classification: "fix_pr",
          reason: "job does not allow merge",
        },
      ],
    },
    {
      repo: "openclaw/openclaw",
      cluster_id: "automation-blocked",
      run_id: "108",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/108",
      workflow_conclusion: "success",
      result_status: "blocked",
      published_at: "2026-06-01T18:00:00.000Z",
      needs_human: [],
      fix_actions: [
        {
          action: "execute_fix",
          status: "blocked",
          reason: "validation command unavailable",
        },
      ],
      apply_actions: [],
    },
    {
      repo: "openclaw/openclaw",
      cluster_id: "planned-top-level-action",
      run_id: "109",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/109",
      workflow_conclusion: "success",
      result_status: "planned",
      published_at: "2026-06-01T19:00:00.000Z",
      needs_human: [],
      actions: [
        {
          target: "#44",
          action: "fix_needed",
          status: "planned",
          reason: "build a narrow repair",
        },
      ],
      fix_actions: [],
      apply_actions: [],
    },
    {
      repo: "openclaw/openclaw",
      cluster_id: "security-route",
      run_id: "110",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/110",
      workflow_conclusion: "success",
      result_status: "planned",
      published_at: "2026-06-01T20:00:00.000Z",
      needs_human: [],
      actions: [
        {
          target: "#45",
          action: "route_security",
          status: "skipped",
          reason: "central security review required",
        },
      ],
      fix_actions: [],
      apply_actions: [],
    },
    {
      repo: "openclaw/openclaw",
      cluster_id: "merge-not-authorized-without-repair-output",
      run_id: "111",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/111",
      workflow_conclusion: "success",
      result_status: "planned",
      published_at: "2026-06-01T21:00:00.000Z",
      needs_human: [],
      fix_actions: [],
      apply_actions: [
        {
          target: "#46",
          action: "merge_canonical",
          status: "blocked",
          classification: "fix_pr",
          reason: "job does not allow merge",
        },
      ],
    },
    {
      repo: "openclaw/openclaw",
      cluster_id: "apply-failed",
      run_id: "112",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/112",
      workflow_conclusion: "success",
      result_status: "planned",
      published_at: "2026-06-01T22:00:00.000Z",
      needs_human: [],
      fix_actions: [],
      apply_actions: [
        {
          target: "#47",
          action: "merge_canonical",
          status: "failed",
          classification: "fix_pr",
          reason: "merge API failed",
        },
      ],
    },
    {
      repo: "openclaw/openclaw",
      cluster_id: "top-level-action-failed",
      run_id: "113",
      run_url: "https://github.com/openclaw/clawsweeper/actions/runs/113",
      workflow_conclusion: "success",
      result_status: "planned",
      published_at: "2026-06-01T23:00:00.000Z",
      needs_human: [],
      actions: [
        {
          target: "#48",
          action: "comment",
          status: "failed",
          reason: "comment API failed",
        },
      ],
      fix_actions: [],
      apply_actions: [],
    },
  ];
  for (const record of records) {
    fs.writeFileSync(path.join(runsDir, `${record.run_id}.json`), JSON.stringify(record), "utf8");
  }

  const dashboard = renderRepairDashboard(root);

  assert.match(dashboard, /### Owner Action Dashboard/);
  assert.match(dashboard, /#### Recap/);
  assert.match(dashboard, /Snapshot only: lane states reflect the latest durable run records, not live GitHub state/);
  assert.match(
    dashboard,
    /Latest records: 15 clusters: 5 maintainer action, 4 automation snapshot, 4 intervention needed, 1 no pending action, 1 completed\./,
  );
  assert.match(dashboard, /Maintainer first: .*\[#46\].*job does not allow merge/);
  assert.match(dashboard, /Intervention first: .*\[#48\].*comment API failed/);
  assert.match(dashboard, /Automation latest: .*\[#44\].*build a narrow repair/);
  assert.match(dashboard, /Completed latest: .*\[#79\].*fix merged thing/);
  assert.match(dashboard, /\| Maintainer Action \| 5 \| explicit decision, access, or merge authority recorded \|/);
  assert.match(dashboard, /\| Automation Snapshot \| 4 \| repair, check, or planned action recorded; verify live status \|/);
  assert.match(dashboard, /\| Intervention Needed \| 4 \| automation failure or blocker recorded \|/);
  assert.match(dashboard, /\| No Pending Action \| 1 \| latest record proposes no repair or apply action \|/);
  assert.match(dashboard, /\| Completed \| 1 \| latest record contains an executed merge or close \|/);
  for (const state of [
    "maintainer_input",
    "merge_ready",
    "merge_not_authorized",
    "checks_blocked",
    "repair_open",
    "automation_active",
    "action_planned",
    "automation_failed",
    "automation_blocked",
    "reviewed_no_action",
    "completed",
  ]) {
    const count =
      state === "automation_failed"
        ? 3
        : state === "maintainer_input" || state === "merge_not_authorized"
          ? 2
          : 1;
    assert.match(dashboard, new RegExp(`\\| ${state} \\| ${count} \\|`));
  }
  assert.match(dashboard, /\| \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\) \|  \| maintainer_input \| choose default retention policy \|/);
  assert.match(dashboard, /\| \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\) \| \[#77\]\(https:\/\/github\.com\/openclaw\/openclaw\/pull\/77\) \| checks_blocked \| checks are not clean: test: IN_PROGRESS \|/);
  assert.match(dashboard, /\| \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\) \| \[#78\]\(https:\/\/github\.com\/openclaw\/openclaw\/pull\/78\) \| merge_ready \| issue implementation PR checks are green; merge intentionally blocked for this lane \|/);
  assert.match(dashboard, /\| \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\) \| \[#80\]\(https:\/\/github\.com\/openclaw\/openclaw\/pull\/80\) \| repair_open \| repair branch or PR recorded; verify live status \|/);
  assert.match(dashboard, /\| \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\) \| \[#44\]\(https:\/\/github\.com\/openclaw\/openclaw\/issues\/44\) \| action_planned \| build a narrow repair \|/);
  assert.match(dashboard, /\| \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\) \| \[#49\]\(https:\/\/github\.com\/openclaw\/openclaw\/issues\/49\) \| automation_active \| repair queued in the durable record \|/);
  assert.match(dashboard, /\| \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\) \| \[#45\]\(https:\/\/github\.com\/openclaw\/openclaw\/issues\/45\) \| maintainer_input \| central security review required \|/);
  assert.match(dashboard, /\| \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\) \| \[#46\]\(https:\/\/github\.com\/openclaw\/openclaw\/pull\/46\) \| merge_not_authorized \| job does not allow merge \|/);
  assert.match(dashboard, /\| \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\) \| \[#47\]\(https:\/\/github\.com\/openclaw\/openclaw\/pull\/47\) \| automation_failed \| merge API failed \|/);
  assert.match(dashboard, /\| \[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\) \| \[#48\]\(https:\/\/github\.com\/openclaw\/openclaw\/issues\/48\) \| automation_failed \| comment API failed \|/);
  assert.doesNotMatch(dashboard, /Completed latest: .*\[#98\]/);
});
