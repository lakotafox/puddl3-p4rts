---
name: neobrutalism
description: "Build loud neobrutalist landing pages with 3px black borders, hard offset shadows with zero blur, saturated flat colour blocks, and chunky type that physically moves when you press it. Use when the user asks for a brutalist, neobrutalist, bold, loud, playful or retro-web look, mentions thick black borders, hard offset shadows with no blur, or saturated flat colour blocks, or wants a page with strong personality rather than restraint."
---

# Neobrutalism

A landing-page system built on **visible structure and physical weight**. Every
border is declared, every shadow is a hard slab of colour with no blur, and every
interactive element behaves like a real object you can push into the page.

The failure mode you are guarding against is the page that *claims* to be
neobrutalist but is really a standard card-grid SaaS template with `border-2
border-black` bolted onto everything: soft `shadow-lg` instead of a hard offset,
`rounded-xl` on every surface, muted pastels instead of saturated colour, and
`font-bold` (700) where the style demands `font-extrabold` (800) or `font-black`
(900). It looks tidy and corporate. Neobrutalism is not tidy. It is deliberate,
structural, and loud.

Three things make or break it, and agents miss all three: the shadow is a **hard
offset with `0` blur**, the type is **heavier than you think** (800 floor, 900
for display), and interactive states **physically translate** the element by the
exact shadow offset. Read the anti-patterns (section 13) before writing a line.

## 1. The core idea

> Everything is a block. Every block has a border, a shadow, and weight.

A neobrutalist page is a **composition of solid, bordered rectangles** that stack
like cut paper on a desk. Depth comes not from blur or gradient but entirely from
a hard offset shadow that reads as a second copy of the shape shifted down and
right. Four consequences drive every other rule:

1. **Borders are non-negotiable.** Every meaningful surface - card, button,
   input, image, badge, nav - has a `2–4px` solid border, almost always black.
2. **Shadows are hard, never soft.** `box-shadow: Xpx Ypx 0 0 #000` - offset, `0`
   blur, `0` spread, solid colour. A blurred shadow is an instant failure.
3. **Colour is saturated and flat.** Fills are pure, high-chroma blocks. No
   gradients, no tints, no glass. Two to four saturated colours plus one
   near-white paper and near-black ink.
4. **Interaction is physical.** On hover the element lifts (shadow grows); on
   press it slams down (translates into the shadow, shadow shrinks to `0`).

## 2. Page architecture

Neobrutalism is happy being denser than minimalist styles - blocks can tile. But
density is not clutter: each block is a self-contained bordered unit with real
padding. Canonical order:

| # | Section | Height | Purpose |
|---|---------|--------|---------|
| 1 | Nav | `64–72px`, sticky, bottom border | Wordmark block, 3–5 links, one loud action button. |
| 2 | Hero | `auto`, `min-h-[80vh]` | Oversized headline, one-line claim, two buttons, a bordered visual block. |
| 3 | Logo / marquee strip | `auto` | Optional. A bordered scrolling band of labels, not a faded logo cloud. |
| 4 | Feature blocks | `auto` | 2–3 bordered blocks, asymmetric sizes, alternating fill colours. |
| 5 | Bento / stat grid | `auto` | Allowed here (unlike most styles) - uneven bordered tiles with hard shadows. |
| 6 | Showcase / how-it-works | `auto` | Numbered bordered steps or a bordered screenshot block. |
| 7 | Pricing | `auto` | Bordered cards, one lifted higher (larger shadow) as the highlighted tier. |
| 8 | Testimonial blocks | `auto` | Bordered quote cards on saturated fills, hand-placed at slight offsets. |
| 9 | CTA band | `auto` | A single full-width saturated colour block with a border top and bottom. |
| 10 | Footer | `auto` | Bordered, high-contrast, links in bold, no muted grey. |

**Deliberate asymmetry is structural, not decorative.** Blocks are different
sizes and do not all align to a tidy centre. A hero with the text block at `60%`
and the visual at `40%`, offset vertically, reads as neobrutalist; a symmetric
two-column split reads as a template.

## 3. Type scale

The second most identifying feature after the shadow. Agents cap out at
`font-bold` (700) and `text-5xl`; the style needs **heavier and bigger** - an
`800` display floor, `900` hero headlines.

