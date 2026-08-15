---
name: prompt-fintech
description: "Build a financial product page where trust is the design problem: licensing, deposit protection, security, fee transparency, and required risk disclosures placed to convert. Use when the user is building a page for a bank, broker, payments, lending, investing or crypto product, mentions regulation, licensing, deposit protection, fees, APR or risk disclosures, or needs required financial disclaimers placed where they are legally effective."
---

# Fintech

Build the marketing page for a financial product: banking, payments, lending,
investing, or financial infrastructure. Unlike a generic SaaS page, the central
design problem is not explaining features; it is **earning enough trust that a
stranger will connect a bank account or move money.** Every visitor arrives primed
by a decade of fintech fraud to assume the worst.

This prompt defines **what the page must accomplish and say**. It does not prescribe
a visual style. Pair it with a skill file (for example `skill-corporate-trust` or
`skill-swiss-grid`). Used alone, default to a sober, high-contrast, grid-disciplined
layout: precision reads as competence, and competence reads as safety.

> **This prompt is not legal advice.** Disclosure wording, required warnings, licence
> statements, and regulator references vary by jurisdiction and product and change
> over time. Every disclosure on the page must be reviewed and approved by qualified
> counsel and your compliance team for each market you operate in before launch. The
> guidance below is a structural pattern, not legally sufficient copy.

## 1. Before you write anything

Establish these facts. If the brief does not supply them, state your assumption at
the top of your output and design against it, but flag every compliance-sensitive
assumption loudly, because guessing here creates legal exposure.

| Fact | Why it changes the page |
|---|---|
| **Consumer or infrastructure** | A B2C money app and a payments API need fundamentally different structures (§8). |
| **Licence and regulatory status** | Whether you are a bank, an EMI, a broker-dealer, an agent of a licensed partner, or unregulated changes what you may claim and must disclose. |
| **Jurisdictions** | US, UK, EU each mandate different warnings and protection schemes. The page must name the right one per market. |
| **Where customer money sits** | Own balance sheet, a sponsor bank, a segregated client-money account, self-custody. This is the single question a serious user cares about most. |
| **The product's core risk** | Capital at risk, no deposit protection, variable rates, crypto volatility. The riskiest fact must be disclosed, not buried. |

## 2. Primary objective

**One conversion goal, gated by trust.** For consumer products it is usually
**Open an account** or **Get the app**; for infrastructure it is **Get API keys** or
**Talk to sales**. But the conversion only happens after the visitor believes the
product is legitimate, so trust signals are not a footer afterthought, they are
load-bearing structure placed high.

- Consumer: **Open an account**, with the eligibility and "your money is protected"
  framing adjacent.
- Infrastructure: **Read the docs** or **Get API keys**, with uptime, compliance,
  and integration proof adjacent.
- Never let a growth-hacky urgency device ("Only 200 spots left!") near a money
  product. Scarcity theatre reads as a scam here more than anywhere.

## 3. The trust ladder for money

This is the core of the page. Use every rung you honestly hold; surface the top rungs
above the fold. Each rung is a liability if faked, and faking a regulatory claim is a
criminal matter, not a marketing risk.

| Rung | What it is | Where it goes |
|---|---|---|
| **Licence / registration** | "Authorised and regulated by the FCA (ref 123456)", "Member FDIC via [Sponsor Bank]", state lending licences. | Named in the footer on every page; the strongest claim also near the hero. |
| **Deposit / investor protection** | FDIC/FSCS insurance, SIPC coverage, or an explicit statement that funds are *not* protected. | Adjacent to the balance/deposit messaging, not hidden. |
| **Custody arrangement** | Where money actually sits: segregated client-money accounts, sponsor bank, qualified custodian. | A short, plain "Where your money is kept" block. |
| **Audit & testing** | SOC 2 Type II, ISO 27001, PCI DSS level, independent penetration tests, financial audits. | A security/compliance section; link the reports, do not just show badges. |
| **Security architecture** | Encryption in transit/at rest, MFA, fraud monitoring, card controls, biometric login. | A concrete security section (§9). |

- **Name the regulator and the reference number.** "Regulated" with no authority named
  is a red flag. "Authorised and regulated by the Financial Conduct Authority, firm
  reference number 123456" is verifiable and therefore trusted.
