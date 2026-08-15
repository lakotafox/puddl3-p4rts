"use client";

// 📖 Docs: obsidian/frontend/html-semantics.md

import Link from "next/link";

import { Spring } from "@/components/animation/springs/spring";
import { useIntro } from "@/hooks/intro/use-intro";
import type { NavLink } from "@/data/mocks/home";

export interface HeroNavProps {
  brand: string;
  start: NavLink[];
  end: NavLink[];
}

/**
 * Hover/focus treatment shared by every link in the masthead. A plain CSS
 * transition is allowed here — a discrete colour change with token-backed
 * timing is the one exception to the springs-only rule (ADR-0014).
 */
const linkClassName =
  "text-body leading-body text-on-media transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-on-media/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-media/60 focus-visible:rounded-xs";

const NavList = ({ links, label }: { links: NavLink[]; label: string }) => (
  <nav aria-label={label}>
    <ul className="flex items-center gap-8 sm:gap-16">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={linkClassName}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

/**
 * Hero masthead: two link groups either side of a centred brand mark, on a bar
 * closed by a hairline rule.
 *
 * From `md` it is the design's single 60px row, with the brand absolutely
 * centred rather than being a third flex child — so it lands on the page's
 * centre line regardless of how wide the link groups are. Below `md` there is no
 * room for that, so it stacks: the brand on its own line with the two groups
 * pushed to the edges underneath. `md:contents` dissolves the mobile wrapper so
 * the two groups become direct children of the bar again on desktop.
 */
export const HeroNav = ({ brand, start, end }: HeroNavProps) => {
  const isComplete = useIntro((state) => state.isComplete);

  return (
    <Spring
      tag="header"
      mode="once"
      enabled={isComplete}
      from={{ opacity: 0, y: -14 }}
      to={{ opacity: 1, y: 0 }}
      config={{ tension: 60, friction: 24 }}
      className="relative z-20 flex shrink-0 flex-col gap-3 border-b border-on-media/20 px-5 py-4 sm:px-7.5 md:h-15 md:flex-row md:items-center md:justify-between md:gap-0 md:py-0"
    >
      <Link
        href="/"
        className="self-center font-display text-lead leading-display text-on-media uppercase transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-70 focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-media/60 md:absolute md:left-1/2 md:-translate-x-1/2"
      >
        {brand}
      </Link>

      <div className="flex items-center justify-between md:contents">
        <NavList links={start} label="Primary" />
        <NavList links={end} label="Secondary" />
      </div>
    </Spring>
  );
};
