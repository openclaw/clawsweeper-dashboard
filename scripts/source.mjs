import fs from "node:fs";
import path from "node:path";

export const PROFILES = [
  {
    slug: "openclaw-openclaw",
    displayName: "OpenClaw",
    repo: "openclaw/openclaw",
  },
  {
    slug: "openclaw-clawhub",
    displayName: "ClawHub",
    repo: "openclaw/clawhub",
  },
  {
    slug: "openclaw-clawsweeper",
    displayName: "ClawSweeper",
    repo: "openclaw/clawsweeper",
  },
];

export function profileForSlug(slug) {
  return PROFILES.find((profile) => profile.slug === slug);
}

export function readText(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

export function readJson(file, fallback = null) {
  if (!fs.existsSync(file)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    console.warn(`[clawsweeper-state] readJson: malformed JSON in ${file}, using fallback`);
    return fallback;
  }
}

export function writeText(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
}

export function markdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .sort()
    .map((name) => path.join(dir, name));
}

export function jsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => path.join(dir, name));
}

export function parseFrontMatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  const body = {};
  if (!match?.[1]) return body;
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!pair) continue;
    body[pair[1]] = parseFrontMatterScalar(pair[2]);
  }
  return body;
}

function parseFrontMatterScalar(value) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return "";
  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed.replace(/^"|"$/g, "");
  }
}

export function relativePath(root, file) {
  return path.relative(root, file).split(path.sep).join("/");
}

export function numberFromFile(file) {
  const match = path.basename(file).match(/(\d+)\.md$/);
  return match ? Number(match[1]) : 0;
}

export function newestTimestamp(...values) {
  return values.filter(Boolean).sort((a, b) => Date.parse(b) - Date.parse(a))[0] ?? "";
}
