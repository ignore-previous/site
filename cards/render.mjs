// Renders a card from a JSON file to PNG with headless Chrome. No dependencies.
//   node cards/render.mjs cards/samples/terminal.json out.png [--theme light|dark] [--guides]
// The JSON names its template ("template": "terminal"); templates live in cards/templates/.
// Set CHROME to the browser's path if it is not in the usual Windows place.
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync, rmSync, existsSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tokensCss } from "./tokens.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const fontsDir = resolve(here, "..", "src", "assets", "fonts");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function chromePath() {
  const candidates = [process.env.CHROME, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error("Chrome not found. Set the CHROME environment variable to its path.");
  return found;
}

// Screenshot an HTML file at width x height (CSS pixels) and check the PNG came out the right size.
export function screenshot(htmlPath, outPng, width, height, scale = 1) {
  mkdirSync(dirname(resolve(outPng)), { recursive: true });
  const profile = mkdtempSync(join(tmpdir(), "cards-chrome-"));
  try {
    const r = spawnSync(chromePath(), [
      "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check",
      `--user-data-dir=${profile}`, `--force-device-scale-factor=${scale}`, "--virtual-time-budget=3000",
      `--window-size=${width},${height}`, `--screenshot=${resolve(outPng)}`, pathToFileURL(htmlPath).href,
    ], { stdio: "pipe", timeout: 60000 });
    if (r.error) throw r.error;
  } finally {
    rmSync(profile, { recursive: true, force: true });
  }
  if (!existsSync(outPng)) throw new Error("Chrome did not write " + outPng);
  const b = readFileSync(outPng);
  const w = b.readUInt32BE(16), h = b.readUInt32BE(20);
  if (w !== width * scale || h !== height * scale) console.warn(`Warning: ${outPng} is ${w}x${h}, expected ${width * scale}x${height * scale}`);
  return { w, h };
}

// Fill {{name}} (escaped) and {{{name}}} (raw HTML built here) in a template.
function fill(html, vars) {
  return html
    .replace(/\{\{\{(\w+)\}\}\}/g, (_, k) => { if (!(k in vars)) throw new Error(`Template needs "${k}"`); return vars[k]; })
    .replace(/\{\{(\w+)\}\}/g, (_, k) => { if (!(k in vars) || vars[k] === undefined) throw new Error(`The JSON needs a "${k}" field`); return esc(vars[k]); });
}

// Per-template preparation: turns JSON values into HTML pieces.
const prep = {
  terminal(d) {
    // Terminal lines are shown as given. Leading spaces become a hanging indent so wrapped lines line up.
    const demo = resolve(here, "..", "scripts", "whatsallowed-demo.txt");
    const demoLines = existsSync(demo) ? readFileSync(demo, "utf8").split(/\r?\n/) : null;
    const hot = new Set(d.highlight ?? []);
    const rows = d.lines.map((line, i) => {
      if (demoLines && line.trim() && !demoLines.includes(line)) console.warn(`Warning: line ${i} is not verbatim from scripts/whatsallowed-demo.txt: ${line}`);
      const indent = line.length - line.trimStart().length;
      return `<div class="row${hot.has(i) ? " hot" : ""}" style="padding-left:${indent}ch">${line.trim() ? esc(line.trim()) : "&nbsp;"}</div>`;
    });
    return { rows_html: rows.join("\n") };
  },
  "banner-terminal"(d) {
    const demo = resolve(here, "..", "scripts", "whatsallowed-demo.txt");
    if (existsSync(demo)) {
      const demoLines = readFileSync(demo, "utf8").split("\n").map((l) => l.trim());
      for (const k of ["finding", "where"]) if (!demoLines.includes(d[k].trim())) console.warn(`Warning: "${k}" is not verbatim from scripts/whatsallowed-demo.txt`);
    }
    return {};
  },
  tell: () => ({}),
  "banner-pattern"(d) {
    // Tiles the whole mark like wallpaper. The mark's yellow edge makes the seams disappear; odd rows are shifted half a tile.
    const t = Number(d.tile), imgs = [];
    for (let row = -1; row * t < 500 + t; row++) {
      const shift = (((row % 2) + 2) % 2) * (t / 2) - Number(d.offsetx ?? 0);
      for (let col = -1; col * t + shift < 1500; col++) {
        imgs.push(`<img src="${pathToFileURL(join(here, "assets", "shoggoth-yellow-1024.png")).href}" alt="" style="left:${col * t + shift}px;top:${row * t - Number(d.offsety ?? 0)}px;width:${t}px;height:${t}px">`);
      }
    }
    return { tiles_html: imgs.join("") };
  },
  release: () => ({}),
};

