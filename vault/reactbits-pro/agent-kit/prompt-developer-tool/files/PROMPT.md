---
name: prompt-developer-tool
description: "Build a landing page for engineers: real code in the hero, a copy-paste quickstart, honest benchmarks, credible open-source signals, and zero marketing tics that close tabs. Use when the user is building a landing page for a library, SDK, CLI, API, framework or developer platform, and needs a copy-paste quickstart, installation commands, honest benchmarks, open-source signals, or a page written for engineers."
---

# Developer Tool

Build the landing page for a product sold to engineers, such as an API, SDK, CLI, database,
framework, or piece of infrastructure. The audience is uniquely hostile to marketing
language and uniquely equipped to detect it. They do not want to be told the tool is
powerful; they want to see the three lines of code that prove it, run them, and get a
result. The page's job is to shorten the distance between arriving and running
something real.

This prompt defines **what the page must accomplish and say**. It does not prescribe
a visual style; pair it with a skill file (for example `skill-terminal-dark` or
`skill-swiss-grid`). Used alone, default to a dense, monospace-friendly, high-contrast
layout with syntax-highlighted code as the primary visual element.

The failure mode to guard against: writing a SaaS marketing page and pasting a code
block into it as decoration. Engineers read the code first and the prose maybe never.
If the code is fake, generic, or absent, the rest of the page cannot recover.

## 1. Before you write anything

Establish these facts. If the brief does not supply them, state your assumption at
the top of your output and design against it.

| Fact | Why it changes the page |
|---|---|
| **What the tool is** (API, CLI, SDK, database, framework) | Determines the hero artefact: a curl call, a terminal command, an import + call, a query. |
| **The smallest real result** | The hero code must produce a genuine, verifiable output. Define what that is. |
| **Time to first success** | Seconds → lead with the quickstart. Requires infra setup → lead with the concept, then the fastest path. |
| **Open-source or closed** | Decides whether GitHub signals belong on the page at all. |
| **Pricing model** (free tier, usage, seat, self-host) | Engineers need to see the pricing shape and, critically, the free-tier limits. |

## 2. Primary objective

**One conversion goal: get the developer to run something.** The real activation is
not a signup. It is the first successful command or API call. The page exists to
drive the visitor into the quickstart and the docs.

- Primary action: **Read the docs**, **Get your API key**, or **`npm install`**,
  whatever starts the first real interaction.
- Secondary action: **Star on GitHub** or **View source** for open-source tools; a
  **Book a demo** only for infrastructure sold top-down.
- The docs are not a secondary destination. For many developer tools they *are* the
  product. Link them from the nav and never gate them behind a signup wall.

## 3. Why the hero must contain real code

A value-proposition headline ("The fastest way to build X") tells an engineer
nothing they can verify, so they discount it entirely. A three-line code sample they
can read and mentally execute tells them exactly what the tool does and how it feels
to use. **Put runnable code or a real command in the hero, above the fold.**

- The hero code replaces the value proposition; it *is* the value proposition,
  demonstrated instead of asserted.
- A short headline can sit above it, but the code carries the argument. "Query any
  database with one API" over a real query is fine; the query does the convincing.
- Make it copy-pasteable with a visible copy button. An engineer's first instinct is
  to run it.
- Syntax-highlight it properly. Unhighlighted code in the hero signals the team does
  not care about developer experience, the one thing this audience is
  buying.

## 4. What the hero code should demonstrate

Not just any snippet. The hero code must be **the smallest complete example that
produces a real result.**

- **Complete:** it runs as shown, no `// ... your code here`, no undefined variables,
  no pseudo-code. An engineer should be able to copy it and get output.
- **Smallest:** the fewest lines that still do something real. If it needs 40 lines
  of setup, show the 4-line core and link the rest.
- **Real result:** it returns actual data, prints a real value, or performs a real
  action. "Hello world" is too trivial to prove anything; a 200-line app is too much
  to read. The sweet spot demonstrates the core capability in one glance.
