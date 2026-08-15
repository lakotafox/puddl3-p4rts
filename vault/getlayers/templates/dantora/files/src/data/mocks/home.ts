/**
 * Copy and content for the home page, lifted from the Figma frame
 * "Concept 4" (node `1518:1970`).
 *
 * Components take this through props — never by importing this file directly
 * (see obsidian/frontend/component-conventions.md → Data rules). Swap it for a
 * CMS payload later without touching a single component.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  description: string;
}

export interface HeroContent extends SectionIntro {
  actions: readonly CtaLink[];
  /** Small proof line under the fold divider. */
  trustLine: string;
  /** Service chips floating over the scene. */
  serviceChips: readonly string[];
}

export interface WhyContent extends SectionIntro {
  actions: readonly CtaLink[];
  /** Images that stream after the cursor, oldest fading out. */
  trailImages: readonly string[];
}

export interface ServiceCard {
  index: string;
  title: string;
  /** Sub-services listed on the opening card. */
  items?: readonly string[];
  /** Full-bleed photo card. */
  image?: string;
  /** Tail card carries a "Discover" affordance. */
  cta?: string;
  variant: "lime" | "photo" | "brand";
}

export interface StatItem {
  value: string;
  label: string;
}

/** The About paragraph greys the clauses that aren't the point. */
export interface AboutFragment {
  text: string;
  muted: boolean;
}

export interface AboutContent {
  eyebrow: string;
  bannerImage: string;
  stats: readonly StatItem[];
  paragraph: readonly AboutFragment[];
  actions: readonly CtaLink[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "instagram" | "facebook" | "linkedin" | "twitter";
}

/** Lime tail card closing the team rail (Figma node `1575:238`). */
export interface TeamMoreCard {
  title: string;
  cta: string;
  href: string;
}

export interface TeamContent {
  eyebrow: string;
  title: string;
  socials: readonly SocialLink[];
  members: readonly TeamMember[];
  more: TeamMoreCard;
}

export interface FormField {
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "tel" | "textarea";
}

export interface ContactContent extends SectionIntro {
  formTitle: string;
  fields: readonly FormField[];
  consentLead: string;
  consentLinkLabel: string;
  consentTail: string;
  submitLabel: string;
}

export const SITE_NAV: readonly NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our team", href: "#team" },
];

export const HEADER_CTA: CtaLink = { label: "Contact Us", href: "#contact" };

export const BRAND_NAME = "PUDDL3";

export const HERO_CONTENT: HeroContent = {
  eyebrow: "About PUDDL3",
  title: "Healthcare that runs on your clock, not ours",
  description:
    "Walk-in diagnostics, same-day lab results and specialist care — open any hour, any day, with every price posted in plain sight.",
  actions: [
    { label: "See a doctor", href: "#contact" },
    { label: "Our services", href: "#services" },
  ],
  trustLine: "Caring for 52,000+ shift workers since 2019",
  serviceChips: [
    "Walk-in Check-ups",
    "Same-Day Imaging",
    "Genetic Screening",
    "24/7 Laboratory",
    "Specialist Care",
  ],
};

export const WHY_CONTENT: WhyContent = {
  eyebrow: "Why PUDDL3",
  title: "One clinic, one record, zero waiting rooms",
  description:
    "No referral runarounds, no repeated tests, no \"call back Monday\". Your doctors share one live record and decide together.",
  actions: [
    { label: "Our doctors", href: "#team" },
    { label: "How it works", href: "#about" },
  ],
  trailImages: [
    "/t/dantora/assets/Why Dantora/01.png",
    "/t/dantora/assets/Why Dantora/02.png",
    "/t/dantora/assets/Why Dantora/03.png",
    "/t/dantora/assets/Why Dantora/04.png",
    "/t/dantora/assets/Why Dantora/05.png",
    "/t/dantora/assets/Why Dantora/06.png",
    "/t/dantora/assets/Why Dantora/07.png",
    "/t/dantora/assets/Why Dantora/08.png",
  ],
};

export const SERVICES_INTRO: SectionIntro = {
  eyebrow: "Our Services",
  title: "Every answer your body needs, under one roof",
  description:
    "From a 20-minute walk-in check-up to a full genomic panel — five services covering prevention, diagnosis and long-term care.",
};

