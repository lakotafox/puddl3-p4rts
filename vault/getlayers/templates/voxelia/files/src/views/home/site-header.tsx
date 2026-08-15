"use client";

/**
 * Hero top bar — logo, nav, and the contact pill.
 *
 * Two layouts, one `<nav>`. From `sm` everything sits on a single row: a
 * `1fr auto 1fr` track centres the nav on the *shell*, which is where the design
 * puts it (its 342px frame sits at x=549 of a 1400px shell — dead centre). Below
 * `sm` the nav and the pill collapse into a burger.
 *
 * `sm` is the right seam because it is exactly where the adaptive grid changes
 * base: above it the root font-size is a viewport fraction of 1024/1440/1920, so
 * the row's contents keep the same *proportion* of the width at every size and a
 * fit at one width is a fit at all of them. Below it the base drops to 360 and
 * the type jumps up relative to the shell, which is what breaks the row.
 *
 * Rendering a second `<nav>` for the burger would mean two "Primary" landmarks,
 * so the same element is re-flowed instead.
 *
 * 📖 Docs: obsidian/frontend/home-hero.md
 */

import { useState } from "react";

import type { NavLink } from "@/data/mocks/home";
import { Reveal } from "@/views/home/reveal";

/** The bar drops in from above, in reading order, before anything below it. */
const ENTRANCE = { y: -16, config: { tension: 210, friction: 24 } };

export interface SiteHeaderProps {
  company: string;
  links: NavLink[];
  contact: NavLink;
}

const hover = "ease-entrance transition-colors duration-[var(--duration-fast)]";

/**
 * The mark on the contact pill: a small square stepping up to a larger one.
 *
 * Reads as the same up-and-right movement the arrow it replaced did, drawn on
 * the grid the display face is built on — no diagonal, no curve, and it survives
 * being rendered at 8px because every edge lands on a whole pixel.
 */
const StepMark = () => (
  <svg viewBox="0 0 9 9" aria-hidden="true" className="size-2 shrink-0 fill-current">
    <rect y="5" width="3.5" height="3.5" />
    <rect x="4.5" width="4.5" height="4.5" />
  </svg>
);

const ContactPill = ({ contact, className }: { contact: NavLink; className: string }) => (
  <a
    href={contact.href}
    className={`bg-surface-invert text-ink text-body hover:bg-ink hover:text-surface-invert flex items-center justify-center gap-2 ${hover} ${className}`}
  >
    {contact.label}
    <StepMark />
  </a>
);

export const SiteHeader = ({ company, links, contact }: SiteHeaderProps) => {
  const [open, setOpen] = useState(false);

  return (
    // `h-topbar` sits on the header itself, not the inner grid: with border-box
    // the 1px bottom rule has to be *inside* the 55px, or the whole body below
    // starts a pixel late and every measured coordinate drifts. Only from `sm`,
    // since an open burger has to be free to make the header taller.
    <header className="border-rule bg-veil border-b sm:h-topbar">
      {/* No `items-center` on the grid: it would collapse every cell to its text
          height, leaving the pill's `h-full` nothing to fill. Cells stretch, and
          each one centres its own content. */}
      <div className="grid grid-cols-[1fr_auto] sm:h-full sm:grid-cols-[1fr_auto_1fr]">
        <Reveal
          tag="span"
          {...ENTRANCE}
          className="text-logo px-shell-gutter flex h-topbar items-center sm:h-full"
        >
          {company}
        </Reveal>

        <Reveal
          tag="button"
          {...ENTRANCE}
          delay={100}
          type="button"
          onClick={() => setOpen((wasOpen) => !wasOpen)}
          aria-expanded={open}
          aria-controls="primary-nav"
          className={`hover:text-foreground/60 flex size-topbar items-center justify-center sm:hidden ${hover}`}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 12 12" aria-hidden="true" className="size-4 fill-current">
            {open ? (
              <path d="M1.2 0 6 4.8 10.8 0 12 1.2 7.2 6 12 10.8 10.8 12 6 7.2 1.2 12 0 10.8 4.8 6 0 1.2Z" />
            ) : (
              <>
                <rect y="1" width="12" height="1.5" />
                <rect y="5.25" width="12" height="1.5" />
                <rect y="9.5" width="12" height="1.5" />
              </>
            )}
          </svg>
        </Reveal>

        <Reveal {...ENTRANCE} delay={200} className="order-3 hidden justify-end sm:flex">
          <ContactPill contact={contact} className="h-topbar w-contact sm:h-full" />
        </Reveal>

        <nav
          id="primary-nav"
          aria-label="Primary"
          // The open state is a JS branch rather than stacked `hidden`/`block`
          // utilities: `hidden sm:flex` and `flex` cannot both be in the class
          // list without one of them needing `!important` to win.
          className={`order-4 col-span-2 flex-col sm:order-2 sm:col-span-1 sm:flex sm:flex-row sm:items-center sm:border-t-0 ${
            open ? "border-rule flex border-t" : "hidden"
          }`}
        >
          <ul className="text-body px-shell-gutter flex list-none flex-col gap-y-3 py-4 sm:flex-row sm:justify-center sm:gap-10 sm:px-0 sm:py-0">
            {links.map((link, index) => (
              <Reveal key={link.href} tag="li" {...ENTRANCE} delay={60 + index * 70}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`hover:text-foreground/60 ${hover}`}
                >
                  {link.label}
                </a>
              </Reveal>
            ))}
          </ul>

          {/* The pill follows the links into the burger rather than staying in
              the bar — below `sm` its 189px frame and the logo together leave no
              room for the toggle. */}
          <ContactPill contact={contact} className="border-rule h-action border-t sm:hidden" />
        </nav>
      </div>
    </header>
  );
};
