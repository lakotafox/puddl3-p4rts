---
name: prompt-real-estate
description: "Build a property page where imagery does the selling for a single listing, development launch, or brokerage, with a shot-ordered gallery, mobile-readable floor plans, spec tables, and a viewing-request conversion. Use when the user is building a page for a property listing, new development, brokerage or rental, mentions floor plans, photo galleries, viewings, neighbourhoods or agent contact, or needs imagery to carry the selling."
---

# Real Estate

Build the marketing page for a property: a single listing, a new-build development, a
brokerage, or a property portfolio.

This prompt defines **what the page must accomplish and say**. It deliberately does
not prescribe a visual style. Pair it with a skill file (for example
`skill-luxury-serif` for prestige listings or `skill-editorial` for a portfolio) to
fix the look. Used alone, default to a restrained, image-forward layout with generous
whitespace that lets the photography dominate.

The failure mode this guards against is precise: agents produce property pages that
either look like a scam listing, with one blurry photo, a suspiciously round price,
no address, and a bare email field, or bury the two things a serious buyer needs
first: the best photograph, and how to book a viewing. This is a high-value, slow, emotional
purchase where trust and imagery carry the whole page.

## 1. Before you write anything

Establish these facts. If the brief does not supply them, state your assumption at
the top of your output and design against it.

| Fact | Why it changes the page |
|---|---|
| **Page type** (single listing / development / brokerage) | Determines the entire structure; see §3. |
| **Sale or rental** | Changes the spec table (tenure vs term), the price framing, and the legal notices. |
| **Buyer segment** (first-time, investor, downsizer, prestige) | An investor wants yield and service charge; a prestige buyer wants lifestyle and privacy. |
| **Completion / availability status** (ready, off-plan, under offer) | Off-plan needs CGIs labelled as such and a completion date; ready needs real photos. |
| **Jurisdiction** | Legal notices, energy ratings, and disclosure rules vary; see §11. |

## 2. Primary objective

**One conversion goal: get a qualified viewing or enquiry.**

- Single listing → **Book a viewing** (date/time request), with **Request the
  brochure** as secondary.
- Development → **Register interest** for the launch or **Book a viewing** of the
  show home, plus a **unit availability** entry point.
- Brokerage → **Search / browse listings** and **contact an agent**; the individual
  listing is the real conversion surface.

Everything else, including floor plans, specs, and neighbourhood context, exists to
move a serious buyer toward that single action. The page is not trying to close the
sale; it is trying to earn the viewing.

## 3. Structure by page type

### 3a. Single listing

| # | Section | Must answer |
|---|---|---|
| 1 | Nav | Where am I? Back to search, save, share, contact agent. |
| 2 | Hero gallery | Is this beautiful? The single best exterior or hero shot. See §4. |
| 3 | Headline facts | What is it? Price, beds, baths, size, location: one glanceable line. |
| 4 | Description | What is the story? 2–4 paragraphs, honest, specific. |
| 5 | Full gallery | Show me everything. Ordered shot list. See §4. |
| 6 | Floor plans | How does it lay out? Readable on mobile. See §5. |
| 7 | Specification | The facts. Full table. See §6. |
| 8 | Location | Where is it and what's nearby? Transport, schools, amenities. See §7. |
| 9 | Virtual tour / video | Can I walk it remotely? Optional but strong. |
| 10 | Agent & viewing | Who do I talk to and how do I see it? Agent + viewing form. |
| 11 | Legal notices | What's the fine print? Energy rating, tenure, disclaimers. See §11. |

### 3b. Development launch

Lead with the **development identity and lifestyle**, then an **availability /
unit-selector** (see §9) as the primary interactive surface, **house types or unit
layouts** each with floor plan and price-from, **amenities and location**, **the
completion timeline and construction status**, and **register-interest** as the
conversion. Label every CGI or render as a computer-generated impression, not a photo.

### 3c. Brokerage / portfolio

Structure as a search product: a hero with a **search entry point** (location, price,
beds), a **results grid** of listing cards (first image, price, key facts, location),
**filters and sort**, featured or new listings, the **firm's credibility** (track
record, areas of expertise, real agents), and clear paths into individual listings.
The listing card's first image and price are what get the click.

## 4. Photography and gallery

Imagery is the product. Order and quality decide everything.

- **The first image determines whether the page is scrolled at all.** It must be the
  single strongest shot, usually a bright, wide exterior or the most impressive
  interior. It must be professionally lit, with a level horizon, no clutter, and no
  agent reflection in a mirror. A weak or dark first image loses the buyer before any
  copy is read.
- **Shot list and order** for a home, in this sequence: hero exterior → main living
  space → kitchen → primary bedroom → additional bedrooms → bathrooms → outside
  space / garden → view or standout feature → floor plan last. Buyers read a home in
  this order; deviating confuses them.
- **Aspect ratio**: standardise on 3:2 or 16:9 landscape for the gallery; never mix
  portrait phone snaps with pro landscape shots in the same strip. Portrait detail
  shots go in a secondary grid.
