---
name: prompt-consumer-hardware
description: "Build a product page for a physical consumer device: desire before specs, one honest hero photograph, a spec table buyers actually read, and shipping, warranty and returns resolved before the visitor hunts for them. Use when the user is building a page for a physical product or device, mentions hardware, gadgets, specifications, dimensions, materials, pre-orders or shipping, or needs a spec table and product photography layout that sells desire before detail."
---

# Consumer Hardware Product Page

Build the page for a physical device sold direct to consumers: audio, wearables,
peripherals, home, camera, lighting, or similar.

This prompt defines **what the page must accomplish and say**. It deliberately does
not prescribe a visual style. Pair it with a skill file (for example
`skill-apple-minimal`) to fix the look. Used alone, default to a restrained,
photography-led design that lets the product carry the page.

The failure mode this guards against is precise: agents treat a physical product like
software. They lead with a feature list, drop in a dramatic three-quarter render,
recolour one photo into five fake variants, and bury shipping and warranty in the
footer. A device is a real object the buyer cannot touch through the screen. The page
exists to make its material, weight, finish and build quality legible, and to resolve
the decision before the visitor hunts for the price.

## 1. Before you write anything

Establish these facts. If the brief does not supply them, state your assumption at the
top of your output and design against it.

| Fact | Why it changes the page |
|---|---|
| **Price band** | Under ~$100 → the decision is impulsive; lead with price and shipping. Over ~$500 → it is considered; lead with material, craft, and comparison. |
| **Category maturity** | A new category needs an explanation section. A crowded category needs a differentiation section. |
| **Variants** | Colour, size, capacity, or bundle. Determines whether the page needs a configurator (§8). |
| **What it replaces** | A cheaper alternative, a phone feature, an incumbent device, or nothing. Drives the comparison (§11). |
| **Shipping reality** | In stock, pre-order, or waitlist. Changes the CTA and must be stated in the hero region (§10). |

## 2. Primary objective

**Add to cart**, or **Pre-order**, or **Join the waitlist**: exactly one, chosen by
availability. Never present all three; a page that offers to sell, reserve, and
waitlist the same unit reads as confused about whether the product exists. Secondary
goals like finding a retailer, comparing models, and reading the specs stay
subordinate to the one buy action, everywhere except the nav.

## 3. User journey

The page carries a visitor through five states in order. Every section maps to one:

1. **"What is it?"** → hero photograph + product name + one-line description.
2. **"Do I want it?"** → material, craft, feel, the one thing it does better.
3. **"Will it work for me?"** → compatibility, size, battery, connectivity.
4. **"Is it good, and better than what I'd buy instead?"** → reviews, press,
   performance, comparison.
5. **"What exactly am I buying, and when does it arrive?"** → variant, price, what's
   in the box, shipping, warranty, returns.

If a section does not advance one of these, cut it.

## 4. Required page structure

In order. Sections marked *optional* may be dropped if there is nothing genuine to put
in them; never fill them with invented content.

| # | Section | Must answer | Notes |
|---|---|---|---|
| 1 | Nav | Where do I buy? | Product, Specs, Support, Buy. Price visible on the CTA. |
| 2 | Hero | What is it? | One straight-on photograph. Name, one-line claim, price, availability, CTA. |
| 3 | Design / material | Why does it feel worth it? | Macro photography. Material names. No adjective without a noun. |
| 4 | Signature capability | What is it best at? | The one thing that justifies the purchase. Full section. |
| 5-7 | Supporting capabilities | What else? | One per section. Battery, connectivity, durability, software. |
| 8 | In use | What is life with it like? | Real-context photography or short video. |
| 9 | Compatibility | Will it work with my things? | Explicit list: OS versions, ports, apps, standards. |
| 10 | What's in the box | What arrives? | Flat-lay photo + itemised list. Cables and adapters named. |
| 11 | Full specifications | The details | Dense table. Every number a buyer might compare. |
| 12 | Comparison *(optional)* | Which model, or better than what I have? | Real product family, or the incumbent. |
| 13 | Reviews / press *(optional)* | Is it good? | Real, attributed, linked. |
| 14 | Sustainability / repair *(optional)* | Can I keep it? | Materials, spare parts, repairability, recycling. |
| 15 | Buy | Configure and purchase | Variant picker, price, shipping estimate, warranty, returns. |
| 16 | Support & FAQ | What if something goes wrong? | Warranty length, return window, contact route. |
| 17 | Footer | Legal | Regulatory, certifications, disclaimers. |