export const SERVICE_CARDS: readonly ServiceCard[] = [
  {
    index: "01",
    title: "Walk-in Health Check-ups",
    items: ["Pre-shift screens", "Women's health", "Men's health"],
    variant: "lime",
  },
  {
    index: "02",
    title: "Same-Day Imaging",
    image: "/t/dantora/assets/Our Services/01.png",
    cta: "Discover",
    variant: "photo",
  },
  {
    index: "03",
    title: "Genetic Screening",
    cta: "Discover",
    variant: "brand",
  },
  {
    index: "04",
    title: "24/7 Laboratory",
    image: "/t/dantora/assets/Our Services/02.png",
    cta: "Discover",
    variant: "photo",
  },
  {
    index: "05",
    title: "Specialist Care",
    image: "/t/dantora/assets/Our Services/03.png",
    cta: "Discover",
    variant: "photo",
  },
];

export const ABOUT_CONTENT: AboutContent = {
  eyebrow: "About the clinic",
  // Extracted from Figma node 1546:163 — the wide theatre shot the mockup uses,
  // which was not among the supplied photo folders.
  bannerImage: "/t/dantora/assets/About/banner.png",
  stats: [
    { value: "98%", label: "Patients seen on time" },
    { value: "4h", label: "Median lab turnaround" },
    { value: "60+", label: "Doctors and specialists" },
    { value: "24/7", label: "Doors open, every day" },
  ],
  paragraph: [
    {
      text: "PUDDL3 is a 4,000 m² clinic built by the PUDDL3 team around one idea:",
      muted: true,
    },
    { text: " your health shouldn't wait for your day off. ", muted: false },
    {
      text: "Doors open any hour, any day, every price posted in plain sight, ",
      muted: true,
    },
    { text: "and every result reaches you the moment it's ready.", muted: false },
  ],
  actions: [
    { label: "Book a consultation", href: "#contact" },
    { label: "See every price", href: "#services" },
  ],
};

export const TEAM_CONTENT: TeamContent = {
  eyebrow: "Our Team",
  title: "The doctors on duty whenever your shift ends.",
  socials: [
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "X", href: "https://x.com", icon: "twitter" },
  ],
  // Order and roles follow the Figma rail (node 1558:409). Names are invented:
  // the mockup's captions put a woman's name on a man's portrait and vice
  // versa, so each name here matches the person actually pictured.
  members: [
    {
      name: "Marcus Oyelaran",
      role: "Cardiologist",
      image: "/t/dantora/assets/Our Team/01.png",
    },
    {
      name: "Ingrid Halvorsen",
      role: "Radiologist",
      image: "/t/dantora/assets/Our Team/02.png",
    },
    {
      name: "Dario Ferretto",
      role: "Medical Geneticist",
      image: "/t/dantora/assets/Our Team/03.png",
    },
    {
      name: "Tomas Reiner",
      role: "Endocrinologist",
      image: "/t/dantora/assets/Our Team/04.png",
    },
    {
      name: "Sofia Andrade",
      role: "Neurologist",
      image: "/t/dantora/assets/Our Team/05.png",
    },
  ],
  more: {
    title: "Plus 60+ more specialists",
    cta: "Meet them all",
    href: "#contact",
  },
};

export const CONTACT_CONTENT: ContactContent = {
  eyebrow: "Get in touch",
  title: "Not sure who you need to see? Just ask.",
  description:
    "Leave your number and a coordinator calls you back within 15 minutes — any hour, any day — to match you with a doctor and a time.",
  formTitle: "Request a call back",
  fields: [
    { name: "name", label: "Your name", placeholder: "Name", type: "text" },
    { name: "phone", label: "Your phone", placeholder: "Phone", type: "tel" },
    {
      name: "message",
      label: "Your message",
      placeholder: "Message",
      type: "textarea",
    },
  ],
  consentLead: "By submitting, you agree to our ",
  consentLinkLabel: "Privacy Policy",
  consentTail: " and the processing of your personal data.",
  submitLabel: "Send Request",
};
