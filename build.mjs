// Copies src/ to dist/. Adds the Cloudflare Web Analytics beacon only when CF_BEACON_TOKEN is set.
// The beacon counts page views. SPA mode is off, so it never sees anything a page does after load.
// Fills each home tool card's version and date from data/tool-facts.json (see scripts/update-tool-facts.mjs).
// Also writes a Markdown copy of each page next to it (index.html -> index.html.md), linked from llms.txt.
import { cpSync, rmSync, readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { htmlToMarkdown } from "./scripts/markdown.mjs";

const SRC = "src", OUT = "dist", ORIGIN = "https://ignoreprevious.dev";
const token = (process.env.CF_BEACON_TOKEN || "").trim();
if (token && !/^[a-f0-9]{32}$/i.test(token)) throw new Error("CF_BEACON_TOKEN should be 32 hex characters.");

rmSync(OUT, { recursive: true, force: true });
cpSync(SRC, OUT, { recursive: true });

const beacon = token
  ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${token}", "spa": false}'></script>`
  : "";

// Tool card receipts: <!-- TOOL_FACTS name --> becomes a line of version and date, or nothing when the data file has none.
// A missing field is left out; an entry that is present but malformed stops the build.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const facts = existsSync("data/tool-facts.json") ? JSON.parse(readFileSync("data/tool-facts.json", "utf8")) : {};
const day = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso); if (!m || !MONTHS[+m[2] - 1]) throw new Error(`data/tool-facts.json: bad date ${iso}`); return `<time datetime="${iso}">${+m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}</time>`; };
const RECEIPTS = {
  whatsallowed: { changelog: "https://github.com/ignore-previous/whatsallowed/blob/main/CHANGELOG.md", date: "tested", label: "accuracy last run" },
  unclank: { changelog: "https://github.com/ignore-previous/unclank/blob/main/CHANGELOG.md", date: "reviewed", label: "skills last reviewed" },
};
function receipt(name) {
  const f = facts[name], r = RECEIPTS[name];
  if (!r) throw new Error(`<!-- TOOL_FACTS ${name} --> has no entry in build.mjs.`);
  if (!f?.version) return "";
  if (!/^\d+\.\d+\.\d+$/.test(f.version)) throw new Error(`data/tool-facts.json: bad version ${f.version}`);
  const parts = [`<a href="${r.changelog}">Version ${f.version}</a>`];
  if (f[r.date]) parts.push(`${r.label} ${day(f[r.date])}`);
  return `<p class="receipt fine">${parts.join(' <span class="dot">&middot;</span> ')}</p>`;
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) {
      const html = readFileSync(p, "utf8");
      if (!html.includes("<!-- CF_BEACON -->")) throw new Error(`${p} has no <!-- CF_BEACON --> marker.`);
      // The footer only says we count visits when the beacon is there to count them.
      const analytics = /<!-- ANALYTICS -->([\s\S]*?)<!-- \/ANALYTICS -->/g;
      const noAnalytics = /<!-- NO_ANALYTICS -->([\s\S]*?)<!-- \/NO_ANALYTICS -->/g;
      const out = html.replace("<!-- CF_BEACON -->", beacon).replace(analytics, token ? "$1" : "").replace(noAnalytics, token ? "" : "$1")
        .replace(/<!-- TOOL_FACTS (\w+) -->/g, (_, name) => receipt(name));
      writeFileSync(p, out);
      if (name !== "404.html") {
        const path = "/" + relative(OUT, p).split(sep).join("/").replace(/index\.html$/, "");
        writeFileSync(p + ".md", htmlToMarkdown(out, ORIGIN + path));
      }
    }
  }
}
walk(OUT);
console.log(`Built ${OUT}/ ${token ? "with" : "without"} the analytics beacon.`);