## 5. Product photography

Photography is the primary conversion asset for a device the buyer cannot hold. It
carries more weight than the copy. Specify each shot deliberately.

| Shot | Purpose | Specification |
|---|---|---|
| **Hero** | "What is it?" | One straight-on or slight-angle photograph on a clean set. Real product, real lighting, level. Not a dramatic three-quarter render, not an exploded view, not a person holding it. |
| **Detail / macro** | Prove material and finish | Close crops of hinge, weave, knurling, port, seam, grain. Where build quality becomes visible. |
| **In-context / lifestyle** | "What is life with it like?" | The product in a real setting at true scale. It stays the subject, not the room. |
| **Scale reference** | Convey real size | Against a familiar object or hand, so "312g / 71mm" becomes intuitive. |
| **360 / rotate** *(optional)* | Inspect all sides | A drag-to-rotate sequence or short loop, lazy-loaded, degrading to stills below `md`. |
| **What's in the box** | Set expectations | A flat-lay of every included item, matching the itemised list exactly. |

- **Every colour variant needs its own real photograph.** Do not CSS-filter or
  hue-rotate one photo into five colourways. The reflections never match the real
  finish and buyers notice instantly.
- If you have no photography, use neutral placeholders in the correct aspect ratios.
  **Never fabricate a product render in markup or CSS** and present it as the product.
- Serve art-directed crops per breakpoint (§14), never one wide image scaled down to an
  illegible mobile thumbnail.

## 6. Conveying the physical object through a screen

The core problem of a hardware page: the buyer cannot pick it up. Everything below
compensates for the missing hand.

- **Material, named and specific.** "Anodised 6063 aluminium", "full-grain leather",
  "Gorilla Glass Victus", "Merino wool", never "premium materials".
- **Finish and texture through macro shots.** Matte vs gloss, brushed vs polished,
  soft-touch vs bare metal; a macro crop conveys this where an adjective cannot.
- **Weight and dimensions, stated and shown.** Pair the number with a scale-reference
  shot. "312g" means little until it sits beside a phone. State weight even when
  unflattering; hiding it reads as evasive.
- **Build quality through honest signals.** Ingress rating (IP68), drop or crush test
  results with the method linked, internal frame materials, and warranty length stand
  in for the reassurance of holding a solid object.
- **Sound and motion where relevant.** A short muted clip of a click, hinge, or
  mechanism communicates quality no still can. Under 10s; never autoplay with sound.

## 7. Copy and specification tables

### Copy rules
- **Numbers with units, always.** "38 hours", "IP68", "1.9m braided cable", "312g".
- Avoid: "premium", "sleek", "cutting-edge", "revolutionary", "elevate your",
  "crafted to perfection", "the ultimate", "next-level".

### Specification table
- Grouped by category: **Dimensions, Materials, Power, Connectivity, Performance
  (Audio/Optics/Sensor), Environmental, In the box, Certifications.**
- Two columns: label, value. Hairline row separators. No card wrapper, no zebra
  striping, no decorative icons in the value column.
- **Include the unflattering numbers.** Weight, charge time, standby drain, and exact
  dimensions build more trust than omitting them.
- **Unit and measurement honesty.** State the unit on every value, name the standard a
  rating follows (IP68 to IEC 60529), and footnote any figure measured under specific
  conditions ("38h at 50% volume, ANC off") with the method linked. Never round a
  measured figure up to a nicer marketing number.

## 8. Variants and configuration

- **One dimension, <= 4 options** (e.g. colour): labelled swatches with real
  photographs; selecting one updates the hero image, price, and availability.
- **Two dimensions** (colour x capacity): a simple two-row picker. Show the **price
  delta beside each option** ("+$40"), not only the recomputed total.
- **Bundles**: a selectable configuration with the saving stated ("Kit: save $35"),
  never pre-selected over the base product to inflate the total.
- **Never hide unavailable combinations.** Disable them with a visible reason
  ("Sold out - back in March").
- The selected configuration, its price, and availability stay visible in the same
  viewport as the buy button at all times. A sticky buy bar is appropriate here,
  unlike most page types.

## 9. Price and value for a one-time purchase

A device is bought once, so the price argument differs from a subscription's.

- **Show the price in the hero**, on or beside the primary CTA, and update it live with
  the selected variant.
- **Anchor value honestly, without a fake strike-through.** Legitimate anchors:
  what it replaces and its running cost ("replaces $6/month in batteries"),
  cost-per-year over the warranty, the bundle price versus buying parts separately, or
  a genuine dated launch or trade-in offer.
