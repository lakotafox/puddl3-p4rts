---
name: corporate-trust
description: "Build enterprise, finance and healthcare pages where credibility is the entire design objective: a conservative palette, a ranked trust ladder, dense organised proof and a demo-request form that a procurement committee finds legible. Use when the user is building an enterprise, B2B, finance, insurance, healthcare or government page, mentions compliance, SOC 2, HIPAA, procurement, security or trust signals, wants a demo-request or contact-sales flow, or asks for a conservative and credible design a committee will approve."
---

# Corporate Trust

A landing-page system for enterprise software, finance, healthcare, security and B2B
platforms. Unlike consumer styles, the objective is not delight or desire. It is
**credibility**. Every design decision is justified by the buyer, not the brand: an
enterprise purchase is a long, multi-stakeholder, risk-averse process, and the page's
job is to give a procurement committee, a security reviewer, a technical evaluator
and an economic buyer each the evidence they need to say yes without fear.

The failure mode you are guarding against is the generic blue-gradient SaaS page: a
violet→blue hero gradient, three floating glassmorphic cards, a row of fabricated
company logos, and a "Trusted by 10,000+ companies" line with no evidence behind it.
That page reads as *less* trustworthy, not more. An enterprise buyer has seen a
thousand of them and pattern-matches it to "startup, unproven, will churn". Trust is
built with real, specific, verifiable proof presented with restraint. Read the trust
ladder (§5) and the anti-patterns (§11) before writing anything.

The second failure mode is accessibility: enterprise buyers frequently carry hard
procurement requirements (WCAG 2.1 AA, VPAT, Section 508). A page that fails these is
disqualified regardless of how good it looks. §13 makes the standard concrete.

## 1. The core idea

> The buyer is not one person, and every one of them is looking for a reason to say no.

Enterprise design is risk-reduction design. The economic buyer fears wasting budget;
the technical buyer fears integration pain; the security reviewer fears a breach; the
end user fears a bad tool; procurement fears a vendor that cannot support them. Every
section exists to remove one of those fears with evidence.

Three consequences that drive every other rule:

1. **Proof beats claims, and proof goes high.** Real customer names, real numbers,
   real certifications, real analyst positions, placed in the first two viewports,
   not buried in a footer.
2. **Legibility beats delight.** A committee scans this page on a boardroom projector
   and a locked-down laptop. Clarity, hierarchy and contrast win over spectacle.
3. **Restraint signals maturity.** Minimal motion, a conservative palette and a
   dense-but-organised layout read as "established vendor". Flashy reads as "risky
   startup".

## 2. Page architecture for the enterprise buyer journey

The order maps to the committee's questions: what is it, who trusts it, does it work,
is it safe, what does it cost, how do I try it.

| # | Section | Purpose (buyer question) |
|---|---------|--------------------------|
| 1 | Nav (mega-menu) | Navigate a broad product/solutions/resources catalogue. |
| 2 | Hero | What is it, in one clear line, with a primary + secondary CTA. |
| 3 | Logo wall | "Who already trusts this?": real, recognisable customers. |
| 4 | Value pillars | 3–4 concrete outcomes with metrics, not adjectives. |
| 5 | Proof / case study | "Does it actually work?": a real result with a named customer. |
| 6 | Product depth | How it works: dense, organised, tabbed or sectioned. |
| 7 | Security / compliance | "Is it safe?": certifications, data handling, uptime. |
| 8 | Analyst / awards | Third-party validation (Gartner, G2, industry bodies). |
| 9 | Pricing / plans | Enterprise pricing: usually "Contact sales", tiered. |
| 10 | Demo request | The primary conversion: a real form. |
| 11 | Footer | Deep sitemap, legal, compliance, contact: dense and useful. |

**Rule:** proof (logos, metrics, a named case study, one compliance signal) must
appear **above the fold or in the very next viewport**. A page that makes the buyer
scroll past marketing copy to find evidence loses the risk-averse reader.

## 3. Type scale

Conservative and highly legible. Display sizes stay **smaller than in consumer
styles** because enterprise pages carry more information per screen and gigantic type
wastes space the buyer wants filled with substance.

**Use a neutral, highly legible sans:** Inter, Söhne, IBM Plex Sans, or the system
stack. A humanist or grotesque sans, never a display or rounded face. Optionally pair
with a monospace for code, IDs and precise numeric data.

