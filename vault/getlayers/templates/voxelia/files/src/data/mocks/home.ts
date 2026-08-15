/**
 * Placeholder copy for the home page.
 *
 * Ported from the Figma hero, with every string rewritten except the company
 * name — the design's own copy was placeholder ("Designed to mean purpose.",
 * four identical "$4B+ / Processed" tiles). This copy describes what the page
 * actually is: a real-time chess scene. Replace with real copy.
 *
 * 📖 Docs: obsidian/frontend/html-semantics.md
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface HomeCopy {
  company: string;
  /** Visually hidden — the page's one `<h1>` for crawlers and screen readers. */
  title: string;
  nav: NavLink[];
  contact: NavLink;
  /** Rendered as two lines, matching the design's two-line headline. */
  headline: string[];
  description: string;
  action: string;
  stats: Stat[];
}

export const homeCopy: HomeCopy = {
  company: "PUDDL3.",
  title: "PUDDL3 — wages streamed in real time",
  nav: [
    { label: "Product", href: "#pieces" },
    { label: "Payouts", href: "#openings" },
    { label: "Pricing", href: "#archive" },
    { label: "Company", href: "#studio" },
  ],
  contact: { label: "Get started", href: "#contact" },
  headline: ["Stream your pay", "in real time."],
  description:
    "Your wages accrue second by second, from the first minute of your shift. Cash out any hour, any day.",
  action: "Start earning",
  stats: [
    { value: "1s", label: "Payout interval" },
    { value: "24/7", label: "Cash-out window" },
    { value: "$0", label: "Employer cost" },
    { value: "0", label: "Paydays to wait" },
  ],
};
