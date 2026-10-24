// Site checks. Run with `npm run check` (builds first). No dependencies.
// 1. The brand phrase never appears in full (built from parts so this file doesn't contain it).
// 2. The only external script is the Cloudflare Web Analytics beacon, added at build time with SPA mode off.
// 3. No custom analytics events, no network calls and no browser storage in page scripts.
// 4. No external stylesheets or fonts. Internal links resolve. Voice: no "simply" or "just" in page text.
// 5. dist/_headers has the strict CSP (no inline script or style needed, beacon hosts allowed) and the other security headers.
//    Pages therefore carry no inline <script>, <style>, style="" or on*="" handlers.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { execFileSync } from "node:child_process";

const failures = [];
const fail = (file, msg) => failures.push(`${file}: ${msg}`);
const files = (dir) => readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? files(p) : [p]; });
const TEXT = new Set([".html", ".css", ".js", ".mjs", ".svg", ".txt", ".md", ".json", ".xml"]);

// 1. Brand phrase
const words = ["ignore", "previous", "instruc" + "tions"];
const phrase = new RegExp(words.join("[^a-z0-9]{0,3}"), "i");
const scanned = [...files("src"), ...files("dist"), ...files("scripts"), "build.mjs", ...(existsSync("README.md") ? ["README.md"] : [])];
for (const f of scanned) {
  if (!TEXT.has(extname(f))) continue;
  const s = readFileSync(f, "utf8");
  // Check the raw text and the text with tags removed, so markup between the words doesn't hide it.
  if (phrase.test(s) || phrase.test(s.replace(/<[^>]+>/g, " "))) fail(f, "contains the full brand phrase");
}