| Token | Desktop | Mobile | Weight | Tracking | Leading |
|-------|---------|--------|--------|----------|---------|
| `display` | `clamp(36px, 4vw, 56px)` | `30px` | 600 | `-0.02em` | `1.1` |
| `h2` | `clamp(28px, 3vw, 40px)` | `24px` | 600 | `-0.015em` | `1.15` |
| `h3` | `22px` | `20px` | 600 | `-0.01em` | `1.25` |
| `lead` | `18px` | `17px` | 400 | `0` | `1.55` |
| `body` | `16px` | `15px` | 400 | `0` | `1.6` |
| `small` | `14px` | `13px` | 400 | `0` | `1.5` |
| `label` | `12px` | `12px` | 600 | `0.04em` | `1.3` |

**Hard rules:**

- **Hero display caps around `56px`, not `120px`.** Enterprise buyers read the words;
  a viewport-filling headline signals consumer marketing and wastes proof space.
- **Weight ceiling is 600 (semibold).** `font-bold`/`extrabold` headlines look loud
  and less credible. Hierarchy comes from size and colour, not heavy weight.
- **Body at `16px`, `leading-[1.6]`, max `72ch`:** slightly longer measure than
  consumer styles is fine because enterprise copy is substantive.
- **One sans family** (plus an optional mono for data). Never a serif accent, never a
  second display face.

## 4. Colour system

Saturated blue is the enterprise convention because it reads as stable, calm and
institutional (finance, tech, healthcare all lean on it). The risk is that *every*
B2B page uses it, so the goal is to use blue **without looking generic**.

- **A deep, slightly desaturated blue as the primary**, not a bright electric blue.
  `#1B4DB1` (institutional) reads more credible than `#2563EB` (default Tailwind
  blue, which is on ten thousand SaaS pages).
- **Neutrals do the heavy lifting; blue is an accent.** The page is mostly white and
  cool grey; blue appears on primary CTAs, links, active states and one or two key
  surfaces. A page drenched in blue reads as unserious.
- **Avoid the generic look by:** (a) using a deep/desaturated blue not the stock one,
  (b) pairing it with a distinctive neutral (warm-grey or slate, not pure grey), (c)
  never using a blue→violet gradient, (d) letting a restrained second accent
  (e.g. a deep green for "secure/success") carry meaning.

```
  Background        #FFFFFF
  Surface           #F6F8FB   (cool section background)
  Surface deep      #0E1B2E   (dark proof/security band, used once or twice)
  Ink primary       #16202E
  Ink secondary     #4A5666
  Hairline          #E1E7EF
  Primary (blue)    #1B4DB1
  Primary hover     #163F92
  Success (secure)  #1E7A52   (compliance, uptime, positive metrics)
  Danger (rare)     #B42318   (only in comparison/risk framing)
```

**Hard rules:**

- **No blue→violet or blue→cyan gradient anywhere.** It is the single strongest
  "generic AI SaaS" tell.
- **Blue is scarce.** If more than ~15% of the visible page is blue, pull it back to
  CTAs, links and one surface band.
- **The dark band (`#0E1B2E`) is used once or twice** for a security/proof section,
  giving weight without turning the whole page dark.
- **Dark mode** (optional) inverts to a slate ground `#0E1B2E`, ink `#E7ECF3`, and the
  blue lightens to `#5B8DEF` for contrast; never leave the deep blue on a dark ground.

## 5. The trust ladder

Trust signals are not equal. Rank them by how much a skeptical buyer weights them,
and position the strongest highest. This ordering is the core of the style.

| Rank | Signal | Weight | Placement | Styling |
|---|---|---|---|---|
| 1 | Named customer results (a real metric + a real company) | Highest | Hero-adjacent, §5 case study | Large number, company name, attributed quote |
| 2 | Recognisable customer logos | High | Directly under hero | Monochrome, evenly sized, real companies only |
| 3 | Security certifications (SOC 2, ISO 27001, HIPAA, PCI) | High for security buyer | Dedicated band + footer | Real badge marks, linked to a trust centre |
| 4 | Analyst / independent ratings (Gartner, Forrester, G2) | High | A proof band | Rating source named, score shown, linked |
| 5 | Compliance / regulatory (GDPR, FedRAMP, regional) | Medium-high | Security band + footer | Text badges, honest scope |
| 6 | Quantified scale ("processes $4B annually") | Medium | Value pillars | Big number, unit, one-line context |
| 7 | Testimonials with title + company | Medium | Interspersed | Name, role, company, headshot optional |
| 8 | Awards / press mentions | Low-medium | Small strip | Muted, not oversized |

