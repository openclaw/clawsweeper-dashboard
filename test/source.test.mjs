import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { readJson } from "../scripts/source.mjs";

test("readJson returns null fallback for missing file", () => {
  assert.equal(readJson("/nonexistent/path/does-not-exist.json"), null);
});

test("readJson returns custom fallback for missing file", () => {
  assert.deepEqual(readJson("/nonexistent/path/does-not-exist.json", []), []);
});

test("readJson parses valid JSON", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-source-"));
  try {
    const file = path.join(dir, "valid.json");
    fs.writeFileSync(file, JSON.stringify({ ok: true }), "utf8");
    assert.deepEqual(readJson(file), { ok: true });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("readJson throws on malformed JSON", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-source-"));
  try {
    const file = path.join(dir, "bad.json");
    fs.writeFileSync(file, "{bad json", "utf8");
    assert.throws(() => readJson(file, "FALLBACK"), /malformed JSON in .*bad\.json/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("readJson throws on malformed JSON without a fallback", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-source-"));
  try {
    const file = path.join(dir, "truncated.json");
    fs.writeFileSync(file, '{"incomplete":', "utf8");
    assert.throws(() => readJson(file), /malformed JSON in .*truncated\.json/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
