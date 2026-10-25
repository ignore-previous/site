# Cards

Makes the image cards for posts (1200x675) and X banner drafts (1500x500) from a JSON file and an HTML template, using headless Chrome. No npm dependencies. This folder is not part of the site: `build.mjs` copies only `src/`, so nothing here reaches `dist/`.

## Make a card

```
node cards/render.mjs cards/samples/terminal.json out.png
```

Options: `--theme light|dark` overrides the JSON's `theme`. `--guides` draws the avatar keep-out areas on a banner. Chrome is found in the usual Windows place; set `CHROME` to its path otherwise.

To render every sample (both themes, banners with and without guides) and the avatar previews into one folder:

```
node cards/render-samples.mjs some-folder
```

That folder then holds `previews.html`, which lays the three banner ideas side by side. Keep it outside the repo, or under `cards/out/`, which git ignores.

Fonts come from `src/assets/fonts`, and the colours are the site's (`cards/tokens.mjs`). The files in `cards/assets/` (avatar, banner, shoggoth on yellow) are copies from `brand/`.

## Cards

All three take `"theme": "light"` (dark ink on light) or `"dark"` (light on ink), and `"template"` set to the template's name. Every field is required. Text is escaped, so it is shown as written.

| Template | Fields |
|---|---|
| `terminal` | `headline`, `url`, `command`, `lines` (array of strings; leading spaces become indent; `""` is a blank line), `highlight` (array of line numbers to show in yellow, counting from 0) |
| `tell` | `kicker` (top right), `tell` (heading), `before`, `after`, `source` (bottom left), `url` |
| `release` | `kicker`, `product`, `version`, `line` (one sentence), `url` |

Terminal lines must be real output. The renderer warns when a line is not found word for word in `scripts/whatsallowed-demo.txt`.

## Banner drafts

The owner has not chosen what the banner should show, so there are three different ideas. Each has a template and a sample JSON with a `note` describing the idea. All use the bio line "Make the most of AI without getting burned. Hands-on tools, guides and games."

| Template | Idea | Fields |
|---|---|---|
| `banner-wordmark` | The bio line, large, on yellow, with the mark at the top right. | `headline`, `subline` |
| `banner-terminal` | Dark banner. A strip of real whatsallowed output, then the bio line. | `command`, `finding`, `where` (real lines, checked like the terminal card), `headline`, `subline` |
| `banner-pattern` | Mostly texture: the mark tiled like wallpaper on yellow, with only the site address as text. | `url`, `tile` (px), `offsetx`, `offsety` |

All three keep the important content out of the avatar areas below.

### Where X puts the profile picture

These are approximations, not X's published numbers. Check them against a real profile before the final banner goes up. The avatar circle sits over the banner's bottom-left corner, with its centre on the banner's bottom edge:

| View | Avatar diameter | Left edge | Covers about |
|---|---|---|---|
| Desktop | 25% of banner width | 3% from the left | x 3 to 28%, y 63 to 100% |
| Phone | 20% of banner width | 4% from the left | x 4 to 24%, y 70 to 100% |

X also crops the top and bottom a little, so keep text out of the top and bottom 10% (y under 50 px and over 450 px on a 1500x500 banner).

`node cards/render.mjs cards/samples/banner-wordmark.json out.png --guides` shows these areas: red for desktop, dashed blue for phone, grey bands for the crop margins. `render-samples.mjs` also makes the previews: each banner with a circle of the avatar where it would sit, with a 4 px ring in the page colour, on X's dark background (desktop view, 600 px wide) and its light one (phone view, 390 px wide).

## Contrast

`node cards/contrast.mjs` prints this table from the same colour tokens the templates use. Body text needs 4.5:1, large text (24 px and up, or bold 19 px and up) needs 3:1.

| Template | Text | Colours | Ratio | Size, needs | Result |
|---|---|---|---|---|---|
| terminal | Headline on card | #14161c on #f1f3f7; #f1f2f5 on #14161c | light 16.28:1; dark 16.15:1 | large, 3:1 | pass |
| terminal | Brand name and URL on card | #4f5563 on #f1f3f7; #a9afbd on #14161c | light 6.72:1; dark 8.23:1 | body, 4.5:1 | pass |
| terminal | Terminal output | #f1f2f5 on #14161c; #f1f2f5 on #0b0c10 | light 16.15:1; dark 17.46:1 | body, 4.5:1 | pass |
| terminal | Terminal prompt and dimmed lines | #a9afbd on #14161c; #a9afbd on #0b0c10 | light 8.23:1; dark 8.89:1 | body, 4.5:1 | pass |
| terminal | Highlighted finding in terminal | #ffcf1f on #14161c; #ffcf1f on #0b0c10 | light 12.23:1; dark 13.22:1 | body, 4.5:1 | pass |
| tell | Brand name and URL on card | #4f5563 on #f1f3f7; #a9afbd on #14161c | light 6.72:1; dark 8.23:1 | body, 4.5:1 | pass |
| tell | Heading on card | #14161c on #f1f3f7; #f1f2f5 on #14161c | light 16.28:1; dark 16.15:1 | large, 3:1 | pass |
| tell | Before text | #14161c on #ffffff; #f1f2f5 on #1d2028 | light 18.08:1; dark 14.55:1 | large, 3:1 | pass |
| tell | After text | #14161c on #ffcf1f; #14161c on #ffcf1f | light 12.23:1; dark 12.23:1 | large, 3:1 | pass |
| tell | Before label | #f1f3f7 on #14161c; #14161c on #f1f2f5 | light 16.28:1; dark 16.15:1 | body, 4.5:1 | pass |
| tell | After label | #ffcf1f on #14161c; #ffcf1f on #14161c | light 12.23:1; dark 12.23:1 | body, 4.5:1 | pass |
| release | Brand name, URL and kicker on card | #4f5563 on #f1f3f7; #a9afbd on #14161c | light 6.72:1; dark 8.23:1 | body, 4.5:1 | pass |
| release | Product name and one-line summary | #14161c on #f1f3f7; #f1f2f5 on #14161c | light 16.28:1; dark 16.15:1 | large, 3:1 | pass |
| release | Version chip | #14161c on #ffcf1f; #14161c on #ffcf1f | light 12.23:1; dark 12.23:1 | large, 3:1 | pass |
| banner-wordmark | Headline and second line on yellow | #14161c on #ffcf1f | 12.23:1 | large, 3:1 | pass |
| banner-terminal | Bio line on ink | #f1f2f5 on #14161c | 16.15:1 | large, 3:1 | pass |
| banner-terminal | Second line on ink | #a9afbd on #14161c | 8.23:1 | large, 3:1 | pass |
| banner-terminal | Terminal text | #f1f2f5 on #0b0c10 | 17.46:1 | body, 4.5:1 | pass |
| banner-terminal | Highlighted finding | #ffcf1f on #0b0c10 | 13.22:1 | body, 4.5:1 | pass |
| banner-pattern | URL chip (yellow on ink) | #ffcf1f on #14161c | 12.23:1 | large, 3:1 | pass |
