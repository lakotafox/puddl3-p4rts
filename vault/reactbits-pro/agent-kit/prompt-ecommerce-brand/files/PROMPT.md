---
name: prompt-ecommerce-brand
description: "Build a DTC product page where every unanswered question is a lost sale: hero shot, product story, sizing, variants, shipping and returns as conversion levers, honest reviews, and a mobile-first sticky add-to-cart. Use when the user is building a direct-to-consumer product or store page, mentions variants, sizing, shipping, returns, reviews or add-to-cart, or needs every purchase objection answered on the page itself."
---

# Ecommerce Brand

Build the page for a direct-to-consumer brand selling a physical product: a single
hero product or a tight range.

This prompt defines **what the page must accomplish and say**. It deliberately does
not prescribe a visual style. Pair it with a skill file (for example
`skill-luxury-serif` for a premium brand or `skill-playful-motion` for an energetic
consumer product) to fix the look. Used alone, default to a clean, product-forward
layout with large imagery and one accent colour.

The failure mode this guards against is exact: agents build DTC pages that read as
dropshipping stores: a floating product on pure white, five fake reviews, a countdown
timer that resets, "50% OFF" with no real anchor, and no honest answer to shipping,
sizing, or returns. The conversion is a purchase, and **every unanswered question is a
lost sale.** Most of these visitors are on a phone.

## 1. Before you write anything

Establish these facts. If the brief does not supply them, state your assumption at the
top of your output and design against it.

| Fact | Why it changes the page |
|---|---|
| **Single product or range** | A single hero product gets a long, story-led page; a range needs collection navigation plus this template per product. |
| **Considered or impulse purchase** | A GBP15 impulse buy needs speed and a fast add-to-cart; a GBP300 considered buy needs story, proof, and reassurance. |
| **The one blocking question** | Fit/sizing, material quality, delivery time, or "is this brand real". It gets prominent treatment. |
| **Fulfilment reality** (delivery time, returns policy, regions) | These are conversion levers, not footnotes. You cannot write the page without them. |
| **Proof available** (reviews, press, UGC, or none yet) | A new brand with no reviews needs a different trust strategy; see §7. |

## 2. Primary objective

**One conversion goal: add to cart, then checkout.**

- Everything on the page removes a reason not to buy. The add-to-cart button is the
  centre of gravity; it stays reachable at all times (§13).
- Secondary goals like newsletter, follow, and bundle are allowed but must never compete
  visually with add-to-cart, and never intercept the buyer with a popup before they
  have seen the product.

## 3. User journey

The page carries a visitor through six states in order. Every section maps to one:

1. **"What is it and is it for me?"** → hero shot + one-line product promise.
2. **"Do I want the story behind it?"** → origin, values, what makes it different.
3. **"Is it actually good?"** → materials, details, dimensions, what's in the box.
4. **"Will it fit / work for me?"** → sizing, variants, use, care.
5. **"Do others rate it, and can I trust this brand?"** → reviews, UGC, guarantees.
6. **"What does it cost, when does it arrive, and what if I hate it?"** → price,
   shipping, returns, add to cart.

If a section does not advance one of these, cut it.

## 4. The hero product shot

The hero image is the single most important asset on the page.

- **Show the actual product, clearly, as the buyer will receive it.** A floating
  product on pure white reads as a marketplace listing, not a brand. Use a considered
  set, in-context or in-use imagery, or a rich background that expresses the brand.
- Provide a **gallery of 4–8 shots** in this priority: hero angle → in-use / on-body /
  in-context → detail/texture macro → scale reference → what's in the box →
  back/underside. Every material claim needs a shot that proves it.
- On product pages with variants, **the gallery updates to the selected variant**;
  showing the black colourway while "sand" is selected loses trust.
- Support **zoom** on the main image (hover or tap-to-zoom) so texture and quality are
  inspectable. Lazy-load everything past the first image.

## 5. Product story and values

DTC brands win on story where marketplaces win on price. Lead with it.

- State **why the product exists** in 2–4 honest sentences near the top: the origin,
  the problem it solves, or the standard it holds. This is what separates a brand from
  a reseller.
- Name **what actually makes it different**: the material, the maker, the process, the
  guarantee. Be concrete ("full-grain Italian leather, one workshop in Montreal"), not
  aspirational ("crafted with passion").
- Keep the story true. Invented heritage ("family-owned since 1952" on a two-year-old
  brand) is both dishonest and easily disproven.

## 6. Product detail and sizing

### Detail presentation
Present the facts a buyer needs before committing, as scannable content, not a wall of
prose:

| Field | Notes |
|---|---|
| Materials | Named and specific. "Recycled 210D nylon", not "premium fabric". |
| Dimensions / capacity | Exact, with units. Volume, weight, or measurements. |
| What's in the box | Every included item, so there is no unboxing surprise. |
| Care | Washing, storage, or maintenance instructions. |
| Compatibility | If it must fit or work with something (device, size, standard). |

### The sizing problem
Fit uncertainty is the top reason apparel and wearables get abandoned or returned.

