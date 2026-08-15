"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import Link from "next/link";
import { animated, useSpring, useTransition } from "@react-spring/web";

import type { HeroContent } from "@/types/home";

export interface MobileNavProps {
  navLinks: HeroContent["navLinks"];
  cta: HeroContent["headerCta"];
  className?: string;
}

// Soft, quick spring for the burger↔X morph and the dropdown reveal. Honours
// `prefers-reduced-motion` via the app-wide react-spring `skipAnimation`.
const SPRING = { mass: 1, tension: 220, friction: 24 };

/**
 * Mobile header menu — a burger button that toggles a frosted dropdown of the
 * nav links + header CTA (shown below `lg`, where the desktop nav pill is
 * hidden). All motion is spring-based (`@react-spring/web`, hard rule #1): the
 * two bars morph into an X and the panel springs in. Client leaf.
 */
export const MobileNav = ({ navLinks, cta, className }: MobileNavProps) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  // The panel is portalled to <body> so its `backdrop-filter` samples the scene
  // — inside the header it would sample the header's transformed/filtered box
  // (react-spring leaves `transform`/`filter` on the <Inview> header at rest),
  // which silently kills the blur. Anchored with `fixed`, measured off the burger.
  const [anchor, setAnchor] = useState<{ top: number; right: number } | null>(
    null,
  );
  // Avoid SSR portal (no `document`); flip true after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Position the panel under the burger; re-measure on resize while open.
  useEffect(() => {
    if (!open) return;
    const place = () => {
      const r = btnRef.current?.getBoundingClientRect();
      if (r) setAnchor({ top: r.bottom + 12, right: window.innerWidth - r.right });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open]);

  // Dismiss on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Burger → X: bars slide to the centre and cross.
  const topBar = useSpring({
    transform: open
      ? "translateY(6px) rotate(45deg)"
      : "translateY(0px) rotate(0deg)",
    config: SPRING,
  });
  const bottomBar = useSpring({
    transform: open
      ? "translateY(-6px) rotate(-45deg)"
      : "translateY(0px) rotate(0deg)",
    config: SPRING,
  });

  const panel = useTransition(open, {
    from: { opacity: 0, transform: "translateY(-8px) scale(0.96)" },
    enter: { opacity: 1, transform: "translateY(0px) scale(1)" },
    leave: { opacity: 0, transform: "translateY(-8px) scale(0.96)" },
    config: SPRING,
  });

  return (
    <div className={`relative ${className ?? ""}`}>
      <button
        ref={btnRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="relative z-30 flex size-11 items-center justify-center rounded-full border border-hero-border bg-hero-surface backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-fg"
      >
        <span aria-hidden className="relative block h-3.5 w-5">
          <animated.span
            style={topBar}
            className="absolute inset-x-0 top-0 h-0.5 origin-center rounded-full bg-hero-fg"
          />
          <animated.span
            style={bottomBar}
            className="absolute inset-x-0 bottom-0 h-0.5 origin-center rounded-full bg-hero-fg"
          />
        </span>
      </button>

      {mounted &&
        panel((style, isOpen) =>
          isOpen
            ? createPortal(
                <>
                  {/* Tap-catcher — dismiss when tapping outside the panel. */}
                  <button
                    type="button"
                    aria-hidden
                    tabIndex={-1}
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 cursor-default lg:hidden"
                  />
                  <animated.nav
                    id="mobile-menu"
                    aria-label="Primary"
                    style={{
                      top: anchor?.top ?? 0,
                      right: anchor?.right ?? 0,
                      ...style,
                    }}
                    className="fixed z-50 flex w-56 origin-top-right flex-col gap-1 rounded-3xl border border-hero-border bg-hero-surface p-3 backdrop-blur-xl lg:hidden"
                  >
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="rounded-2xl px-4 py-3 text-hero-muted hover:text-hero-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-fg"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href={cta.href}
                      onClick={() => setOpen(false)}
                      className="mt-1 inline-flex items-center justify-center rounded-full border border-hero-glass-edge bg-hero-glass px-4 py-3 backdrop-blur-lg hover:bg-hero-glass-edge focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-fg"
                    >
                      {cta.label}
                    </Link>
                  </animated.nav>
                </>,
                document.body,
              )
            : null,
        )}
    </div>
  );
};
