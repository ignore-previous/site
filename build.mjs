// Copies src/ to dist/. Adds the Cloudflare Web Analytics beacon only when CF_BEACON_TOKEN is set.
// The beacon counts page views. SPA mode is off, so it never sees anything a page does after load.
import { cpSync, rmSync, readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SRC = "src", OUT = "dist";
const token = (process.env.CF_BEACON_TOKEN || "").trim();
if (token && !/^[a-f0-9]{32}$/i.test(token)) throw new Error("CF_BEACON_TOKEN should be 32 hex characters.");

rmSync(OUT, { recursive: true, force: true });
cpSync(SRC, OUT, { recursive: true });

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
      writeFileSync(p, html.replace("<!-- CF_BEACON -->", beacon));
    }
  }
}
walk(OUT);
console.log(`Built ${OUT}/ ${token ? "with" : "without"} the analytics beacon.`);
