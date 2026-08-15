/**
 * Placeholder content for the home page.
 *
 * Components take this through props — never import it into a component file
 * directly (obsidian/frontend/component-conventions.md → "Data rules").
 * Layout figures come from the original hero Figma frame (node 610:510).
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface HomeHeroContent {
  brand: string;
  nav: NavLink[];
  contact: NavLink;
  headingLead: string;
  headingFollow: string;
  media: {
    src: string;
    /** Describes the looping footage for assistive tech. */
    label: string;
  };
  metric: {
    title: string;
    label: string;
    value: string;
    /** Filled share of the meter, 0–1 (Figma: 192 of 310px). */
    progress: number;
  };
  copy: {
    title: string;
    body: string;
  };
  showcase: {
    title: string;
    image: string;
    cta: NavLink;
    /** Accessible name for the icon-only arrow control. */
    actionLabel: string;
  };
}

export const homeHero: HomeHeroContent = {
  brand: "PUDDL3",
  nav: [
    { label: "Home", href: "/" },
    { label: "Product", href: "/services" },
    { label: "Pricing", href: "/works" },
    { label: "About", href: "/about" },
  ],
  contact: { label: "Contact", href: "/contact" },
  headingLead: "Paid every second you work",
  headingFollow: "Cash out at any hour",
  media: {
    src: "/t/forma/assets/hero/purple-valley.mp4",
    label: "A violet valley of lavender hills beneath a pale arch and moon",
  },
  metric: {
    title: "Earnings In Motion",
    label: "Streamed today",
    value: "$212.48",
    progress: 192 / 310,
  },
  copy: {
    title: "How It Works",
    body: "Wages stream second by second — cash out anytime. Money moves like you do.",
  },
  showcase: {
    title: "See your wages stream while you're mid-shift",
    image: "/t/forma/assets/hero/showcase-trails.png",
    cta: { label: "How it works", href: "/services" },
    actionLabel: "See how streaming works",
  },
};
