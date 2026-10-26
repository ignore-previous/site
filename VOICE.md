# Ignore Previous voice guide

How we write the site, the READMEs and the tools' help text. Each rule has an example to copy and one to avoid.
`npm run check` enforces the rules marked *checked*. The rest are for whoever writes or reviews the copy.

## The idea behind the brand

Agents keep getting more capable. Their work still comes out generic, looks finished, and breaks the first time a
real person uses it. Keeping you in the loop is what makes it fit. Our tools help you check what the AI is allowed to
do, and catch what it missed.

Our readers use AI on purpose, so we never talk about spotting AI, proving someone used it, or judging other
people's work. We say who the work is for.

- Do: "so the work fits the people who'll use it"
- Don't: "tells you whether AI wrote this"

## The word "alignment"

Use "alignment" at most once per page, never in the hero or a headline, and only below the hero. Explain it in
everyday words in the same sentence. It names the problem, never our achievement: no "alignment tool", "aligned AI"
or "makes AI safe".

- Do: "Researchers call this the alignment problem: getting AI to do what people actually meant."
- Don't: "Our alignment tool keeps your AI aligned with user needs."

## Who speaks

"We" speaks, on every page and in the header. There is no personal signature.

- Do: "We make tools that keep you in the loop with AI."
- Don't: "I built this because…", "ruddy recommends…"

We sound like a wry friend who's in on the memes, uses AI every day, has fought to get it to do what they actually
meant, and wants to keep control of it.

- Do: "It did what you said. Was it what you meant?"
- Don't: "Unlock the full power of AI", or "AI is coming for your job".

## Humour

Dry, and at most one wink per page. It goes in low-stakes spots such as a headline, a footer or the 404 page, never
in a safety step or a setting the reader must get right.

"Seems fine? Check properly." is the brand tagline and doesn't count as a wink. On the home
page the footer note ("Note for AI: ...") is the one wink.

- Do: one dry line in a low-stakes spot, such as the note for AI in the home footer.
- Don't: a joke inside "Turn off auto-approve before you run this".

The mascot has no name for now: copy calls it "the shoggoth". If it ever needs a name, for example where it speaks
in a post, use "Shog", not "Goth".

## Audiences and glosses

Say "AI", not "AI agents". Name Claude Code or Codex when you mean the tool.
Don't use "free" as a price or selling word ("free tool", "free forever"). Everyday idioms such as "feel free"
are fine, and so are plan names such as "Free or Go". Never describe our tools as "small".

The home page hero and What Can My AI See? are for people new to agents, so they explain jargon the first time it
appears, in a few words in brackets. The tool cards, Clank Safely and the READMEs speak to developers and skip the
basics. Clank Safely still explains sandbox, permission mode, approval policy, prompt injection, classifier and
annotation.

- Do (home hero): "They check what the AI is allowed to do, and catch what it missed."
- Don't (Clank Safely): explaining what a terminal or JSON is.

Use "plain" in one place only, the guide's page title. Elsewhere, write plainly and don't announce it. *Checked.*

- Do: "What Can My AI See? A plain guide"
- Don't: "A plain page about agent permissions"

## Evidence, sources and labels

Every fact links to where it came from. "Source" means a vendor page, such as OpenAI's or Anthropic's help. A link to
one of our own repos or pages says "Our docs". Use one source marker per paragraph or group of bullets, and one per
bullet only where the page changes.

When we can't confirm something, say so with a label: Not confirmed, Pages disagree, Our tip, Old name. The old
"Unverified" label is gone. *Checked.*

- Do: "Work isn't on Free or Go yet, so the toggle may be missing. [Source]"
- Don't: "Work is not available on free plans. [Source → our own README]"

Open each section with a one or two sentence answer, then the detail.

## We recommend

Advice is our recommendation. Strong, flat statements are for documented facts only.

- Do: "We recommend you only do this in an isolated place: a separate computer or a virtual machine, holding a copy of
  the project and none of your real passwords or personal files."
- Don't: "Never run this outside a container."

## Proof chips

Each tool card opens with one line about what you get, then a row of short proof chips: where it runs, what it
sends and what it won't do. Each chip is a positive fact that links to its proof: a test, the threat model,
ACCURACY.md. Keep a "never" chip only when it's an honesty promise. Any other "won't" detail goes in one "Won't:" line
under the install heading, above the routes, so every route shows it. Chips are outlined links, never yellow: yellow is for actions.

- Do: `Runs on your computer` · `Sends nothing once installed (tested)` · `Read-only scans` · `Never says "safe"`
- Don't: a "Won't:" sentence beside the chips, or badges with no proof behind them, such as "Local-first",
  "Privacy-friendly", "Secure".

## Network wording

Installing a package downloads it, so the network claim always starts from "once installed". Never write a bare "no
network calls". *Checked.*

