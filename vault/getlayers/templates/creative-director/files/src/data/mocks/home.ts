/**
 * Home page content — PUDDL3 Studio, the in-house creative practice at
 * PUDDL3 (puddl3.xyz). All copy, project entries, and contact details live
 * here and reach components via props (component-conventions: no hardcoded
 * content).
 */

export interface HeroContent {
  videoSrc: string;
  infoLabels: [string, string, string];
  description: string;
  title: string;
}

export interface PortfolioCard {
  variant: "left" | "right";
  image: string;
  imageAlt: string;
  badge?: string;
  title: string;
  description?: string;
}

export interface PortfolioSectionContent {
  headingFaded: string;
  headingBold: string;
  description: string;
  cta: string;
  tags: string[];
  centerText: string;
  rightText: string;
  cards: PortfolioCard[];
}

export interface SpecRow {
  key: string;
  value: string;
}

export interface FeaturesSectionContent {
  headingFaded: string;
  headingBold: string;
  lead: string;
  listTitle: string;
  list: string[];
  optimizationTitle: string;
  optimizationText: string;
  mainCard: {
    title: string;
    description: string;
    specs: SpecRow[];
    cta: string;
  };
  sideCards: { title: string; specs: SpecRow[] }[];
}

export interface CarouselProject {
  title: string;
  category: string;
  year: string;
  image: string;
}

export interface CarouselSectionContent {
  label: string;
  headingFaded: string;
  headingBold: string;
  description: string[];
  projects: CarouselProject[];
}

export interface ContactSectionContent {
  title: string;
  phone: { label: string; href: string };
  email: { label: string; href: string };
  socialsLabel: string;
  socials: { label: string; href: string }[];
}

export interface NavContent {
  logo: string;
  links: { label: string; href: string }[];
  cta: string;
}

/** Lava-lamp shader parameters (lava.js UI control defaults). */
export interface LavaConfig {
  speed: number;
  blend: number;
  colors: [string, string, string, string, string];
}

export const heroContent: HeroContent = {
  videoSrc: "/assets/home/hero.mp4",
  infoLabels: ["Brand Identity", "Product & Motion", "Realtime Design"],
  description:
    "The in-house creative studio at PUDDL3, designing\nbrands and interfaces for money that moves in real time.",
  title: "PUDDL3 Studio",
};

export const portfolioContent: PortfolioSectionContent = {
  headingFaded: "Designing Money in Motion:",
  headingBold: "Every Second, In Plain Sight",
  description:
    "Partnering with fintechs and payroll rebels to build brands that feel as live as the money behind them.",
  cta: "See the work",
  tags: ["Interfaces", "Branding", "More +"],
  centerText: "NO STATIC. JUST DESIGN IN MOTION.",
  rightText: "LATEST CASE STUDIES     VIEW ALL +",
  cards: [
    {
      variant: "left",
      image: "/assets/home/art-direction.webp",
      imageAlt: "PUDDL3 live earnings counter case study visual",
      title: "The PUDDL3 Earnings UI &\nBrand System",
      description:
        "A counter that ticks every second — built so pay reads like plain sight, no mystery.",
    },
    {
      variant: "right",
      image: "/assets/home/packaging.webp",
      imageAlt: "Wage-streaming brand identity case study visual",
      badge: "Brand Identity",
      title: "Turning payroll relics into\nbrands that move in real time",
    },
  ],
};

export const featuresContent: FeaturesSectionContent = {
  headingFaded: "Design That",
  headingBold: "Moves Like Money",
  lead: "We're the team that gave PUDDL3 its face — the live counter, the type, the 6:04 AM energy. Now we build the same honest, real-time design for brands that agree money should move like you do.",
  listTitle: "Services",
  list: [
    "Brand Strategy & Naming",
    "Identity & Wordmarks",
    "Product & Dashboard UI",
    "Motion & Live Counters",
    "Data Visualization",
    "Realtime Interactions",
  ],
  optimizationTitle: "Performance",
  optimizationText:
    "We obsess over the same thing PUDDL3 does: zero mystery. Every screen we ship shows its numbers in plain sight and runs smooth on any device — any hour, any day.",
  mainCard: {
    title: "Fintech Branding",
    description:
      "We build brands for money in motion — naming, voice, and visual systems that make a wage stream feel as trustworthy as a bank and twice as alive.",
    specs: [
      { key: "Core Tools", value: "Figma / After Effects" },
      { key: "Deliverables", value: "Brand Book / Live UI Kit" },
    ],
    cta: "Start a project",
  },
  sideCards: [
    {
      title: "Project Timelines",
      specs: [
        { key: "Minimum Duration", value: "2 weeks" },
        { key: "Average Timeline", value: "4-8 weeks" },
      ],
    },
    {
      title: "Our Impact",
      specs: [
        { key: "Brands Shipped", value: "40+ and counting" },
        { key: "Flagship Client", value: "PUDDL3, since day one" },
      ],
    },
  ],
};

export const carouselContent: CarouselSectionContent = {
  label: "The Ledger",
  headingFaded: "EXPLORE\nTHE BRANDS",
  headingBold: "WE BUILT FOR MONEY IN MOTION",
  description: [
    "Your brand should move the way your money does.",
    "We design it to feel live, every single second.",
    "",
    "From first wordmark to shipping dashboard — it just works.",
  ],
  projects: [
    {
      title: "PUDDL3 Core",
      category: "Brand Identity",
      year: "2026",
      image: "/assets/home/1.webp",
    },
    {
      title: "Shift Ledger",
      category: "Dashboard UI",
      year: "2026",
      image: "/assets/home/2.webp",
    },
    {
      title: "6:04 AM Drop",
      category: "Motion System",
      year: "2025",
      image: "/assets/home/1.webp",
    },
    {
      title: "Cashout Day",
      category: "Art Direction",
      year: "2025",
      image: "/assets/home/2.webp",
    },
  ],
};

export const contactContent: ContactSectionContent = {
  title: "TALK ANY HOUR",
  phone: { label: "+1 (555) 604-0600", href: "tel:+15556040600" },
  email: { label: "studio@puddl3.xyz", href: "mailto:studio@puddl3.xyz" },
  socialsLabel: "Our streams",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Behance", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
};

export const navContent: NavContent = {
  logo: "P3",
  links: [
    { label: "Services", href: "services" },
    { label: "Work", href: "portfolio" },
    { label: "Studio", href: "contact" },
  ],
  cta: "Talk to us",
};

export const lavaConfig: LavaConfig = {
  speed: 0.15,
  blend: 1.0,
  colors: ["#ff1a00", "#ff1a00", "#ff1a00", "#ffefcc", "#0040ff"],
};
