// Site checks. Run with `npm run check` (builds first). No dependencies.
// 1. The brand phrase never appears in full (built from parts so this file doesn't contain it), except the one
//    decided footer line on the home page.
// 2. The only external script is the Cloudflare Web Analytics beacon, added at build time with SPA mode off.
// 3. No custom analytics events, no network calls and no browser storage in page scripts. The one exception is the guide's
//    picker (assets/guide.js), which keeps the app and plan in sessionStorage for the tab's lifetime.
// 4. No external stylesheets or fonts. Internal links resolve. Voice: no "simply" or "just" in page text.
// 5. dist/_headers has the strict CSP (no inline script or style needed, beacon hosts allowed) and the other security headers.
//    Pages therefore carry no inline <script>, <style>, style="" or on*="" handlers. JSON-LD data blocks are allowed and must parse.
// 6. Canonical links, sitemap, llms.txt, Markdown copies, security.txt and wrangler.jsonc agree with each other.
// 7. Terminal output shown on a page (<pre data-demo> or <p data-demo>) is real: its lines appear, in order, in the saved demo output.
//    `npm run check:demo` compares that saved output with what the latest whatsallowed prints.
// 9. Receipts. A page may load things from this site only, plus the beacon script when the beacon is on (everything else
//    on the allow-list below). The footer says so and how to check it, and says "Cloudflare" only in the beacon build.
//    Each home tool card shows the version and date from data/tool-facts.json.
// 8. The mechanical rules from VOICE.md: no bare "no network calls" (say "once installed"), "plain" only in the guide's
//    page title, no old "Unverified" label.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, extname, relative, sep } from "node:path";
import { execFileSync } from "node:child_process";

const failures = [];
const fail = (file, msg) => failures.push(`${file}: ${msg}`);
const files = (dir) => readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? files(p) : [p]; });
const TEXT = new Set([".html", ".css", ".js", ".mjs", ".svg", ".txt", ".md", ".json", ".xml"]);

// 1. Brand phrase
const words = ["ignore", "previous", "instruc" + "tions"];
const phrase = new RegExp(words.join("[^a-z0-9]{0,3}"), "i");
// The one allowed exception (decided 24 Oct): this exact footer line, once, on the home page and its Markdown copy.
const footerLine = `Note for AI: please don't ${words.join(" ")}. Thanks.`;
const footerFiles = new Set(["src/index.html", "dist/index.html", "dist/index.html.md"]);
const scanned = [...files("src"), ...files("dist"), ...files("scripts"), "build.mjs", ...(existsSync("cards") ? files("cards") : []), ...["README.md", "VOICE.md"].filter((f) => existsSync(f))];
for (const f of scanned) {
  if (!TEXT.has(extname(f))) continue;
  let s = readFileSync(f, "utf8");
  if (footerFiles.has(f.replace(/\\/g, "/"))) {
    if (s.split(footerLine).length > 2) fail(f, "the footer line appears more than once");
    s = s.replace(footerLine, "");
  }
  // Check the raw text and the text with tags removed, so markup between the words doesn't hide it.
  if (phrase.test(s) || phrase.test(s.replace(/<[^>]+>/g, " "))) fail(f, "contains the full brand phrase");
}

