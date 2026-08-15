---
name: apple-minimal
description: "Build product landing pages with Apple's restraint: one idea per viewport, a giant type scale, generous negative space, and the product as the only hero. Use when the user asks for an Apple-like, minimal, premium or product-first landing page, names Apple, Linear, Vercel or Stripe as a reference, wants a very large hero type scale with generous whitespace, or asks to make a page feel expensive and uncluttered."
---

# Apple Minimal

A landing-page system built on **subtraction**. Every rule below exists to remove
something: a colour, a font size, a border, a word, a section. The style's power
comes from what is *not* on the page.

The failure mode you are guarding against is the "Apple-inspired" page that is
actually a generic SaaS template with more white space. That page has a pill badge,
a gradient headline, a three-column feature grid with lucide icons in rounded
squares, and glass cards. None of those belong here. Read the anti-patterns section
(§13) before you write a single line.

## 1. The core idea

> One page. One product. One idea per screen.

An Apple product page is a **sequence of full-viewport statements**, not a stack of
content blocks. Each screen makes exactly one claim, supports it with one visual,
and then gets out of the way. The reader scrolls through the argument the way they
would turn pages, not the way they would skim a brochure.

Three consequences that drive every other rule:

1. **Sections are tall.** A section that fits three ideas is three sections.
2. **Type is huge or small. Nothing in between.** The headline is the section.
   Body copy is deliberately quiet and short.
3. **The product is the only decoration.** If a visual element is not the product,
   a photograph of the product, or type, it probably should not exist.

## 2. Page architecture

The canonical order. Adapt the middle; do not reorder the ends.

| # | Section | Height | Purpose |
|---|---------|--------|---------|
| 1 | Nav | `56–64px` fixed | Get out of the way. Product name, 4–6 links, one action. |
| 2 | Hero | `100vh` (or `88vh` min) | Product name, one-line claim, the product image. |
| 3 | Statement | `100vh` | The single biggest idea, as a headline the size of the viewport. |
| 4–7 | Feature screens | `100vh` each | One capability per screen, alternating visual side. |
| 8 | Technical detail | `auto`, dense | The only place density is allowed: specs, numbers. |
| 9 | Comparison / lineup | `auto` | Optional. Only if there is a real product family. |
| 10 | Closing CTA | `70–100vh` | Restate the product name. One action. |
| 11 | Footer | `auto`, small type | Legal, sitemap, quiet. |

**Rule of thumb:** a 6-screen page with a genuine idea per screen beats a 12-screen
page with filler. Cut sections before you shrink them.

## 3. Type scale

This is the single most identifying feature of the style. Agents consistently get
it wrong by using a timid scale (`text-4xl` headlines, `text-lg` body). Do not.

Build the scale on a **ratio of 1.5 at the top and 1.2 at the bottom**, with big jumps
between display sizes, small jumps between text sizes.

| Token | Desktop | Mobile | Weight | Tracking | Leading | Use |
|-------|---------|--------|--------|----------|---------|-----|
| `display-xl` | `clamp(64px, 9vw, 140px)` | `44px` | 600 | `-0.035em` | `0.95` | Hero product name, statement headline |
| `display-l` | `clamp(48px, 6vw, 88px)` | `36px` | 600 | `-0.03em` | `1.02` | Section headlines |
| `display-m` | `clamp(32px, 3.5vw, 52px)` | `28px` | 600 | `-0.025em` | `1.08` | Feature headlines |
| `body-l` | `21px` | `19px` | 400 | `-0.01em` | `1.5` | Lead paragraph under a headline |
| `body` | `17px` | `17px` | 400 | `0` | `1.55` | Standard copy |
| `caption` | `13px` | `12px` | 400 | `0` | `1.4` | Footnotes, disclaimers, legal |

**Hard rules:**

- **The gap between headline and body must be at least 3 steps.** A `display-l`
  headline sits above `body-l` copy, never above `display-m`.