| Token | Desktop | Mobile | Weight | Tracking | Leading | Use |
|-------|---------|--------|--------|----------|---------|-----|
| `display-xl` | `clamp(56px, 8vw, 112px)` | `40px` | 900 | `-0.03em` | `0.92` | Hero headline |
| `display-l` | `clamp(40px, 5vw, 72px)` | `32px` | 800 | `-0.02em` | `0.96` | Section headlines |
| `display-m` | `clamp(28px, 3vw, 44px)` | `24px` | 800 | `-0.01em` | `1.0` | Block / feature headlines |
| `label` | `13–15px` | `13px` | 700 | `0.04em` uppercase | `1.1` | Eyebrows, badges, tags, nav |
| `body-l` | `19px` | `17px` | 500 | `0` | `1.5` | Lead paragraph |
| `body` | `16–17px` | `16px` | 500 | `0` | `1.55` | Standard copy |
| `caption` | `13px` | `12px` | 600 | `0` | `1.4` | Meta, footnotes |

**Hard rules:**

- **The display floor is 800 (`font-extrabold`); the hero uses 900
  (`font-black`).** A `font-bold` (700) headline fails the style. Body copy is
  `font-medium` (500), never 400 - `400` reads too fragile against thick borders.
- **Tracking is tight on display, wide on labels.** Big type gets `-0.02em` to
  `-0.03em`; uppercase labels get `+0.04em`. Never positive tracking on a headline.
- **Leading is tight - down to `0.92`** on the hero so multi-line headlines stack
  into a solid block of type.
- **One or two families max.** A single heavy grotesque or geometric sans
  (Archivo, Space Grotesk, Satoshi, Inter heavy), optionally a monospace (JetBrains
  Mono, Space Mono) for labels and meta. Never a serif.
- **Headlines can be all-caps** when short (3–6 words); long headlines stay
  sentence case to remain readable.

**Eyebrow / badge** text is the `label` token: `13–15px`, `700`, `uppercase`,
`tracking-[0.04em]`, inside a bordered box with a saturated fill (a real badge
here, unlike minimalist styles) - use it to label sections and highlight new
features.

## 4. The border and shadow system

The engine of the entire style. Get the numbers exactly right.

**Borders:**

| Element | Border width | Colour | Radius |
|---|---|---|---|
| Cards, blocks, images | `3px` | `#000000` | `0` or `8px` (pick one, use everywhere) |
| Buttons | `3px` | `#000000` | `6–8px` |
| Inputs | `3px` | `#000000` | `6–8px` |
| Nav / section dividers | `3–4px` | `#000000` | `0` |
| Small tags / badges | `2px` | `#000000` | `4–6px` |

- **Border colour is `#000000` in light mode**, flipping to near-white
  (`#FAFAF5`) in dark mode - never grey. A grey border removes the contrast the
  style depends on.
- **Pick one corner radius and use it on every surface** - fully sharp
  (`rounded-none`) for the hardest look, or a consistent `8px` (`rounded-lg`).
  Never mix radii. Never `rounded-2xl`/`rounded-full` on cards (pills are fine for
  tags).

**Shadows - the defining mechanic.** The canonical shadow is offset, zero blur,
zero spread, solid: `box-shadow: 6px 6px 0 0 #000000`.

| Surface | Rest shadow | Tailwind arbitrary |
|---|---|---|
| Small tag / badge | `3px 3px 0 0 #000` | `shadow-[3px_3px_0_0_#000]` |
| Button | `4px 4px 0 0 #000` | `shadow-[4px_4px_0_0_#000]` |
| Card / block | `6px 6px 0 0 #000` | `shadow-[6px_6px_0_0_#000]` |
| Hero visual / highlighted tier | `8px 8px 0 0 #000` | `shadow-[8px_8px_0_0_#000]` |

- **Blur is always `0`. Spread is always `0`.** The shadow is a hard-edged
  duplicate of the shape. Any Tailwind blur-based shadow token (`shadow-lg`,
  `shadow-xl`) breaks the style.
- **Shadow direction is consistent** page-wide - almost always down and right
  (positive X, positive Y). Do not mix directions.
- **Shadow colour is the ink (`#000`)** by default. A coloured hard shadow
  (magenta under a yellow block) is an advanced move - use it on 1–2 hero accents,
  never everywhere.
- **Hover grows the shadow and lifts the element; press shrinks it to `0` and
  translates the element into where the shadow was.** Exact mechanic in section 10.

