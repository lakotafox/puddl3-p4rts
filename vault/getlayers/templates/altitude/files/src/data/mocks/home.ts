/**
 * Placeholder content for the home page. Copy is taken from the Figma hero
 * (file "Get Layers", node 698:174).
 *
 * Components never import this directly — the view passes it down as props
 * (see obsidian/frontend/component-conventions.md → "Data rules").
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroVideo {
  /** Absolute path under `public/assets/<section>/`. */
  src: string;
  type: string;
}

export interface HeroField {
  name: string;
  label: string;
  type: "text" | "email";
  autoComplete: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  brand: string;
  /** Split either side of the centred brand mark. */
  navStart: NavLink[];
  navEnd: NavLink[];
  /** One entry per rendered line — the design breaks the line deliberately. */
  headingLines: string[];
  fields: HeroField[];
  submitLabel: string;
  video: HeroVideo;
  summary: {
    title: string;
    body: string;
  };
  stats: {
    start: HeroStat;
    end: HeroStat;
  };
}

export const homeHero: HeroContent = {
  brand: "CR33K",
  navStart: [
    { label: "Home", href: "/" },
    { label: "Cabins", href: "/stays" },
  ],
  navEnd: [
    { label: "Ledger", href: "/journal" },
    { label: "About", href: "/about" },
  ],
  headingLines: ["You earn every second.", "Come spend a few here."],
  fields: [
    { name: "name", label: "Name", type: "text", autoComplete: "name" },
    { name: "email", label: "Email", type: "email", autoComplete: "email" },
  ],
  submitLabel: "Send",
  video: {
    src: "/assets/hero/starry-night.mp4",
    type: "video/mp4",
  },
  summary: {
    title: "Rest you already earned",
    body: "CR33K keeps cabins where the signal runs out — no front desk, no noise, just a warm room and a sky you forgot existed. Every stay is scouted in person by the PUDDL3 team, and booking works any hour, any day. It just works.",
  },
  stats: {
    start: { value: "240+", label: "Cabins scouted" },
    end: { value: "60K", label: "Nights unplugged" },
  },
};
