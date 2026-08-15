---
name: recipe-agency-homepage
description: "A tested 10-block arrangement that assembles a complete creative or technical studio homepage (positioning through enquiry) from React Bits Pro blocks in one prompt. Use when the user wants a complete studio or agency homepage assembled in one pass, from positioning through enquiry, rather than composing sections one at a time. Works with the React Bits Pro blocks or with the plain-markup fallback described for every section."
---

# Recipe: Agency Homepage

Assembles the complete homepage for a **creative or technical studio**: the page
that has to state a specialism, prove it with selected work, and turn a serious
visitor into a **qualified enquiry**. There is no trial and no pricing block; the
conversion is a project conversation.

Unlike a general prompt, a recipe declares its **bill of materials**. The structured
version lives in `plan.json` next to this file. That is the machine-readable
contract the Landing Builder consumes, and it is the source of truth for block
order. This document explains the reasoning and how to adapt it.

## 1. When to use this recipe

Use it when all of these are true:

- The studio sells **bespoke work** (design, product, brand, or engineering), not a
  self-serve product.
- The conversion goal is a **qualified enquiry**: a scoped project brief, not a signup.
- There is **real work to show**. A studio homepage with no case studies has nothing
  to sell; resolve that before building the page.
- You want the whole page in one pass rather than section by section.

React Bits Pro blocks are **optional**. With the `@reactbits-pro` and
`@reactbits-starter` registries configured you get the tested composition
straight away. Without them, every role below carries a `fallback` in
`plan.json` describing its minimum viable structure in plain markup, so the
page order, the content plan and the conversion logic all still apply. See §8.

Do **not** use it for a self-serve SaaS product (use `recipe-saas-homepage`), a single
product launch (use `recipe-product-launch`), or a personal portfolio that only needs
a hero and a project list. For a bespoke section order, reach for `prompt-agency` and
compose it yourself.

## 2. The prompt

Give the agent this whole block, filling every bracketed field before you send it. Do
not leave a bracket unfilled. An empty field produces invented work and fake clients.

```
Build a homepage for [studio name], a [creative | technical] studio that specialises
in [the one specialism, e.g. brand identity for consumer fintech, or React platform
engineering]. The visitor is [the exact buyer, e.g. a founder, a head of brand, a VP
of engineering]. The single thing they must believe after the first screen is [the
positioning claim]. The conversion goal is a qualified enquiry, and its button label
is [Start a project | Enquire]. Use that label verbatim in the navigation, the hero,
and the contact section. There is no pricing and no signup on this page.

Use the React Bits Pro recipe-agency-homepage block plan. Install each block from the
@reactbits-pro registry in the declared order, then replace every placeholder string
with real content. Do not add sections that are not in the plan, and do not reorder
them. Never fabricate a client name, a logo, a testimonial, or a case study. If I
have not given you a real one below, delete the block that would carry it rather than
invent one. A fake client is worse than an empty section.

Write the page to this narrative spine, one block per beat: (1) state the specialism
in the hero, in plain words, with one CTA; (2) show the selected work immediately, as a
studio is judged by its output, so proof comes before persuasion; (3) name the
services, framed as outcomes the buyer wants, not as a menu of deliverables; (4) show
the process so the buyer knows what working together feels like; (5) introduce the
studio and the people, because bespoke work is bought from people; (6) show the client
logos; (7) let a named client vouch in their own words; (8) invite a scoped enquiry
with a form that asks for enough to qualify the lead; (9) close with a complete,
honest footer.

Apply the [skill name] skill for all visual, typographic, spacing and motion
decisions. Where the skill and a block's default styling disagree, the skill wins.
Edit the block. Keep exactly one <h1> (the hero). Every section gets a labelled
heading, every form field a visible label, and every interactive control a hover and
focus state. Verify AA contrast in both light and dark themes.

Facts you may use: invent nothing beyond this list. If a fact is missing, leave the
section out rather than fabricate it:
[paste real case studies with client names and outcomes, the services offered, the
process stages, the team members with roles, the client logos, real testimonials with
names and roles, and where enquiries should go]
```