## 5. Colour system

Loud is not random. The palette is **one paper, one ink, and 2–4 saturated
accents**, each allocated to a role.

```
Light mode
  Paper (background)   #FAFAF5   (warm off-white, never pure #FFF)
  Ink (text + border)  #111111
  Accent 1 (primary)   #FFD400   (saturated yellow)
  Accent 2 (secondary) #2D5BFF   (electric blue)
  Accent 3 (tertiary)  #FF5C00   (orange) or #FF3EA5 (magenta)
  Accent 4 (optional)  #00C271   (green) - use sparingly

Dark mode
  Paper (background)   #14140F   (warm near-black)
  Ink (text + border)  #FAFAF5
  Accents stay the SAME saturated hues; only paper + ink flip
```

**Hard rules:**

- **Saturated, not pastel.** Pastel yellow (`#FEF3C7`), muted blue (`#93C5FD`),
  or `bg-*-100` tints are the most common way agents dilute this style into a soft
  "friendly SaaS" look. Use `bg-*-400`/`bg-*-500` intensity, or exact hex.
- **Colour is allocated by role, not sprinkled** - one accent for primary action,
  one for highlight blocks, one for decorative fill, reused so the page has a
  system, not confetti.
- **Fills are flat.** A gradient anywhere is an instant failure.
- **Text on a saturated fill is ink (`#111`), not white**, unless the fill is dark
  enough (blue, magenta) to need white for contrast (see section 15). Yellow and
  green blocks always take black text.
- **Paper is warm off-white**; `#FFFFFF` against black borders reads clinical.
- **At most 4 accents on a page**, typically 3. More turns confident into chaotic.

## 6. Grid and containers

- **Content container: `max-w-[1280px] mx-auto`** with `px-5 sm:px-8` gutters -
  slightly tighter than airy minimalist layouts.
- **Bento and asymmetric grids are encouraged** (the opposite of minimalist
  styles). Use `grid grid-cols-6`/`grid-cols-12` and span children unevenly
  (`col-span-4`, `col-span-2`, `col-span-8`) so blocks are different sizes.
- **Gaps are generous so shadows breathe.** Grid `gap-6` to `gap-8`, and the gap
  must exceed the largest shadow offset by at least `2px`, or a block's shadow
  overlaps the next block's border and reads as a bug.
- **Blocks can overlap intentionally** (a badge off a corner, a heading breaking
  its container) via negative margins - a deliberate move, not the default.
- **Alignment is intentionally imperfect.** Rotate a testimonial card `-2deg`,
  offset a stat block down `16px`. Two or three such moves per page; more is noise.
## 7. Navigation

- Height `64–72px`, sticky, with a **solid `3–4px` bottom border** (not a
  hairline, not shadow-on-scroll), present from the top of the page.
- **Solid paper or accent fill** - never transparent, never `backdrop-blur`.
  Glassmorphism is antithetical to this style.
- Left: a wordmark in `display-m` weight `800–900`, optionally in its own bordered
  shadowed box. Not a soft logo image.
- Centre/right: 3–5 links in the `label` token; on hover, a hard underline (`3px`
  solid ink) or a small translate, not a colour fade. Far right: one loud primary
  button.
- Mobile: a full-width bordered sheet (`3px` border, hard shadow), links stacked
  at `display-m` size. The toggle is a bordered square button, not a bare
  hamburger glyph.
- **No mega-menus, no dropdown panels with descriptions, no search field.** Any
  dropdown is a hard-bordered block with a `4px 4px 0 0` shadow, no blur, appearing
  instantly.

## 8. Hero

The hero is an oversized headline, a one-line claim, two buttons, and a bordered
visual block - arranged asymmetrically. Order: an optional bordered badge, a
`display-xl` (900) headline over 2–3 tight lines, a `body-l` claim
(`max-w-[46ch]`), two buttons, and a bordered visual block offset from the text
column.

- **The headline is the loudest thing in the viewport.** `display-xl` at 900
  weight, tight leading, black ink on paper - or ink on a saturated highlight span
  (a bordered marker-highlight box, not a gradient).
- **Two buttons, both real** (unlike minimalist styles): a primary saturated fill
  and a secondary paper fill, both bordered and hard-shadowed. No ghost secondary.
