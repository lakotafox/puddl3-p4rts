---
name: prompt-fitness
description: "Build a fitness page that converts an emotional decision into a booked trial: transformation framing without unfounded claims, schedule UI that works on mobile, honest proof, and transparent pricing. Use when the user is building a page for a gym, studio, personal trainer, coaching programme or fitness app, mentions class schedules, memberships, free trials, transformations or testimonials, or needs to turn an emotional decision into a booked session."
---

# Fitness

Build the marketing page for a fitness business, whether a gym or studio, an online
coaching programme, or a fitness app.

This prompt defines **what the page must accomplish and say**. It deliberately does
not prescribe a visual style. Pair it with a skill file (for example
`skill-playful-motion` for energy or `skill-neobrutalism` for a bold studio brand)
to fix the look. Used alone, default to a high-contrast, photography-led design with
one confident accent colour.

The failure mode this guards against is specific: agents write fitness pages that
either make medical-grade promises the business cannot legally support, or hide the
one thing the buyer came for: when they can start, what it costs, and whether they
are locked in. The buyer is making an emotional decision about who they want to be
and a coldly practical one about time, money and location. Serve both.

## 1. Before you write anything

Establish these facts. If the brief does not supply them, state your assumption at
the top of your output and design against it.

| Fact | Why it changes the page |
|---|---|
| **Business type** (physical / online / app) | Determines the entire structure; see §4. A gym leads with location; a coaching programme leads with the coach; an app leads with the product. |
| **The buyer's starting point** (beginner, returning, athlete) | A nervous beginner needs reassurance and a low-stakes first step; an experienced lifter needs equipment specs and programming depth. |
| **The primary offer** (free week, first class free, trial month, free app tier) | This is the conversion. Everything points at it. |
| **Commitment model** (rolling monthly, fixed contract, class packs, subscription) | The cancellation question is the biggest silent objection. The model dictates how you answer it. |
| **Location and catchment** (physical only) | People will not join a gym they cannot get to. Travel time is a hard filter. |

## 2. Primary objective

**One conversion goal: get them to start, at the lowest possible stakes.**

- Physical gym or studio → **Book a free trial / first class free**. A tour or day
  pass is the secondary.
- Online coaching → **Book a free consultation / application call**. A programme
  breakdown is the secondary.
- Fitness app → **Start free** (app store link or email). A feature tour is the
  secondary.

Selling a 12-month contract on the first visit is the mistake. The offer is a
no-risk first experience; the contract is a conversation that happens after the
person is in the room or in the app.

## 3. User journey

The page carries a visitor through six emotional states in order. Every section maps
to one:

1. **"Could this be me?"** → hero: the transformation, shown with a real person the
   buyer can identify with.
2. **"Is this place for someone like me?"** → who it is for, the vibe, the community.
3. **"What would I actually do here?"** → programmes, classes, or app features.
4. **"Can I trust the people running it?"** → trainers, credentials, real results.
5. **"Does the practical stuff work?"** → schedule, location, hours, price, contract.
6. **"What is the first step and is it safe?"** → the trial offer with its terms in
   plain language.

If a section does not advance one of these, cut it.

## 4. Required page structure by business type

The three business types are structurally different. Choose one; do not blend them.

### 4a. Physical gym or studio

| # | Section | Must answer |
|---|---|---|
| 1 | Nav | Where do I start? Programmes, Timetable, Pricing, Locations, one CTA. |
| 2 | Hero | What is this and could it be me? Real member imagery, outcome-led headline, trial CTA. |
| 3 | Vibe / community | Is this my kind of place? Photos of real members and the space, not stock. |
| 4 | Programmes / classes | What would I do? 3–6 offerings, each with intensity and who it suits. |
| 5 | Timetable | When can I come? Full weekly schedule; see §6. |
| 6 | Trainers | Who coaches me? Real bios, certifications, specialisms. |
| 7 | Results / testimonials | Does it work for people like me? Attributed member stories. |
| 8 | Location & hours | Can I get there? Map, address, parking, transit, staffed hours. |
| 9 | Pricing & contract | What does it cost and am I locked in? Full table plus cancellation terms. |
| 10 | Trial CTA | What is the first step? The free trial with its terms. |
| 11 | FAQ | Everything left, including "I've never trained before". |
| 12 | Footer | Contact, socials, legal, health disclaimer. |