## 3. Block set and order

| # | Role | Block | Why this block |
|---|------|-------|----------------|
| 1 | Navigation | `navigation-13` | Editorial split nav (Work / Studio / Services / Journal / Contact) with a single enquiry CTA. Reads as a studio, not a product. |
| 2 | Positioning hero | `hero-16` | Logo top, oversized statement headline, subtitle plus one CTA at the base. Built to state a specialism, not sell a feature. |
| 3 | Selected work | `showcase-4` | A grid of named projects. Proof comes second, before any persuasion. |
| 4 | Services | `features-1` | Icon grid for three-to-six disciplines, framed as outcomes. |
| 5 | Process | `how-it-works-4` | Named stages that describe what working together feels like. |
| 6 | About and team | `about-1` | Studio statement plus team cards with names and roles. Bespoke work is bought from people. |
| 7 | Client logos | `social-proof-6` | Filterable logo wall of who the studio has worked with. **Omit** if logos are not real. |
| 8 | Testimonials | `social-proof-3` | One lead quote plus supporting quotes, all attributed. **Omit** if quotes are not real. |
| 9 | Enquiry | `contact-2` | Two-column enquiry form that asks enough to qualify the lead. The conversion. |
| 10 | Footer | `footer-3` | Services and company links, complete and real. |

Install command:

```bash
npx shadcn@latest add @reactbits-pro/navigation-13 @reactbits-pro/hero-16 \
  @reactbits-pro/showcase-4 @reactbits-pro/features-1 @reactbits-pro/how-it-works-4 \
  @reactbits-pro/about-1 @reactbits-pro/social-proof-6 @reactbits-pro/social-proof-3 \
  @reactbits-pro/contact-2 @reactbits-pro/footer-3
```

Blocks ship with no props. Edit them directly. That is intentional: the recipe gives
you the arrangement, you own the content.

## 4. Content plan per block

**1: `navigation-13`**
Studio name or wordmark left. Keep the split links to the pages that exist. One CTA on
the right carrying the enquiry label used everywhere else.

**2: `hero-16`**
- Logo: the studio wordmark, top-left.
- Headline: the specialism as a plain statement, what the studio does and for whom.
  Not a slogan, not a pun.
- Subtitle: one sentence of substance under the headline.
- CTA: the enquiry action, single, no competing button.

**3: `showcase-4`**
Four to eight real projects. Each tile: client or project name, the discipline, and a
representative image. This section is the argument. If the work is weak, no copy
above it will rescue the page.