- **Be exact about the sponsor-bank relationship.** If you are not the bank, say
  "Banking services provided by [Bank], Member FDIC." Implying you are a bank when you
  are an agent is both a compliance breach and a trust breach when discovered.
- **State the absence of protection when it applies.** "This is an investment. Your
  capital is at risk and is not covered by FSCS." Hiding this is the fastest route to
  regulatory action and to being labelled a scam.

## 4. Required disclosures and risk warnings

Financial pages carry **mandatory** language. This is not optional polish. Omitting
it is a regulatory breach in most jurisdictions. The design challenge is placing it
so it is genuinely visible without destroying the page. The specifics below are a
pattern; counsel supplies the exact wording per market.

- **Investing / trading:** a capital-at-risk warning is typically required. UK
  financial promotions rules require a prominent risk warning; US securities and
  crypto products require their own. Pattern: a short, high-contrast warning near the
  primary CTA *and* a fuller version in the footer.
- **Credit / lending:** representative APR and a representative example are commonly
  mandated (UK Consumer Credit; US Truth in Lending / Reg Z with APR disclosure). The
  headline rate cannot appear without the representative example nearby.
- **Crypto:** most jurisdictions now require a "you could lose all your money / not
  regulated in the same way" style warning, often before signup.
- **Deposits:** FDIC/FSCS statements must follow the regulator's exact form and
  cannot be paraphrased into marketing copy.

**How to place disclosures without wrecking the page:**
- A **persistent thin disclosure bar** (footer-anchored or a slim band under the hero)
  in legible caption size, never 8px grey-on-grey. Regulators treat illegible
  warnings as absent.
- **Contextual micro-disclosures** next to the specific claim: the APR beside the
  "borrow from X%" line, the risk warning beside the "start investing" button.
- A **full legal footer block** with the complete language, licence numbers, and
  entity details.
- **Never** hide a required warning behind a tooltip, an accordion collapsed by
  default, or 10px text the same colour as the background. If the law says
  "prominent", a hover-to-reveal fails that test.

## 5. Fee transparency

Hiding fees is the single biggest conversion killer in fintech, because opaque fees
are the defining trait of the predatory products users have been burned by.

- **Show the real cost structure.** "No monthly fee. 0.5% FX markup. £0 domestic
  transfers." A user who cannot find the fee assumes it is being hidden. They are
  usually right.
- Put the fee model where the value proposition is, not on a separate page the buyer
  has to hunt for. Transparency *is* the differentiator against incumbents.
- If there is a genuinely free tier, state its limits plainly (transaction caps, ATM
  withdrawal limits) rather than letting the user discover them after signup.
- **Never** use "no hidden fees" as a slogan while hiding fees behind "see full
  pricing". The contradiction is fatal. If you say no hidden fees, every fee must be
  on the page.
- For payments infrastructure, publish per-transaction pricing (e.g. "2.9% + 30¢")
  and volume tiers. Developers will not integrate a processor whose pricing requires a
  sales call.

## 6. Rate and APR presentation

- **A rate never appears alone.** "Earn 4.5% AER" needs the conditions: variable or
  fixed, gross/net, whether it is introductory, and any balance cap.
- Distinguish **representative** from **guaranteed**. "Representative 24.9% APR"
  legally implies most approved customers get that or better; do not use it loosely.
- Show a **worked example** for credit: borrow £X over Y months at Z% APR = £N total.
  This is often mandatory and always more trusted than a bare headline rate.
- Mark whether rates are variable and can change, and date any rate that could go
  stale ("Rates correct as of [date]").
- **Never** display a promotional teaser rate in giant type with the real ongoing rate
  in the disclosure. This is the classic predatory pattern and users recognise it.

## 7. Onboarding and KYC expectation-setting

Every regulated financial product requires identity verification, and an unexpected
KYC wall is a major drop-off point. Set the expectation on the landing page.

- State plainly what signup involves: "Open an account in 5 minutes. You will need a
  photo ID and proof of address." Surprises at the KYC step feel like bait-and-switch.
- Name eligibility up front: countries served, minimum age, residency requirements.
  A UK-only product must not let a US visitor get three screens deep before finding
  out.
- If approval is not instant (credit checks, manual review), say so. "Most accounts
  approved in minutes; some reviews take up to 2 business days."
- For business/infrastructure products, note the compliance onboarding (business
  verification, expected volumes) so the buyer is not surprised by an underwriting
  process.

## 8. Consumer vs infrastructure fintech