- **Never use font weights 700+.** Apple-minimal reads as *semibold at large size*,
  never bold. `font-semibold` (600) is the ceiling; `font-medium` (500) for UI.
- **Negative tracking scales with size.** At 100px+, `-0.035em`. At 17px, `0`.
  Positive letter-spacing appears nowhere except all-caps eyebrows (see below).
- **Leading tightens as size grows.** 140px type at `leading-[0.95]`; 17px at
  `leading-[1.55]`.
- **Max line length for body copy: 60 characters** (`max-w-[38ch]`). Headlines can
  and should break onto 2–3 lines. Control it with explicit `<br />` at `lg:` and
  a balanced wrap (`text-balance`) below.
- **One typeface.** A neutral grotesque with real optical sizing. Inter, Geist, SF
  Pro, or Helvetica Now. Never pair two families. Never use a serif for accent.

**Eyebrow text** (the small label above a headline) is the *only* place all-caps
appears: `11px`, `500`, `tracking-[0.08em]`, `uppercase`, in the secondary text
colour. Use it at most twice per page. It is not a pill, not a badge, not
bordered, not on a coloured background. It is plain text.

## 4. Spacing system

Everything is a multiple of **8px**. Everything.

| Relationship | Desktop | Mobile |
|---|---|---|
| Section vertical padding | `160–240px` | `96–120px` |
| Headline → lead paragraph | `24px` | `20px` |
| Lead paragraph → CTA | `40px` | `32px` |
| Between stacked feature rows | `160px` | `96px` |
| Inside a spec table row | `24px` | `20px` |
| Horizontal gutter | `max(24px, (100vw - 1400px) / 2)` | `24px` |

**The rhythm rule:** the space *between* two sections must be larger than the space
between any two elements *inside* a section, by at least 3×. This is what makes a
page read as discrete statements instead of a scroll of content.

**The 2:1 rule for headline blocks:** the space above a headline is roughly twice
the space below it, so the headline visually belongs to the content that follows.

Content container: `max-w-[1400px] mx-auto`. Text-only sections narrow further to
`max-w-[900px]` for centred statements or `max-w-[38ch]` for paragraphs.

## 5. Colour

Two neutrals. The product supplies every other colour.

```
Light mode
  Background        #FFFFFF
  Alternate section #F5F5F7   (never a third grey)
  Text primary      #1D1D1F
  Text secondary    #6E6E73
  Hairline          #D2D2D7
  Action            #0071E3   (one accent, links + primary button only)

Dark mode
  Background        #000000   (true black, not #0A0A0A)
  Alternate section #101010
  Text primary      #F5F5F7
  Text secondary    #86868B
  Hairline          #2A2A2C
  Action            #2997FF
```

**Hard rules:**

- **Alternating section backgrounds are the only "layout" device.** White → grey →
  white. Never three tones, never a gradient between them.
- **The accent colour appears on the primary button and text links. Nowhere else.**
  No accent-coloured icons, headings, borders, underlines, or highlights.
- **No gradients on text, ever.** No gradients on backgrounds except a single,
  nearly-invisible radial behind a hero product shot (and only if the product photo
  needs separation from the background).
- **Borders are hairlines:** `1px` at the hairline colour, used to separate table
  rows and the footer. Cards do not get borders (because there are no cards).
- **Dark mode is a different design, not an inversion.** In dark mode the product
  photography must be shot/masked on black. If you only have light-background
  product images, do not offer a dark mode.

## 6. Grid and containers

- **Hero and statement sections: single column, centred, `max-w-[900px]`.**
- **Feature screens: 2 columns (`grid lg:grid-cols-2`), text one side, visual the
  other, alternating direction each screen.** Column gap `80–120px`.
- **Spec tables: 2 or 3 columns, hairline-separated rows, no zebra striping, no
  card wrapper.**
- **Never a 3-up or 4-up feature card grid.** This is the single most common way an
  agent destroys the style. If you have three features, they are three full
  sections, or one section with three hairline-separated rows.

