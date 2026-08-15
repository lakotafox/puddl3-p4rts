---
name: recipe-product-launch
description: "A tested block arrangement that assembles a full product-launch page from React Bits Pro blocks (announcement hero through waitlist capture) in one prompt. Use when the user wants a full product launch or announcement page assembled in one pass, including waitlist or pre-order capture, rather than composing sections one at a time. Works with the React Bits Pro blocks or with the plain-markup fallback described for every section."
---

# Recipe: Product Launch Page

Assembles a launch page for a product that is either **shipping now** or **opening a
waitlist**, using React Bits Pro blocks in a fixed, tested order.

Unlike a general prompt, a recipe declares its **bill of materials**. The structured
version lives in `plan.json` next to this file. That is the machine-readable
contract the Landing Builder consumes, and it is the source of truth for block
order. This document explains the reasoning and how to adapt it.

## 1. When to use this recipe

Use it when all of these are true:

- There is a **single product** with a **single launch moment**.
- The page's job is **one** of: collect waitlist emails, or drive first purchase/signup.
- You want the whole page in one pass rather than section by section.

React Bits Pro blocks are **optional**. With the `@reactbits-pro` and
`@reactbits-starter` registries configured you get the tested composition
straight away. Without them, every role below carries a `fallback` in
`plan.json` describing its minimum viable structure in plain markup, so the
page order, the content plan and the conversion logic all still apply. See §9.

Do **not** use it for a multi-product company homepage, a pricing page, or an
evergreen marketing site. Reach for `prompt-saas` or `prompt-consumer-hardware`
and compose sections yourself.

## 2. The prompt

Give the agent this, filling the bracketed fields:

> Build a product-launch landing page for **[product name]**, a **[one-line
> description]** for **[audience]**. Launch status: **[waitlist opening | shipping
> now]**. The single most important thing a visitor should understand is
> **[the one idea]**. The conversion goal is **[join the waitlist | buy | start
> free]**.
>
> Use the React Bits Pro `recipe-product-launch` block plan. Install each block from
> the `@reactbits-pro` registry in the declared order, then replace all placeholder
> copy with real content written for this product. Do not add sections that are not
> in the plan, and do not reorder it.
>
> Apply the **[skill name]** skill for all visual, typographic, spacing and motion
> decisions. Where the skill and a block's default styling disagree, the skill wins.
> Edit the block.
>
> Facts you may use (do not invent anything beyond this list):
> **[paste real facts: pricing, availability, specs, customer names, numbers]**

## 3. Block set and order

| # | Role | Block | Why this block | Swap for |
|---|------|-------|----------------|----------|
| 1 | Navigation | `navigation-3` | Minimal bar; leaves room for a single CTA and does not compete with the hero. | `navigation-13` for a brand-led launch; omit for a single-screen teaser. |
| 2 | Announcement hero | `hero-7` | Carries a large product statement plus a visual slot; works for both launch states. | `hero-16` for a statement launch; `hero-14` when the hero itself captures the email. |
| 3 | Social proof | `social-proof-4` | Logo/press strip. **Omit entirely** if there is nothing real to show. | `social-proof-1` for a static logo grid; omit for an unknown brand. |
| 4 | The one idea | `showcase-3` | Single full-width statement with one visual. This is the page's core claim. | `showcase-4` for a multi-item drop; `features-8` for a three-benefit statement. |
| 5 | Capabilities | `features-6` | Alternating text/visual rows rather than a card grid. | `features-1` when there are five or more small features. |
| 6 | Proof in numbers | `stats-4` | Three to four real numbers. Omit if the numbers are not real. | `stats-3` for animated value/label pairs; omit pre-launch. |
| 7 | Objection / detail | `how-it-works-3` | Explains the mechanism or the rollout. | `how-it-works-1` for a setup walkthrough with visuals. |
| 8 | Conversion | `waitlist-2` *or* `pricing-3` | Waitlist form for pre-launch, pricing table for shipping-now. | `waitlist-6` for a referral waitlist; `pricing-1` for tiered pricing. |
| 9 | Questions | `faq-2` | 5–8 real questions, including availability and refunds. | `faq-1` for a sticky-header disclosure list. |
| 10 | Closing | `cta-5` | Restates the offer and the friction. | `cta-1` for an image-led close. |
| 11 | Footer | `footer-4` | Quiet, complete, real links. | `footer-1` for a link-heavy footer. |

