import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { actionEventShardRelativePath } from "../scripts/ledger-events.mjs";
import {
  actionEventId,
  actionEventSemanticSha256,
} from "../scripts/ledger-schema.mjs";

export function tempRoot(context) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-ledger-"));
  context.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}

export function actionEvent(overrides = {}, seal = true) {
  const event = {
    schema: "clawsweeper.state-ledger-event.v1",
    schema_version: 1,
    event_id: "",
    event_key: "review.completed:openclaw/openclaw:42:abc123",
    semantic_sha256: "",
    occurred_at: "2026-07-12T10:00:00.000Z",
    recorded_at: "2026-07-12T10:01:00.000Z",
    event_type: "review.completed",
    producer: {
      repository: "openclaw/clawsweeper",
      sha: "abc123",
      workflow: "sweep",
      job: "review-3",
      run_id: "100",
      run_attempt: 1,
      component: "review",
    },
    subject: {
      repository: "openclaw/openclaw",
      kind: "pull_request",
      number: 42,
      source_revision: "abc123",
      record_path: "records/openclaw-openclaw/items/42.md",
    },
    action: {
      name: "review",
      status: "completed",
      reason_code: "keep_open",
      retryable: false,
      mutation: false,
    },
    evidence: [
      {
        kind: "review_record",
        sha256: "a".repeat(64),
        report_path: "records/openclaw-openclaw/items/42.md",
        run_url: "https://github.com/openclaw/clawsweeper/actions/runs/100",
      },
    ],
    attributes: {
      cached: false,
      finding_count: 2,
      review_mode: "full",
    },
    privacy: {
      classification: "internal",
      redaction_version: "v1",
      fields_dropped: ["body", "prompt"],
    },
    ...overrides,
  };
  if (!seal) return event;
  event.event_id = actionEventId(event.subject.repository, event.event_key);
  event.semantic_sha256 = actionEventSemanticSha256(event);
  return event;
}

export function writeShard(root, events) {
  const ordered = [...events].sort(
    (left, right) =>
      left.occurred_at.localeCompare(right.occurred_at) ||
      left.event_id.localeCompare(right.event_id),
  );
  const relative = actionEventShardRelativePath(ordered);
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(
    file,
    `${ordered.map((event) => JSON.stringify(event)).join("\n")}\n`,
    "utf8",
  );
  return file;
}