**4: `features-1`**
Three to six services as an icon grid. Write each as the outcome the client buys ("a
brand that survives contact with the market"), not the deliverable ("logo files").

**5: `how-it-works-4`**
Three to four named stages describing how an engagement runs: discovery, direction,
delivery. Set the expectation of what collaboration feels like, honestly.

**6: `about-1`**
A short studio statement plus real team cards: name, role, and a real photo. If the
studio is one or two people, say so; a small team is a selling point, not a weakness.

**7: `social-proof-6`** *(omit if not genuinely available)*
Real client logos. Drop the filter categories that do not apply. A wall of unknown
logos is filler; remove the block instead.

**8: `social-proof-3`** *(omit if quotes are not real)*
One lead testimonial and two or three supporting ones, each with a real name and role.
A quote about the working relationship beats a quote about the deliverable.

**9: `contact-2`**
The enquiry, and the whole point of the page. Ask for enough to qualify: name, email,
company, and a message prompt that asks about scope, timeline, or budget. State who
replies and how fast. Give a plain email address as a fallback for people who will not
fill a form.

**10: `footer-3`**
Real links only: services, work, studio, contact, legal, social. No dead routes.

## 5. The harmonization pass

The ten blocks in this recipe are each well made, but each was authored on its
own. Installing all of them stacks ten slightly different design systems: ten
heading scales, four radius vocabularies, three padding rhythms. The harmonization
pass is not optional polish. It is the step that turns a block dump into a page.
Run it after every block is installed and the real content is in, and before any
review. On an agency site this matters more than anywhere else, because the page is
the portfolio: the visitor judges the studio's craft by the coherence of the site
in front of them, so an incoherent page undercuts the very work it sells.

Three problems in this recipe's raw block set prove the pass is necessary.

First, the hero is barely the hero. `hero-16` tops out at `text-8xl`, but
`contact-2` reaches `text-7xl` and four sections (`showcase-4`, `features-1`,
`how-it-works-4` and `social-proof-6`) reach `text-6xl`. Meanwhile `social-proof-3`
tops out at `text-4xl` and `footer-3` at `text-2xl`. The page has no single
dominant statement, and the contact section competes with the hero for it. Worse,
`social-proof-3` and `social-proof-6` sit near each other yet render their headings
two full steps apart.

Second, the vertical rhythm is broken. The set ships `py-12` on most sections,
`py-16` on `social-proof-6`, `contact-2` and `features-1`, and `py-6` on
`footer-3`. The gap between sections jumps with no logic behind it.

Third, four radius vocabularies plus a width drift. `social-proof-3` leans on
`rounded-3xl`, `hero-16` and `features-1` on `rounded-xl`, `how-it-works-4` on
`rounded-md`, and `navigation-13`, `showcase-4`, `about-1`, `social-proof-6` and
`contact-2` on `rounded-full`. On top of that, `showcase-4` and `how-it-works-4`
constrain inner content to `max-w-3xl` while `hero-16` uses `max-w-4xl`, so the
text column changes width as the visitor scrolls.

### 5.1 Type

Impose one scale on the whole page:

- Hero headline, used exactly once: `text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight`
- Section heading (h2): `text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight`
- Card, step or column title (h3): `text-lg sm:text-xl font-medium`
- Lead paragraph under a section heading: `text-base sm:text-lg leading-relaxed`
- Body and card copy: `text-sm sm:text-base leading-relaxed`
- Eyebrow label: `text-xs font-medium uppercase tracking-[0.08em]`

The hero headline is the largest type on the page. No section heading, footer
wordmark, statistic or CTA may match or exceed it. This recipe's raw set violates
that on both ends: `contact-2` at `text-7xl` and four sections at `text-6xl` crowd
the hero, while `social-proof-3` and `footer-3` drop too far below the scale.

An agency hero may run larger than the shared scale if the studio's brand calls
for it. If you keep `hero-16` at `text-7xl` or `text-8xl`, that is allowed, but
then every other section must still step down to the section-heading scale
(`text-3xl sm:text-4xl lg:text-5xl`), and you must apply that step explicitly. The
rule is the ratio between hero and section heading, not the absolute size.

One weight family. Use `font-medium` for all display type and headings,
`font-semibold` only for emphasis inside running copy, and never `font-bold`. Add
`tracking-tight` to every heading at `text-3xl` and above; leave default tracking
below. One typeface for the whole page: if a block ships a second family, remove
it.

| Block | Max heading ships | Should become |
|-------|-------------------|---------------|
| `navigation-13` | `text-5xl` | nav links stay small, no display heading |
| `hero-16` | `text-8xl` | hero scale (or kept larger per brand) |
| `showcase-4` | `text-6xl` | section-heading scale |
| `features-1` | `text-6xl` | section-heading scale |
| `how-it-works-4` | `text-6xl` | section-heading scale |
| `about-1` | `text-5xl` | section-heading scale |
| `social-proof-6` | `text-6xl` | section-heading scale |
| `social-proof-3` | `text-4xl` | section-heading scale (step up) |
| `contact-2` | `text-7xl` | section-heading scale (step down) |
| `footer-3` | `text-2xl` | footer wordmark and small type, not a section heading |

### 5.2 Colour

Exactly two section backgrounds: base `bg-white dark:bg-neutral-950` and recessed
`bg-neutral-50 dark:bg-neutral-900`. Nothing else. Never place two recessed
sections next to each other; use the recessed tone to group a cluster that argues
one point. For this recipe's order, keep the hero, work grid and services on the
base tone, drop `how-it-works-4` and `about-1` onto the recessed tone as a paired
"how we work / who we are" cluster, return to base for the logos and testimonials,
and recess `contact-2` so the enquiry reads as a distinct destination. That
alternation stops the page banding and gives the process-and-team pair a reason to
sit together.

One card surface: `bg-neutral-100 dark:bg-neutral-800`. One border pair:
`border-neutral-200 dark:border-neutral-800`. Exactly three text tones: primary
`text-neutral-900 dark:text-white`, secondary `text-neutral-600 dark:text-neutral-400`,
tertiary `text-neutral-500`. One accent colour, on the primary enquiry CTA only,
repeated at most once elsewhere; everything else stays neutral. On an agency site
the work samples in `showcase-4` supply all the colour the page needs, so the
chrome must stay neutral or it will fight the portfolio images. Every colour class
needs its `dark:` counterpart.

### 5.3 Layout

One section rhythm: `py-16 sm:py-20 lg:py-24`. Two exceptions only: the nav at
`py-4`, and a logo or client strip sitting directly under the hero at
`py-10 sm:py-12` so it reads as attached to the hero. Here that means converting
the shipped paddings: `hero-16`, `showcase-4`, `about-1`, `social-proof-3` and
`footer-3` ship `py-12`; `features-1`, `social-proof-6` and `contact-2` ship
`py-16`; `footer-3` also carries a `py-6`. Normalise all body sections to the
rhythm, set `navigation-13` to `py-4`, and if you keep `social-proof-6` as a client
strip under the hero, give it `py-10 sm:py-12`.

Every section's outer container: `max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8`.
One inner measure for centred intro copy: `max-w-2xl`. Fix the drift by name:
`showcase-4` and `how-it-works-4` constrain to `max-w-3xl` and `hero-16` to
`max-w-4xl`; bring all three to `max-w-2xl` so the text column holds one width down
the page.

Choose left-aligned or centred section headers for the whole page and apply it
everywhere; mixed alignment is the clearest tell of an assembled page. Use
left-aligned here: it suits an editorial agency page and keeps the eye on the work
rather than on centred marketing copy.

Two radius families maximum: `rounded-xl` for cards and panels, `rounded-lg` for
controls, inputs and buttons. `rounded-full` survives only for avatars, logo chips
and icon dots. Convert `social-proof-3`'s `rounded-3xl` panels and
`how-it-works-4`'s `rounded-md` cards to `rounded-xl`, and reserve the
`rounded-full` used by `navigation-13`, `showcase-4`, `about-1`, `social-proof-6`
and `contact-2` for pills and avatars only, moving their card and panel corners to
`rounded-xl`.

### 5.4 Motion and scroll

Only the nav and the hero may animate on mount. Everything below the fold reveals
on scroll. The failure mode is concrete: a mount animation on a lower section fires
while the user is still reading the hero, so by the time they scroll to it the
animation has already finished and the section just sits there flat.

This recipe is in better shape than most: seven of its ten blocks already use
`whileInView`. Only one below-the-fold block still animates on mount and must be
converted: `about-1`. (`navigation-13` and `hero-16` are allowed to stay on mount.)
The rest of the work is not converting blocks, it is normalising the settings of
the seven that already animate so they agree with each other.

Convert `about-1` like this: replace the `animate` prop with `whileInView` and add
the shared viewport.

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

One reveal for the whole page: `initial={{ opacity: 0, y: 20 }}`,
`whileInView={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.5, ease: "easeOut" }}`,
with `viewport={{ once: true, margin: "-80px" }}`. Both `y: 20` and duration `0.5`
are already the library's most common values, so this is the least invasive
normalisation available.

Stagger with `delay: Math.min(index, 5) * 0.06` so a section finishes revealing
within 500ms. Blocks shipping absolute delays up to 0.6s must be converted to this
cap. Never stagger a long grid item by item: that matters most for `showcase-4`,
where a portfolio grid can hold many items and a per-item stagger drags the reveal
past a second.

One motion idea per section: never combine parallax, stagger and a counter in the
same section. At most one scroll-linked (`useScroll`) section on the whole page.
Reduced motion: fewer than a third of blocks handle it, so add `useReducedMotion()`
and collapse to an opacity-only fade when it returns true.

### 5.5 Scroll opportunities worth taking

These are where these specific blocks can shine. Take at most two for the whole
page; the value is in restraint.

- The nav gains a solid or blurred background once the hero has scrolled past.
- `showcase-4` work samples reveal with a small scale-up (1.02 to 1) alongside the
  fade, which reads as film rather than as a UI animation.
- A sticky case-study title while a long `showcase-4` item scrolls past.
- Progressive step reveal tied to scroll for `how-it-works-4`.
- A small parallax on the `hero-16` visual, 40px of travel at most.

Doing all five produces a page that feels busier, not better. On an agency site an
over-animated page reads as a template, the opposite of what the work must prove.

### 5.6 Verifying the pass

Count these after the pass. Each has an expected number:

- Distinct section-heading sizes: 1.
- Distinct section paddings: 2, plus the nav.
- Distinct outer container widths: 1.
- Distinct inner measures for intro copy: 1.
- Radius families: at most 2.
- Text tones: 3.
- Section backgrounds: at most 2.
- Mount-animated sections below the fold: 0.
- Animated elements with no reduced-motion fallback: 0.

If any count is off, the pass is not finished.

## 6. Adapting the result

**Design-led studio**
- Lead `showcase-4` with visual work; pair with `skill-luxury-serif` or `skill-editorial`.
- `features-1` services read as craft outcomes.

**Engineering-led studio**
- Reframe `showcase-4` tiles around outcomes and stacks shipped, not screenshots.
- Add a `stats` block after the work for delivery metrics (uptime, ship cadence) if
  they are real; keep the enquiry as the conversion.

**Shortening the page**
Cut in this order: `social-proof-6`, `how-it-works-4`, `about-1`. Never cut the hero,
the selected work, or the enquiry form; those three are the studio's entire pitch.

**Lengthening the page**
Add a `blog` block for the studio journal, or a second `showcase` for a different
discipline. Never a pricing block and never a second hero.

## 7. Pairing with a skill

The block set defines *structure*; the skill defines *appearance*. Run both.

- `skill-editorial`: expect a strong type hierarchy, asymmetric layout, and generous
  whitespace; the statement hero `hero-16` and the work grid `showcase-4` were chosen
  because they carry that treatment without fighting it.
- `skill-luxury-serif`: expect a serif display face, restrained palette, and slow,
  deliberate motion; strip the stock blocks' pill badges and heavy shadows.
- Any skill's anti-pattern list overrides a block's default styling. When they
  conflict, edit the block.

After assembly, run the skill's self-verification loop **and** this recipe's checklist
(§9).

## 8. Working without React Bits Pro

If the registries are not configured, this recipe still works as a structural prompt:
build each numbered role as a hand-written section in the same order, with the same
content plan and conversion goal. The `fallback` field in `plan.json` describes each
role's minimum viable structure (a split nav, a statement hero, a work grid, a
services grid, a process list, a team section, a logo wall, a testimonial, an enquiry
form, and a footer) so the narrative spine survives even without the blocks.

## 9. Completion checklist

- [ ] Block order matches `plan.json`. No sections added, none reordered.
- [ ] Every placeholder string from every block has been replaced.
- [ ] Nothing on the page is invented: no fake clients, logos, quotes, or case studies.
- [ ] `social-proof-6` and `social-proof-3` were removed if the content was not real.
- [ ] One enquiry CTA label, used verbatim in nav, hero, and contact section.
- [ ] There is no pricing block and no signup on the page.
- [ ] Selected work appears before any persuasion copy.
- [ ] Services are framed as outcomes the buyer wants, not a list of deliverables.
- [ ] The enquiry form asks enough to qualify and states who replies and how fast.
- [ ] Every footer and nav link resolves.
- [ ] The applied skill's self-verification loop passes with zero anti-pattern hits.
- [ ] Verified at 375, 768, 1024, 1440.
- [ ] One `<h1>`; sections labelled; forms have labels and real validation messages.
- [ ] AA contrast in both themes.
