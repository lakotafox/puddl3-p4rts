---
name: prompt-agency
description: "Build a studio site where the work is the pitch: selected projects, a real process, named people, and an enquiry form that filters for the clients you want. Use when the user is building a site for a design studio, creative agency, consultancy, freelance practice or production company, and needs selected client work, case studies, a process section, named people, or an enquiry form that qualifies leads."
---

# Agency

Build a website for a design, development, branding, or marketing studio selling
high-value services. The conversion is a qualified enquiry, not a signup or purchase.
One good brief is worth more than a thousand visitors, so the page must produce good
briefs and repel bad ones.

This prompt defines **what the page must accomplish and say**. It does not prescribe
a visual style. Pair it with a skill file (for example `skill-editorial` or
`skill-luxury-serif`) to fix the look. Used alone, default to a restrained,
typographic, editorial layout that lets the work photograph itself.

Guard against treating an agency site like a product site. Products are evaluated on
features and price; studios on taste, judgement, and proof. If the page reads like it
sells a subscription, it is wrong.

## 1. Before you write anything

Establish these facts. If the brief omits them, state your assumption at the top of
your output and design against it.

| Fact | Why it changes the page |
|---|---|
| **What you actually sell** (brand identity, web build, growth retainer, product design) | Determines whether the hero leads with a portfolio grid, a positioning statement, or an outcome. |
| **Specialism vs generalist** | A specialist ("we do fintech brand systems") can name the vertical in the hero; a generalist leads with range and quality. |
| **Engagement shape** (project, retainer, sprint) | Changes the process section and the enquiry form's timeline and budget fields. |
| **Typical deal size** | Sets whom the form filters for. A £5k logo and a £250k rebrand need different qualification. |
| **The one project you would show a stranger** | It becomes the hero or the first case study. If there is not one, the studio is not ready for this page. |

## 2. Primary objective

**One conversion goal: a qualified enquiry.** Every section either proves this studio
does exceptional work, or removes a reason not to write in.

- Primary action: **Start a project** (or **Start an enquiry**). Use a form, not a
  bare `mailto:`.
- Secondary action: **See selected work**. Link or scroll to the portfolio, never a
  second filled button competing with the primary.
- Do not add a newsletter signup, a Calendly embed, or a live-chat widget competing
  with the enquiry form. There is one funnel.

Lead quality beats lead quantity. Ten precise briefs a month beat two hundred "how
much for a website" emails.

## 3. User journey

An agency buyer asks five questions in order. Every section maps to one:

1. **"Are these people any good?"** → hero + immediate selected work.
2. **"Have they done something like mine?"** → case studies with a real problem and
   a real result.
3. **"What is it like to work with them?"** → process, team, ways of working.
4. **"Do others trust them?"** → client logos, named testimonials, awards, press.
5. **"How do I start, and can I afford it?"** → enquiry form with honest budget
   framing.

Any section that does not advance one of these five is decoration. Cut it.

## 4. Required page structure

In order. Drop sections marked *optional* if there is nothing genuine to put in them.
Never fill them with invented content.

| # | Section | Must answer | Notes |
|---|---|---|---|
| 1 | Nav | Where do I look, how do I start? | Work, Services, Studio/About, Contact, **one** primary CTA. |
| 2 | Hero | Who are these people and what do they do? | A positioning line plus either one flagship project or an immediate work grid. No stock imagery. |
| 3 | Selected work | Have they done real work? | 4-8 projects. Each card: client, discipline, one-line outcome, thumbnail. |
| 4 | Case study deep-dive *(optional)* | Can they think? | 1-2 expanded studies: problem, approach, result, ideally a number. |
| 5 | Services | What can I hire them for? | 3-6 disciplines, plainly named. What each includes, not adjectives. |
| 6 | Process | What is working with them like? | 3-5 stages, specific to how this studio actually works. |
| 7 | Studio / team | Who are they? | Real names, real faces, real roles. Founder-led studios lead with the founders. |
| 8 | Clients & proof *(optional)* | Do others trust them? | Logos only if real and recognisable. Named testimonials with attribution. |
| 9 | Awards / press *(optional)* | External validation? | Only if genuine. One Awwwards SOTD beats a wall of invented badges. |
| 10 | Enquiry | How do I start? | The form. This is the whole funnel, so design it deliberately (§10). |
| 11 | Footer | Everything else | Contact email, socials, location, availability status, legal. |

