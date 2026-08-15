// Content model for the PUDDL3 home hero (Figma frame 431:159).

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroCta {
  label: string;
  href: string;
  variant: "primary" | "ghost";
}

/** A two-part display heading: a dim lead line + a bright trailing line. */
export interface HeroHeading {
  lead: string;
  trail: string;
}

export interface HeroMedia {
  src: string;
  alt: string;
}

export interface HeroContent {
  brand: string;
  navLinks: NavLink[];
  headerCta: NavLink;
  title: HeroHeading;
  /** Description rendered one array item per line (explicit breaks). */
  description: string[];
  features: string[];
  ctas: HeroCta[];
  outro: HeroHeading;
  card: HeroMedia;
}