- **The visual block is a bordered container**, not a floating screenshot - a
  product image, illustration, solid colour, or bordered stat-card cluster with an
  `8px 8px 0 0` shadow, optionally rotated `-2deg` to `3deg`.
- **Asymmetry is required.** Text left at `~58%`, visual right at `~42%`,
  vertically offset. A symmetric centred hero is not this style.
- **No trust bar of faded grey logos** in the hero. Social proof, if shown, is a
  bordered marquee band with high-contrast labels.

## 9. Feature sections

Each feature is a bordered block. Unlike minimalist styles, a 2-up or 3-up grid
of blocks is **on-style here** - each block is a heavy bordered object with a
shadow, not a soft floating card. Per block: an icon or number in a bordered
saturated square, a `display-m` (800) headline, a 1–2 sentence body, and an
optional bordered link.

- **Blocks are different sizes when possible.** A feature section reads best as a
  bento: one large block at `col-span-8`, two small at `col-span-4`. Uniform tiles
  are allowed but less characterful.
- **Each block has its own fill.** Alternate saturated fills across blocks (one
  yellow, one blue, one paper) within the allocated palette.
- **Icons live in bordered squares** with a saturated fill and hard shadow - never
  a bare lucide icon in a soft rounded tile. Icon stroke is thick (`stroke-[2.5]`
  or `2.75`).
- **Numbers get weight.** A stat is `display-l` at 800–900 with the unit at
  `display-m` and a `label` caption, inside a bordered block.

## 10. Buttons and interactive states

The mechanic that makes the page feel physical. Get the exact px right.

```tsx
{/* Primary - saturated fill, hard shadow, translates on press */}
<button
  className="
    inline-flex items-center gap-2 rounded-lg border-[3px] border-black
    bg-[#FFD400] px-6 py-3 text-[16px] font-extrabold text-black
    shadow-[4px_4px_0_0_#000]
    transition-all duration-100 ease-[steps(1,end)]
    hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[6px_6px_0_0_#000]
    active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0_0_#000]
  "
>
  Get started
</button>
```

**The three states, exactly:**

| State | Transform | Shadow | Why |
|---|---|---|---|
| Rest | `translate 0,0` | `4px 4px 0 0 #000` | The object sits above the page. |
| Hover | `translate -1px,-1px` | `6px 6px 0 0 #000` | The object lifts - shadow grows. |
| Active/press | `translate +4px,+4px` | `0 0 0 0` | The object slams down into its own shadow. |

- **On press, translate by exactly the rest shadow offset** (`4px` here) and set
  the shadow to `0` - the element moves into where its shadow was. This "click
  into the page" is the single most important interactive detail. If pressing your
  button only changes its colour, you have not built neobrutalism.
- **Transitions are fast and stepped, not eased** - `duration-100` with `steps`
  or `linear`. A slow `duration-300 ease-in-out` makes the button feel gooey.
- **Every interactive element gets this treatment**: buttons, cards, nav links,
  inputs on focus. The **secondary button** is identical with a paper fill
  (`bg-[#FAFAF5]`) and ink text - no ghost/text variant.
- **Focus state** is visible: a `3px` ink outline offset `2px`, or the shadow
  appearing. Never remove focus rings.

## 11. Motion

Motion in neobrutalism is **snappy, stepped, and mechanical** - the opposite of
smooth eased motion. Things snap into place, they do not glide.

- **Short durations.** Interactive feedback is `80–120ms`; entrance reveals
  `250–400ms` max. Nothing takes `600ms+`.
- **Stepped or linear easing for interaction** (`steps(1, end)` or `linear`) so
  hover/press reads as a discrete flip. Entrance reveals may use a sharp ease
  (`cubic-bezier(0.2, 0.9, 0.3, 1)`), never a soft ease-in-out.
- **No smooth continuous motion** - no parallax drift, floating bob, or slow shifts.

**The motions you actually use:**

1. **Entrance pop** - blocks arrive with a small offset and settle fast.
   ```tsx
   <motion.div
     initial={{ opacity: 0, y: 16 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true, margin: "-10% 0px" }}
     transition={{ duration: 0.3, ease: [0.2, 0.9, 0.3, 1] }}
   />
   ```
   `y` is `16px` max. An optional 2-keyframe scale overshoot (`1 -> 1.03 -> 1`) at
   `250ms` gives a "stamp" feel. Never a spring bounce.