## 5. Positioning and specialism

The hero must answer "why you and not the other studio" in one line.

- **A specialist names the territory.** "Brand and product design for climate
  companies." "We build Shopify Plus stores for fashion brands." A narrower claim
  converts the right buyer.
- **A generalist sells range and judgement.** With no vertical to name, lead with the
  work itself and a line about how you work: "Independent design studio. We make
  brands and the things they ship."
- **Never** open with "We are a full-service creative agency", "We craft digital
  experiences", "We tell stories", or "We are passionate about design". These lines
  are interchangeable and say nothing.
- The positioning line is 4-12 words. If it needs three clauses to explain what you
  do, the studio has not decided what it does.
- State availability if it helps. "Booking projects for Q3" creates urgency and
  filters tyre-kickers. "Currently at capacity. Join the waitlist" works as a flex.

## 6. Selected work

The work is the pitch. This section converts more than all the copy combined.

### Grid vs list
- **Grid** (2-3 columns of thumbnails) suits visual disciplines such as brand, motion,
  and art direction, where the image sells instantly. Use large, well-shot images.
- **List** (one project per row: client, discipline, year, hover-reveal) suits
  strategy, product, and engineering work where the *result* matters more than the
  aesthetic. It reads as senior and considered.
- **Never** show more than 8 projects on the landing view. Showing 30 projects reads
  like a freelancer marketplace, not a studio with taste. Curate ruthlessly; link to
  a fuller archive if needed.

### What a case-study card must carry
| Element | Purpose |
|---|---|
| Client name | Credibility. "Confidential client" reads as no client. |
| Discipline / service | Tells the buyer whether it maps to their need. |
| One-line outcome | "Rebrand that lifted trial signups 40%." Not "a bold new identity". |
| A single strong image | The best asset, cropped to sell. Not a mockup grid. |
| Year *(optional)* | Recency signals the studio is active. Omit if it ages the work. |

- **Order by strength, not chronology.** The best project is first, always.
- A thumbnail must be a real deliverable, not an abstract gradient placeholder. If
  the work cannot be shown (NDA), describe the outcome and explain why the visual is
  withheld. Do not fabricate a mockup.

## 7. The process section

Almost every studio has the same "process" section: Discover, Design, Develop,
Deliver. That sequence is worthless because it describes every studio. Make it
specific or cut it.

- **Name what you actually do differently.** If you run a one-week diagnostic sprint
  before quoting, prototype in code from day one, or co-locate with the client's team,
  say so.
- **Attach a real artefact to each stage.** "Discovery → a 20-page strategy
  document and a stakeholder map." An output makes the stage concrete.
- **State durations honestly.** "Brand sprint: 4 weeks. Full identity: 8-12 weeks."
  This sets expectations and qualifies.
- 3-5 stages maximum. A 9-step process reads as bureaucracy, not craft.
- If the process is just "we talk, we design, we ship", cut the section rather than
  dress it up. An honest omission beats a generic diagram.

## 8. Services presentation

- Name disciplines plainly: "Brand Identity", "Web Design & Build", "Growth
  Retainer", "Product Design". Avoid coined terms like "Experience Architecture" that
  buyers must decode.
- For each service, state **what is actually delivered:** "a design system, a
  component library, and a Figma handoff", not "beautiful, memorable experiences".
- If services map to different budget bands, hint at it here so the enquiry form is
  not the first mention of money.
- Do not list 15 services. A studio that does everything is trusted with nothing.
  3-6 focused disciplines signal expertise.

## 9. Team and credibility

The buyer hires humans. Anonymity kills a services sale.

- **Show real people with real names and roles.** Founder-led studios lead with the
  founders and their track record ("previously design lead at Stripe").
- Faces build trust; stock headshots destroy it. If photography is not available, a
  consistent illustrated avatar beats a fake stock photo.
- Credibility signals: where the team worked before, years operating,
  notable clients, conference talks, published writing, open-source work.