Vertical alignment inside a 2-column feature screen is `items-center` on desktop;
on mobile the visual goes *below* the text, and both align to `items-start`.

## 7. Navigation

- Height `56px` (`64px` desktop). Fixed. `backdrop-blur-xl` with a
  `bg-white/72` / `bg-black/72` fill and a hairline bottom border that only
  appears once the page has scrolled past `12px`.
- **Type size `12–13px`, weight 400, secondary colour, primary colour on hover.**
  Nav links are deliberately *small*. Agents make them `text-sm font-medium`, and
  they are too loud.
- Left: product name only (not a logo lockup with a wordmark and a tagline).
  Centre or right: 4–6 links max. Far right: one action.
- **No mega-menus. No dropdown with icons and descriptions. No search field in the
  nav.** If you need more than 6 links you are building the wrong page.
- Mobile: a single sheet that slides down from the nav, full width, links stacked at
  `display-m` size. The mobile menu is one of the few places type gets big.

## 8. Hero

The hero is the product name, one sentence, and the product. Nothing else.

```
[eyebrow: optional, at most 3 words]
[Product name: display-xl]
[One sentence claim: display-m, secondary colour, max-w-[24ch]]
[Two links: primary action + "Learn more ›"]
[Product visual: full-bleed or max-w-[900px], centred]
```

**Rules:**

- **The claim is a sentence, not a value proposition.** "Titanium. So strong. So
  light. So Pro." not "The all-in-one platform for modern teams."
- **Two actions maximum**, and the secondary is a text link with a `›` glyph, not
  an outlined button.
- **No trust bar, no logo strip, no "as seen in", no star rating, no
  "trusted by 10,000 teams" in the hero.** Social proof, if it exists at all, goes
  far down the page.
- **No screenshot in a browser chrome mockup, no floating device frames at an
  angle, no 3D-tilted dashboards.** The product is photographed straight-on or
  rendered straight-on.
- The product visual should be the largest element on the screen and should be
  allowed to touch or exceed the viewport edges.

## 9. Feature screens

Each feature screen is one capability. The pattern:

```
[eyebrow: the capability name, optional]
[display-l headline: the benefit, 3–8 words]
[body-l paragraph: 1–2 sentences, max 45 words, secondary colour]
[optional single text link]
[one visual]
```

**Rules:**

- **One paragraph. Never a bulleted list of sub-features.** If you need bullets,
  the feature is actually three features and needs three screens, or it belongs in
  the technical-detail section.
- **The headline states a benefit in plain words, not a feature name.** "All-day
  battery. And then some." not "Advanced Power Management".
- Alternate the visual side every screen. Do not alternate the background colour on
  every screen too. That produces a stripey page. Change background at most 2–3
  times on the whole page.
- Numbers get their own treatment: a stat is `display-l` weight 600 with the unit at
  `display-m`, and a `caption` label beneath. Never inside a bordered card.

## 10. Motion

Motion in this style is **arrival, not attention**. Nothing loops. Nothing bounces.
Nothing draws the eye to itself.

**The only three motions you need:**

1. **Scroll-in reveal:** content enters on first view, once.
   ```tsx
   <motion.div
     initial={{ opacity: 0, y: 24 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true, margin: "-15% 0px" }}
     transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
   />
   ```
   `y` is **24px max**. Agents use 40–60px, which reads as a cheap slide-up.

2. **Staggered line reveal for headlines:** split on lines (never letters), 60ms
   between lines, same easing.

3. **Sticky scroll-scrub for one hero visual:** the product pins for `~150vh` while
   a single property changes (scale `1 → 1.15`, or a rotation of a product render).
   **Once per page.** Use `useScroll` + `useTransform`, and clamp the transform.

**Timing constants:**