- **Lightbox behaviour**: clicking any image opens a full-screen lightbox with
  keyboard arrows, swipe on touch, a visible close control, image counter ("4 / 22"),
  and preloaded neighbours so navigation is instant. Trap focus while open; restore it
  on close.
- **Never** use stock interiors, mismatched properties, or a single photo. A listing
  with one image reads as a scam.

## 5. Floor plans

Floor plans are where mobile readability collapses. Solve it deliberately.

- Provide the floor plan as a **high-resolution image with a dedicated zoom/pan
  view**, never as a small inline thumbnail the buyer must pinch blindly.
- On mobile, open the plan in the **same full-screen lightbox** as the gallery, with
  pinch-zoom and pan enabled, so room labels and dimensions are legible.
- Label **total size** (sq ft / sq m), and per-floor where multi-storey. State the
  measurement standard if one applies in the jurisdiction.
- If dimensions are approximate, say so once, clearly. Do not scatter "approx" on
  every number.
- Multi-unit developments: each house type gets its own plan, linked from the
  unit-selector.

## 6. Specification and detail table

A serious buyer scans for facts. Present them as a real, scannable table.

| Field | Notes |
|---|---|
| Price | Or "Price on application" with the reason; see §10. |
| Bedrooms / bathrooms | Exact counts. |
| Size | Internal area in the local standard, with unit. |
| Property type | Detached, apartment, terrace, etc. |
| Tenure | Freehold / leasehold / share, with the remaining lease term if leasehold. |
| Service charge / ground rent | Annual figure, or "none". Investors filter on this. |
| Council tax / property tax band | Where applicable. |
| Energy rating | EPC or local equivalent, which is often legally required to display. |
| Completion / available from | For off-plan or rentals. |
| Parking | Spaces, garage, permit, or none. |

Omit a row only if it genuinely does not apply. Never invent a value. A missing
tenure or energy rating on a page that should have one reads as evasive.

## 7. Location and neighbourhood

- Do not rely on an interactive map as the only location signal. Many buyers cannot
  or will not use it. **Also state, in text**: the neighbourhood name, nearest
  transport with walking times ("Elm Park station, 7 min walk"), and notable
  amenities (schools with any real rating, parks, shops).
- If you embed a map, make it a **static map image linking out** to a full map by
  default, and load an interactive embed only on interaction. A heavy always-on
  embed hurts load and many are unusable on mobile.
- Keep neighbourhood claims **specific and true**: "0.4 miles from the station",
  not "excellent transport links". Never imply a school catchment the property does
  not sit in.

## 8. Virtual tours, video and viewing conversion

- A **video walkthrough or 3D tour** is the strongest remote-viewing tool where it
  exists. Embed it but lazy-load it, and never auto-play it with sound.
- The **viewing request** is the conversion. The form asks for the minimum: name,
  email, phone, and preferred date/time or "flexible". Offer in-person and virtual
  viewing options.
- Place a **persistent contact/viewing affordance**, such as a sticky bar on mobile
  with the agent and a "Book a viewing" button, so the conversion is always one tap
  away during a long scroll.
- Confirm what happens next in caption text: "The agent will confirm your slot within
  one working day."

## 9. Availability and unit selectors (developments)

- Present remaining units as an **interactive selector**, either a filterable list or
  an interactive site plan / floor-level picker, showing per unit: type, beds, size,
  aspect/floor, price or "price on application", and status (available / reserved /
  sold).
- **Status must be honest and current.** Marking sold units as available to look busy
  is deceptive and legally risky.
- Filtering by beds, price, and floor is expected once there are more than ~8 units.
- Each unit links to its floor plan and spec. On mobile, the selector degrades to a
  filterable vertical list, not a tiny tappable site map.

## 10. Price presentation

- **Show the price** wherever possible. A visible price qualifies buyers and builds
  trust; hiding it loses serious enquiries silently.
- **"Price on application" (POA)** is appropriate only for genuine prestige or
  discretion cases, not to mask an unset price. When used, say why in one line
  ("Sold discreetly. Contact the agent") so it does not read as a bait tactic.
- For developments, use **"prices from GBPX"** and keep it truthful to the actual
  cheapest available unit.
- Never use a fake "reduced from" strike-through or a fabricated "last one at this
  price" pressure line.

## 11. Legal and regulatory notices

Property marketing is regulated, and requirements vary significantly by jurisdiction.
Treat the following as a **general pattern, not legal advice**, and state clearly that
requirements differ by location and must be reviewed by qualified counsel before
publishing.

- **Energy performance rating** (EPC in the UK/EU, or the local equivalent) is often
  legally required to be displayed on the listing. Include a placeholder for it.
- **Tenure, lease term, service charge, and ground rent** disclosures where relevant.
- A **material information / disclosure** line and a **misrepresentation disclaimer**
  ("These particulars are a general guide and do not form part of any contract").
- **Renders and CGIs** must be labelled as computer-generated impressions, and
  indicative furnishing labelled as such.