Install command:

```bash
npx shadcn@latest add @reactbits-pro/navigation-3 @reactbits-pro/hero-7 \
  @reactbits-pro/showcase-3 @reactbits-pro/features-6 @reactbits-pro/stats-4 \
  @reactbits-pro/how-it-works-3 @reactbits-pro/waitlist-2 @reactbits-pro/faq-2 \
  @reactbits-pro/cta-5 @reactbits-pro/footer-4
```

Blocks ship with no props. Edit them directly. That is intentional: the recipe
gives you the arrangement, you own the content.

## 4. Content plan per block

**1: `navigation-3`**
Product name only on the left. Three links maximum. One CTA matching the page's
conversion goal, with the same label used everywhere else on the page.

**2: `hero-7`**
- Headline: the product name, or a 4–8 word statement of the one idea.
- Subhead: one sentence naming who it is for and what changes for them.
- Status line: `"Waitlist opens [date]"` or `"Shipping now · Free delivery"`.
- Primary CTA: the conversion action, labelled with what happens.
- Visual: real product photography, screenshot, or short loop. Not an illustration.

**3: `social-proof-4`** *(omit if not genuinely available)*
Real logos or real press mentions with links. Four unrecognisable logos are worse
than none.

**4: `showcase-3`**
The single strongest claim, as one headline and one visual. If you cannot state the
product's reason to exist in one sentence here, the positioning is not resolved yet.
Resolve it before continuing.

**5: `features-6`**
Three to five capabilities. Each row: outcome headline, one-to-two sentence
mechanism, one visual. Order by buyer priority, not build difficulty.

**6: `stats-4`** *(omit if numbers are not real)*
Three or four numbers with units and a short label. Never invent these.

**7: `how-it-works-3`**
Pre-launch: what happens after you join the waitlist, and when.
Shipping now: how the product gets set up, or how the rollout works.

**8: `waitlist-2` or `pricing-3`**
- Waitlist: email field only. State what the visitor gets and when. State that you
  will not spam them, and mean it.
- Pricing: real prices, real limits, and plain-text answers on trial end, card
  requirement, and cancellation.

**9: `faq-2`**
Include the awkward questions: when does it ship, what if I want a refund, what
happens to my data, how is this different from `[obvious alternative]`.

**10: `cta-5`**
Restate the offer with new information: a date, a limit, a guarantee. Not a copy
of the hero.

**11: `footer-4`**
Real links only. Legal, contact, status, social. No dead routes.

**Copy rules for every role**
- Open each section with the benefit in the reader's words, then the mechanism. Never lead a section with the feature name.
- Numbers beat adjectives: "ships in 3 days" not "ships fast"; "$49 one-time" not "affordable".
- The status line is the highest-value string on the page. Put the single most decision-changing fact there (the date, the price, or the availability) and nowhere else.
- Write every CTA as the outcome the reader gets, not an instruction: "Get early access" over "Submit", "Buy for $49" over "Purchase".

## 5. The harmonization pass

Each block here is well made on its own, but the blocks were authored
independently. Install twelve of them and you get twelve slightly different design
systems stacked vertically: twelve type scales, four radius families, two motion
philosophies, and a column that changes width as you scroll. This pass is not
optional polish; it turns a block dump into a page. Run it AFTER every block is
installed and the real content is in, BEFORE any review. A launch page has one job,
the signup, so every inconsistency that costs the visitor a moment of doubt costs
conversions directly.

Three problems in this block set prove the pass is mandatory.

1. **The page shouts in the wrong places.** `footer-4` reaches `text-8xl`, two
   steps above the `hero-7` headline at `text-6xl`, so the largest type on the page
   is in the footer. `cta-5` tops out at `text-3xl`, the smallest heading, at the
   conversion moment, and `navigation-3` sits at `text-xl`.
2. **Motion fires before anyone sees it.** Seven of twelve blocks animate on mount
   only, so most of the page plays its entrance while the visitor is still on the
   hero. Only social-proof-4, features-6, stats-4 and footer-4 reveal on scroll.