**Hard rules:**

- **Never fabricate any of these.** A fake logo wall or a made-up "SOC 2 Type II"
  badge is a legal and credibility catastrophe. If a signal is not real, omit it.
- **Specific beats vague, always.** "Reduced fraud losses 38% at [Named Bank]" beats
  "Trusted by leading financial institutions".
- **Certifications are design elements, not clip-art.** Use the official mark at a
  controlled size, monochrome or brand-locked, linked to a real trust/security page.
- **The logo wall uses real, recognisable customers, monochrome and evenly weighted.**
  No mismatched sizes, no color logos fighting each other, no "logo" that is just a
  generic industry.

## 6. Data and metrics presentation

Numbers are the most persuasive element on the page. Give them dedicated typography.

- **Stat block:** the number at `display` size, weight 600, in ink or blue; the unit
  smaller and lighter; a `small` label beneath in ink-secondary. Use **tabular
  figures** (`font-variant-numeric: tabular-nums`) so digits align in rows.
- **A metric is always attributed and scoped.** "99.99% uptime (trailing 12 months)"
  not "99.99% uptime". "38% fewer false positives at [Named Bank]" not "38% better".
- **Charts are restrained and labelled.** A single clear bar or line chart with axis
  labels and a source line beats a decorative animated dashboard. No 3D pie charts, no
  gratuitous gauges, no fake real-time tickers.
- **Comparison tables** (vs. competitor / vs. status quo) use hairline-separated rows,
  clear column headers, checkmarks/dashes, and honest framing; no straw-man
  competitor column with everything marked red.
- Numbers in tables and stats are right-aligned with tabular figures; labels are
  left-aligned.

## 7. Density rules

This style permits **far more density** than consumer styles because an enterprise buyer
wants substance and reads carefully. But density must be *organised*, not cramped.

- **Section vertical padding `80–120px` desktop / `56–72px` mobile:** tighter than
  consumer styles' `160px+`, because more sections carry real content.
- **Multi-column content is expected:** a 3-column value-pillar row, a 4-column
  footer sitemap, a 2-column feature-with-detail block. Consumer styles avoid
  grids; enterprise embraces organised grids.
- **The organising principle is alignment and consistent spacing, not white space.**
  A dense section reads as credible when everything is on a strict grid with uniform
  gaps (`24–32px`); it reads as cramped when spacing is inconsistent.
- **Content width up to `1280px`**, with `12`-column grid thinking. Text blocks still
  cap at `72ch` for readability even inside a wide layout.
- **Where density is NOT allowed:** the hero (one clear message), the primary CTA
  (uncluttered), and the demo form (calm, not a wall of fields).

## 8. Navigation and mega-menus

Enterprise nav is genuinely complex because the catalogue is large (multiple
products, solutions-by-industry, a deep resource library). A mega-menu is justified,
but only under specific conditions.

**A mega-menu is justified only when:**

- There are **3+ top-level categories each with 5+ destinations** (e.g. Products,
  Solutions, Resources), AND
- The destinations benefit from grouping and short descriptions (a bare link list
  would be ambiguous).

If the site has fewer than ~12 total destinations, use a simple nav. A mega-menu on
a thin catalogue looks like overcompensation.

- **Structure:** `Products` (by product), `Solutions` (by industry/role), `Resources`
  (docs, blog, webinars, case studies), plus flat `Pricing` and `Company`. Right side:
  `Sign in` (text) + a primary `Get a demo` / `Contact sales` button.
- **Mega-menu panel:** grouped columns with a bold group label, then links with a
  one-line description each; optionally one featured item (a report, a new product)
  on the right. Open on hover *and* click/focus; dismiss on Escape and outside-click.
- **The nav bar itself is `64–72px`, white with a hairline bottom border**, wordmark
  left, categories centre, actions right. Sticky. No transparency games.
- **Accessibility:** mega-menus are a frequent a11y failure: full keyboard
  operability, `aria-expanded`, focus management, and Escape-to-close are mandatory
  (§13).

## 9. Hero and proof sections

**Hero pattern:**

```
[optional eyebrow: category or a compliance micro-signal, e.g. "SOC 2 Type II"]
[display headline: the outcome, clear and specific, 5–10 words]
[lead paragraph: what it is and who it is for, 1–2 sentences]
[primary CTA "Get a demo" + secondary "Contact sales" / "View pricing"]
[a supporting proof element: a key metric, or a compact logo hint]
[product visual: a clean, real screenshot or a straight-on device, no 3D tilt]
```

