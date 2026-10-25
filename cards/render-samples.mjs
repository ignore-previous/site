// Renders every sample in cards/samples/ (cards in light and dark, banners plus keep-out guides) and the avatar previews.
//   node cards/render-samples.mjs OUTDIR
// Chrome runs one screenshot at a time.
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { renderCard } from "./render.mjs";
import { makePreviews } from "./previews.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const out = process.argv[2];
if (!out) { console.error("Usage: node cards/render-samples.mjs OUTDIR"); process.exit(2); }

const notes = {};
for (const f of readdirSync(join(here, "samples")).filter((n) => n.endsWith(".json")).sort()) {
  const name = f.slice(0, -5);
  const data = JSON.parse(readFileSync(join(here, "samples", f), "utf8"));
  if (name.startsWith("banner-")) {
    renderCard(data, join(out, `${name}.png`));
    renderCard(data, join(out, `${name}-guides.png`), { guides: true });
    notes[name.slice(7)] = data.note;
  } else {
    for (const theme of ["light", "dark"]) renderCard(data, join(out, `${name}-${theme}.png`), { theme });
  }
  console.log("Rendered", name);
}
makePreviews(out, notes);
console.log("Wrote previews to", out);