3. **Shape and width drift.** Four radius families are in play (`rounded-full`,
   `rounded-2xl`, `rounded-md`, `rounded-sm`), and the content column swings between
   `max-w-2xl`, `max-w-3xl` and `max-w-4xl`, with hero-7 carrying no 1400px
   container at all.

### 5.1 Type

One scale for the whole page:

| Role | Class |
|------|-------|
| Hero headline (used once) | `text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight` |
| Section heading (h2) | `text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight` |
| Card, step or column title (h3) | `text-lg sm:text-xl font-medium` |
| Lead paragraph under a heading | `text-base sm:text-lg leading-relaxed` |
| Body and card copy | `text-sm sm:text-base leading-relaxed` |
| Eyebrow label | `text-xs font-medium uppercase tracking-[0.08em]` |

The hero headline is the largest type on the page: no section heading, footer
wordmark, statistic or CTA may match or exceed it. `footer-4` at `text-8xl` is the
violation. A decorative footer wordmark may stay large only if it is treated as
texture (low contrast, secondary tone, clipped or overflowing so it reads as a
background element rather than a heading competing for attention). Otherwise bring
it down to the section-heading scale. `cta-5` must be RAISED to the section-heading
scale, because the conversion moment cannot be the quietest thing on the page.

One weight family: `font-medium` for all display type and headings (the house
weight, 1,237 library uses against 72 for `font-bold`), `font-semibold` only for
emphasis inside running copy, never `font-bold`. Apply `tracking-tight` on every
heading at `text-3xl` and above, default tracking below. One typeface: if a block
ships a second family, remove it.

| Block | Ships | Ends up |
|-------|-------|---------|
| hero-7 | `text-6xl` (extra `md` step) | hero headline scale |
| social-proof-4 | `text-6xl` | section heading |
| showcase-3 | `text-5xl` | section heading |
| features-6 | `text-5xl` | section heading |
| stats-4 | `text-6xl` | section heading (figures capped at heading scale) |
| how-it-works-3 | `text-5xl` | section heading |
| waitlist-2 | `text-6xl` | section heading |
| pricing-3 | `text-6xl` | section heading |
| faq-2 | `text-5xl` | section heading |
| cta-5 | `text-3xl` | section heading (raised) |
| footer-4 | `text-8xl` | texture, or section heading |

### 5.2 Colour

Exactly two section backgrounds: base `bg-white dark:bg-neutral-950` and recessed
`bg-neutral-50 dark:bg-neutral-900`. Nothing else, and never two recessed sections
adjacent. Use the recessed tone to group a cluster that argues one point. For this
order, alternate: hero base, social-proof-4 recessed, showcase-3 base, features-6
recessed, stats-4 base, how-it-works-3 recessed, conversion block (waitlist-2 or
pricing-3) base, faq-2 recessed, cta-5 base, footer-4 recessed. Keeping the
conversion block on base white makes it the brightest, clearest moment on the page.

One card surface: `bg-neutral-100 dark:bg-neutral-800`. One border pair:
`border-neutral-200 dark:border-neutral-800` (the dominant pair library-wide).
Three text tones: primary `text-neutral-900 dark:text-white`, secondary
`text-neutral-600 dark:text-neutral-400`, tertiary `text-neutral-500`. One accent,
on the primary CTA only, repeated at most once elsewhere; everything else neutral.
Special case: `hero-7` is a shader block supplying its own colour field (a pink
glow around `#FF9FFC`). Sample the accent FROM the shader rather than adding a
second unrelated one, and keep every section below the hero neutral so the shader
stays the only saturated moment. Every colour class needs its `dark:` counterpart.

### 5.3 Layout

One section rhythm: `py-16 sm:py-20 lg:py-24`. Two exceptions only: the nav at
`py-4`, and a logo or proof strip directly under the hero at `py-10 sm:py-12` so it
reads as attached. Here that strip is `social-proof-4`, which ships `py-3` and
`py-16`; set it to the attached value. `navigation-3` ships a `py-1` through `py-4`
mix; settle it at `py-4`. Every other section (showcase-3, features-6, stats-4,
how-it-works-3, waitlist-2, pricing-3, faq-2, cta-5, footer-4) moves to the rhythm.