These are two different pages. Do not build one and relabel it.

| Dimension | Consumer fintech | Infrastructure / API |
|---|---|---|
| Audience | End users moving their own money | Engineers and finance teams embedding payments |
| Hero | Outcome + trust ("Banking without the fees. FDIC-insured.") | Code sample or a clean integration diagram |
| Proof | Deposit protection, app-store ratings, user numbers | Uptime SLA, latency, processing volume, named platforms built on it |
| Primary CTA | Open an account / Get the app | Read the docs / Get API keys |
| Compliance framing | Consumer protection, insurance | PCI DSS, SOC 2, data residency, sub-processors |
| Fees | Personal fee schedule | Per-transaction and volume pricing, published |
| Docs | Help centre | First-class API reference, linked from the nav, never gated |

- A **consumer page** leads with reassurance and the personal outcome. Trust rungs and
  protection sit near the fold.
- An **infrastructure page** leads like a developer tool: a real integration snippet,
  uptime and latency numbers, and evidence that reputable companies already build on
  it. Its trust story is operational (uptime, compliance certifications) more than
  emotional.

## 9. The security section

Security is where a money product proves competence. Be concrete, not decorative.

- **Encryption:** "256-bit encryption in transit and at rest." Not "bank-grade
  security", which is a meaningless phrase regulators and engineers both distrust.
- **Authentication:** MFA, biometric login, device binding, session controls.
- **Fraud and controls:** real-time fraud monitoring, instant card freeze,
  per-merchant controls, transaction alerts.
- **Certifications:** PCI DSS level, SOC 2 Type II, ISO 27001. Link the reports or a
  trust-centre page; a badge with no link is noise.
- **Never** claim "military-grade" or "unhackable". Both are red flags to any
  security-literate reader and to regulators.

## 10. Social proof that works for money

- **App-store ratings with volume:** "4.8 stars, 40,000 reviews" is strong; "5 stars"
  with no count is not.
- **Regulated-entity numbers:** "£2bn processed", "1M+ accounts", or "trusted by 5,000
  businesses" are strong only if true and, ideally, independently verifiable.
- **Named institutional partners:** the sponsor bank, card networks (Visa,
  Mastercard), the custodian. Borrowing the incumbent's credibility is legitimate and
  powerful.
- **Press and regulator listings:** a link to your entry on the regulator's public
  register is the highest-trust proof available. Use it.
- **Named testimonials** with role and company for B2B; verified user reviews for B2C.
  Anonymous quotes read as invented, which is fatal for a trust product.
- **Never** invent user counts, fabricate volume figures, or imply partnerships that
  do not exist. In finance this is not just dishonest. It is actionable.

## 11. Comparison against incumbents

Fintech usually sells against a bank or a legacy processor, and a fair comparison
converts. An unfair one destroys the trust you spent the whole page building.

- Compare on **honest, verifiable axes**, such as fee, speed, transparency, and developer
  experience, not on cherry-picked strawmen.
- If you show a "us vs them" table, use their **real, current** published numbers. A
  competitor's outdated or fabricated figure is a legal and reputational risk.
- Acknowledge where the incumbent is genuinely stronger (branch network, decades of
  track record). A comparison that pretends the incumbent has zero advantages reads
  as propaganda and lowers trust.
- **Never** name a competitor and misstate their fees or protections; it is both
  defamatory-adjacent and self-defeating when the reader checks.

## 12. Responsive priorities

- Most consumer fintech traffic is mobile. The trust rung (protection statement), the
  primary CTA, and the core fee/rate must be reachable within ~3 mobile scrolls.
- **Required disclosures must remain legible on mobile.** Do not let the risk warning
  shrink to unreadable size on small screens; regulators judge prominence on the
  device the user actually holds.
- Rate/fee tables reflow to stacked cards; never require horizontal scroll to read a
  fee.
- App-store badges and the "download" flow deep-link correctly on mobile.
- Forms use `inputMode="numeric"` for amounts, correct `autoComplete` tokens, and
  44px+ tap targets.

## 13. Accessibility

- One `<h1>`. Sections use `<section aria-labelledby>`.
- Required disclosures must meet AA contrast (4.5:1). A warning that fails contrast
  is legally "not prominent" as well as inaccessible.
- Rate and fee comparisons use real `<table>` semantics with `<th scope>`, so screen
  readers convey the numbers correctly.
