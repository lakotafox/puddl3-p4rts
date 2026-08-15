/**
 * PUDDL3 P4RTS landing copy (rebranded from GringX; layout untouched).
 * Content stays out of components per the template's own rule.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

const B = import.meta.env.BASE_URL;

export const brand = { name: "PUDDL3 P4RTS", href: B };

export const contactCta: NavLink = { label: "", href: "" };

export const navLinks: NavLink[] = [];

export const hero = {
  eyebrow: "FREE COMPONENTS FOR PUDDLE",
  title: "Parts that make a splash",
  description:
    "Hey — this is our own library of animated components, backgrounds and full templates. Easy to use, fun to play with, all yours.",
  primaryCta: { label: "Get Started", href: B + "library" },
  secondaryCta: { label: "", href: "" },
} as const;

export const stats: Stat[] = [];
