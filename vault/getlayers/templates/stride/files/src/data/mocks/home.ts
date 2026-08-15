// Placeholder content for the home view. Real copy should replace this (or come
// from a CMS/hook). Kept out of components per the data rules — passed in as props.
// See obsidian/frontend/component-conventions.md (Data rules).
import type { HeroContent } from "@/views/hero";
import type { AboutContent } from "@/views/about";
import type { StatsContent } from "@/views/stats";
import type { ShowcaseContent } from "@/views/showcase";
import type { WorksContent } from "@/views/works";
import type { ChainContent } from "@/views/chain";
import type { SiteNavContent } from "@/views/site-nav";

export interface HomeContent {
  /** Shared fixed site header (rendered once). */
  nav: SiteNavContent;
  hero: HeroContent;
  logos: {
    label: string;
    /** Placeholder partner/customer names — rendered as one flat grey. */
    items: string[];
  };
  about: AboutContent & { labelId: string };
  stats: StatsContent;
  showcase: ShowcaseContent;
  works: WorksContent;
  chain: ChainContent;
}

// The marketing nav is shared across the hero and chain stages.
const siteNav: SiteNavContent = {
  brand: "PUDDL3",
  items: ["Streaming", "How it works", "About us", "Testimonials"],
  cta: "Start streaming",
};

export const homeContent: HomeContent = {
  nav: siteNav,
  hero: {
    titleLines: ["Turn seconds into", "paydays"],
    sectionLabel: "Hero",
    sceneLabel: "Animated plasma burst",
    cta: siteNav.cta,
    secondaryCta: "See the math",
    insightTitle:
      "Watch your pay grow second-by-second, and cash out exactly when it counts.",
    insightBody:
      "Your wages accrue in real time, in plain sight. Cash out any hour, any day — mid-shift included. No paydays, no waiting, no mystery math.",
    stats: [
      { value: "4.9", label: "Worker rating" },
      { value: "30k", label: "Active streams" },
      { value: "$0", label: "Employer cost" },
    ],
  },
  logos: {
    label: "Trusted by payroll teams",
    items: [
      "Nightbrew",
      "Copperline",
      "Fernway",
      "Packrite",
      "Brisko",
      "Loadstar",
      "Shiftly",
      "Corvid",
    ],
  },
  about: {
    labelId: "about-title",
    eyebrow: "About us",
    lead: "A wage-streaming platform built to pay",
    mutedLead: "the second the work actually happens",
  },
  stats: {
    label: "By the numbers",
    brand: "NIGHTBREW",
    collab: {
      value: "120+",
      desc: "Partnered with leading payroll systems and banks.",
    },
    commitment: {
      eyebrow: "Commitment to uptime",
      value: "99.99%",
      quote:
        "PUDDL3 completely reshaped how our crews get paid. It's fast, transparent, and it just works.",
    },
    data: {
      label: "Cash-outs",
      value: "520k+",
      desc: "Streamed every day — any hour, any day, even mid-shift.",
    },
    reach: { label: "Countries", value: "60+" },
  },
  chain: {
    heading: "Money in motion",
    tagline:
      "Money should move like you do. Wages stream second-by-second, in plain sight, and cash out the moment you need them — no jargon, no guesswork.",
    aside: "any hour, any day",
  },
  showcase: {
    heading: "Thoughtful engineering behind every second",
    cta: "Explore the platform",
    items: [
      { prefix: "Our", name: "Approach", image: "/assets/images/3rd/approach.png" },
      {
        prefix: "Our",
        name: "Technology",
        image: "/assets/images/3rd/technology.jpg",
      },
      { prefix: "Our", name: "Security", image: "/assets/images/3rd/security.jpg" },
      { prefix: "Our", name: "Team", image: "/assets/images/3rd/team.jpg" },
    ],
  },
  works: {
    heading: "Live on PUDDL3",
    viewLabel: "View rollout",
    items: [
      { name: "Nightbrew", year: "2026", image: "/assets/images/portfolio/1.jpg" },
      { name: "Copperline", year: "2025", image: "/assets/images/portfolio/2.jpg" },
      { name: "Fernway", year: "2025", image: "/assets/images/portfolio/3.jpg" },
      { name: "Packrite", year: "2024", image: "/assets/images/portfolio/4.jpg" },
      { name: "Brisko", year: "2024", image: "/assets/images/portfolio/5.jpg" },
      { name: "Corvid", year: "2023", image: "/assets/images/portfolio/6.jpg" },
    ],
  },
};