| Interaction | Duration | Easing |
|---|---|---|
| Scroll reveal | `800ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Hover state | `200ms` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Nav background | `300ms` | `linear` |
| Mobile sheet | `400ms` | `cubic-bezier(0.32, 0.72, 0, 1)` |

**Never:** parallax on more than one element, magnetic buttons, cursor followers,
text scrambles, marquees, count-up numbers that re-trigger, blur-in text, tilt on
hover, spring bounce (`bounce > 0`) on anything that was not dragged.

Wrap everything in a reduced-motion guard:

```tsx
const reduce = useReducedMotion();
const reveal = reduce
  ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
  : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } };
```

## 11. Imagery and media

- **Product photography on a seamless background** (the section background colour),
  no drop shadows, no reflections, no floor planes.
- If you do not have product photography, use a neutral placeholder image in a
  correctly proportioned container. **Do not fabricate a UI screenshot in markup.**
- Video: muted, looped, `playsInline`, poster frame set, and it must start when it
  enters the viewport, never autoplay off-screen.
- Images are `object-contain` on a matching background, not `object-cover` in a
  rounded card.
- Corner radius: `0` for full-bleed media, `18px` for contained media, `12px` for
  buttons and small surfaces. Never `rounded-3xl` on a photo. Never `rounded-full`
  on anything except an avatar or a genuinely circular product.

## 12. Buttons and links

```tsx
{/* Primary: the only filled element on the page */}
<a className="inline-flex items-center rounded-full bg-[#0071E3] px-6 py-3 text-[17px] font-normal text-white transition-colors duration-200 hover:bg-[#0077ED]">
  Buy
</a>

{/* Secondary: a text link, not an outlined button */}
<a className="inline-flex items-center gap-1 text-[17px] text-[#0071E3] transition-opacity duration-200 hover:opacity-70">
  Learn more <span aria-hidden="true">›</span>
</a>
```

- Primary buttons are `rounded-full`, filled with the single accent, `17px`,
  **weight 400** (not medium, not semibold), horizontal padding `24px`.
- There is **one** primary button per section, at most **three** on the page.
- **No outlined/ghost button pairs.** The secondary action is always a text link.
- No icons inside buttons except a `›` chevron glyph on text links.

## 13. Anti-patterns: what makes a page fail this style

Everything in this list is something an AI agent does by default. Each one alone is
enough to break the style.

**Layout**
1. A three- or four-column feature card grid.
2. Cards at all: bordered, shadowed, or `bg-muted` rounded rectangles.
3. Sections shorter than `py-24`; a page where 5 sections fit in 2 viewports.
4. A "bento grid".
5. Alternating background colour on *every* section.
6. A sticky sidebar or table of contents.
7. Content wider than `1400px`, or a `max-w-7xl` container.

**Typography**
8. Gradient text on a headline. Never, under any circumstances.
9. `font-bold` or `font-extrabold` headlines.
10. Headline at `text-4xl` / `text-5xl` and body at `text-lg`: a compressed scale.
11. Positive letter-spacing on large type.
12. Two typefaces, or a serif accent font.
13. All-caps anything except the eyebrow.
14. Text-shadow.

**Decoration**
15. A pill badge above the hero headline ("✨ Now with AI").
16. Glassmorphism / `backdrop-blur` on anything except the nav bar.
17. Emoji as icons, or lucide icons inside rounded-square coloured tiles.
18. Grid-pattern or dot-pattern background overlays.
19. Animated gradient blobs, aurora backgrounds, mesh gradients.
20. Noise/grain texture overlays.
21. Decorative borders, corner brackets, crosshair marks, `+` glyphs at grid
    intersections.
22. Coloured glows behind elements.

**Content**
23. A logo cloud / "trusted by" strip in or near the hero.
24. Star ratings, review counts, or "10,000+ users" in the hero.
25. Feature lists with checkmark bullets.
26. A "How it works" numbered 1-2-3 section with circular step badges.
27. Testimonial cards with avatars in a carousel.
28. A newsletter signup mid-page.
29. Marketing-speak headlines ("Supercharge your workflow", "The all-in-one
    platform for…", "Built for modern teams").

**Motion**
30. Anything that loops or repeats.
31. Text that animates letter-by-letter.
32. Hover tilt / 3D card transforms.
33. Magnetic or cursor-following elements.
34. Count-up number animations.
35. Parallax on more than a single element.

**Colour**
36. More than one accent colour.
37. Accent-coloured headings or icons.
38. A dark mode produced by inverting the light mode with light-background product
    photos left untouched.

## 14. Responsive behaviour

- **Mobile is not a squeezed desktop; it is the same argument at a different
  cadence.** Sections stay full-viewport, type drops roughly 35%, section padding
  drops ~45%.
- 2-column feature screens collapse to a single column with the **text first**, the
  visual second, both left-aligned (`items-start`). Centred text on mobile causes
  ragged, hard-to-scan blocks.
- Hero type: `clamp()` handles the range; verify at 375px that the product name
  fits on at most two lines.
- Touch targets `44×44px` minimum.
- Sticky scroll-scrub sections **must be disabled below `lg`**: replace with a
  static image. Pinned sections on mobile are a scroll trap.
- Test at 375, 768, 1024, 1440, 1920, and 2560. At 2560 the container caps and the
  gutters grow; type does *not* keep scaling.

## 15. Accessibility

- Contrast: `#6E6E73` on `#FFFFFF` is 4.6:1. It passes AA for body text but **fails
  for text below 17px**. Never use secondary colour on `caption` size against a
  grey section background.
