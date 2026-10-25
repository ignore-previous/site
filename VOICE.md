# Ignore Previous voice guide

How we write the site, the READMEs and the tools' help text. Each rule has an example to copy and one to avoid.
`npm run check` enforces the rules marked *checked*. The rest are for whoever writes or reviews the copy.

## The idea behind the brand

Agents keep getting more capable. Their work still comes out generic, looks finished, and breaks the first time a
real person uses it. A person in the loop is what makes it fit. Our tools help that person check what an agent is
allowed to do and whether what it made holds up.

Our readers use AI on purpose, so we never talk about spotting AI, proving someone used it, or judging other
people's work. We also leave "alignment" out of public copy and say who the work is for.

- Do: "so the work fits the people who'll use it"
- Don't: "aligned with user needs", "tells you whether AI wrote this"

## Who speaks

"We" speaks. "by ruddy" is a signature, used in the header and nowhere in the prose.

- Do: "We make tools that keep a person in the loop with AI."
- Don't: "I built this because…", "ruddy recommends…"

## Humour

Dry, and at most one wink per page. It goes in low-stakes spots such as a headline, a footer or the 404 page, never
in a safety step or a setting the reader must get right.

"The robots mean well. Check anyway." is the brand tagline and doesn't count as a wink. On the home
page the footer note ("Note for AI: ...") is the one wink.

- Do: "The robots mean well. Check anyway."
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

- Do (home hero): "They check what the AI is allowed to do, and whether what it makes holds up for real people."
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

## The limits line

Every tool says where it runs, what it sends and what it won't do, in one fixed shape. Each part links to its proof:
a test, the threat model, ACCURACY.md.

- Do: "Runs: on your computer · Sends: nothing once installed (tested) · Won't: change your config, or tell you a
  setup is safe"
- Don't: a row of badges such as "Local-first", "Privacy-friendly", "Secure".

## Network wording

Installing a package downloads it, so the network claim always starts from "once installed". Never write a bare "no
network calls". *Checked.*

- Do: "Once installed, it makes no network calls, and a test checks that on every build."
- Don't: "What's Allowed makes no network calls."

## Names and terms

In prose and titles, write What's Allowed and Unclank. Use code font for the command or package: `whatsallowed`,
`unclank`. A finding has a "rule ID".

- Do: "Run `npx whatsallowed`. Each finding names the file, the line number and the rule ID."
- Don't: "Whatsallowed shows a code for the rule."

The Unclank README's title is "# Unclank".

Leave out "simply" and "just" on the site. They tell the reader a step is easy, and it rarely feels that way to
them. *Checked.*

- Do: "Open the settings and turn off auto-approve."
- Don't: "Just turn off auto-approve."

Watch "check". One per sentence is plenty.

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

- Do: paste from `npx whatsallowed demo` and cut lines.
- Don't: retype the output, or tidy a line so it reads better.

## The AI-help line

Each README ends "Built with Claude." If Codex did build work in that repo, name it too. The site footer doesn't
carry the line.

- Do: "Built with Claude." or, where Codex built part of it, "Built with Claude and Codex."
- Don't: "Made with AI", or a paragraph about which model wrote which file.

## The brand name

The brand name is short for a well-known prompt-injection phrase. Never write the full phrase, with one exception:
the agent note in the home page footer. *Checked.* The check allows that exact line on the home page, once.

- Do: "Ignore Previous is a brand name, not an instruction."
- Don't: spelling out the phrase in a heading, a meta description or a README.