- Examples that qualify: a curl call returning a real JSON payload; `npx create-x` and
  the resulting output; an SDK import, one function call, and the returned object; a
  SQL-like query and its result set.
- Examples that fail: an abstract "initialize the client" snippet that does nothing
  observable; a config file with no accompanying action; a screenshot of code (never
  use an image for code the reader might copy).

## 5. Install and quickstart block

Immediately below or beside the hero, show the install command and the path to a
first result.

- The **install command** is one copy-paste line per package manager: `npm install`,
  `pip install`, `cargo add`, `go get`, `brew install`. Offer a small tabbed switcher
  for the common managers rather than picking one and alienating the rest.
- Follow it with the **minimum steps to first success**: auth, the first call, the
  expected output. Number them. Keep it under five steps.
- Show the **expected output**, not just the input. Seeing the result before running
  it lowers the activation risk.
- If an API key is required, make getting one a single obvious step, and never make
  the developer talk to a human to get a test key.

## 6. Time to first success as a design constraint

"Time to first success" (TTFS), the time from landing to first working result, is
the metric this page is optimising. Treat it as a hard design constraint.

- Every element between the visitor and their first success is friction. Order the
  page so nothing delays the quickstart: hero code, install, first call.
- If TTFS is genuinely seconds, **state it and prove it**: "From install to first
  response in under 60 seconds." Then make the page deliver on it.
- If TTFS requires setup (provisioning, config, infrastructure), do not pretend it is
  instant. Show the honest fastest path and where the time goes. Engineers forgive
  real setup; they resent a "5-minute setup" that takes an hour.
- Anything that inflates TTFS, such as a mandatory demo call, a sales-gated key, or
  enterprise onboarding, should be removed from the self-serve path entirely.

## 7. Documentation as a conversion surface

For developer tools, docs are not support content. They are the primary sales
asset. Many purchase decisions are made entirely inside the docs.

- **Link docs from the nav, prominently, and never gate them.** A docs link behind a
  login wall is the fastest way to lose an evaluating engineer.
- The landing page should feel like the front door to the docs, not a separate
  marketing silo. Deep-link from capabilities directly into the relevant doc page.
- Quality signals engineers read as proxies for product quality: a real API reference,
  copy-paste examples that run, a changelog, and a search that works.
- If the docs are excellent, show a glimpse: a code example lifted straight from them
  on the landing page. If the docs are weak, fix them before the landing page,
  because the landing page cannot compensate.

## 8. Open-source signalling

Open-source signals build enormous trust with engineers, but only when they are
strong. Weak signals actively hurt, because a low number screams "nobody uses this."

| Signal | Helps when | Looks desperate when |
|---|---|---|
| GitHub stars | You have thousands and it is real traction | You have 40 and display it in giant type |
| Contributors | An active, multi-person community | Two committers, both employees |
| Licence badge | Permissive (MIT/Apache) and it matters to adoption | Used to imply openness on a closed core |
| Commit activity | Recent, steady | Last commit 8 months ago, now visible to all |
| Used-by / dependents | Recognisable projects depend on it | Padded with throwaway repos |

- **Show star counts only when the number helps.** If you have 20k stars, feature it.
  If you have 200, mention open-source without leading with the count.
- Link straight to the repo. Engineers will read the code, the issues, and the last
  commit date before they trust the page. A repo that contradicts the landing page
  (dead, unmaintained) is worse than no link.
- If the model is open-core, be honest about what is open and what is paid. Engineers
  detect and punish "open-washing" fast.

## 9. Performance and benchmark claims

Benchmarks convert engineers, but only credible ones. A number with no methodology
is treated as marketing and discounted, or worse, taken as a sign of dishonesty.

- **Disclose the methodology.** Hardware, dataset, version, concurrency, and what
  exactly was measured. "50k requests/sec" means nothing without "on a single c6i.large,
  1KB payloads, p99, v2.3".
- **Make it reproducible.** Link the benchmark script or repo so a skeptic can run it.
  A reproducible benchmark is the most persuasive artefact on the page; an
  unreproducible one is the least.