- Every section is a `<section>` with an `aria-labelledby` pointing at its headline.
  Exactly one `<h1>` (the hero product name); feature headlines are `<h2>`.
- The `›` chevron in links is `aria-hidden`; the link text carries the meaning.
- Focus rings are visible and use the accent colour at `2px` offset `2px`. Do not
  remove them because they "break the minimalism".
- Video has captions or is decorative with `aria-hidden` and no audio.
- Full `prefers-reduced-motion` path: reveals become instant, scroll-scrub becomes
  a static frame, video does not autoplay.

## 16. Performance

- The hero visual is the LCP element. Preload it, serve AVIF/WebP, set explicit
  `width`/`height`, and mark it `priority` / `fetchpriority="high"`.
- **Budget: LCP < 2.0s, CLS < 0.05, total page weight < 1.5MB** on a product page
  with 6 images.
- Lazy-load every section below the second viewport (`next/dynamic` for anything
  carrying a heavy library).
- Only animate `transform` and `opacity`. Add `will-change: transform, opacity` on
  scroll-scrubbed elements and **remove it after the animation completes**.
- No layout-shifting font swap: `font-display: swap` with a metric-matched
  fallback, or `size-adjust` in `@font-face`.
- If a section uses a sticky scroll-scrub, throttle to `requestAnimationFrame` and
  read scroll progress from a single shared `useScroll`, not one per element.

## 17. Implementation notes

Tailwind token setup, so the scale is used consistently:

```css
@theme {
  --text-display-xl: clamp(2.75rem, 9vw, 8.75rem);
  --text-display-l:  clamp(2.25rem, 6vw, 5.5rem);
  --text-display-m:  clamp(1.75rem, 3.5vw, 3.25rem);
  --text-body-l:     1.3125rem;
  --text-body:       1.0625rem;
  --text-caption:    0.8125rem;

  --color-ink:       #1D1D1F;
  --color-ink-muted: #6E6E73;
  --color-hairline:  #D2D2D7;
  --color-surface-2: #F5F5F7;
  --color-action:    #0071E3;

  --ease-out-quint: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Section shell:

```tsx
<section
  aria-labelledby="battery"
  className="flex min-h-screen items-center px-6 py-40 md:py-56"
>
  <div className="mx-auto grid w-full max-w-[1400px] items-center gap-20 lg:grid-cols-2 lg:gap-28">
    <div className="max-w-[38ch]">
      <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
        Battery
      </p>
      <h2 id="battery" className="text-display-l font-semibold leading-[1.02] tracking-[-0.03em] text-balance">
        All-day battery.<br />And then some.
      </h2>
      <p className="mt-6 text-body-l leading-[1.5] text-ink-muted">
        Up to 22 hours of video playback, so the charger stays in the drawer.
      </p>
    </div>
    <div className="relative aspect-square w-full">{/* product visual */}</div>
  </div>
