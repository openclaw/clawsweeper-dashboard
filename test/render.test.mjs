import assert from "node:assert/strict";
import test from "node:test";
import { formatTimestamp, percent, tableCell, truncate } from "../scripts/markdown.mjs";

test("markdown helpers keep dashboard tables stable", () => {
  assert.equal(tableCell("a | b\nc"), "a \\| b c");
  assert.equal(percent(1, 4), "25.0%");
  assert.equal(percent(1, 0), "N/A");
  assert.equal(percent(0, 0), "N/A");
  assert.match(formatTimestamp("2026-05-01T05:37:00.000Z"), /May 1, 2026/);
});

test("truncate respects max length", () => {
  assert.equal(truncate("hello world", 8), "hello...");
  assert.equal(truncate("hi", 5), "hi");
  assert.equal(truncate("exactly", 7), "exactly");
});

test("truncate edge cases for max < 4", () => {
  assert.equal(truncate("hello", 0), "");
  assert.equal(truncate("hello", 1), "h");
  assert.equal(truncate("hello", 2), "he");
  assert.equal(truncate("hello", 3), "hel");
});
