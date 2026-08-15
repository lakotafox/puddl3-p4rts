import Link from "next/link";

import type { NavLink } from "@/data/mocks/home";

import { IntroReveal } from "./intro-reveal";

export interface SiteHeaderProps {
  brand: string;
  nav: NavLink[];
  contact: NavLink;
  className?: string;
}

/** Per-item stagger (ms) across the nav. */
const NAV_STAGGER = 70;

/**
 * Hero masthead: wordmark, primary nav, contact link.
 *
 * The three groups are positioned rather than distributed — Figma puts the nav
 * at x=770 on the 1440 frame (740px in from the 30px gutter), which is neither
 * viewport-centred nor evenly spaced between the wordmark and the contact link.
 *
 * That 740px is a *proportion* of the content width, not a fixed offset: it is
 * the same rail the contact form and the wide showcase card start on, so all
 * three must stay aligned as the viewport grows past the design width.
 */
export const SiteHeader = ({
  brand,
  nav,
  contact,
  className = "",
}: SiteHeaderProps) => (
  <header className={`relative h-[1.5rem] shrink-0 ${className}`}>
    <IntroReveal className="absolute top-0 left-0" distance={14}>
      <Link href="/" className="text-title leading-none text-foreground-strong">
        {brand}
      </Link>
    </IntroReveal>

    {/* The rail only exists in the desktop composition; below it there is no
        room between the wordmark and the contact link, so the nav is dropped
        rather than crushed. #todo — needs a real mobile menu once designed. */}
    <nav
      aria-label="Primary"
      className="absolute top-0 left-[calc((100%_-_2.5rem)*700/1340_+_2.5rem)] hidden lg:block"
    >
      <ul className="flex items-start gap-[2.5rem] text-body leading-copy">
        {nav.map((item, index) => (
          <li key={item.href}>
            <IntroReveal delay={120 + index * NAV_STAGGER} distance={14}>
              <Link
                href={item.href}
                className="transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-60"
              >
                {item.label}
              </Link>
            </IntroReveal>
          </li>
        ))}
      </ul>
    </nav>

    <IntroReveal
      className="absolute top-0 right-0"
      delay={120 + nav.length * NAV_STAGGER}
      distance={14}
    >
      <Link
        href={contact.href}
        className="text-body leading-copy underline decoration-solid [text-underline-position:from-font] transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-60"
      >
        {contact.label}
      </Link>
    </IntroReveal>
  </header>
);