Every section's outer container: `max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8`.
`hero-7` is the deliberate exception because it is a full-bleed shader, but its TEXT
must still align to the same 1400px column as the sections beneath it. Today the
hero copy sits in a `max-w-4xl` box with no 1400px container, so the headline will
not line up. Wrap the hero copy in the standard container while the canvas stays
full-bleed. This is a high-value fix: it anchors the headline instead of letting it
float.

One inner measure for centred intro copy: `max-w-2xl`. Collapse the
`max-w-2xl` / `max-w-3xl` / `max-w-4xl` drift in waitlist-2, cta-5 and features-6 to
it. Choose left-aligned OR centred headers for the whole page and apply it
everywhere: mixed alignment is the clearest tell of an assembled page. `hero-7` is
centred, so centre every header. A launch page benefits from a single vertical
axis, because it keeps the eye on the one line that leads to the signup.

Two radius families maximum: `rounded-xl` for cards and panels, `rounded-lg` for
controls, inputs and buttons. `rounded-full` survives only for avatars, logo chips
and icon dots. Convert `navigation-3` from `rounded-sm`, `social-proof-4` and
`how-it-works-3` from `rounded-2xl`, and `waitlist-2` from `rounded-md`; pull the
`rounded-full` on hero-7, features-6, stats-4, pricing-3, faq-2 and cta-5 down to
`rounded-lg` on buttons and inputs, keeping `rounded-full` only for true pills or
dots.

### 5.4 Motion and scroll

Only the nav and the hero may animate on mount; everything below the fold reveals
on scroll. The failure mode is concrete: a mount animation on a lower section fires
the instant the page loads, while the user is still on the hero, so by the time
they scroll to it it has already played and the section just sits there.

This is the single biggest defect here. Convert every below-the-fold mount-only
block to scroll reveal: showcase-3, how-it-works-3, waitlist-2, pricing-3, faq-2
and cta-5. Only navigation-3 and hero-7 stay on mount.

```tsx
// before
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} />

// after
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
/>
```

One reveal for the page: `initial={{ opacity: 0, y: 20 }}`,
`whileInView={{ opacity: 1, y: 0 }}`,
`transition={{ duration: 0.5, ease: "easeOut" }}`. Both `y: 20` and `duration: 0.5`
are already the library's most common values, so this is the least invasive
normalization available; `-80px` is the house viewport margin (114 uses against 4
for `-100px`). Stagger with `delay: Math.min(index, 5) * 0.06`. A section must
finish revealing within 500ms; blocks shipping absolute delays up to 0.6s must be
converted. Never stagger a long grid item by item.

One motion idea per section: never combine parallax, stagger and a counter in one.
At most one scroll-linked (`useScroll`) section on the page, and that budget is
already spent by hero-7's shader, so nothing below it takes a scroll-linked effect.
`stats-4` counters animate once, on enter, never on every intersection. Reduced
motion: fewer than a third of blocks handle it (95 of 317). Add `useReducedMotion()`
and collapse to an opacity-only fade when it returns true; `hero-7`'s shader should
drop to a static frame or a still gradient. This is both an accessibility
requirement and a battery consideration on mobile.

### 5.5 Scroll opportunities worth taking

Where these blocks can shine. Treat this as a menu and take AT MOST TWO: the value
is in restraint.

- **navigation-3** gains a solid or blurred background once the hero has scrolled
  past, and reveals a compact inline signup field once `waitlist-2` is behind the
  viewport, so the conversion action is never more than a glance away.
- **stats-4** counters trigger on enter rather than on mount.
- **how-it-works-3** reveals its steps progressively, tied to scroll position.
- **faq-2** keeps a sticky section header while its list scrolls past.
- **showcase-3** items reveal with a small scale-up (1.02 to 1) alongside the fade.

Doing all five produces a page that feels busier, not better, and `hero-7` already
spends most of the page's motion budget. Pick two.

### 5.6 Verifying the pass

Count these; each has an expected number. Distinct section-heading sizes: **1**.
Distinct section paddings: **2**, plus the nav. Distinct outer container widths:
**1**, plus the deliberate hero-7 full bleed. Distinct inner measures: **1**.
Radius families: **at most 2**. Text tones: **3**. Section backgrounds: **at most
2**. Mount-animated sections below the fold: **0**. Scroll-linked sections: **at
most 1**. Animated elements with no reduced-motion fallback: **0**. If any count is
off, the pass is not finished.