- Interactive calculators (loan, savings) must be keyboard-operable and announce
  results via a live region, not visual-only updates.
- Never use colour alone to distinguish a "recommended" plan or a risk warning.
- Trust badges and certification logos need descriptive alt text and, where they
  assert a claim, a real link to the evidence.

## 14. Common mistakes that make a fintech page read as a scam

**Trust and disclosure**
1. "Regulated" with no regulator or reference number named.
2. Implying you are a bank when you are an agent of a sponsor bank.
3. Burying or omitting a required risk/APR warning.
4. A required disclosure in 8px grey-on-grey or hidden behind a tooltip.
5. No statement of where customer money is held.
6. Claiming FDIC/FSCS protection that does not apply, or paraphrasing the official
   wording into marketing copy.

**Fees and rates**
7. "No hidden fees" as a slogan while the fee schedule is hidden.
8. A teaser rate in huge type with the real ongoing rate in the fine print.
9. A headline APR with no representative example beside it.
10. Requiring a sales call to learn per-transaction pricing on an API product.
11. A "free" account whose limits are only discovered after signup.

**Security and proof**
12. "Bank-grade" or "military-grade" or "unhackable" security language.
13. A wall of compliance badges that link nowhere.
14. Invented user counts or fabricated processing volume.
15. Anonymous testimonials on a product that handles money.
16. Implying a partnership (Visa, a named bank) that does not exist.

**Growth theatre that reads as fraud**
17. Countdown timers and "only N spots left" scarcity on a financial product.
18. Guaranteed-return language ("earn 12% guaranteed"). This is a classic fraud signal.
19. "Get rich", "beat the market", "passive income" framing.
20. Referral-bonus spam dominating the page above the product itself.

**Structure**
21. Building a consumer page for an API product (or vice versa).
22. Gating the API docs behind a signup wall.
23. No KYC/eligibility expectation-setting, so signup feels like bait-and-switch.
24. A comparison table using a competitor's fabricated or outdated numbers.
25. A generic SaaS trust ladder with no money-specific protection statement anywhere.
26. Stock photos of smiling people holding phones in place of real product or proof.

**Copy and interaction**
27. A hero headline about "reimagining money" that says nothing verifiable.
28. An interest or savings figure with no "variable", "AER", or effective-date qualifier.
29. A cookie/marketing banner that obscures the risk warning it is legally required to show.
30. Auto-opening chat or "talk to an advisor" widgets on a regulated product.
31. A referral or waitlist gate that blocks the visitor from reading the fee schedule.

## 15. Completion checklist

Verify before reporting done. Fix and re-verify anything that fails. Route every
compliance-sensitive item to counsel and compliance before launch.

**Trust**
- [ ] The licence/registration authority and reference number are named.
- [ ] The relationship to any sponsor bank is stated accurately.
- [ ] Where customer money is held is stated in plain language.
- [ ] Deposit/investor protection status is stated, including its absence where
      applicable.
- [ ] Security claims are concrete; no "bank-grade" or "unhackable".

**Disclosures (counsel-reviewed)**
- [ ] Every legally required warning for each jurisdiction is present and prominent.
- [ ] No required disclosure is hidden behind a tooltip, default-collapsed accordion,
      or sub-contrast text.
- [ ] APR/rate claims carry the required representative example.
- [ ] The full legal footer includes entity, licence numbers, and complete language.

**Fees and rates**
- [ ] The real fee structure is on the page, not one click away.
- [ ] "No hidden fees" (if used) is literally true.
- [ ] Every rate carries its conditions and a date.

**Proof**
- [ ] No invented user counts, volumes, ratings, or partnerships.
- [ ] Testimonials are named; institutional partners are real.
- [ ] Certification badges link to real evidence.

**Structure**
- [ ] The page matches the product: consumer vs infrastructure (§8).
- [ ] KYC and eligibility expectations are set before signup.
- [ ] Any competitor comparison uses real, current, fair figures.
- [ ] No scarcity theatre, guaranteed-return, or get-rich framing.

**Craft**
- [ ] Verified at 375, 768, 1024, 1440.
- [ ] Disclosures stay legible and AA-contrast on mobile.
- [ ] One `<h1>`, labelled sections, real table semantics, keyboard-operable
      calculators.
- [ ] All nav and footer links, including regulator-register links, resolve.
- [ ] If a skill file is in use, run that skill's self-verification loop as well.