- Do: "Once installed, it makes no network calls, and a test checks that on every build."
- Don't: "What's Allowed makes no network calls."

## Receipts

Claims about what a page loads or sends describe the present ("loads", "sends"), so a reader can test them. Don't write
"never". Each claim is true in both builds, with and without the analytics beacon, and `npm run check` tests both. The
footer says in one line what the page contacts and how to see it (DevTools, Network). In the beacon build it names the
one Cloudflare script and says only what Cloudflare's own documentation says about it, with a Source link. Don't add a
claim the documentation doesn't make, such as "no tracking" or "sends nothing", for a page that counts views. A tool
page that says where it runs and what it sends says so for the page itself, and leaves what the tool does to the tool's README.
If analytics or any network call is added or removed, change the receipt in the same PR: the footer on every page, the
Clank Safely line, the allow-list in `scripts/check.mjs`, and this section.

- Do: "One script from Cloudflare Web Analytics counts page views and collects page-load metrics. Pages contact only this site and Cloudflare."
- Don't: "No trackers." or "This site never sends anything."

## Names and terms

In prose and titles, write What's Allowed and Unclank. Use code font for the command or package: `whatsallowed`,
`unclank`. A finding has a "rule ID".

- Do: "Run `npx whatsallowed@0.2.2`. Each finding names the file, the line number and the rule ID."
- Don't: "Whatsallowed shows a code for the rule." Or "Run `npx whatsallowed`."

A command the site tells a visitor to run names the release. *Checked.* The release is `scripts/whatsallowed-version.mjs`. Pages and `llms.txt` write `{{NPX_WHATSALLOWED}}`, and the build inserts the command. A sentence that names the release on its own writes `{{WHATSALLOWED_VERSION}}`. The `0.2.2` above shows the shape. Pages take the number from that file.

The Unclank README's title is "# Unclank".

Leave out "simply" and "just" on the site. They tell the reader a step is easy, and it rarely feels that way to
them. *Checked.*

- Do: "Open the settings and turn off auto-approve."
- Don't: "Just turn off auto-approve."

Never use "check" twice in one sentence.

- Do: "It reads your settings files and flags risky ones."
- Don't: "Check your settings with a check that checks…"

## Unclank and Clank Safely

Use Unclank only as the product name. Keep skill names as they are.
Use Clank Safely only as the guide's name, with a plain subtitle the first time it stands alone.
Never use "clank" as a verb in instructions. Use "clanky", meaning work that looks finished but has
unchecked faults, at most once per document and only with a definition next to it. Current copy uses none.
Name faults in their own terms. The AI helps you review; you decide what to fix.

- Do: "Unclank: Checklists for launch pages, quizzes and store releases."
- Do: "Clank Safely: A setup guide for Claude Code and Codex permissions."
- Do: "The answer key is wrong", "Two options are correct", "There is no link preview".
- Don't: "Clank this page", "The quiz has clankiness".

## One antithesis per document

A "not X, but Y" pair, or "X rather than Y", lands once. A second one in the same document reads like a formula.
Rewrite the extra ones as plain statements.

- Do: "Using AI isn't the problem. Shipping its defaults is." (once, in the Unclank README)
- Don't: following it in the same README with "built to be careful rather than fast" and "a guide, not a lecture".

## Real output only

Terminal output on the site is real output from the tool, trimmed with "…". `npm run check` fails if a line shown on
a page isn't in `scripts/whatsallowed-demo.txt`, in order. *Checked.* When the tool's output changes, update that
file and the page together.

- Do: paste from the tool's demo output and cut lines.
- Don't: retype the output, or tidy a line so it reads better.

## The AI-help line

Each README ends "Built with Claude." If Codex did build work in that repo, name it too. The site footer doesn't
carry the line.

- Do: "Built with Claude." or, where Codex built part of it, "Built with Claude and Codex."
- Don't: "Made with AI", or a paragraph about which model wrote which file.

## The subline

"Tools and guides for people who use AI." It goes where the brand travels without the page: the link preview
(`src/assets/og.png`, under the name), the home page `<title>` and its `og:title`. The `<title>` is the brand and the subline only, so search results show it whole; `og:title` adds the tagline. The home hero leaves it out
because the lede already names AI. The tagline stays "Seems fine? Check properly."

- Do: `<title>` "Ignore Previous: Tools and guides for people who use AI"; `og:title` "Ignore Previous: Seems fine? Check properly. Tools and guides for people who use AI"
- Don't: "Tools for checking your AI" (it repeats "check" straight after the tagline).

## The brand name

The brand name is short for a well-known prompt-injection phrase. Never write the full phrase, with one exception:
the agent note in the home page footer. *Checked.* The check allows that exact line on the home page, once.

- Do: "Ignore Previous is a brand name, not an instruction."
- Don't: spelling out the phrase in a heading, a meta description or a README.