## 6. Launch mechanics: countdown, scarcity, and the day after

A launch page carries one mechanic a SaaS or agency homepage never does: **time
pressure that has to be true**. Handle it deliberately in three places.

**Countdown and dates.** If the hero shows a countdown or a launch date, it must be a
real date you will honour. A timer that resets, or a "launching soon" with no date,
trains visitors to distrust the whole page. Put the exact date and timezone in the
`hero-7` status line and repeat it in `cta-5`. When the clock reaches zero the page
must change on its own. Swap the waitlist for the buy button rather than leaving a
dead countdown.

**Scarcity, honestly.** "Only 500 spots" belongs on the page only if there are 500
spots and you will actually close at 500. If the limit is real, state the mechanism
("the first 500 members get founder pricing, then it rises to $X") in the conversion
block and again in `faq-2`. If it is not real, remove every scarcity claim. A
technical audience checks, and a fabricated "spots left" counter is the single
fastest way to lose them.

**Early access and referral.** For a waitlist launch, state what a waitlist position
actually buys (earlier access, a discount, an invite quota) in `how-it-works-3`,
and make the reward concrete.

**The day after launch.** Design the page's second state before you ship the first.
Pre-launch: the moment the waitlist closes, `waitlist-2` becomes the purchase or
signup path and the hero status line switches to "Available now". Available-now: once
the founder tier sells out, `pricing-3` drops that column instead of showing a
struck-through ghost. Decide who flips these (a feature flag, a scheduled deploy, or
a manual edit) and write it down, because launch day is the worst time to be
editing production copy by hand.

## 7. Adapting the result

**Pre-launch waitlist variant**
- Drop `stats-4` and `pricing-3`.
- `hero-7` status line carries the launch date.
- `how-it-works-3` describes what waitlist members receive and in what order.
- CTA label: `"Join the waitlist"` everywhere.

**Available-now variant**
- Drop `waitlist-2`, keep `pricing-3`.
- `hero-7` status line carries availability and shipping/onboarding time.
- CTA label: `"Buy for $X"` or `"Start free"` everywhere.

**Shortening the page**
Cut in this order: `stats-4`, `social-proof-4`, `how-it-works-3`. Never cut the
hero, the one-idea showcase, the conversion block, or the FAQ.

**Lengthening the page**
Add a second `features-6` row group or a `comparison-2`. Never a second hero and
never a testimonial carousel.

## 8. Pairing with a skill

The block set defines *structure*; the skill defines *appearance*. Run both.

- `skill-apple-minimal`: expect to strip pill badges and card wrappers from the
  stock blocks, raise section padding substantially, and cut the type scale's
  mid-sizes. The alternating-row `features-6` and single-statement `showcase-3` were
  chosen because they survive that edit; a card grid would not.
- Any skill's anti-pattern list overrides a block's default styling. When they
  conflict, edit the block.

After assembly, run the skill's self-verification loop **and** this recipe's
checklist (§10).

## 9. Working without React Bits Pro

If the registries are not configured, this recipe still works as a structural
prompt: build each numbered role as a hand-written section with the same order,
content plan, and conversion goal. The `fallback` field in `plan.json` describes
each role's minimum viable structure.

## 10. Completion checklist

- [ ] Block order matches `plan.json`. No sections added, none reordered.
- [ ] Every placeholder string from every block has been replaced.
- [ ] Nothing on the page is invented: no fake logos, stats, quotes, or dates.
- [ ] `social-proof-4` and `stats-4` were removed if the content was not real.
- [ ] One CTA label, used verbatim in nav, hero, conversion block, and closing CTA.
- [ ] The CTA states what happens next.
- [ ] The one-idea section states the product's reason to exist in one sentence.
- [ ] The FAQ answers availability and refund/cancellation.
- [ ] Every footer and nav link resolves.
- [ ] The applied skill's self-verification loop passes with zero anti-pattern hits.
- [ ] Verified at 375, 768, 1024, 1440.
- [ ] One `<h1>`; sections labelled; forms have labels and real validation messages.
- [ ] AA contrast in both themes.