### 4b. Online coaching programme

Replace location/timetable with: **how coaching works** (the delivery mechanism:
app, calls, check-ins), **the coach's own story and credentials** moved up directly
after the hero, **programme structure** (weeks, phases, what each includes), and a
**consultation-call CTA** instead of a walk-in trial. Results and honest
before/afters carry more weight here because there is no physical space to visit.

### 4c. Fitness app

Structure it as a software product: hero with the app shown on a real device,
core features each with a screen, the programming or content library, social proof
by download count and store rating (only if real), a free-tier explanation, and
pricing for the subscription. Lead with **Start free**; the trial is instant.

## 5. The transformation promise, honestly

The hero sells a transformation. The line between motivating and unlawful is real.

- **Be specific about the experience, not guarantees about the body.** "Strength
  training in a room that never makes you feel judged" is specific and safe.
  "Lose 10kg in 30 days" is a claim you must be able to substantiate and is often a
  regulated health claim.
- **Never state or imply a guaranteed medical or weight outcome** unless the business
  can substantiate it and it has been reviewed. Outcomes vary per person and the copy
  must not pretend otherwise.
- **Anchor the promise in the process**: how often they train, what a session feels
  like, how quickly they will feel stronger or more capable. Process claims are both
  honest and more motivating than outcome claims.
- **Name the emotional payoff**: confidence, energy, routine, belonging. These are
  what people actually buy and they carry no regulatory risk.

Add an appropriate disclaimer where results, nutrition, or health advice appear:
that results vary, and that members should consult a physician before starting a new
programme. Any specific health or medical claim must be substantiated and reviewed by
a qualified professional before it ships.

## 6. Schedule and timetable UI

The timetable is the hardest UI on the page and the one agents get most wrong. Solve
it concretely for both viewports.

**Desktop:** a 7-column week grid. Columns are days; rows are time slots. Each class
is a block showing class name, time, duration, instructor, and remaining spots or a
"book" affordance. Colour-code by class type but never rely on colour alone. Include
a text label, because colour is not an accessible signal.

**Mobile:** never shrink the 7-column grid; it becomes unreadable. Instead:

- Default to **today**, with a horizontal day-selector (Mon–Sun) pinned at the top as
  a scrollable or tappable strip.
- Under the selected day, render a **vertical list** of classes in time order, each
  row: time, class name, duration, instructor, availability, and a full-width tap
  target to book.
- Tap targets are 44px minimum. The current day is visually and programmatically
  marked (`aria-current="date"`).

| Requirement | Desktop | Mobile |
|---|---|---|
| Layout | 7-column week grid | Single-day vertical list + day selector |
| Default view | Full week | Today |
| Class block shows | Name, time, duration, instructor, availability | Same, stacked |
| Filtering | By class type and instructor | Same, as a collapsible sheet |
| Booking affordance | Per-block button | Full-width row tap target, 44px+ |

Filtering by class type, instructor, and level is expected once there are more than
~15 weekly classes. Always show timezone for online or hybrid schedules.

## 7. Programme and membership structure

- Present **3–6 programmes or class types**, each with: what it is, the intensity
  level, who it suits ("new to lifting" vs "training for a race"), and typical
  session length.
- For memberships, state **what each tier includes**: class access, peak vs
  off-peak, guest passes, and freeze options, not just a price.
- Rank by what the buyer wants, not by margin. The beginner-friendly option usually
  belongs first.