- **Client logos:** use only real, recognisable, permissioned ones. Four unknown logos
  are worse than none. A single "Google" logo you can substantiate beats twelve you
  cannot.
- **Testimonials must be attributed:** full name, role, company, ideally a photo.
  "Amazing to work with, CEO at a tech company" reads as invented. One quote from a
  recognisable VP of Brand is worth more than five anonymous raves. Quote the specific
  result, not the vibe: "They rebuilt our checkout and conversion went up 22%."

## 10. The enquiry form (the whole funnel)

This is the page's most important element. Field choices determine lead quality. Too
few and you drown in unqualified messages; too many and serious buyers bounce. Aim
for **5-7 fields** that each do qualification work.

| Field | Type | Why it exists |
|---|---|---|
| Name | text, required | Basic; also filters bots slightly. |
| Email | `type="email"`, required | The reply channel. Validate format. |
| Company / brand | text, optional | Lets you research before replying; signals seriousness. |
| Project type | select, required | Routes the enquiry and forces the buyer to self-classify (brand / web / retainer / other). |
| Budget range | select, required | The single most important qualifying field; see below. |
| Timeline | select, optional | "ASAP" vs "next quarter" tells you if it is real. |
| Tell us about the project | textarea, required | The quality of this answer *is* the lead quality. A one-line answer is a weak lead. |

### Why field choice filters lead quality
- **A budget-range select is the highest-leverage filter.** Ranges (e.g.
  "£5-15k", "£15-50k", "£50k+", "Not sure yet") let you disqualify politely and
  route by size. Buyers who refuse to pick a range are rarely ready to spend.
- **A required project-type select** forces self-classification and prevents the "can
  you do X?" enquiries for things you do not do.
- **A required, roomy project textarea** is the best signal of all. Three considered
  paragraphs signal a real prospect; "interested, call me" does not. Do not cap it
  too short.
- **Never** ask for phone number as required because it depresses submissions and you
  do not need it to reply.
- Keep the form on one screen. A multi-step wizard for a 6-field form is pointless
  friction.
- State what happens next in caption text under the button: "We reply to every
  enquiry within 2 working days." This lifts submissions and sets expectation.

## 11. The "no pricing" problem

Agencies rarely publish prices, and buyers know it. The mistake is pretending the
question does not exist. Address it directly.

- **Publish a floor, not a rate card.** "Projects typically start at £15,000." "Brand
  identities from £8k; full systems £30k+." "Retainers from £4k/month." A floor
  qualifies buyers before they enquire and saves wasted calls.
- If you genuinely cannot publish a number, **explain what price depends on:** scope,
  team size, and timeline. Do it in one honest sentence, then push the budget-range
  select in the form to do the qualifying.
- **Never** write "We offer competitive pricing" or "affordable rates". The first is
  meaningless; the second signals a race to the bottom that repels premium buyers.
- A high floor is positioning. "From £50k" tells a £5k buyer to leave and a £200k
  buyer that they are in the right place.

## 12. Responsive priorities

- **Mobile is the discovery visit; desktop is the evaluation visit.** On mobile, the
  positioning line, two pieces of work, and the enquiry CTA must be reachable within
  ~3 scrolls.
- Work grids collapse to a single column on mobile. Do not shrink three columns into
  illegible thumbnails. Full-width images read as confident.
- The list-style portfolio becomes stacked rows; keep the client name and outcome,
  drop the hover interaction (there is no hover on touch).
- The enquiry form must work on mobile: 44px+ tap targets, correct
  `inputMode`, `autoComplete`, and native `<select>` for budget/type so mobile
  keyboards behave.
- Case-study images must stay sharp; ship right-sized assets, not a 4000px hero scaled
  down.

## 13. Accessibility

- One `<h1>` (the studio name or positioning line). Sections use
  `<section aria-labelledby>`.
- Every work image needs alt text that describes **what the project is**, for example
  "Rebrand and packaging system for a coffee roaster", not "portfolio image 3".
- The enquiry form uses real `<label>` elements tied to inputs, visible focus rings,
  and inline error messages via `aria-describedby`. Never rely on placeholder
  text as the only label.