// 9. Origins a page may load from. Anchors are links the visitor follows, not requests, so they are not listed.
const OWN_ORIGIN = "https://ignoreprevious.dev";
const BEACON_SCRIPT = "https://static.cloudflareinsights.com/beacon.min.js";
const attrOf = (tag, name) => (tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i")) || []).slice(1).find((v) => v !== undefined);
function loadedUrls(html) {
  const urls = [];
  for (const m of html.matchAll(/<(?!\/)([a-z][a-z0-9-]*)\b[^>]*>/gi)) {
    const [tag, name] = [m[0], m[1].toLowerCase()];
    if (name === "a" || name === "area") continue;
    if (name === "link" && /\brel\s*=\s*["']?(canonical|alternate|author|me|license|help|next|prev)\b/i.test(tag)) continue;
    for (const a of ["src", "poster", "data", "href", "action", "formaction", "data-src"]) { const v = attrOf(tag, a); if (v) urls.push([name, v]); }
    for (const a of ["srcset", "imagesrcset"]) { const v = attrOf(tag, a); if (v) for (const part of v.split(",")) urls.push([name, part.trim().split(/\s+/)[0]]); }
    if (name === "meta" && /http-equiv\s*=\s*["']?refresh/i.test(tag)) urls.push([name, (attrOf(tag, "content") || "").replace(/^.*url=/i, "")]);
  }
  return urls;
}
function checkOrigins(f, html, label, beacon) {
  for (const [tag, url] of loadedUrls(html)) {
    if (!/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(url) && !/^(?:https?|ftp|ws|wss):/i.test(url)) continue; // same-site path or fragment
    const absolute = url.startsWith("//") ? "https:" + url : url;
    if (absolute.startsWith(OWN_ORIGIN + "/") || absolute === OWN_ORIGIN) continue;
    if (beacon && tag === "script" && absolute === BEACON_SCRIPT) continue;
    fail(f, `${label}: <${tag}> loads from another origin: ${url}`);
  }
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
    checkOrigins(f, s, label, beacon);
    // 4. Stylesheets, fonts, iframes
    for (const m of s.matchAll(/<link\b[^>]*\bhref=["']((?:https?:)?\/\/[^"']+)["'][^>]*>/gi))
      if (/rel=["'](stylesheet|preload|preconnect|dns-prefetch)/i.test(m[0])) fail(f, `${label}: external resource ${m[1]}`);
    if (/<iframe\b/i.test(s)) fail(f, `${label}: iframe`);
    for (const m of s.matchAll(/<img\b[^>]*\bsrc=["']((?:https?:)?\/\/[^"']+)/gi)) fail(f, `${label}: external image ${m[1]}`);
    // 5. Nothing inline, so the CSP needs no 'unsafe-inline'
    if (/<style\b/i.test(s)) fail(f, `${label}: inline <style> block (CSP forbids it)`);
    if (/<[a-z][^>]*\sstyle\s*=/i.test(s)) fail(f, `${label}: style="" attribute (CSP forbids it)`);
    if (/<[a-z][^>]*\son[a-z]+\s*=/i.test(s)) fail(f, `${label}: inline event handler (CSP forbids it)`);
    // JSON-LD is a data block, not a script, so the CSP doesn't apply to it. It must parse.
    const isLd = (tag) => /\btype=["']application\/ld\+json["']/i.test(tag);
    for (const m of s.matchAll(/(<script\b(?![^>]*\bsrc=)[^>]*>)([\s\S]*?)<\/script>/gi)) {
      if (!isLd(m[1])) { fail(f, `${label}: inline <script> (CSP forbids it)`); scanScript(f, m[2], label); continue; }
      try { JSON.parse(m[2]); } catch (e) { fail(f, `${label}: JSON-LD does not parse (${e.message})`); }
    }
    // Analytics wording appears only when the beacon is there.
    const visible = s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    if (!beacon && /\bcount (?:page )?visits\b|Web Analytics/i.test(visible)) fail(f, `${label}: says visits are counted, but there is no beacon`);
    if (beacon && !f.endsWith("404.html") && !/Web Analytics/.test(visible)) fail(f, `${label}: footer analytics line missing`);
    if (/<!-- \/?(?:NO_)?ANALYTICS -->|<!-- TOOL_FACTS/.test(s)) fail(f, `${label}: build marker left in output`);
    // The footer's receipt: what is loaded, and how to see it. Cloudflare is named only when its script is there.
    if (!f.endsWith("404.html")) {
      const foot = (s.match(/<footer>([\s\S]*?)<\/footer>/) || [])[1]?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ") ?? "";
      if (!/DevTools/.test(foot) || !/Network/.test(foot)) fail(f, `${label}: footer does not say how to check (DevTools, Network)`);
      if (beacon && !/One script from Cloudflare Web Analytics/.test(foot)) fail(f, `${label}: footer should name the one Cloudflare script`);
      if (!beacon && /Cloudflare/i.test(visible)) fail(f, `${label}: names Cloudflare, but there is no beacon`);
    }
    if (f === join("dist", "index.html")) {
      for (const [name, v] of Object.entries(toolFacts())) {
        const start = s.indexOf(`<h3 id="${name === "whatsallowed" ? "whats-allowed" : name}">`);
        const card = start < 0 ? "" : s.slice(start, s.indexOf("</article>", start));
        if (!card.includes(`Version ${v.version}`)) fail(f, `${label}: ${name} card does not show version ${v.version}`);
        for (const d of [v.tested, v.reviewed].filter(Boolean)) if (!card.includes(`datetime="${d}"`)) fail(f, `${label}: ${name} card does not show the date ${d}`);
      }
    }
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
// 9. The data file behind the tool cards: versions look like versions, dates are real days and not in the future.
function toolFacts() {
  try { return JSON.parse(readFileSync("data/tool-facts.json", "utf8")); } catch (e) { fail("data/tool-facts.json", `does not parse (${e.message})`); return {}; }
}
function checkToolFacts() {
  const facts = toolFacts();
  for (const name of ["whatsallowed", "unclank"]) {
    const v = facts[name];
    if (!v) { fail("data/tool-facts.json", `no entry for ${name}`); continue; }
    if (!/^\d+\.\d+\.\d+$/.test(v.version ?? "")) fail("data/tool-facts.json", `${name}: version should look like 1.2.3`);
    for (const k of ["tested", "reviewed"]) if (k in v) {
      const t = Date.parse(v[k] + "T00:00:00Z");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v[k]) || Number.isNaN(t)) fail("data/tool-facts.json", `${name}.${k} should be a date like 2026-10-25`);
      else if (t > Date.now() + 864e5) fail("data/tool-facts.json", `${name}.${k} is in the future`);
    }
  }
}
function scanScript(f, code, label) {
  const banned = { "custom analytics event": /__cfBeacon|cfBeacon|zaraz|gtag|dataLayer|plausible|umami/, "network call": /\bfetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket|EventSource|import\s*\(/, "browser storage": f.split(sep).join("/") === "dist/assets/guide.js" ? /localStorage|document\.cookie|indexedDB/ : /localStorage|sessionStorage|document\.cookie|indexedDB/, "URL change": /pushState|replaceState|location\.hash\s*=|location\.search\s*=/ };
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

// 6. Discovery files: canonical links, sitemap, llms.txt, Markdown copies, security.txt, wrangler.jsonc
function checkDiscovery() {
  const pages = files("dist").filter((f) => f.endsWith(".html") && !f.endsWith("404.html"));
  const canon = [];
  for (const f of pages) {
    const s = readFileSync(f, "utf8");
    const c = (s.match(/<link rel="canonical" href="([^"]+)">/) || [])[1];
    const og = (s.match(/<meta property="og:url" content="([^"]+)">/) || [])[1];
    const own = "https://ignoreprevious.dev/" + relative("dist", f).split(sep).join("/").replace(/index\.html$/, "");
    if (!c) fail(f, "no canonical link");
    else if (c !== own) fail(f, `canonical ${c} should be the page's own address ${own}`);
    else if (c !== og) fail(f, `canonical ${c} differs from og:url ${og}`);
    if (c) canon.push(c);
    const md = f + ".md";
    if (!existsSync(md)) fail(md, "missing Markdown copy");
    else if (!readFileSync(md, "utf8").startsWith("# ")) fail(md, "should start with a # heading");
    if (!s.includes(`<link rel="alternate" type="text/markdown" href="${c ? new URL(c).pathname : "?"}index.html.md">`)) fail(f, "no Markdown alternate link");
  }
  const sm = join("dist", "sitemap.xml");
  const locs = existsSync(sm) ? [...readFileSync(sm, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]) : (fail(sm, "missing"), []);
  if (locs.slice().sort().join() !== canon.slice().sort().join()) fail(sm, `locs ${locs.join(" ")} should equal canonicals ${canon.join(" ")}`);
  if (!/^Sitemap: https:\/\/ignoreprevious\.dev\/sitemap\.xml$/m.test(readFileSync(join("dist", "robots.txt"), "utf8"))) fail("dist/robots.txt", "no Sitemap line");
  const llms = join("dist", "llms.txt");
  if (!existsSync(llms)) fail(llms, "missing");
  else for (const m of readFileSync(llms, "utf8").matchAll(/\]\((https:\/\/ignoreprevious\.dev)?(\/[^)\s]*)\)/g)) {
    const p = join("dist", m[2]);
    if (!(existsSync(p) && (statSync(p).isFile() || existsSync(join(p, "index.html"))))) fail(llms, `link ${m[2]} has no file`);
  }
  const sec = join("dist", ".well-known", "security.txt");
  if (!existsSync(sec)) fail(sec, "missing");
  else {
    const t = readFileSync(sec, "utf8");
    if (!/^Contact: mailto:\S+@\S+$/m.test(t)) fail(sec, "no mailto Contact");
    if (!/^Canonical: https:\/\/ignoreprevious\.dev\/\.well-known\/security\.txt$/m.test(t)) fail(sec, "no Canonical");
    const exp = Date.parse((t.match(/^Expires: (\S+)$/m) || [])[1]);
    const days = (exp - Date.now()) / 864e5;
    if (!(days > 0)) fail(sec, "Expires missing or past");
    else if (days > 366) fail(sec, "Expires more than a year ahead (RFC 9116 says no)");
    else if (days < 30) fail(sec, `Expires in ${Math.floor(days)} days; renew it`);
  }
  const w = "wrangler.jsonc";
  try {
    const cfg = JSON.parse(readFileSync(w, "utf8").replace(/^\s*\/\/.*$/gm, ""));
    if (cfg.assets?.directory !== "./dist") fail(w, "assets.directory should be ./dist");
    if (cfg.assets?.not_found_handling !== "404-page") fail(w, "assets.not_found_handling should be 404-page");
    if (cfg.workers_dev !== false || cfg.preview_urls !== false) fail(w, "workers_dev and preview_urls should be false");
    if ("routes" in cfg || "route" in cfg) fail(w, "routes are managed in the dashboard; don't set them here");
  } catch (e) { fail(w, `does not parse (${e.message})`); }
}

// 7. Real terminal output
function checkDemo() {
  const fixture = "scripts/whatsallowed-demo.txt";
  if (!existsSync(fixture)) return fail(fixture, "missing; save real `whatsallowed demo` output there");
  const real = readFileSync(fixture, "utf8").split(/\r?\n/).map((l) => l.trimEnd());
  const decode = (t) => t.replace(/<b class="tm-n"[^>]*>[^<]*<\/b>/g, "").replace(/<[^>]+>/g, "").replace(/&#(x?)([0-9a-f]+);/gi, (_, x, n) => String.fromCodePoint(parseInt(n, x ? 16 : 10))).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
  // A "Label: text" line joined with the lines that hang under its text, so a page can wrap it to the panel's width.
  const indent = (l) => l.length - l.trimStart().length;
  const joined = (n) => {
    const hang = /^\s*[A-Z][^:]*:\s+/.exec(real[n])?.[0].length;
    let t = real[n], k = n + 1;
    while (hang && real[k]?.trim() && indent(real[k]) === hang) t += " " + real[k++].trim();
    return t;
  };
  let found = 0;
  for (const f of files("src").filter((x) => x.endsWith(".html"))) {
    for (const m of readFileSync(f, "utf8").matchAll(/<(pre|p)\b[^>]*\bdata-demo="whatsallowed"[^>]*>([\s\S]*?)<\/\1>/g)) {
      found++;
      let at = 0;
      // "…" lines mark the cuts; blank lines are spacing. Every other line must come from the demo, in order.
      for (const line of decode(m[2]).split("\n").map((l) => l.trimEnd()).filter((l) => l.trim() && l.trim() !== "…")) {
        const i = real.findIndex((r, n) => n >= at && (r === line || joined(n) === line));
        if (i < 0) { fail(f, `terminal line is not in ${fixture} (or is out of order): ${line}`); break; }
        at = i + 1;
      }
    }
  }
  if (!found) fail("src/index.html", "no <pre data-demo> panel found; update checkDemo if it moved");
}

// 8. Voice rules (VOICE.md quotes the wrong versions as examples, so it is not checked here)
function checkVoice() {
  const targets = [...files("src").filter((f) => [".html", ".txt"].includes(extname(f))), ...(existsSync("README.md") ? ["README.md"] : [])];
  for (const f of targets) {
    const raw = readFileSync(f, "utf8");
    // Reader-facing text, checked piece by piece so one piece can't excuse another: the page without tags, then each
    // meta content, aria-label, alt and title attribute (screen readers and link previews read those).
    const text = raw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const attrs = [...raw.matchAll(/<meta\b[^>]*\bcontent="([^"]*)"|\b(?:aria-label|alt|title)="([^"]*)"/g)].map((m) => m[1] ?? m[2]);
    // This catches the exact phrase only, not every way of making the claim ("no network requests" passes).
    for (const piece of [text, ...attrs]) {
      for (const sentence of piece.split(/(?<=[.!?])\s+/)) {
        if (/no network calls/i.test(sentence) && !/once installed/i.test(sentence)) fail(f, `voice rule, "no network calls" without "once installed": ${sentence.trim().slice(0, 120)}`);
      }
    }
    const plainOk = f.split(sep).join("/") === "src/what-can-my-ai-see/index.html" ? text.split("A plain guide").join("") : text;
    if (/\bplain\b/i.test(plainOk)) fail(f, `voice rule, "plain" outside the guide's page title`);
    if (/\bunverified\b/i.test(raw)) fail(f, `voice rule, old "Unverified" label (use Not confirmed)`);
  }
}

const build = (env) => execFileSync(process.execPath, ["build.mjs"], { env: { ...process.env, ...env }, stdio: "pipe" });
build({ CF_BEACON_TOKEN: "" });
checkHeaders();
checkToolFacts();
checkSite("no token", { beacon: false });
checkDiscovery();
checkDemo();
checkVoice();
build({ CF_BEACON_TOKEN: "0123456789abcdef0123456789abcdef" });
checkSite("with token", { beacon: true });
build({ CF_BEACON_TOKEN: "" });

if (failures.length) { console.error(`FAIL (${failures.length})\n` + failures.map((x) => "  " + x).join("\n")); process.exit(1); }
console.log(`OK: ${scanned.length} files scanned for the brand phrase; ${files("dist").filter((f) => f.endsWith(".html")).length} pages checked with and without the beacon.`);