- If classes require booking, say so, and say how far ahead booking opens.

## 8. The trial offer as the primary conversion

The free trial, first-class-free, or free-week is the single most important element.

- **Frame it as zero-risk and finite.** "Your first class is on us" or "7 free days,
  no card, cancel anytime". State the exact length and what is included.
- Put the offer in the hero CTA and repeat it verbatim at every CTA down the page.
- **State the friction next to the button** in caption text: "No card · No contract ·
  Cancel anytime". This lifts conversion more than restyling the button.
- The booking form asks for the **minimum**: name, email, phone, preferred date or
  class. Do not ask for fitness goals, injuries, or payment before the first visit.
- After booking, tell them exactly what to bring and what to expect on arrival.
  Reducing first-visit anxiety is part of the conversion.

## 9. Trainer and coach credibility

People trust people. Fabricated authority is transparent and damaging.

- Every trainer gets a **real name, photo, one specialism, and a genuine
  certification** (e.g. "Level 3 PT", "Precision Nutrition L1", "CrossFit L2").
- One or two sentences of real bio. Their own training story lands harder than a
  list of adjectives.
- For online coaching, the head coach's credibility carries the whole page: their
  results, their clients, their qualifications, moved directly under the hero.
- **Never invent certifications, client counts, or credentials.** If a trainer is
  newly qualified, lead with their specialism and energy, not fake tenure.

## 10. Honest before/after and results imagery

Before/after imagery is powerful and the most abused element in the industry.

- Use **only real, consented member photos**, shot under comparable conditions:
  same lighting, similar pose, similar framing. Manipulated lighting, posture tricks,
  or a suck-in-vs-flex pairing is deceptive and gets recognised instantly.
- **Attribute** results to a real first name and, where consented, a short quote in
  the member's own words about how training felt, not just the visual.
- State the **realistic timeframe** and add "results vary" wherever a result appears.
- If the business has few or no before/afters yet, **do not fabricate them.** Lead
  instead with community photos, testimonials about the experience, and the coach's
  own credibility. A page with honest process proof beats a page with fake results.
- Inclusivity is a conversion lever, not decoration. Show a genuine range of ages,
  body types, and abilities so the visitor can find themselves in the imagery.

## 11. Pricing and contract transparency

- **Show the price.** A fitness page that hides pricing behind an enquiry form loses
  the majority of self-serve buyers. If pricing is genuinely bespoke, publish a floor
  ("Memberships from GBP39/mo").
- Present membership tiers as a table or stacked cards; state the **limit that bites**
  (peak access, class count, contract length) per tier.
- **Answer the cancellation question in plain text, directly under the price.** Every
  buyer has it. State: the contract length or that it is rolling, the notice period,
  any freeze/pause option, and any joining fee. Hiding this is the fastest way to
  erode trust.
- Never use a fake "was GBP59, now GBP29" strike-through or a countdown that resets.

## 12. Location, hours and finding us

For physical businesses, "can I get there" is a hard filter answered concretely:

- **Full address, an embedded or linked map, and directions.** State nearest transit
  and parking situation explicitly: "free parking for 40 cars" or "street parking,
  nearest station 6 min walk".
- **Staffed hours vs access hours:** a 24/7 gym with staffed hours 6am–8pm must say
  both.
- Multiple locations get a **location selector** that filters timetable and pricing;
  never merge two branches' schedules into one confusing grid.

## 13. Accessibility and inclusivity

- One `<h1>`. Sections use `<section aria-labelledby>`.
- The timetable is a real, navigable structure, not a colour-only grid. Day and time
  are text; the current day carries `aria-current`.
- Imagery reflects a genuine range of people; alt text describes the activity, not
  "person exercising".
- Respect `prefers-reduced-motion`: energetic hero motion must have a calm fallback.
- Tap targets 44px+; contrast AA (4.5:1) in both themes, including caption microcopy.
- Copy avoids shaming, weight-stigmatising, or fear-based language. Motivate toward
  something, never away from self-loathing.

