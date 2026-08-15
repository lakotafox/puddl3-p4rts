/**
 * Placeholder content for the home page. Swap these values per project — every
 * section reads its copy from here (component-conventions: no hardcoded content).
 */

export interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface Partner {
  name: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "x" | "behance" | "dribbble";
}

export interface CreateWord {
  label: string;
  variant: "light" | "accent" | "dark" | "ghost";
  isArrow?: boolean;
}

export interface HeroCardItem {
  caption: string;
  title: string;
}

export interface PortfolioItem {
  id: string;
  name: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  href: string;
}

export interface ServiceItem {
  index: string;
  title: string;
  description: string;
  href: string;
}

export interface Stat {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const homeContent = {
  brand: "PUDDL3",
  nav: [
    { label: "Home", href: "#home" },
    { label: "Rollouts", href: "#works" },
    { label: "Features", href: "#services", hasDropdown: true },
    { label: "About", href: "#about" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ] as NavLink[],
  meta: {
    statusLabel: "Local time",
    time: "6:04am",
    date: "14 August, 2026",
  },
  hero: {
    eyebrow: "Real-Time Payroll",
    brandWatermark: "PUDDL3",
    headingLines: ["Payday,", "every second", "you're on shift"],
    rating: 5,
    customers: "38k+ workers streaming",
    primaryCta: { label: "Start earning", href: "#contact" },
    secondaryCta: { label: "See it live", href: "#works" },
    cards: [
      { caption: "Wage streaming", title: "Earned every second." },
      { caption: "Instant cashout", title: "Money out any hour." },
      { caption: "For employers", title: "Zero cost. It works." },
    ],
    partnersLabel: "Streaming at",
    partners: [
      { name: "Copperpot" },
      { name: "Fleetline" },
      { name: "Harborview" },
      { name: "Brickyard" },
      { name: "Nightjar" },
      { name: "Stackhouse" },
      { name: "Marlowe" },
    ] as Partner[],
    footer: {
      left: "Streaming since 2024",
      center: "Any hour, any day",
      right: "Scroll to explore",
    },
  },
  about: {
    eyebrow: "The Platform",
    globeLabel: "Wages streaming in every time zone, around the clock.",
    statement: {
      lead: "You already earned it — we just move it: ",
      muted:
        "wages stream second-by-second, in plain sight, ready to cash out any hour, any day.",
    },
    socialLabel: "Find us online",
    socials: [
      { label: "X / Twitter", href: "#x", icon: "x" },
      { label: "Instagram", href: "#behance", icon: "behance" },
      { label: "TikTok", href: "#dribbble", icon: "dribbble" },
    ] as SocialLink[],
    cta: { label: "About Us", href: "#about" },
  },
  create: {
    words: [
      { label: "Work", variant: "light" },
      { label: "Stream", variant: "accent" },
      { label: "", variant: "dark", isArrow: true },
      { label: "Spend", variant: "ghost" },
    ] as CreateWord[],
  },
  portfolio: {
    eyebrow: "Rollouts",
    heading: "Live on PUDDL3",
    items: [
      {
        id: "aster-labs",
        name: "Copperpot Diners",
        category: "Hospitality",
        year: "2025",
        description:
          "A 41-location diner group where servers watch wages and tips stream mid-shift.",
        tags: ["Hospitality", "Tip streaming", "1,900 workers"],
        href: "#aster-labs",
      },
      {
        id: "nova-finance",
        name: "Fleetline Logistics",
        category: "Logistics",
        year: "2024",
        description:
          "Pay accrues by the mile — drivers cash out at the dock before the truck is unloaded.",
        tags: ["Logistics", "Per-mile pay", "Instant cashout"],
        href: "#nova-finance",
      },
      {
        id: "helio-studio",
        name: "Harborview Health",
        category: "Healthcare",
        year: "2023",
        description:
          "Night-shift nurses watch every hour land at 3:00 AM — no waiting on the 1st and 15th.",
        tags: ["Healthcare", "Night shifts"],
        href: "#helio-studio",
      },
      {
        id: "pulse-health",
        name: "Brickyard Retail",
        category: "Retail",
        year: "2023",
        description:
          "A 4,000-worker retail chain that swapped the two-week pay cycle for a live counter.",
        tags: ["Retail", "Zero employer cost", "Payroll sync"],
        href: "#pulse-health",
      },
    ] as PortfolioItem[],
  },
  services: {
    eyebrow: "Features",
    heading: "How PUDDL3 works",
    items: [
      {
        index: "01",
        title: "Wage Streaming",
        description: "Every second on shift lands in your balance, live.",
        href: "#development",
      },
      {
        index: "02",
        title: "Instant Cashout",
        description: "One tap and money moves — any hour, any day.",
        href: "#design",
      },
      {
        index: "03",
        title: "Plain-Sight Pay",
        description: "Every cent on a live counter. No mystery, ever.",
        href: "#qa",
      },
      {
        index: "04",
        title: "Employer Tools",
        description: "Plugs into payroll in a day, at zero cost.",
        href: "#consulting",
      },
    ] as ServiceItem[],
  },
  stats: {
    eyebrow: "By the numbers",
    heading: "Money should move like you do.",
    items: [
      { prefix: "$", value: 120, suffix: "M+", label: "Wages streamed" },
      { value: 38, suffix: "k+", label: "Workers earning live" },
      { value: 24, suffix: "/7", label: "Cashout window" },
      { prefix: "$", value: 0, suffix: "", label: "Cost to employers" },
    ] as Stat[],
  },
  footer: {
    brandWatermark: "PUDDL3",
    cta: {
      heading: "Still waiting on payday? Turn on the stream.",
      button: { label: "Start streaming", href: "#contact" },
    },
    tagline:
      "Real-time wage streaming — pay accrues second-by-second and cashes out any hour, any day.",
    columns: [
      {
        title: "Company",
        links: [
          { label: "About", href: "#about" },
          { label: "Careers", href: "#careers" },
          { label: "Employers", href: "#partners" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Product",
        links: [
          { label: "Wage streaming", href: "#development" },
          { label: "Instant cashout", href: "#design" },
          { label: "Employer dashboard", href: "#qa" },
          { label: "Integrations", href: "#consulting" },
        ],
      },
      {
        title: "Social",
        links: [
          { label: "X / Twitter", href: "#x" },
          { label: "Instagram", href: "#behance" },
          { label: "TikTok", href: "#dribbble" },
          { label: "LinkedIn", href: "#linkedin" },
        ],
      },
    ] as FooterColumn[],
    legal: {
      copyright: "© 2026 PUDDL3, Inc. All rights reserved.",
      links: [
        { label: "Privacy", href: "#privacy" },
        { label: "Terms", href: "#terms" },
      ] as FooterLink[],
    },
  },
} as const;

export type HomeContent = typeof homeContent;