- **Agent/firm registration or licensing** details where the jurisdiction requires
  them.

Do not assert compliance the business has not confirmed. Include the disclaimers as
structured placeholders and flag that they must be verified by counsel.

## 12. Agent and firm credibility

- Show a **real agent**: name, photo, direct contact, and the firm they represent.
  A property enquiry goes to a person; anonymity kills trust on a high-value decision.
- Where relevant, show the firm's **track record honestly**: years operating, areas
  of expertise, real registration or membership of a professional body.
- **Never invent** agent names, sale counts, review scores, or professional
  memberships.

## 13. Accessibility and performance

- One `<h1>` (the property or development name). Sections use `<section
  aria-labelledby>`.
- Gallery and floor-plan lightboxes are keyboard-navigable, trap and restore focus,
  and announce image position.
- Every image has meaningful alt text describing the room or view, not "IMG_2043".
- The spec table uses real `<table>` semantics with `<th scope>`.
- Hero and gallery images are large: use responsive `srcset`, modern formats, and
  lazy-load everything below the first image so the page is not sabotaged by weight.
- Contrast AA (4.5:1) in both themes, including price and caption text over imagery.

## 14. Common mistakes to avoid

1. A single photo, or a dark/blurry first image that kills the listing on arrival.
2. Stock interiors or images that clearly belong to a different property.
3. Mixing portrait phone snaps with pro landscape shots in the main gallery.
4. Gallery images in a random order that ignores how buyers read a home.
5. A floor plan shown as a tiny inline thumbnail with no zoom.
6. Floor-plan room labels and dimensions unreadable on mobile.
7. No total floor area, or area with no unit.
8. A spec table missing tenure, energy rating, or service charge where they apply.
9. Invented spec values to fill an empty row.
10. A suspiciously round price with no address and a bare email field: the scam look.
11. Hiding the price behind "POA" with no genuine reason.
12. A fake "reduced from" strike-through or "last unit at this price" pressure.
13. An always-on heavy map embed as the only location information.
14. "Excellent transport links" instead of named stations and walk times.
15. Implying a school catchment the property is not actually in.
16. A viewing form asking for budget or mortgage status before a viewing is booked.
17. No agent name or photo. An anonymous "contact us" on a six-figure decision.
18. Invented agent sale counts, review scores, or professional memberships.
19. Auto-playing video tour with sound.
20. Unlabelled CGIs or renders presented as photographs.
21. Marking sold or reserved units as available to look busy.
22. A development unit-selector that shrinks to an unusable tiny site map on mobile.
23. No completion date or construction status on an off-plan development.
24. Asserting legal compliance the business has not confirmed.
25. No misrepresentation or material-information disclaimer anywhere.
26. A brokerage listing card that omits the price or the first image.
27. Lightbox with no keyboard support, no close button, or no focus trapping.
28. Huge unoptimised hero images that block first paint on mobile.
29. Alt text like "IMG_2043" or "property photo" on every image.
30. A closing contact section that repeats the hero with no new reason to enquire.

## 15. Completion checklist

Verify before reporting done. Fix and re-verify anything that fails.

**Imagery**
- [ ] The first image is the single strongest shot: bright, level, uncluttered.
- [ ] The gallery follows a deliberate shot order and one consistent aspect ratio.
- [ ] The lightbox is keyboard-navigable, shows position, traps and restores focus.
- [ ] No stock or mismatched property images; every image is of this property.

**Facts**
- [ ] The spec table includes price, size, beds/baths, tenure, energy rating, and
      charges where they apply.
- [ ] No spec value is invented to fill a row.
- [ ] Floor plans open full-screen with zoom and are readable on mobile.
- [ ] Total floor area is stated with its unit.

**Location**
- [ ] Neighbourhood, named transport with walk times, and amenities are in text, not
      only on a map.
- [ ] Any map is static-by-default and interactive-on-demand.
- [ ] No unverifiable catchment or "excellent links" claims.

**Conversion**
- [ ] Book-a-viewing / register-interest is the single primary action.
- [ ] A persistent contact/viewing affordance is reachable on mobile at any scroll.
- [ ] The viewing form asks only for the minimum and states what happens next.
- [ ] A real, named, photographed agent is shown.

**Price & trust**
- [ ] A price or a genuinely justified POA is present.
- [ ] No fake reductions or fabricated scarcity.
- [ ] Development unit statuses are honest and current.
- [ ] Nothing about the agent or firm is invented.

**Legal**
- [ ] Energy rating, tenure, and disclosure placeholders are present where applicable.
- [ ] CGIs and indicative furnishing are labelled as such.
- [ ] A clear note states legal requirements vary by jurisdiction and need counsel.

**Craft**
- [ ] Verified at 375, 768, 1024, 1440.
- [ ] One `<h1>`, labelled sections, real table semantics.
- [ ] Hero and gallery images are responsive, modern-format, and lazy-loaded.
- [ ] AA contrast in both themes, including text over imagery.
- [ ] If a skill file is in use, run that skill's self-verification loop as well.