## 14. Common mistakes to avoid

1. A hero that guarantees a weight-loss or medical outcome the business cannot legally
   substantiate.
2. Before/after photos with mismatched lighting, posing, or obvious editing.
3. Fabricated transformation photos or invented member results.
4. No health disclaimer anywhere near results or nutrition claims.
5. A weekly timetable that keeps its 7-column grid on mobile and becomes unreadable.
6. Hiding pricing entirely behind "enquire now".
7. No answer to the cancellation and contract-length question.
8. A hidden joining fee revealed only after signup.
9. Asking for goals, injuries, or payment before the first free visit.
10. Five different CTA labels ("Join now" / "Get started" / "Sign up" / "Try us" /
    "Book").
11. Stock photography of models who have obviously never used the facility.
12. Imagery showing only one body type, age, or ability level.
13. Invented trainer certifications or client counts.
14. Trainer cards with a title but no real credential or specialism.
15. A transformation promise built on outcome guarantees instead of process.
16. Shaming or fear-based copy ("stop being lazy", "torch your fat").
17. No location, map, or travel information for a physical gym.
18. Merging two branches' schedules into one grid with no location filter.
19. Not stating staffed hours vs 24/7 access hours.
20. A countdown timer on the "limited" joining offer that resets on reload.
21. Auto-playing loud video in the hero with no mute or reduced-motion fallback.
22. Testimonials credited only as "a happy member".
23. Booking the free trial then leaving the person with no idea what to bring.
24. Class blocks that show a name but not the instructor, duration, or availability.
25. Using colour alone to distinguish class types in the timetable.
26. Treating the online coaching page like a gym page (leading with a room, not the
    coach).
27. An app page with no actual app screenshots, only illustrations instead of the product.
28. A closing CTA that repeats the hero with no new reassurance about risk or terms.

## 15. Completion checklist

Verify before reporting done. Fix and re-verify anything that fails.

**Message**
- [ ] The hero promise is process- and experience-led, not an unsubstantiated outcome
      guarantee.
- [ ] No medical or weight-loss claim appears without substantiation and a disclaimer.
- [ ] Copy motivates toward a goal and never shames the reader.
- [ ] No banned filler ("torch", "shred", "beast mode" as the whole pitch) stands in
      for a real reason to join.

**Structure**
- [ ] The correct structure (gym / coaching / app) is used, not a blend.
- [ ] All six journey states (§3) are served in order.
- [ ] The trial offer appears in the hero and is repeated verbatim at every CTA.

**Schedule**
- [ ] The timetable is a 7-column grid on desktop and a single-day list on mobile.
- [ ] Mobile defaults to today with a day selector and 44px+ booking targets.
- [ ] Class blocks show name, time, duration, instructor, and availability.
- [ ] Class type is never distinguished by colour alone.

**Trust**
- [ ] Every before/after is real, consented, comparably shot, and attributed.
- [ ] "Results vary" appears wherever a result is shown.
- [ ] Every trainer has a real name, photo, credential, and specialism.
- [ ] Nothing is invented: results, counts, certifications.

**Pricing**
- [ ] A price or credible floor is visible on the page.
- [ ] Contract length, notice period, freeze option, and any joining fee are stated
      in plain text.
- [ ] No fake strike-through or resetting countdown.

**Practical**
- [ ] A physical gym shows address, map, parking, transit, and staffed vs access
      hours.
- [ ] Multiple locations have a working selector.

**Craft**
- [ ] Verified at 375, 768, 1024, 1440.
- [ ] One `<h1>`, labelled sections, keyboard-operable schedule and FAQ.
- [ ] Imagery shows a genuine range of people; alt text describes the activity.
- [ ] `prefers-reduced-motion` respected; AA contrast in both themes.
- [ ] If a skill file is in use, run that skill's self-verification loop as well.
