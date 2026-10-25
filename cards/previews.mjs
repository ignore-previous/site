// Makes the avatar-overlay previews for the banner drafts, plus a previews.html page to compare them.
//   node cards/previews.mjs OUTDIR
// Expects banner-<idea>.png (from render.mjs) in OUTDIR for each banner sample, and writes
// preview-<idea>-desktop.png, preview-<idea>-phone.png and previews.html next to them.
// Desktop is shown on X's dark background (#000) at 600 px wide, phone on the light one (#fff) at 390 px wide,
// both at 2x. The avatar sizes are approximations: see cards/README.md.
import { readFileSync, readdirSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { screenshot } from "./render.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const avatar = pathToFileURL(join(here, "assets", "avatar.png")).href;

// width: page width in CSS px; d and left are fractions of that width. The avatar's centre sits on the banner's bottom edge.
const modes = {
  desktop: { width: 600, d: 0.25, left: 0.03, bg: "#000", fg: "#e7e9ea", mute: "#71767b" },
  phone: { width: 390, d: 0.2, left: 0.04, bg: "#fff", fg: "#0f1419", mute: "#536471" },
};

function previewHtml(bannerPng, m) {
  const h = m.width / 3, d = m.width * m.d, left = m.width * m.left;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
body { margin: 0; width: ${m.width}px; background: ${m.bg}; color: ${m.fg}; font: 15px/1.35 system-ui, "Segoe UI", sans-serif; overflow: hidden; }
.ban { display: block; width: ${m.width}px; height: ${h}px; }
.av { position: absolute; left: ${left}px; top: ${h - d / 2}px; width: ${d}px; height: ${d}px; border-radius: 50%; border: 4px solid ${m.bg}; background: ${m.bg}; display: block; }
.info { padding: ${d / 2 + 10}px ${left}px 0; }
.name { font-weight: 700; font-size: 20px; } .handle { color: ${m.mute}; } .bio { margin-top: 8px; }
</style></head><body><img class="ban" src="${pathToFileURL(bannerPng).href}"><img class="av" src="${avatar}">
<div class="info"><div class="name">Ignore Previous</div><div class="handle">@ignoreprevlabs</div><div class="bio">Make the most of AI without getting burned. Hands-on tools, guides and games.</div><div class="handle" style="margin-top:6px">ignoreprevious.dev</div></div></body></html>`;
}

export function makePreviews(outDir, notes = {}) {
  const dir = resolve(outDir);
  const ideas = readdirSync(dir).filter((f) => /^banner-[a-z]+\.png$/.test(f)).map((f) => f.slice(7, -4));
  const tmp = mkdtempSync(join(tmpdir(), "cards-prev-"));
  try {
    for (const idea of ideas) {
      for (const [mode, m] of Object.entries(modes)) {
        const page = join(tmp, `${idea}-${mode}.html`);
        writeFileSync(page, previewHtml(join(dir, `banner-${idea}.png`), m));
        const height = Math.ceil(m.width / 3 + m.width * m.d / 2 + 10 + 150);
        screenshot(page, join(dir, `preview-${idea}-${mode}.png`), m.width, height, 2);
      }
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
  const sections = ideas.map((idea) => `<section><h2>${idea}</h2><p>${(notes[idea] ?? "").replace(/</g, "&lt;")}</p>
<div class="row"><figure><img src="preview-${idea}-desktop.png" width="600" alt="Desktop preview of the ${idea} banner"><figcaption>Desktop, dark mode</figcaption></figure>
<figure><img src="preview-${idea}-phone.png" width="390" alt="Phone preview of the ${idea} banner"><figcaption>Phone, light mode</figcaption></figure></div>
<p><a href="banner-${idea}.png">Full banner (1500x500)</a> · <a href="banner-${idea}-guides.png">with keep-out guides</a></p></section>`).join("\n");
  writeFileSync(join(dir, "previews.html"), `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Banner previews</title><style>
body { margin: 0; padding: 24px 16px 48px; background: #e5e7eb; color: #14161c; font: 16px/1.45 system-ui, "Segoe UI", sans-serif; }
h1 { margin: 0 0 4px; } h2 { margin: 32px 0 4px; text-transform: capitalize; } p { margin: 4px 0 12px; max-width: 60rem; }
.row { display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start; } figure { margin: 0; } figcaption { font-size: 14px; color: #4f5563; margin-top: 4px; } img { max-width: 100%; height: auto; }
</style></head><body><h1>Banner previews</h1><p>The circle is where X puts the profile picture. Its size and position are approximations.</p>
${sections}
</body></html>`);
  return ideas;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = process.argv[2];
  if (!out) { console.error("Usage: node cards/previews.mjs OUTDIR"); process.exit(2); }
  const notes = {};
  for (const f of readdirSync(join(here, "samples")).filter((n) => n.startsWith("banner-"))) {
    notes[f.slice(7, -5)] = JSON.parse(readFileSync(join(here, "samples", f), "utf8")).note;
  }
  console.log("Previews for:", makePreviews(out, notes).join(", "));
}
