# Brand assets

Colours: yellow `#ffcf1f`, graphite `#14161c`, white `#ffffff`, red `#e0301e`.

The side-eye robot with no mouth is the logo. The shoggoth wears that robot as a mask. It appears only on big canvases, always on yellow, and only in these brand-palette files. Don't use the original pack's shoggoth PNGs or animation files: their yellow and red are off-brand and their edges are fringed.

Pages use built copies under `src/` (`build.mjs` copies `src/` to `dist/`). Edit here first, then copy.

## Robot (logo)

| File | What it is | Used in |
| --- | --- | --- |
| `robot-face.svg` | Vector robot, transparent background | Source for the others |
| `robot-face-yellow.svg` | Vector robot on a yellow square | Source for the touch icon |
| `robot-favicon-D.svg` | Style D: robot with a thin yellow outline, transparent | Header logo (`src/assets/logo.svg`) |
| `robot-favicon-16.svg` | Simplified glyph for tab size: bolder eyes, fewer strokes | Tab icon (`src/favicon.svg`) |
| `robot-mono.svg` | One colour, uses `currentColor` | Not used on a page yet. Use it wherever a single colour is needed |
| `favicon-16.png` | Simplified glyph at 16 px | `src/favicon-16.png`, 16 px entry in the .ico |
| `favicon-32.png`, `favicon-48.png` | Style D at 32 and 48 px | `src/` |
| `favicon.ico` | 16 (simplified), 32 and 48 px | `src/favicon.ico` |
| `apple-touch-icon.png` | 180 px, opaque yellow square with the robot | `src/apple-touch-icon.png` |

## Shoggoth (brand palette, transparent background, 1024 px)

| File | What it is | Used in |
| --- | --- | --- |
| `shoggoth-primary-brand-1024.png` | One eye. The resting image | Hero still, link preview, 404 page, card templates |
| `shoggoth-blink-brand-1024.png` | Eye closed to a slit | Hero eye reveal |
| `shoggoth-reveal-2-brand-1024.png` | Two eyes | Hero eye reveal |
| `shoggoth-reveal-3-brand-1024.png` | Three eyes | Hero eye reveal |

Made by recolouring the pack's transparent PNGs: each pixel snaps to the nearest brand colour (CIELAB), the old yellow fringe becomes transparent, and the edges are smoothed at 4x and shrunk back for clean anti-aliasing. The drawing itself is unchanged. These are raster, not a vector master.

## Built copies

- `src/assets/hero-{one,blink,two,three}.png`: the four shoggoth frames above, composited on yellow at 400 px and reduced to 32 colours. The home hero stacks them and `site.css` fades them in once on load (about 2.6 s), then rests on the one-eye still. Reduced motion shows the still only.
- `src/assets/og.png`: 1200 x 630 link preview. Shoggoth on yellow with the site name and the tagline, set in Bricolage Grotesque and Figtree. Made from `brand/og.html` with headless Chrome: edit the HTML, then run `node brand/og.mjs` from the repo root (set `CHROME` if Chrome is not in the usual Windows place). Check it still reads at 600 x 315.
- `cards/assets/`: `avatar.png` and `banner.png` for the social profile, and `shoggoth-yellow-1024.png` (the tile for the wallpaper banner).