- Required fields are marked in text and with `aria-required`, not colour alone.
- Testimonial carousels, if used, must be pausable and keyboard-operable. Never
  auto-advance with no controls.
- AA contrast (4.5:1) in both themes, including muted caption text and form hints.

## 14. Common mistakes to avoid

**Positioning and copy**
1. "We are a full-service creative agency that crafts digital experiences", the
   industry's most interchangeable sentence.
2. A hero with no work in it: a wall of manifesto copy before the visitor sees a
   single project.
3. "We are passionate about...", "We tell stories", "We are a collective of makers".
4. Naming so many services the studio looks like it specialises in nothing.
5. Coined proprietary terms ("Brand Alchemy", "Experience Architecture") a buyer must
   decode.

**Work presentation**
6. Showing 30 projects gives freelancer energy, not studio taste.
7. Ordering work chronologically instead of by strength.
8. Abstract gradient placeholders where a case-study thumbnail should be.
9. "Confidential client" on every card, so no credibility accrues.
10. Case-study cards with a headline and no outcome offer pure aesthetic, no argument.
11. Fabricating a mockup for NDA work instead of describing it in honest text.

**Process and team**
12. The generic "Discover / Design / Develop / Deliver" diagram that fits every studio.
13. A 9-stage process that reads as bureaucracy.
14. A faceless studio with no names, no people, and "the team" as an abstraction.
15. Stock headshots instead of real faces.
16. Inventing "previously at [famous company]" credentials.

**Proof**
17. A logo wall of unrecognisable or unverifiable clients.
18. Anonymous testimonials ("CEO, a startup").
19. Testimonials praising the vibe ("great to work with") instead of a result.
20. Invented awards or "as featured in" badges linking nowhere.

**The enquiry form**
21. A bare `mailto:` link instead of a form gives no qualification or routing.
22. A two-field form (name + email) that produces unqualified spam.
23. A fifteen-field form that serious buyers abandon.
24. Requiring a phone number, depressing submissions for no reason.
25. No budget field, so every enquiry starts from zero on price.
26. A tiny single-line "message" input that cannot capture a real brief.
27. A multi-step wizard for a six-field form.
28. No "what happens next" copy, leaving the buyer unsure they were heard.

**Pricing and general**
29. Pretending pricing does not exist, then springing it on a discovery call.
30. "Competitive pricing" / "affordable rates" repel premium buyers and attract
    bargain hunters.
31. A newsletter signup or auto-opening chat widget competing with the enquiry form.
32. Dead nav links to a "Blog" or "Careers" page that does not exist.

## 15. Completion checklist

Verify before reporting done. Fix and re-verify failures.

**Message**
- [ ] The hero positioning line could not be copy-pasted onto a rival studio's site.
- [ ] No banned filler appears ("full-service", "we craft experiences", "passionate",
      "we tell stories").
- [ ] Every service states what is delivered, not an adjective.

**Work**
- [ ] Real work is visible within the first viewport and a half.
- [ ] At most 8 projects on the landing view, ordered best-first.
- [ ] Every case-study card carries a client, a discipline, and an outcome.
- [ ] No fabricated mockups or gradient placeholders stand in for real work.

**Credibility**
- [ ] Real people with real names and roles appear on the page.
- [ ] Every logo and testimonial is real and, where a person is quoted, fully
      attributed.
- [ ] The process section describes how *this* studio works, not a generic diagram.

**Funnel**
- [ ] The enquiry form has 5-7 fields, each doing qualification work.
- [ ] A budget-range select is present and required.
- [ ] The project textarea is roomy enough for a real brief.
- [ ] "What happens next" copy sits under the submit button.
- [ ] No competing newsletter, chat, or Calendly widget.

**Pricing**
- [ ] A floor price is published, or price dependence is explained in one honest line.
- [ ] No "competitive" or "affordable" language.

**Craft**
- [ ] Verified at 375, 768, 1024, 1440.
- [ ] Work grids collapse cleanly; images stay legible on mobile.
- [ ] One `<h1>`, labelled sections, real form labels, keyboard-operable carousels.
- [ ] AA contrast in both themes.
- [ ] All nav and footer links resolve.
- [ ] If a skill file is in use, run that skill's self-verification loop as well.
