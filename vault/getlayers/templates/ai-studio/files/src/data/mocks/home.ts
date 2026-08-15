/**
 * Content for the PUDDL3 home page ("Payday, every second").
 * Fed to the view via props so no string is hardcoded in a component.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface CatalistContent {
  url: string;
  /** Headline / subhead split into plain + emphasised (bold) runs. */
  lead: string;
  leadStrong: string;
  /** Dark card: pill label + title. Light card: search query text. */
  pillLabel?: string;
  pillTitle?: string;
  searchText?: string;
}

export interface PortfolioItem {
  year: string;
  client: string;
  title: string;
  discipline: string;
  video: string;
}

export interface ShowreelContent {
  brand: string;
  logo: string;
  nav: NavLink[];
  /** Black CTA pinned to the right of the header bar. */
  headerCta: { label: string; href: string };
  marquee: string[];
  hero: { 
    lines: string[]; 
    templatesTitle: string;
    bottomBlock?: {
      leftText: string;
      rightText: string;
      avatars: string[];
    };
  };
  catalistDark: CatalistContent;
  catalistLight: CatalistContent;
  /** CTA pinned under the 4-card carousel (the second block). */
  carouselCta: {
    button: string;
    href: string;
  };
  sphere: {
    headingTop: string;
    headingBottom: string[];
    /** Supporting paragraphs shown in the open sphere scene. */
    body: string[];
    /** Carousel-face chrome (slot-4 card preview). */
    cardLabel: string;
    cardUrl: string;
    cardHeading: string;
  };
  portfolio: {
    items: PortfolioItem[];
  };
  cta: {
    heading: string;
    /** Second heading line, rendered semi-transparent (like the hero subtitle). */
    headingFaded: string;
    sub: string;
    button: string;
    href: string;
  };
}

const A = "/t/ai-studio/assets/showreel";

export const homeContent: ShowreelContent = {
  brand: "PUDDL3",
  logo: `${A}/star.svg`,
  nav: [
    { label: "Workers", href: "#wearable" },
    { label: "Employers", href: "#neural" },
    { label: "Pricing", href: "#programs" },
    { label: "Updates", href: "#updates" },
    { label: "Search", href: "#search" },
  ],
  headerCta: { label: "Start Earning", href: "#get-started" },
  marquee: [
    "Payday, every second",
    "Wages in real time",
    "Cash out any hour, any day",
    "Money that moves like you do",
  ],
  hero: {
    lines: ["Payday,", "every second"],
    templatesTitle: "Watch your\npay stream",
    bottomBlock: {
      leftText: "Your wages accrue second-by-second and cash out any hour, any day. No paydays, no waiting — just money that moves the moment you earn it, in plain sight.",
      rightText: "From clock-in to cash-out, every cent you've earned streams straight to you in real time — zero cost to employers, and it just works.",
      avatars: [
        "https://i.pravatar.cc/100?img=1",
        "https://i.pravatar.cc/100?img=2",
        "https://i.pravatar.cc/100?img=3",
        "https://i.pravatar.cc/100?img=4",
        "https://i.pravatar.cc/100?img=5",
      ]
    }
  },
  catalistDark: {
    url: "app.puddl3.xyz",
    pillLabel: "Mid-shift balance",
    pillTitle: "Cash Out $218.46",
    lead: "The Real-Time Rail for ",
    leadStrong: "Streaming Wages",
  },
  catalistLight: {
    url: "app.puddl3.xyz",
    searchText: "Show my earnings since 6:04 AM [Today]",
    lead: "Watch wages land as you work — ",
    leadStrong: "every second, in plain sight.",
  },
  carouselCta: {
    button: "Watch wages stream live",
    href: "#templates",
  },
  sphere: {
    headingTop: "Payday,",
    headingBottom: ["every", "second"],
    body: [
      "PUDDL3 streams your wages second-by-second, the moment you earn them — cash out any hour, any day, from any device you already own.",
      "One balance, always live: earned, streamed, and yours to move. No paydays, no waiting — just money that keeps pace with the way you work.",
    ],
    cardLabel: "Live Balance",
    cardUrl: "puddl3.xyz",
    cardHeading: "Wages, streaming every second",
  },
  portfolio: {
    items: [
      {
        year: "2024",
        client: "harbor & co",
        title: "Harbor",
        discipline: "Hospitality · 1,200 workers streaming",
        video: `${A}/portfolio-1.mp4`,
      },
      {
        year: "2025",
        client: "gridline",
        title: "Gridline",
        discipline: "Logistics · Cash outs mid-shift",
        video: `${A}/portfolio-2.mp4`,
      },
      {
        year: "2026",
        client: "novacare",
        title: "Novacare",
        discipline: "Healthcare · Any hour, any day",
        video: `${A}/portfolio-3.mp4`,
      },
    ],
  },
  cta: {
    heading: "No paydays.",
    headingFaded: "No waiting.",
    sub: "Wages that stream second-by-second — cash out any hour, any day, at zero cost.",
    button: "Start earning",
    href: "#get-started",
  },
};
