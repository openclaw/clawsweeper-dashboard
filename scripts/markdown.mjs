export function tableCell(value) {
  return String(value ?? "").replaceAll("|", "\\|").replace(/\s+/g, " ").trim();
}

export function link(label, url) {
  return `[${tableCell(label)}](${url})`;
}

export function githubPath(path) {
  return String(path)
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export function formatTimestamp(value) {
  if (!value) return "unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(date);
}

export function percent(value, total) {
  return total > 0 ? `${((value / total) * 100).toFixed(1)}%` : "N/A";
}

export function truncate(value, max = 110) {
  const text = tableCell(value);
  if (text.length <= max) return text;
  if (max < 4) return text.slice(0, max);
  return `${text.slice(0, max - 3).trimEnd()}...`;
}

export function rowsOrNone(rows, columns) {
  return rows.length ? rows.join("\n") : `| _None_ |${"  |".repeat(columns - 1)}`;
}
