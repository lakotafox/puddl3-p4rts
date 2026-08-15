/**
 * Placeholder copy for the home view. Passed in via props — never imported
 * directly by a component.
 */

/** A glassy metric card, shown beside a HUD section. */
export interface MetricCard {
  label: string;
  value: string;
  detail: string;
}

/** A key/value row in a section's right-hand spec panel. */
export interface MetaRow {
  label: string;
  value: string;
}

export interface SectionCopy {
  eyebrow: string;
  /** Rendered one element per entry, so the line breaks are authored, not wrapped. */
  title: string[];
  body: string[];
  tag: string;
  /** Metric cards, floated in the centre of the frame. */
  cards?: MetricCard[];
  /** Spec rows, pinned to the right of the frame. */
  meta?: MetaRow[];
}

export interface BrandCopy {
  name: string;
  suffix: string;
}

export interface StatusCopy {
  label: string;
  detail: string;
  scrollHint: string;
}

export interface LoaderCopy {
  brand: string;
  brandDetail: string;
  bootLabel: string;
  bootState: string;
  initializing: string;
  loading: string;
  coordinates: string;
  version: string;
}

export const homeBrand: BrandCopy = {
  name: "PUDDL3",
  suffix: "/ W—4GE",
};

export const homeSections: SectionCopy[] = [
  {
    eyebrow: "01 — EARN",
    title: ["Payday,", "every second."],
    body: [
      "Wages accrue while you work.",
      "Every second on shift lands in your balance.",
    ],
    tag: "STREAM / LIVE",
  },
  {
    eyebrow: "02 — STREAM",
    title: ["Money", "in motion."],
    body: [
      "Every second a deposit.",
      "Every shift a stream.",
      "Your balance, alive.",
    ],
    tag: "PAYOUT / OPEN",
    cards: [
      { label: "Streaming since", value: "6:04", detail: "AM · mid-shift" },
      { label: "Accrued today", value: "$118", detail: "live, and counting" },
      { label: "Cash-out", value: "0.9", detail: "seconds to your bank" },
    ],
  },
  {
    eyebrow: "03 — CASH OUT",
    title: ["Any hour,", "any day."],
    body: [
      "No paydays. No waiting.",
      "Money should move like you do.",
    ],
    tag: "FUNDS / READY",
    meta: [
      { label: "Rail", value: "W—4GE" },
      { label: "Build", value: "2026.08.01" },
      { label: "Channel", value: "Live" },
      { label: "Region", value: "US–EAST" },
      { label: "Uptime", value: "99.98%" },
    ],
  },
];

export const homeStatus: StatusCopy = {
  label: "WAGE.STREAM ACTIVE",
  detail: "· RATE LOCKED",
  scrollHint: "SCROLL TO ADVANCE",
};

export interface OutroCopy {
  eyebrow: string;
  /** One line — the whole point of the headline is that it does not break. */
  title: string;
  body: string[];
  points: { label: string; value: string }[];
  cta: { label: string; href: string };
}

export interface FaqCopy {
  eyebrow: string;
  title: string;
  items: { question: string; answer: string }[];
}

export interface FooterCopy {
  wordmark: string;
  tagline: string;
  columns: { heading: string; links: { label: string; href: string }[] }[];
  legal?: string;
}

export const homeOutro: OutroCopy = {
  eyebrow: "04 — PROOF",
  title: "Built to be instant.",
  body: [
    "Every cent in plain sight, no mystery — watch it accrue as the shift runs.",
    "Payroll as a stream, not an event.",
  ],
  points: [
    { label: "Accrual", value: "Every second" },
    { label: "Cash-out", value: "Any hour · Any day" },
    { label: "Employer cost", value: "Zero" },
  ],
  cta: { label: "Start earning", href: "/" },
};

export const homeFaq: FaqCopy = {
  eyebrow: "05 — QUESTIONS",
  title: "Frequently asked",
  items: [
    {
      question: "What exactly is PUDDL3?",
      answer:
        "A wage-streaming platform. Your pay accrues second-by-second while you work, and you cash out whenever you want — any hour, any day. The counter you just scrolled through is the product talking about itself.",
    },
    {
      question: "When can I cash out?",
      answer:
        "Any time. Mid-shift, 6:04 AM, Sunday night — the balance is yours the second you earn it. A standard cash-out lands in your account in under a minute, and there is no minimum and no monthly fee.",
    },
    {
      question: "What does it cost my employer?",
      answer:
        "Zero. PUDDL3 plugs into the payroll provider already in place and settles on the normal cycle behind the scenes. Workers stream their wages; employers change nothing. It just works.",
    },
    {
      question: "Is my money safe?",
      answer:
        "Yes. Earned wages sit in insured partner accounts until you move them, every movement is logged in plain sight, and we never lend against your balance. No mystery, ever.",
    },
  ],
};

export const homeFooter: FooterCopy = {
  wordmark: "PUDDL3",
  tagline:
    "Payday, every second. Wages stream while you work — cash out any hour, any day.",
  columns: [
    {
      heading: "Product",
      links: [
        { label: "Overview", href: "/" },
        { label: "Wage streaming", href: "/" },
        { label: "Instant cash-out", href: "/" },
        { label: "For employers", href: "/" },
        { label: "Roadmap", href: "/" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Our story", href: "/" },
        { label: "The team", href: "/" },
        { label: "Journal", href: "/" },
        { label: "Careers", href: "/" },
      ],
    },
    {
      heading: "Connect",
      links: [
        { label: "Get in touch", href: "/#contact" },
        { label: "hello@puddl3.xyz", href: "mailto:hello@puddl3.xyz" },
        { label: "Privacy", href: "/" },
        { label: "Terms", href: "/" },
      ],
    },
  ],
};

export const homeLoader: LoaderCopy = {
  brand: "PUDDL3",
  brandDetail: "W—4GE / SYS.24",
  bootLabel: "BOOT SEQUENCE",
  bootState: "● INIT",
  initializing: "OPENING WAGE STREAM",
  loading: "SYNCING BALANCES",
  coordinates: "40.7128°N / 74.0060°W",
  version: "v1.0.2 — live channel",
};