function checkSite(label, { beacon }) {
  const html = files("dist").filter((f) => f.endsWith(".html"));
  const js = files("dist").filter((f) => f.endsWith(".js"));
  const css = files("dist").filter((f) => f.endsWith(".css"));
  for (const f of html) {
    const s = readFileSync(f, "utf8");
    if (!/<html lang="en-AU">/.test(s)) fail(f, `${label}: missing lang="en-AU"`);
    if (!/<meta name="viewport"/.test(s)) fail(f, `${label}: missing viewport meta`);
    // 2. Scripts
    const srcs = [...s.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)];
    const external = srcs.filter((m) => /^(https?:)?\/\//i.test(m[1]));
    for (const m of external) if (m[1] !== "https://static.cloudflareinsights.com/beacon.min.js") fail(f, `${label}: external script ${m[1]}`);
    if (beacon) {
      if (external.length !== 1) fail(f, `${label}: expected exactly one beacon script, found ${external.length}`);
      else if (!/"spa":\s*false/.test(external[0][0])) fail(f, `${label}: beacon must set "spa": false`);
    } else if (external.length) fail(f, `${label}: beacon present without a token`);
    // 4. Stylesheets, fonts, iframes
    for (const m of s.matchAll(/<link\b[^>]*\bhref=["']((?:https?:)?\/\/[^"']+)["'][^>]*>/gi))
      if (/rel=["'](stylesheet|preload|preconnect|dns-prefetch)/i.test(m[0])) fail(f, `${label}: external resource ${m[1]}`);
    if (/<iframe\b/i.test(s)) fail(f, `${label}: iframe`);
    for (const m of s.matchAll(/<img\b[^>]*\bsrc=["']((?:https?:)?\/\/[^"']+)/gi)) fail(f, `${label}: external image ${m[1]}`);
    // 5. Nothing inline, so the CSP needs no 'unsafe-inline'
    if (/<style\b/i.test(s)) fail(f, `${label}: inline <style> block (CSP forbids it)`);
    if (/<[a-z][^>]*\sstyle\s*=/i.test(s)) fail(f, `${label}: style="" attribute (CSP forbids it)`);
    if (/<[a-z][^>]*\son[a-z]+\s*=/i.test(s)) fail(f, `${label}: inline event handler (CSP forbids it)`);
    if (/<script\b(?![^>]*\bsrc=)/i.test(s)) fail(f, `${label}: inline <script> (CSP forbids it)`);
    // 3. Inline scripts
    for (const m of s.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) scanScript(f, m[1], label);
    // Internal links resolve
    for (const m of s.matchAll(/\b(?:href|src)=["'](\/[^"'#?]*)/g)) {
      const p = join("dist", m[1]);
      const ok = existsSync(p) && (statSync(p).isFile() || existsSync(join(p, "index.html")));
      if (!ok) fail(f, `${label}: broken internal link ${m[1]}`);
    }
    // Voice: page text only
    const text = s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ");
    for (const w of text.match(/\b(simply|just)\b/gi) || []) fail(f, `${label}: voice rule, uses "${w}"`);
  }
  for (const f of js) scanScript(f, readFileSync(f, "utf8"), label);
  for (const f of css) {
    const s = readFileSync(f, "utf8");
    if (/@import\s+url\(\s*["']?(https?:)?\/\//i.test(s) || /url\(\s*["']?(https?:)?\/\//i.test(s)) fail(f, `${label}: external CSS resource`);
  }
}
function scanScript(f, code, label) {
  const banned = { "custom analytics event": /__cfBeacon|cfBeacon|zaraz|gtag|dataLayer|plausible|umami/, "network call": /\bfetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket|EventSource|import\s*\(/, "browser storage": /localStorage|sessionStorage|document\.cookie|indexedDB/, "URL change": /pushState|replaceState|location\.hash\s*=|location\.search\s*=/ };
  for (const [what, re] of Object.entries(banned)) if (re.test(code)) fail(f, `${label}: ${what}`);
}

// 5. Security headers
function checkHeaders() {
  const f = join("dist", "_headers");
  if (!existsSync(f)) return fail(f, "missing (build.mjs copies it from src/)");
  const h = readFileSync(f, "utf8");
  if (!/^\/\*\s*$/m.test(h)) fail(f, "no /* rule");
  const csp = (h.match(/^\s+Content-Security-Policy:\s*(.+)$/m) || [])[1];
  if (!csp) return fail(f, "no Content-Security-Policy");
  const dirs = Object.fromEntries(csp.split(";").map((d) => d.trim().split(/\s+/)).filter((d) => d[0]).map(([k, ...v]) => [k, v.join(" ")]));
  const want = { "default-src": "'none'", "script-src": "'self' https://static.cloudflareinsights.com", "style-src": "'self'", "font-src": "'self'", "img-src": "'self'", "connect-src": "https://cloudflareinsights.com", "base-uri": "'none'", "form-action": "'none'", "frame-ancestors": "'none'", "object-src": "'none'" };
  for (const [k, v] of Object.entries(want)) if (dirs[k] !== v) fail(f, `CSP ${k} should be ${v}, found ${dirs[k] ?? "nothing"}`);
  if (/unsafe-(inline|eval)/.test(csp)) fail(f, "CSP allows unsafe-inline or unsafe-eval");
  for (const k of ["X-Content-Type-Options: nosniff", "Referrer-Policy: strict-origin-when-cross-origin", "Cross-Origin-Opener-Policy: same-origin", "Strict-Transport-Security: max-age=31536000", "Permissions-Policy:"])
    if (!h.includes(k)) fail(f, `missing ${k}`);
  if (/preload/i.test(h.match(/Strict-Transport-Security:.*/)?.[0] || "")) fail(f, "HSTS preload is the owner's decision");
}

const build = (env) => execFileSync(process.execPath, ["build.mjs"], { env: { ...process.env, ...env }, stdio: "pipe" });
build({ CF_BEACON_TOKEN: "" });
checkHeaders();
checkSite("no token", { beacon: false });
build({ CF_BEACON_TOKEN: "0123456789abcdef0123456789abcdef" });
checkSite("with token", { beacon: true });
build({ CF_BEACON_TOKEN: "" });

if (failures.length) { console.error(`FAIL (${failures.length})\n` + failures.map((x) => "  " + x).join("\n")); process.exit(1); }
console.log(`OK: ${scanned.length} files scanned for the brand phrase; ${files("dist").filter((f) => f.endsWith(".html")).length} pages checked with and without the beacon.`);