2. **Hover/press physical translate** - the shadow mechanic in section 10, where
   most of the page's life lives. Pure CSS transitions, not a JS library.

3. **Marquee band** - a horizontal scrolling strip of labels between borders at a
   constant `linear` speed. On-style here; pause on hover.

**Never:** eased `ease-in-out` on interactive states, spring bounce on anything
not dragged, fade-ins over `500ms`, letter-by-letter reveals, blur-in text,
cursor followers, tilt-on-hover 3D transforms, animated gradient blobs.

Wrap entrance motion in a reduced-motion guard:

```tsx
const reduce = useReducedMotion();
const reveal = reduce
  ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
  : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 } };
```

The hover/press translate may stay under reduced motion (it is discrete), or
reduce to a shadow-only change if you want to be strict.

## 12. Imagery treatment

- **Every image sits inside a bordered container** with a `3px` ink border and a
  hard shadow. A bare full-bleed photo with no frame is off-style.
- **Images can be flat and graphic**: bold illustrations, duotone treatments,
  high-contrast photography, or solid-colour blocks with a single icon. Avoid
  soft, hazy stock photography. A duotone / posterised treatment (mapped to two
  palette colours) is strongly on-style.
- **No drop shadows on the image itself, no soft glows, no `rounded-3xl`
  framing.** The frame is the border; the depth is the hard offset shadow.
- **Placeholders:** use `/svg/placeholder.svg` inside a bordered, shadowed,
  correctly-sized container. Do not fabricate a fake dashboard screenshot - use a
  bordered solid-colour block with a label. Match the page's corner radius.
- Icons are thick-stroke (`2.5`+), monoline, often inside bordered saturated
  squares. Never emoji as icons. Never gradient-filled icons.

## 13. Anti-patterns - what makes a page fail this style

Everything below is a default AI-agent move. Each one alone breaks the style.

**Composition / structure**
1. A perfectly symmetric, centred layout with no deliberate asymmetry or offset.
2. Uniform equal-size tiles everywhere with no size variation between blocks.
3. Grid gaps smaller than the shadow offset, so shadows overlap neighbouring
   borders and look like a rendering bug.
4. Surfaces with no border at all (the whole style depends on visible borders).
5. `max-w-7xl`/`max-w-[1600px]` sprawling container instead of `max-w-[1280px]`.
6. Mixing corner radii - `rounded-xl` on one card, `rounded-none` on another.
7. A sticky sidebar / table of contents (belongs to docs, not this style).

**Border / shadow**
8. Soft blurred shadows - `shadow-lg`, `shadow-xl`, `shadow-2xl`, or any
   blur-based shadow token. The single most common failure.
9. A shadow with non-zero blur or spread (`shadow-[0_10px_30px_...]`).
10. Grey borders (`border-neutral-200`) instead of solid black / near-white.
11. Thin `1px` borders where the style needs `3px`.
12. Inconsistent shadow direction between blocks with no intent.
13. No press state - clicking a button changes only its colour, with no
    translate into the shadow.
14. Eased, slow (`duration-300 ease-in-out`) transitions on the press mechanic,
    making it feel gooey instead of snappy.

**Typography**
15. `font-bold` (700) headlines where the style needs `800`/`900`.
16. `text-4xl`/`text-5xl` hero headlines - too timid; needs the giant scale.
17. Body copy at `font-normal` (400) instead of `font-medium` (500).
18. A serif or a soft handwriting accent font.
19. Loose leading on the hero (`leading-normal`) instead of tight `0.92–0.96`.
20. Gradient text on a headline (`bg-clip-text`) - an instant, total failure.
21. Positive letter-spacing on large display type.

**Colour**
22. Pastel / muted fills (`bg-yellow-100`, `bg-blue-200`) instead of saturated
    (`bg-yellow-400`, exact saturated hex). The classic "watered-down" failure.
23. Any gradient - on background, button, badge, or text.
24. Pure white `#FFFFFF` paper instead of warm off-white, reading clinical.
25. More than four saturated accent colours, turning confident into chaotic.
26. Colour used decoratively at random instead of allocated to consistent roles.
27. White text on a yellow or green fill (fails contrast and looks weak).

**Decoration / effects**
28. Glassmorphism / `backdrop-blur` anywhere, including the nav.
29. Coloured glows, neon blur, or aurora/mesh gradient backgrounds.
30. Soft rounded "friendly SaaS" cards with `shadow-md` and no border, wearing a
    black outline as a costume.