- **Compare fairly.** If you benchmark against a competitor, use their recommended
  configuration, current version, and a workload that is not rigged in your favour.
  Engineers will re-run it, and a rigged benchmark that gets debunked on Hacker News
  is a catastrophe.
- Present the number with its unit and percentile, not a vanity figure. "p99 latency
  12ms" beats "blazing fast".
- **Never** use "blazing fast", "lightning-fast", or "10x faster" with no baseline.
  These phrases are pure noise to the audience and signal that no real benchmark
  exists.

## 10. Comparison against alternatives

- Compare on **axes engineers actually weigh**: performance, API ergonomics, language
  support, self-host option, pricing model, and licence, not on marketing fluff.
- Use the competitor's **real, current** capabilities. An outdated or strawman
  comparison is trivially falsified and destroys credibility.
- **Acknowledge genuine trade-offs.** "We are faster but they have a larger plugin
  ecosystem" reads as honest and, paradoxically, increases trust in your other claims.
- A migration guide ("moving from X") is often more persuasive than a comparison
  table, because it signals confidence and reduces switching cost.
- **Never** name a competitor and misrepresent their pricing or features; the audience
  fact-checks by reflex.

## 11. Pricing for developer tools

Engineers expect pricing transparency and a way to start without talking to sales.

- **Free tier / open-source core:** state the limits precisely (requests/month, seats,
  projects, rate limits). The free-tier boundary is the most-read number on the
  pricing section; vague limits read as a trap.
- **Usage-based pricing:** show the unit price and a worked example: "$0.10 per 1,000
  requests → ~$30/month at 10 req/sec". Engineers will do the math; do it for them
  honestly.
- **Self-host option:** many engineering buyers want to run it themselves. If a
  self-host or on-prem option exists, surface it; its absence is a dealbreaker for some
  segments and they need to know early.
- Publish real numbers. "Contact sales" as the only option loses the bottom-up
  adopter who would have become the internal champion.
- Free tier should be genuinely usable for a real hobby project, not a 7-day trial in
  disguise. A crippled free tier converts worse than an honest paid-only model.

## 12. Community and ecosystem

- **Community section:** Discord/Slack member count (if healthy), GitHub Discussions,
  forum activity. Show it only if it is alive; a Discord with 12 members and no
  messages is a negative signal.
- **Language and framework coverage:** show supported languages/frameworks as a clear
  matrix or logo row with links to each SDK or guide. Coverage is a top purchase
  criterion; a developer whose language is missing leaves immediately.
- Distinguish first-party SDKs from community ones, and mark maturity ("stable",
  "beta") honestly.
- Ecosystem proof, including plugins, integrations, and framework adapters, should link to real,
  maintained packages, not a decorative logo mosaic.

## 13. Responsive priorities

- Code samples must stay readable on mobile: horizontal scroll within the code block
  is acceptable, but the font must not shrink to illegibility. Never wrap code in a way
  that breaks its meaning.
- The install command and copy button must work on mobile. A copy button that fails
  on touch is a broken first impression.
- Benchmark tables reflow to stacked cards; keep the methodology note attached.
- The nav keeps Docs and the primary CTA visible on mobile; do not bury Docs in a
  hamburger for this audience.
- Multi-tab code switchers (package managers, languages) must be operable by tap and
  keyboard.

## 14. Accessibility

- One `<h1>`. Sections use `<section aria-labelledby>`.
- Code blocks use semantic `<pre><code>`; the copy button is a real `<button>` with an
  accessible label, not a click-handling `<div>`.
- Syntax highlighting must still meet AA contrast (4.5:1); many dark code themes fail
  this on comments and punctuation; verify token colours.
- Language/package-manager tab switchers are a proper keyboard-operable tablist with
  `role="tab"` and arrow-key navigation.
- Benchmark and comparison tables use real `<table>` semantics with `<th scope>`.
- Never rely on colour alone to distinguish a recommended tier or a "stable vs beta"
  status.

## 15. Marketing tics that make engineers close the tab