- **The headline states a business outcome, not a category.** "Stop fraud before it
  settles" beats "The enterprise fraud platform". Specific and credible.
- **Two CTAs, both real actions.** Primary "Get a demo" (form), secondary "Contact
  sales" or "View pricing". No "Start free trial" if the product is enterprise-sales-led.
- **The hero visual is a real product screenshot**, straight-on, legible; not a
  floating glass card, not a 3D-tilted dashboard, not a fabricated UI.

**Proof sections:** the logo wall sits directly under the hero; the case study (§5,
rank 1) gets its own section with a named customer, a headline metric at `display`
size, a two-sentence context, and an attributed quote. The security band (dark
surface, §4) groups certification marks with short, honest descriptions.

## 10. Pricing, forms and motion

**Enterprise pricing:**

- Usually **3 tiers plus an "Enterprise / Contact sales" tier** with no public price.
- Each tier: name, short audience line, price (or "Custom"), a **feature list with
  real checkmarks**, one CTA. The recommended tier gets a subtle border-emphasis, not
  a loud glow.
- A **comparison table below** the cards for buyers who compare line-by-line (§6).
- Never fake urgency ("50% off ends tonight"); enterprise deals are negotiated, not
  impulse-bought.

**Demo-request form (the primary conversion):**

- **Field count: 5–7, no more.** Name, work email, company, company size (select),
  role/use-case (select), optional phone. Every extra field measurably lowers
  completion.
- **Layout:** single column, generous labels above inputs, `44px+` input height,
  clear focus states, inline validation, a `56px`-tall submit button. Never a
  two-column form crammed to save vertical space.
- **Behaviour:** validate on blur, show one clear error per field, keep entered values
  on error, and confirm success in place (not a redirect to a blank page). State the
  privacy commitment near the button ("We will not share your details").
- **No dark patterns:** no pre-ticked marketing consent, no fake "1 spot left".

**Motion (deliberately minimal):**

- **Permitted:** a single `300–500ms` fade-and-rise (`opacity` + `8–16px y`) on
  section entrance, once; hover states on buttons/links/cards (`150ms` colour/shadow);
  a subtle count-up on a key stat, once; smooth `scroll-behavior` for anchor links.
- **Forbidden:** parallax, scroll-jacking, animated gradient/aurora/mesh backgrounds,
  floating/tilting cards, marquees, cursor followers, spring bounce, looping motion,
  auto-advancing carousels, letter-by-letter text effects.
- The mood is calm and stable. If a buyer notices the animation, it is too much.

## 11. Anti-patterns: what makes a page fail this style

Each is something an agent does by default. Any one alone undermines credibility.

**Colour and decoration**
1. A blue→violet (or blue→cyan) hero gradient: the definitive generic-SaaS tell.
2. Three floating glassmorphic cards with `backdrop-blur` in the hero.
3. Gradient text on the headline via `bg-clip-text`.
4. An animated aurora/mesh/blob background.
5. The whole page drenched in blue instead of blue as a scarce accent.
6. Using stock Tailwind `blue-600` (`#2563EB`): the most over-used B2B blue.
7. Coloured glows behind cards and buttons.

**False or empty proof**
8. A "Trusted by 10,000+ companies" line with no logos or evidence.
9. A logo wall of fabricated or generic/placeholder company logos.
10. A made-up compliance badge (SOC 2 / HIPAA) the product does not hold.
11. Unattributed, unscoped metrics ("99.99% uptime" with no period, "38% better").
12. Testimonials with no name, role, or company ("A happy customer").
13. A fake real-time counter or live-ticker of "deals processed".
14. Star ratings with no source or link.

**Composition and hierarchy**
15. Marketing copy pushed above the proof, so evidence is buried below the fold.
16. A viewport-filling `120px` hero headline that wastes proof space.
17. Inconsistent spacing making a dense section read as cramped, not organised.
18. A mega-menu on a site with only 6 destinations.
19. A single-column, low-density page that wastes an enterprise buyer's screen.
20. Content wider than `1280px`, or text measures beyond `72ch`.

**Typography**
21. `font-bold`/`extrabold` headlines that read as loud rather than credible.
22. A rounded or display typeface undermining the institutional tone.
23. A serif accent font mixed in "for elegance".
24. Non-tabular figures so numbers in tables and stat rows fail to align.