- Provide a **real size guide** with actual measurements (garment and/or body), in
  both metric and imperial, in a table, not a vague S/M/L graphic.
- Add **fit guidance in human terms**: "runs small, so size up if between sizes", "model
  is 5'9" wearing M". Reference real model height and size on every on-body shot.
- Where possible, offer a **fit finder** (enter height/weight or usual size) or link to
  reviews filtered by fit feedback. Honest fit info reduces returns *and* lifts
  conversion because buyers who trust the fit buy with less hesitation.

## 7. Reviews, UGC and honest social proof

- Show **real, verified reviews** with rating, date, and, where consented, reviewer
  first name and the variant purchased. Filterable by rating and, for apparel, by fit.
- **Never fabricate reviews or inflate the count.** Fake reviews are the clearest
  dropshipping tell and are increasingly illegal.
- **Low or zero reviews:** handle it honestly. Do not invent five-star filler.
  Instead lead with other proof: press mentions, founder credibility, a strong
  guarantee ("60-day returns, no questions"), UGC, or an honest "be among the first,
  with 30-day money-back if it's not for you". A new brand earns trust with a
  guarantee, not with fake stars.
- **UGC** (real customer photos/video) is powerful; use it with permission and
  attribution, never scraped or stock passed off as customers.

## 8. Price and value justification

- **State the price clearly**, near the add-to-cart, with the variant reflected.
- For a premium price, **justify it with substance**: the material, the guarantee,
  the cost-per-use, and what it replaces. Do not use a fake crossed-out "RRP".
- **Never** use a fabricated anchor price ("was GBP180, now GBP49") or a permanent
  "sale" that is just the real price. A discount must be real and, ideally, reasoned
  (launch offer, bundle, end-of-line).

## 9. Shipping, returns and delivery transparency

Treat these as **conversion levers surfaced near the buy button**, not footer fine
print. If unanswered, they cause abandonment at the exact moment of decision.

- **Delivery time and cost**, stated plainly next to add-to-cart: "Free delivery over
  GBP50 · Arrives in 3–5 working days". Give a real window, not "fast shipping".
- **Returns policy** in one plain line the buyer can find without hunting: window,
  cost (free or paid), and process. A generous, clearly stated returns policy measurably
  lifts conversion because it removes the risk of buying.
- **Regions served:** if you do not ship somewhere, say so before checkout, not after.
- Be honest about timelines. A promised 2-day delivery that takes 3 weeks generates the
  reviews that kill a brand.

## 10. Variants, subscriptions and bundles

- **Variant selection** (colour, size, style) uses clear, tappable controls: colour
  swatches showing the real colour, size as buttons not a dropdown where space allows.
  Disabled/out-of-stock variants are visibly marked, never hidden. The selected variant
  updates the gallery, price, and availability.