- **Never** invent a crossed-out "RRP $199" the product never sold at, run a permanent
  "sale" that is just the price, or imply a discount that does not exist. If financing
  is offered, state the real total and any interest, not only the "$8/mo" headline.
- State whether tax/VAT is included, per market (§13).

## 10. Availability, shipping and pre-order honesty

Shipping is a conversion lever, not footer text. Set expectations before checkout.

- **In stock** → state the dispatch and delivery window next to the CTA: "In stock -
  ships within 24h, arrives 3-5 working days".
- **Pre-order** → the CTA says so and states the expected ship month. Make clear the
  card is charged now or on dispatch, whichever is true, and that the date may move.
- **Waitlist / sold out** → collect interest honestly; do not take money for stock you
  cannot ship.
- **Backorder honesty** → if an item is oversold, say so and give a realistic date. A
  promised 3-day delivery that takes 5 weeks generates the reviews that end a brand.
- State **where it ships from, which regions are served, and the return-shipping cost**
  before checkout, not after, including any free-delivery threshold and cross-border duties.
- The CTA carries the transaction and the price: "Add to Bag - $249", "Pre-order -
  ships March". No countdown timers, no "only 3 left" unless it is real inventory, no
  fabricated urgency.

## 11. Proof: reviews, press and comparison

### Reviews and UGC
- Show **real, verified reviews** with rating, date, reviewer name, and variant bought
  where consent allows. Place a rating summary near the hero and full reviews below
  the specs, where a considering buyer looks for reassurance.
- **Press quotes** are attributed to the publication and linked to the original.
- **UGC** (real customer photos or unboxings) is strong proof of the object in real
  hands. Use it with permission and attribution, never stock passed off as customers.
- **Never fabricate reviews, star counts, or press mentions.** For a new product with
  no reviews, lead on the warranty and return guarantee instead of faking stars.

### Comparison against the alternative
- Compare against the **thing the buyer would otherwise get**: a specific incumbent
  device, the previous generation, or the phone feature it replaces. Do not compare
  against a strawman.
- Use a real, honest table: rows are the dimensions that matter (battery, weight,
  latency, repairability, price), columns are this product versus the alternative.
  **Include a row where the competitor wins** if one exists; a table your product wins
  on every line reads as rigged.
- Only build a "which model" comparison if there is a genuine product family. Never
  show one for a single-model product.

## 12. Warranty, returns and repairability

These are trust signals, stated on the page, not buried in support.