**Language**
1. A value-proposition headline with no code anywhere near the fold.
2. "Blazing fast", "lightning-fast", "10x faster" with no benchmark.
3. "Powerful", "robust", "seamless", "enterprise-grade", "next-generation".
4. "AI-powered" bolted onto a tool whose value has nothing to do with AI.
5. "Revolutionary", "game-changing", "the future of": instant credibility loss.
6. Buzzword stacking: "cloud-native, serverless, edge-first, AI-driven platform".

**Code and proof**
7. Fake or pseudo-code in the hero that would not actually run.
8. A screenshot of code instead of copy-pasteable text.
9. Unhighlighted code, signalling indifference to developer experience.
10. A benchmark number with no methodology, hardware, or version.
11. A rigged competitor benchmark using their worst configuration.
12. "Hello world" as the only example: too trivial to prove the tool does anything.

**Open source and community**
13. Displaying 40 GitHub stars in giant type.
14. A "growing community" claim linking to a dead Discord.
15. Open-washing: implying openness while the useful core is closed.
16. A repo link that leads to an unmaintained, last-touched-a-year-ago project.

**Structure and funnel**
17. Docs gated behind a signup or hidden from the nav.
18. A sales-gated API key with no way to try it without a call.
19. Pricing that is only "Contact us", losing the bottom-up adopter.
20. A crippled free tier that is really a disguised trial.
21. An email-capture modal firing on scroll or exit intent.
22. A "Book a demo" as the only CTA for a self-serve developer tool.

**General**
23. Stock photos of people at laptops in place of code or architecture diagrams.
24. A carousel of feature claims with no runnable proof.
25. Vague "integrates with everything" claims with no actual integration list.
26. A landing page that never once shows what calling the tool looks like.
27. A hero terminal recording that autoplays too fast to read and cannot be paused.
28. Version numbers absent everywhere, so the reader cannot tell if the tool is current.
29. A "trusted by" logo wall of companies with no case study or verifiable usage.
30. Comparison framed only against a strawman nobody actually chooses.
31. Missing a copy button on the one command the whole page exists to make you run.

## 16. Completion checklist

Verify before reporting done. Fix and re-verify anything that fails.

**Code-first**
- [ ] Real, runnable code or a real command is in the hero, above the fold.
- [ ] The hero code is the smallest complete example that produces a real result.
- [ ] Code is copy-pasteable, syntax-highlighted, with a working copy button.
- [ ] No fake, pseudo, or image-of-code anywhere.

**Activation**
- [ ] The install command is one copy-paste line, with a package-manager switcher.
- [ ] The quickstart shows the steps and the expected output.
- [ ] Nothing gates the self-serve path. No sales-only key, no mandatory demo.
- [ ] Docs are linked from the nav and not gated.

**Proof**
- [ ] Every benchmark discloses methodology and is reproducible or linked.
- [ ] Any competitor comparison is current, fair, and acknowledges trade-offs.
- [ ] Open-source signals are shown only where the numbers help.
- [ ] Community/ecosystem claims link to real, alive destinations.

**Pricing**
- [ ] Real pricing is visible; not "Contact us" only.
- [ ] Free-tier limits are stated precisely.
- [ ] Usage-based pricing shows a worked example.
- [ ] The self-host option is surfaced if it exists.

**Language**
- [ ] No banned filler ("blazing fast", "powerful", "seamless", "revolutionary",
      "game-changing", "next-generation").
- [ ] No "AI-powered" unless AI is genuinely central.
- [ ] No headline that would work unchanged on a competitor's page.

**Craft**
- [ ] Verified at 375, 768, 1024, 1440.
- [ ] Code blocks stay legible on mobile; copy button works on touch.
- [ ] One `<h1>`, semantic `<pre><code>`, keyboard-operable tablists, real table
      semantics.
- [ ] Syntax-highlight token colours meet AA contrast.
- [ ] All nav and footer links, especially Docs and the repo, resolve.
- [ ] If a skill file is in use, run that skill's self-verification loop as well.