**Motion**
25. Parallax or scroll-jacking on an enterprise page.
26. Floating/tilting product cards or a 3D-rotated dashboard hero.
27. An auto-advancing testimonial or logo carousel.
28. Spring bounce or looping motion anywhere.
29. Count-up numbers that re-run on every scroll-back.

**Forms and CTA**
30. A demo form with 10+ fields or a two-column crammed layout.
31. Pre-ticked marketing-consent checkboxes or other dark patterns.
32. Fake urgency ("Offer ends tonight") on an enterprise-sales product.
33. A vague single CTA ("Learn more") with no clear conversion path.

**Content**
34. Vague headlines ("Supercharge your enterprise", "The all-in-one platform for
    modern teams") instead of a specific, verifiable outcome.

## 12. Responsive behaviour

- **Density adapts; it does not vanish.** Multi-column grids collapse to one column
  in a logical reading order (value pillars stack, footer sitemap becomes accordions),
  but the page stays substantive.
- **The mega-menu becomes a structured mobile drawer** with collapsible groups;
  never a flat wall of 40 links. Keyboard and screen-reader operability is preserved.
- **The demo form stays single-column** (it already is) with `44px+` targets and a
  full-width submit.
- **Comparison and pricing tables** switch to a stacked, card-per-plan layout on
  mobile with a clear "compare all features" expandable, not a horizontally-scrolling
  table that hides columns.
- Type drops ~20% (less than consumer styles, because legibility of substance
  matters). Section padding drops to `56–72px`.
- Test at 375, 768, 1024, 1440, 1920, 2560. Verify tables, mega-menu and form on a
  real narrow viewport.

## 13. Accessibility: procurement-grade

Enterprise buyers frequently require **WCAG 2.1 Level AA** conformance, a VPAT, and
often **Section 508** (US public sector). Failing these disqualifies the vendor
regardless of visual quality. Concretely:

- **Contrast: 4.5:1 for normal text, 3:1 for large text and UI components.** Verify
  `#4A5666` ink-secondary on white (~7:1, fine) and on `#F6F8FB` surface (~6.4:1,
  fine); verify blue `#1B4DB1` on white for links (~7.4:1, fine) and white text on
  blue buttons (~7.4:1, fine). Re-check any pairing you introduce.
- **Full keyboard operability**, especially the mega-menu: `Tab`/`Shift+Tab` through
  items, arrow keys within a panel, `Escape` to close, `aria-expanded` on triggers,
  and a visible focus indicator (`2px` outline, `2px` offset) on every interactive
  element. Never `outline: none` without a replacement.
- **The demo form is fully labelled:** every input has a `<label>` (not placeholder-
  only), errors are associated via `aria-describedby`, required fields marked in text
  not just colour, and validation messages are announced.
- **Semantic structure:** one `<h1>`, ordered heading levels, `<nav>`/`<main>`/
  `<footer>` landmarks, tables with `<th scope>` and captions, and lists as real
  lists. Screen-reader users navigate by landmarks and headings.
- **Do not rely on colour alone** for meaning (success/danger, comparison ticks);
  pair with an icon or text.
- **Respect `prefers-reduced-motion`:** the already-minimal motion becomes none.
- Target a real, testable standard; if a VPAT will be requested, build to 508/AA from
  the start rather than retrofitting.

## 14. Performance

- **Enterprise buyers evaluate on locked-down corporate networks and older hardware.**
  Fast, light pages read as competent; heavy ones read as poorly engineered.
- **Budget: LCP < 2.0s, CLS < 0.05, JS payload lean.** The hero screenshot is the LCP
  element: serve AVIF/WebP, set explicit dimensions, preload, `fetchpriority="high"`.
- **Logo walls and certification marks are SVG or optimised PNG**, lazy-loaded below
  the fold, with explicit dimensions to avoid layout shift.
- **Charts render server-side or as static images where possible**; do not ship a
  heavy charting library for one bar chart.
- Only animate `transform`/`opacity`; lazy-load below-fold sections with
  `next/dynamic`; avoid third-party marketing scripts that block the main thread.

## 15. Implementation notes

Tailwind v4 tokens:

```css
@theme {
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;

  --color-bg:        #FFFFFF;
  --color-surface:   #F6F8FB;
  --color-surface-d: #0E1B2E;
  --color-ink:       #16202E;
  --color-ink-2:     #4A5666;
  --color-hairline:  #E1E7EF;
  --color-primary:   #1B4DB1;
  --color-primary-h: #163F92;
  --color-success:   #1E7A52;
}
```

Attributed stat block with tabular figures:

```tsx
<div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
  {stats.map((s) => (
    <div key={s.label} className="border-l border-hairline pl-5">
      <p className="text-[length:var(--text-display)] font-semibold tabular-nums text-primary">
        {s.value}
      </p>
      <p className="mt-1 text-sm text-ink-2">{s.label}</p>
    </div>
  ))}
</div>
```

Demo-request form field:

```tsx
<div className="flex flex-col gap-1.5">
  <label htmlFor="email" className="text-sm font-semibold text-ink">
    Work email
  </label>
  <input
    id="email"
    name="email"
    type="email"
    required
    aria-describedby="email-err"
    className="h-11 rounded-md border border-hairline px-3 text-[16px] outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
  />
  <p id="email-err" role="alert" className="text-sm text-[#B42318] empty:hidden" />
</div>
```

## 16. Pairs well with React Bits Pro (optional)

You do **not** need React Bits Pro to use this skill; build from scratch if the
project has no registry configured. If the `@reactbits-pro` and `@reactbits-starter`
registries *are* configured, these accelerate the build without fighting the style:

- `@reactbits-pro/logo-wall-2`, `@reactbits-pro/stats-3`: proof sections. Populate
  with real customers/metrics only; strip any glow or gradient.
- `@reactbits-pro/pricing-1`, `@reactbits-pro/comparison-2`: enterprise pricing and
  comparison shells. Remove urgency copy and loud recommended-tier glows.
- `@reactbits-starter/count-up-tw`: the single stat count-up (§10). Guard it with
  reduced-motion and fire it once.

Ignore this section if the registries are not configured. Never add a dependency on
them just to satisfy the style.

## 17. Self-verification loop

Re-read the rendered output and check every item. If any fails, fix it and run the
loop again. Do not report completion with known failures.

**Proof and trust**
- [ ] Real proof (logos, a named-customer metric, one compliance signal) appears in
      the first two viewports, not buried below marketing copy.
- [ ] Every logo, badge, certification, metric and testimonial is real and attributed,
      with nothing fabricated.
- [ ] Metrics are scoped ("trailing 12 months", "at [Named Bank]"), not bare numbers.
- [ ] Certifications are official marks linked to a real trust/security page.
- [ ] The trust ladder ordering (§5) is respected: strongest signals highest.

**Colour and composition**
- [ ] No blue→violet/cyan gradient; blue is a scarce accent, not the whole page.
- [ ] The blue is a deep/desaturated institutional tone, not stock `blue-600`.
- [ ] No glassmorphic floating cards, no aurora/mesh background, no gradient headline.
- [ ] Dense sections are on a strict grid with uniform spacing, organised and not cramped.
- [ ] Content is `≤1280px`; text measures `≤72ch`.

**Typography and data**
- [ ] One sans family; headlines `≤600` weight; hero display `≤56px`.
- [ ] Numbers use tabular figures and align in tables and stat rows.
- [ ] Charts are labelled and sourced; no 3D/decorative charts.

**Navigation and forms**
- [ ] A mega-menu exists only if the catalogue justifies it (§8); it is fully keyboard-
      operable with `aria-expanded` and Escape-to-close.
- [ ] The demo form has 5–7 fields, single column, real labels, and no dark patterns.
- [ ] CTAs are specific real actions ("Get a demo"), never a vague "Learn more".

**Motion, a11y, performance**
- [ ] Motion is limited to §10's permitted list; no parallax, bounce, or looping.
- [ ] Contrast passes AA (4.5:1 / 3:1) on every pairing; focus rings visible; one `<h1>`.
- [ ] Form inputs labelled and error-associated; colour is never the only signal.
- [ ] LCP screenshot preloaded with dimensions; only transform/opacity animate.

**Anti-patterns (§11)**
- [ ] Re-read all 34 anti-patterns against the page. Zero hits.
- [ ] Specifically: no blue gradient, no glass cards, no fake logos, no unscoped
      "Trusted by 10,000+" claim.

**Generic-AI smell test**
- [ ] Would a procurement committee find this more or less credible than a competitor?
      If the proof is thin or fabricated, it reads as less credible; fix the evidence.
- [ ] Does any headline say "supercharge", "all-in-one", or "modern teams"? Rewrite it
      into a specific, verifiable outcome.