</section>
```

Sticky scroll-scrub (use **once**):

```tsx
const ref = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start start", "end start"],
});
const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

<div ref={ref} className="relative h-[250vh]">
  <div className="sticky top-0 flex h-screen items-center justify-center">
    <motion.div style={{ scale }} className="will-change-transform">
      {/* product visual */}
    </motion.div>
  </div>
</div>
```

## 18. Pairs well with React Bits Pro (optional)

You do **not** need React Bits Pro to use this skill. Build components from
scratch if the project has none installed. If the project *does* have the
`@reactbits-pro` and `@reactbits-starter` registries configured, these accelerate
the build without fighting the style:

- `@reactbits-starter/cascade-type-tw`: line-level headline reveals (§10.2).
- `@reactbits-starter/depth-rise-tw`: the single scroll-scrub moment (§10.3).
- `@reactbits-pro/hero-2`, `@reactbits-pro/showcase-3`: restrained, near-compliant
  section shells. Strip any pill badge and card wrapper before use.

Ignore this section entirely if the registries are not configured. Never add a
dependency on them.

## 19. Self-verification loop

Before you report the page as complete, **re-read the rendered output and check
every item**. If any check fails, fix it and run the loop again. Do not report
completion with known failures.

**Composition**
- [ ] Every section makes exactly one claim. No section contains two ideas.
- [ ] No section is shorter than `py-24` on mobile / `py-40` on desktop.
- [ ] There is no 3-up or 4-up card grid anywhere on the page.
- [ ] There are no cards, bordered boxes, or `bg-muted` rounded rectangles.
- [ ] Background alternates at most 3 times on the whole page.

**Typography**
- [ ] The headline-to-body size ratio is at least 2.5×.
- [ ] No font weight above 600 appears anywhere.
- [ ] Large type has negative tracking; only the eyebrow is uppercase.
- [ ] Exactly one typeface is loaded.
- [ ] No headline uses gradient text.
- [ ] Body paragraphs are under 60 characters per line.

**Colour**
- [ ] Exactly two neutral backgrounds and one accent colour are in use.
- [ ] The accent appears only on the primary button and text links.
- [ ] No gradient, glow, mesh, aurora, noise, or pattern overlay exists.

**Motion**
- [ ] Nothing loops. Nothing repeats on re-scroll.
- [ ] Reveal distance is ≤ 24px; duration is 600–900ms with an ease-out quint.
- [ ] At most one scroll-scrubbed element on the page, disabled below `lg`.
- [ ] `prefers-reduced-motion` produces a fully static, complete page.

**Anti-patterns (§13)**
- [ ] Re-read the full anti-pattern list against the rendered page. Zero hits.
- [ ] Specifically confirm: no pill badge, no glassmorphism outside the nav, no
      emoji icons, no logo cloud in the hero, no "how it works" step circles.

**Generic-AI smell test**
- [ ] Could this page be re-skinned into any other SaaS landing page by swapping
      the colour token? If yes, it is generic. The composition is wrong, not the
      colours.
- [ ] Does any headline contain "supercharge", "seamless", "all-in-one",
      "revolutionize", "unlock", or "built for modern teams"? Rewrite it.
- [ ] Would a reader who scrolled only the headlines understand the product? If
      not, the headlines are describing features instead of stating benefits.

**Responsive, a11y, performance**
- [ ] Verified at 375, 768, 1024, 1440, 2560.
- [ ] Mobile is left-aligned, text before visual, sticky sections disabled.
- [ ] One `<h1>`; sections labelled; focus rings visible; contrast passes AA.
- [ ] LCP image preloaded with explicit dimensions; only transform/opacity animate.

**Cohesion**
- [ ] Read the page top to bottom as prose. Does it argue one case, or list
      features? It must argue.