31. Emoji icons, or thin `1px`-stroke lucide icons in soft rounded tiles.

**Motion**
32. Spring bounce on entrance (`type: "spring", bounce: 0.5`).
33. Slow letter-by-letter or blur-in text reveals.
34. Continuous ambient motion - floating bob, parallax drift, animated blobs.

## 14. Responsive behaviour

- **Borders and shadows stay bold on mobile** - do not thin borders to `1px` or
  drop shadows. Optionally reduce the offset by `~1–2px` (a `6px` shadow becomes
  `4px`) but keep it hard and visible.
- **Bento grids collapse to a single column**, each block keeping its border and
  shadow; maintain the `gap > shadow-offset` rule so stacked shadows do not clip.
- **Type drops roughly 30–40%** via `clamp()`; the display floor stays `800`+.
  Verify the hero at 375px does not overflow - it may wrap to 3–4 tight lines.
- **Asymmetric offsets and rotations reduce on mobile.** A `-2deg` card can cause
  horizontal overflow at 375px - reset rotations and negative margins below `sm`.
- **Touch targets `44x44px` minimum**; buttons exceed this with `py-3` plus border.
- Test at 375, 768, 1024, 1440, 1920. Confirm no shadow is clipped by
  `overflow-hidden` on a parent - hard shadows extend outside the box.

## 15. Accessibility

Saturated colour is the real accessibility risk in this style. Check every
text-on-fill pair.

- **Contrast, exact guidance:** Black `#111` on yellow `#FFD400` is ~13:1 (AAA) -
  yellow and green fills always take **black** text. White on blue `#2D5BFF` is
  ~5.9:1 (AA) and black on orange `#FF5C00` is ~7:1 - blue/magenta take white,
  orange prefers black. **Never** white text on yellow (`~1.6:1`, fails). Verify
  every pairing with a tool; do not assume a saturated colour is safe.
- **Borders do not substitute for text contrast.** A `3px` black border around a
  low-contrast text block does not fix the text.
- **Focus states are visible** - a `3px` ink outline offset `2px`, or the hard
  shadow appearing. Never `outline-none` with no replacement.
- Every section is a `<section>` with `aria-labelledby` on its headline. Exactly
  one `<h1>` (the hero); feature headlines are `<h2>`.
- Meaningful icons need `aria-label`; decorative icons are `aria-hidden`. Marquee
  bands are `aria-hidden` and pause on `prefers-reduced-motion`.
- Full `prefers-reduced-motion` path: entrance pops become instant; marquee stops;
  press translate may remain (discrete) or reduce to shadow-only.

## 16. Performance

- **Hard shadows are cheap** - `box-shadow` with `0` blur composites far cheaper
  than a blurred shadow. This style is naturally performant; do not undo that with
  blurred glows.
- The hero visual is the LCP element. Preload it, serve AVIF/WebP, set explicit
  `width`/`height`, mark it `priority` / `fetchpriority="high"`.
- **Budget: LCP < 2.0s, CLS < 0.05, total page weight < 1.5MB** for 6–8 bordered
  image blocks.
- Only animate `transform` and `opacity`. The press mechanic also animates
  `box-shadow` (not GPU-composited), so keep those transitions short (`100ms`).
- Marquee: animate `transform: translateX` (not `margin`/`left`), pause off-screen
  and under reduced motion.
- The `900` display weight is a real font file - subset it and use `font-display:
  swap` with a metric-matched fallback so the headline does not shift layout.

## 17. Implementation notes

Tailwind v4 token setup so the system stays consistent:

```css
@theme {
  --color-paper:   #FAFAF5;
  --color-ink:     #111111;
  --color-acc-1:   #FFD400; /* yellow  - primary action / highlight */
  --color-acc-2:   #2D5BFF; /* blue    - secondary blocks */
  --color-acc-3:   #FF5C00; /* orange  - tertiary / stats */
  --color-acc-4:   #00C271; /* green   - sparing */

  --text-display-xl: clamp(3.5rem, 8vw, 7rem);
  --text-display-l:  clamp(2.5rem, 5vw, 4.5rem);
  --text-display-m:  clamp(1.75rem, 3vw, 2.75rem);

  --shadow-hard-sm: 3px 3px 0 0 #111111;
  --shadow-hard:    4px 4px 0 0 #111111;
  --shadow-hard-lg: 6px 6px 0 0 #111111;
  --shadow-hard-xl: 8px 8px 0 0 #111111;
}
```