- **Subscription / refill** (for consumables): present alongside one-time purchase with
  the saving stated, the cadence clear, and **cancellation terms in plain text** ("skip
  or cancel anytime"). Never pre-select subscription to trick a one-time buyer.
- **Bundles and cross-sell**: offer genuinely complementary items ("add the strap")
  with a real bundle saving. Keep cross-sell below the primary buy decision so it never
  distracts from add-to-cart.

## 11. Sustainability and ethical claims

- **Substantiate every claim.** "Carbon neutral", "recycled", "ethically made" must be
  backed by something specific: a named certification, a material percentage, a factory
  partner, an offset programme. Vague green language with no evidence is greenwashing and
  a legal risk.
- Prefer **concrete, checkable statements**: "70% recycled polyester", "GOTS-certified
  cotton", "packaged in FSC card", not "eco-friendly" or "sustainable" as bare
  adjectives.
- If the brand is early on sustainability, say what it is doing honestly rather than
  overclaiming. Buyers punish exposed greenwashing harder than modest honesty.

## 12. Urgency and scarcity: the honest line

Scarcity mechanics convert, and are the most abused DTC pattern. Hold a hard line.

- **Honest**: a genuine low-stock count pulled from real inventory ("6 left in Sand"),
  a real launch or pre-order window with a true date, a real limited edition.
- **Manipulative and banned**: a countdown timer that resets on reload, a fake "23
  people viewing", a permanent "almost sold out", invented stock numbers. These are the
  clearest signals of a dropshipping store and destroy trust the moment they are caught.
- If there is no genuine urgency, **create none.** A strong product with clear returns
  does not need fake pressure.

## 13. Add-to-cart and sticky behaviour

- The **add-to-cart button** is the primary CTA: high-contrast, one clear label ("Add
  to bag"), always with the selected variant and price reflected.
- On mobile, a **sticky bottom bar** keeps the price and add-to-cart visible during the
  long scroll. It is the single highest-impact conversion element on a phone.
- After add-to-cart, prefer a **slide-in cart drawer** confirming the item, showing the
  free-shipping threshold progress and one relevant cross-sell, never a full-page
  redirect that loses the product context.
- Keep the button state honest: disable it until a required variant is chosen and say
  why ("Select a size").

## 14. Mobile-first priorities and accessibility

Most DTC traffic is mobile; design there first, and design it accessibly.

- Hero shot, product promise, price, variant selection, and add-to-cart must all be
  reachable within the first ~2 scrolls.
- Gallery is swipeable with visible position indicators; tap opens full-screen zoom.
- Size guide and shipping/returns open as bottom sheets, not new pages that lose the
  scroll position.
- Sticky add-to-cart bar is present from the moment the buy region scrolls out of view.
- Tap targets 44px+, `inputMode` set on quantity fields, and no hover-only affordances.
- One `<h1>` (the product name). Sections use `<section aria-labelledby>`.
- Every product image has alt text describing the product and view, not "product1".
- Variant swatches are real, labelled, keyboard-operable controls with a visible
  selected state. Colour is never the only signal.
- The size guide uses real `<table>` semantics with `<th scope>`.
- Reviews and star ratings expose an accessible text value ("4.6 out of 5").
- Contrast AA (4.5:1) in both themes, including price and shipping microcopy.

## 15. Common mistakes to avoid

1. A floating product on pure white, creating the marketplace-listing look.
2. A gallery that does not update when a variant is selected.
3. No in-use, on-body, or in-context shot, only catalog cutouts.
4. No zoom on the main image, so texture and quality can't be inspected.
5. Leading with specs instead of the story a DTC buyer came for.
6. Invented heritage ("family-owned since 1952") on a new brand.
7. Vague materials ("premium fabric") instead of named specifics.
8. No "what's in the box", so the buyer fears an unboxing surprise.
9. A vague S/M/L graphic instead of a real measurement size guide.
10. No fit guidance and no model height/size reference on on-body shots.
11. Fabricated reviews or an inflated review count.
12. Five suspiciously perfect five-star reviews on a brand-new product.
13. Hiding a low review count instead of leaning on a guarantee.
14. Scraped or stock imagery passed off as customer UGC.
15. A fake crossed-out "RRP" or a permanent "sale" that is just the price.
16. Shipping cost and time hidden in the footer instead of next to add-to-cart.
17. "Fast shipping" with no actual delivery window.
18. Returns policy that is hard to find or deliberately vague.
19. Not disclosing unsupported shipping regions until after checkout.
20. A countdown timer that resets on page reload.
21. Fake "23 people are viewing this right now".
22. Invented low-stock numbers not tied to real inventory.
23. Subscription pre-selected over one-time purchase to trick the buyer.
24. Cross-sell items placed above the primary buy decision.
25. Greenwashing: "eco-friendly" with no certification, percentage, or evidence.
26. No sticky add-to-cart on mobile.
27. A full-page redirect after add-to-cart that loses product context.
28. Add-to-cart enabled before a required variant is chosen.
29. An email popup intercepting the visitor before they've seen the product.
30. A closing section that adds no new reassurance about risk, returns, or fit.

## 16. Completion checklist

Verify before reporting done. Fix and re-verify anything that fails.

**Imagery**
- [ ] The hero shot shows the real product in a branded, in-context, or in-use way,
      not floating on pure white.
- [ ] The gallery covers hero, in-use, detail, scale, and what's in the box.
- [ ] The gallery and price update to the selected variant.
- [ ] The main image supports zoom; images past the first are lazy-loaded.

**Story & detail**
- [ ] The product story / origin appears near the top and is true.
- [ ] Materials, dimensions, care, and what's in the box are named specifically.
- [ ] A real measurement size guide exists, with fit guidance and model reference.

**Trust**
- [ ] All reviews are real and verified; the count is not inflated.
- [ ] A low/zero review count is handled with a guarantee, not fake stars.
- [ ] UGC is real, consented, and attributed.
- [ ] No invented heritage, certifications, or claims.

**Commerce**
- [ ] Price is clear and near add-to-cart, with any discount genuine and reasoned.
- [ ] Delivery time/cost and the returns policy are stated next to the buy button.
- [ ] Unsupported regions are disclosed before checkout.
- [ ] Subscription is never pre-selected to trick a one-time buyer.

**Honesty**
- [ ] Every sustainability claim is substantiated with something specific.
- [ ] No resetting countdown, fake viewer count, or invented stock numbers.
- [ ] Any scarcity shown is genuine.

**Conversion**
- [ ] Add-to-cart is the single primary action, variant and price reflected.
- [ ] A sticky add-to-cart bar is present on mobile.
- [ ] Add-to-cart confirms via a drawer, not a context-losing redirect.
- [ ] No popup intercepts the visitor before they've seen the product.

**Craft**
- [ ] Verified at 375, 768, 1024, 1440; hero, price, variants, and CTA reachable in
      ~2 mobile scrolls.
- [ ] One `<h1>`, labelled sections, real table semantics, keyboard-operable swatches.
- [ ] AA contrast in both themes, including price and shipping microcopy.
- [ ] If a skill file is in use, run that skill's self-verification loop as well.