export function guidesHtml() {
  // Approximate X avatar keep-out areas on a 1500x500 banner, plus the ~10% top and bottom crop margins.
  return `<div style="position:absolute;inset:0;pointer-events:none;font:600 14px sans-serif;color:#fff">
<div style="position:absolute;left:3%;top:63%;width:25%;height:37%;background:rgba(224,48,30,.45);outline:2px solid #e0301e"><span style="padding:4px;display:block">desktop avatar</span></div>
<div style="position:absolute;left:4%;top:70%;width:20%;height:30%;background:rgba(30,90,224,.35);outline:2px dashed #1e5ae0"><span style="padding:4px;display:block;margin-top:28px">phone avatar</span></div>
<div style="position:absolute;left:0;right:0;top:0;height:10%;background:rgba(0,0,0,.25)"></div>
<div style="position:absolute;left:0;right:0;bottom:0;height:10%;background:rgba(0,0,0,.25)"></div></div>`;
}

export function renderCard(data, outPng, opts = {}) {
  const name = data.template;
  if (!name) throw new Error('The JSON needs a "template" field (terminal, tell, release, banner-wordmark, banner-terminal or banner-pattern).');
  const file = join(here, "templates", `${name}.html`);
  if (!existsSync(file)) throw new Error(`No template named "${name}" in cards/templates/.`);
  const d = { ...data, theme: opts.theme ?? data.theme ?? "light" };
  if (!["light", "dark"].includes(d.theme)) throw new Error('"theme" must be "light" or "dark".');
  let html = readFileSync(file, "utf8");
  const size = html.match(/<meta name="card-size" content="(\d+)x(\d+)">/);
  if (!size) throw new Error(`${name}.html has no card-size meta.`);
  const [w, h] = [Number(size[1]), Number(size[2])];
  const common = readFileSync(join(here, "templates", "common.css"), "utf8");
  const vars = {
    ...d,
    ...(prep[name] ? prep[name](d) : {}),
    fonts: pathToFileURL(fontsDir).href,
    assets: pathToFileURL(join(here, "assets")).href,
  };
  html = html.replace("<!--COMMON-->", `<style>\n${fill(common, vars)}\n${tokensCss()}\n</style>`);
  html = fill(html, vars);
  if (opts.guides) html = html.replace("</body>", guidesHtml() + "</body>");
  const dir = mkdtempSync(join(tmpdir(), "cards-html-"));
  try {
    const page = join(dir, "card.html");
    writeFileSync(page, html);
    return screenshot(page, outPng, w, h);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const flag = (n) => { const i = args.indexOf(n); if (i < 0) return undefined; return args.splice(i, 1)[0]; };
  const guides = Boolean(flag("--guides"));
  let theme;
  const ti = args.indexOf("--theme");
  if (ti >= 0) { theme = args[ti + 1]; args.splice(ti, 2); }
  const [input, out] = args;
  if (!input || !out) { console.error("Usage: node cards/render.mjs input.json out.png [--theme light|dark] [--guides]"); process.exit(2); }
  try {
    const { w, h } = renderCard(JSON.parse(readFileSync(input, "utf8")), out, { theme, guides });
    console.log(`Wrote ${out} (${w}x${h})`);
  } catch (e) { console.error(e.message); process.exit(1); }
}