Card block with the full physical mechanic:

```tsx
<article
  className="
    rounded-lg border-[3px] border-black bg-[#FFD400] p-6
    shadow-[6px_6px_0_0_#000]
    transition-all duration-100 ease-linear
    hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_0_#000]
  "
>
  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md border-[3px] border-black bg-[#2D5BFF] shadow-[3px_3px_0_0_#000]">
    <Zap className="h-6 w-6 stroke-[2.75] text-white" aria-hidden="true" />
  </div>
  <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.0] tracking-[-0.01em] text-black">
    Ships in a day
  </h3>
  <p className="mt-3 text-[16px] font-medium leading-[1.55] text-black/80">
    Everything is a bordered block with a hard shadow.
  </p>
</article>
```

## 18. Pairs well with React Bits Pro (optional)

You do **not** need React Bits Pro to use this skill - build from scratch if the
project has none installed. If the `@reactbits-pro` and `@reactbits-starter`
registries are configured, these accelerate the build without fighting the style:

- `@reactbits-starter/cascade-type-tw` - fast, snappy headline reveals; short
  stagger and a sharp ease, never a soft spring.
- `@reactbits-pro/pricing-1` - the moving-border pricing block reads as on-style;
  keep the hard borders, replace any soft shadow with a hard offset.
- `@reactbits-pro/hero-*`, `@reactbits-pro/cta-*` - usable section shells; strip
  soft `shadow-lg`, swap muted fills for saturated accents, bump headline weight
  to `800`/`900`.

Never add a dependency on them, and never let a block's default soft styling
survive - re-border and re-shadow every imported block to match the system.

## 19. Self-verification loop

Before reporting the page complete, **re-read the rendered output and check every
item**. If any check fails, fix it and run the loop again.

**Border and shadow**
- [ ] Every surface has a `2–4px` solid black (or near-white in dark) border.
- [ ] Every shadow is `Xpx Ypx 0 0` - zero blur, zero spread. No `shadow-lg`.
- [ ] Shadow direction is consistent across the whole page.
- [ ] Grid gaps exceed the largest shadow offset by at least `2px`.
- [ ] One corner radius is used everywhere (all sharp or all `8px`).

**Interaction**
- [ ] Every button and interactive card translates into its shadow on press,
      by exactly the rest offset, with the shadow going to `0`.
- [ ] Press transitions are `80–120ms` with `steps`/`linear`, not eased.
- [ ] Focus rings are visible and on-style.

**Typography**
- [ ] Display type is `800`+ (`900` on the hero). No `font-bold` (700) headline.
- [ ] Body copy is `font-medium` (500), not `400`.
- [ ] Hero leading is `0.92–0.96`; large type has negative tracking.
- [ ] No gradient text anywhere.

**Colour**
- [ ] Fills are saturated (`*-400/500` intensity or exact hex), never pastel.
- [ ] No gradient exists anywhere on the page.
- [ ] Paper is warm off-white, not `#FFFFFF`.
- [ ] At most 4 accents, each allocated to a consistent role.
- [ ] Every text-on-fill pair passes AA (yellow/green -> black text).

**Anti-patterns (section 13)**
- [ ] Re-read the full anti-pattern list against the render. Zero hits.
- [ ] Specifically confirm: no soft blurred shadow, no pastel fill, no gradient,
      no glassmorphism, no symmetric centred no-offset layout.

**Generic-AI smell test**
- [ ] Remove every border and shadow in your head. Is what remains just a normal
      card-grid SaaS page? If yes, the borders are a costume, not the structure.
- [ ] Does pressing a button feel like clicking a physical object into the page?
      If it just fades colour, the core mechanic is missing.

**Responsive, a11y, performance**
- [ ] Verified at 375, 768, 1024, 1440, 1920; no shadows clipped by
      `overflow-hidden`.
- [ ] Borders/shadows stay bold on mobile; rotations and offsets reset below `sm`.
- [ ] One `<h1>`; sections labelled; focus visible; every fill contrast checked.
- [ ] LCP image preloaded with explicit dimensions; heavy weight subset with
      `font-display: swap`.