- **Warranty:** length and what it actually covers, in plain words ("2-year warranty
  covering defects; battery covered to 80% capacity for 1 year").
- **Returns:** the window, condition required, and who pays return shipping. A clear,
  generous returns line measurably lifts conversion because it removes the risk of
  buying an object sight-unseen.
- **Repairability:** spare-part availability, whether the battery is user- or
  service-replaceable, published repair guides, and a repairability score if one
  exists.
- **Real support route:** email, phone, or chat with published hours signals the brand
  will exist when the device needs service.

## 13. Regulatory, certifications and compliance

Requirements vary by market; treat the following as a general pattern, not legal
advice, and state that substantiated claims and required marks must be reviewed by
qualified counsel for each target market before publishing.

- Include required **certification marks and text** for the shipping markets (CE, UKCA,
  FCC, UL, RoHS, WEEE, MFi, IP rating) as text with the standard named, not decorative
  badges alone.
- **Battery, wireless, and laser** products carry mandated safety disclaimers. Include
  placeholders for them.
- Any **performance claim** ("38-hour battery", "50m water resistance") needs a
  footnote with test conditions and, where a body certifies it, the standard.
- **Price display** must state whether tax/VAT is included, per market.
- Any **health or safety claim** must be substantiated, carry its required disclaimer,
  and be reviewed before it ships.

## 14. Responsive priorities and accessibility

- **Mobile is where hardware is browsed.** The hero photograph, name, price, and buy
  button must all be visible in the first viewport.
- A **sticky bottom buy bar** on mobile shows product name, selected variant, price,
  and CTA once the hero buy region scrolls away.
- Spec tables stack into label/value pairs on mobile, never horizontal scroll. Serve
  art-directed crops per breakpoint, not one wide image scaled down.
- One `<h1>` (the product name). Sections use `<section aria-labelledby>`. Product
  photographs carry alt text naming the variant shown, not "product1".
- **Variant pickers are real radio groups** (`fieldset` + `legend`), keyboard operable,
  with a non-colour selected indicator (ring + checkmark + label) and 44px+ tap
  targets.
- Specifications use a real `<table>` with `<th scope="row">`. Price changes on variant
  selection are announced via `aria-live="polite"`.
- Video is muted, captioned if it carries information, and never autoplays with audio.
- AA contrast (4.5:1) in both themes, including text over photography; use a scrim,
  not lower-contrast text.

## 15. Common mistakes to avoid

1. Writing a SaaS page and inserting a product photo.
2. A render at a dramatic three-quarter angle as the hero instead of a real
   photograph.
3. CSS-recoloured or hue-rotated photographs standing in for real variant photography.
4. A floating product on pure white with no scale reference: the marketplace look.
5. No macro/detail shots, so material and finish are never actually shown.
6. No scale-reference shot, leaving "312g / 71mm" as an abstraction.
7. "Premium materials" with no material named.
8. Claims without units, or rounded-up marketing numbers.
9. A performance figure with no test-condition footnote.
10. Hiding the price until the buy section.
11. A fake crossed-out "RRP" or a permanent "sale" that is just the price.
12. Quoting only "$8/mo" financing without the real total or interest.
13. No shipping or delivery window anywhere on the page.
14. A pre-order CTA that hides when the card is charged or when it ships.
15. Taking payment for waitlisted stock that cannot be shipped.
16. A promised delivery date the brand cannot actually meet.
17. Not disclosing unsupported regions or return-shipping cost until after checkout.
18. A spec table that omits weight, charge time, or exact dimensions.
19. Horizontal-scrolling spec tables on mobile.
20. Fake scarcity, countdown timers, or "27 people are viewing this".
21. "Only 3 left" that is not a real inventory figure.
22. Star ratings with no review source.
23. Fabricated reviews on a product that has none yet.
24. Press quotes with no publication or link.
25. A comparison table the product wins on every single row.
26. A "compare models" table for a single-model product.
27. Comparing against a strawman instead of the real incumbent.
28. Sustainability claims with no substance ("eco-friendly", "green materials").
29. No warranty, return, or repairability information on the page at all.
30. A variant picker where unavailable options silently disappear.
31. Bundles pre-selected over the base product to inflate the total.
32. A buy button that scrolls to a section instead of adding to cart.
33. Autoplaying video with sound, or a hero clip with no muted fallback.
34. Missing regulatory marks or mandated disclaimers for the stated shipping markets.

## 16. Completion checklist

Verify before reporting done. Fix and re-verify anything that fails.

**Message**
- [ ] The hero states what it is, what it costs, and when it ships.
- [ ] Every material is named; every performance claim carries a unit and a condition.

**Photography & object**
- [ ] There is a straight-on hero photograph, not a dramatic render.
- [ ] Detail, in-context, and scale-reference shots all exist.
- [ ] Every variant has real photography; none are CSS-recoloured.
- [ ] Weight, dimensions, and finish are conveyed with both numbers and imagery.

**Structure**
- [ ] All five journey states (§3) are served, in order.
- [ ] Compatibility, in-the-box, and full-spec sections all exist.
- [ ] The spec table includes weight, dimensions, power, and certifications, grouped.

**Commerce**
- [ ] Price is visible in the hero and beside every CTA, updating with the variant.
- [ ] Value is anchored honestly. No fake strike-through.
- [ ] Availability, dispatch/delivery window, and return-shipping cost are stated;
      pre-order pages state ship month and when the card is charged.
- [ ] Variant selection updates image, price, and availability; unavailable
      combinations are disabled with a reason.
- [ ] Warranty, return window, repairability, and support route are on the page.

**Integrity**
- [ ] Nothing is invented: no fake reviews, ratings, press quotes, or certifications.
- [ ] Any comparison is against a real alternative and includes a row it can lose.
- [ ] No scarcity or urgency mechanics unless tied to real inventory.
- [ ] Footnotes back every conditional performance claim.

**Craft**
- [ ] Verified at 375, 768, 1024, 1440; sticky mobile buy bar present; spec tables
      stack without horizontal scroll.
- [ ] Variant picker is a keyboard-operable radio group with a non-colour selected
      state; price changes announced to assistive technology.
- [ ] AA contrast in both themes, including text over photography.
- [ ] Required regulatory text and disclaimers are present for the target markets and
      flagged for counsel review.
- [ ] If a skill file is in use, run that skill's self-verification loop as well.
