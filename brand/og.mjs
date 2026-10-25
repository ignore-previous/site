// Renders the 1200 x 630 link preview from brand/og.html with headless Chrome. No dependencies.
//   node brand/og.mjs [out.png]    (default: src/assets/og.png)
// Set CHROME to the browser's path if it is not in the usual Windows place.
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { screenshot } from "../cards/render.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] ?? resolve(here, "..", "src", "assets", "og.png");
const { w, h } = screenshot(resolve(here, "og.html"), out, 1200, 630);
console.log(`Wrote ${out} (${w}x${h})`);
