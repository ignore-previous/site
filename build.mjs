// Copies src/ to dist/. Adds the Cloudflare Web Analytics beacon only when CF_BEACON_TOKEN is set.
// The beacon counts page views. SPA mode is off, so it never sees anything a page does after load.
// Replaces {{NPX_WHATSALLOWED}} and {{WHATSALLOWED_VERSION}} from scripts/whatsallowed-version.mjs.
// Also writes a Markdown copy of each page next to it (index.html -> index.html.md), linked from llms.txt.
import { cpSync, rmSync, readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { htmlToMarkdown } from "./scripts/markdown.mjs";
import { pinWhatsAllowed, NPX_WHATSALLOWED_TOKEN, WHATSALLOWED_VERSION_TOKEN } from "./scripts/whatsallowed-version.mjs";

const SRC = "src", OUT = "dist", ORIGIN = "https://ignoreprevious.dev";
const token = (process.env.CF_BEACON_TOKEN || "").trim();
if (token && !/^[a-f0-9]{32}$/i.test(token)) throw new Error("CF_BEACON_TOKEN should be 32 hex characters.");

rmSync(OUT, { recursive: true, force: true });
cpSync(SRC, OUT, { recursive: true });

// Fill in the What's Allowed release before pages are turned into Markdown, so both copies match.
function pinTree(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { pinTree(p); continue; }
    if (!/\.(html|txt|md|css|js|svg|xml)$/.test(p)) continue;
    const text = readFileSync(p, "utf8");
    if (text.includes(NPX_WHATSALLOWED_TOKEN) || text.includes(WHATSALLOWED_VERSION_TOKEN)) writeFileSync(p, pinWhatsAllowed(text));
  }
}
pinTree(OUT);

const beacon = token
  ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${token}", "spa": false}'></script>`
  : "";

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) {
      const html = readFileSync(p, "utf8");
      if (!html.includes("<!-- CF_BEACON -->")) throw new Error(`${p} has no <!-- CF_BEACON --> marker.`);
      // The footer only says we count visits when the beacon is there to count them.
      const analytics = /<!-- ANALYTICS -->([\s\S]*?)<!-- \/ANALYTICS -->/g;
      const out = html.replace("<!-- CF_BEACON -->", beacon).replace(analytics, token ? "$1" : "");
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
