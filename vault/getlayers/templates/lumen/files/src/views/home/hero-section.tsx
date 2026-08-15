"use client";

import Link from "next/link";
import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import type { HeroContent } from "@/types/home";
import { HalcyonGate } from "@/views/home/halcyon-gate";
import { MobileNav } from "@/views/home/mobile-nav";
import { TiltCard } from "@/views/home/tilt-card";
import { usePreloader } from "@/views/home/use-preloader";

export interface HeroSectionProps {
  content: HeroContent;
}

// Soft, un-bouncy spring shared by every reveal — "super smooth" per brief.
const SOFT = { mass: 1, tension: 42, friction: 24 };
// Whole-element reveals: fade + de-blur + gentle rise (or fall, for the header).
const UP_FROM = { opacity: 0, transform: "translateY(22px)", filter: "blur(10px)" };
const UP_TO = { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" };
const DOWN_FROM = { opacity: 0, transform: "translateY(-14px)", filter: "blur(7px)" };
const DOWN_TO = { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" };
// Per-word reveal for the display headings: rise + fade + de-blur.
const WORD_OUT = { y: 26, opacity: 0, filter: "blur(10px)" };
const WORD_IN = { y: 0, opacity: 1, filter: "blur(0px)" };

/**
 * PUDDL3 hero (Figma frame 431:159) — an art-directed poster over the Halcyon
 * Gate WebGL background, one screen tall (`h-lvh`, an `@container` scaled with
 * `cqw` tokens). Client leaf: every element reveals on load with a soft
 * spring — headings word-by-word via `spring-text-engine`, the rest via
 * `<Inview>` (fade + blur + slide). Honours `prefers-reduced-motion` through the
 * app-wide react-spring `skipAnimation`.
 */
export const HeroSection = ({ content }: HeroSectionProps) => {
  const {
    brand,
    navLinks,
    headerCta,
    title,
    description,
    features,
    ctas,
    outro,
    card,
  } = content;

  // Hold every entrance until the preloader hands off.
  const revealed = usePreloader((s) => s.revealed);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex h-lvh w-full flex-col overflow-hidden p-[5%] font-hero text-base font-normal text-hero-fg @container lg:block lg:p-0 lg:text-fluid"
    >
      <HalcyonGate />

      {/* Horizontal line behind the card & arch — full-bleed (Figma y=446) */}
      <Inview
        tag="div"
        aria-hidden
        mode="once"
        from={{ opacity: 0, transform: "scaleX(0.3)" }}
        to={{ opacity: 1, transform: "scaleX(1)" }}
        config={SOFT}
        delayIn={350}
        enabled={revealed}
        className="absolute inset-x-0 top-[55.75%] hidden h-px bg-hero-line lg:block"
      />

      {/* Focal card — centred, tilts to the pointer, rises from the water */}
      <TiltCard src={card.src} alt={card.alt} />

      {/* Header — logo · centered nav · CTA (Figma y=16) */}
      <Inview
        tag="header"
        mode="once"
        from={DOWN_FROM}
        to={DOWN_TO}
        config={SOFT}
        delayIn={100}
        enabled={revealed}
        className="relative z-30 grid grid-cols-[1fr_auto_1fr] items-center gap-md lg:absolute lg:inset-x-[2.222%] lg:top-[2%]"
      >
        <Link
          href="/"
          aria-label={`${brand} — home`}
          className="col-start-1 justify-self-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-fg"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/t/lumen/assets/logo.svg" alt={brand} width={84} height={29} className="h-[1.8em] w-auto" />
        </Link>

        <nav aria-label="Primary" className="col-start-2 hidden lg:block">
          <ul className="flex items-center gap-edge rounded-full border border-hero-border bg-hero-surface px-pill-x py-pill-y backdrop-blur-md">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-hero-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop header CTA — replaced by the burger on mobile */}
        <Link
          href={headerCta.href}
          className="col-start-3 hidden items-center gap-sm justify-self-end rounded-full border border-hero-glass-edge bg-hero-glass px-pill-x py-pill-y backdrop-blur-lg hover:bg-hero-glass-edge focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-fg lg:inline-flex"
        >
          {headerCta.label}
          <Dot />
        </Link>

        {/* Mobile burger + spring-animated menu (nav links + CTA) */}
        <MobileNav
          navLinks={navLinks}
          cta={headerCta}
          className="col-start-3 justify-self-end lg:hidden"
        />
      </Inview>

      {/* Headline (Figma y=90) — word-by-word reveal, one TextEngine per line
          so the break is deterministic ("second" starts line 2). */}
      <h1
        id="hero-title"
        className="relative z-10 mt-[6%] text-4xl font-light tracking-tight sm:text-5xl lg:absolute lg:left-[2.222%] lg:top-[11.25%] lg:mt-0 lg:w-head lg:text-display"
      >
        <TextEngine
          tag="span"
          mode="once"
          wordOut={WORD_OUT}
          wordIn={WORD_IN}
          wordStagger={90}
          wordConfig={SOFT}
          delayIn={300}
          key={revealed ? "h1a-on" : "h1a-off"}
          className="flex flex-wrap"
        >
          {title.lead}
        </TextEngine>
        <TextEngine
          tag="span"
          mode="once"
          wordOut={WORD_OUT}
          wordIn={WORD_IN}
          wordStagger={90}
          wordConfig={SOFT}
          delayIn={470}
          key={revealed ? "h1b-on" : "h1b-off"}
          className="flex flex-wrap text-hero-dim"
        >
          {title.trail}
        </TextEngine>
      </h1>

      {/* Bottom cluster — on mobile these flow and pin to the bottom of the
          screen (card floats centred above); `lg:contents` dissolves the box
          at `lg` so each child resumes its absolute poster position. */}
      <div className="flex flex-1 flex-col justify-end gap-4 lg:contents">
      {/* Supporting copy (Figma y=378, left) — soft blur/opacity reveal */}
      <Inview
        tag="p"
        mode="once"
        from={UP_FROM}
        to={UP_TO}
        config={SOFT}
        delayIn={550}
        enabled={revealed}
        className="lg:absolute lg:left-[2.222%] lg:top-[47.25%] lg:w-copy"
      >
        {description.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </Inview>

      {/* Features (Figma y=378, right) — stacked, no gaps */}
      <Inview
        tag="ul"
        mode="once"
        from={UP_FROM}
        to={UP_TO}
        config={SOFT}
        delayIn={620}
        enabled={revealed}
        className="text-hero-muted lg:absolute lg:right-[2.222%] lg:top-[47.25%] lg:text-right lg:text-hero-fg"
      >
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </Inview>

      {/* CTAs (Figma y=720, bottom-left) — staggered reveal */}
      <div className="flex flex-wrap items-center gap-3 lg:absolute lg:bottom-[4%] lg:left-[2.222%] lg:gap-md">
        {ctas.map((cta, i) => (
          <Inview
            key={cta.href}
            tag="span"
            mode="once"
            from={UP_FROM}
            to={UP_TO}
            config={SOFT}
            delayIn={680 + i * 90}
            enabled={revealed}
            className="inline-flex"
          >
            <Link
              href={cta.href}
              className={
                cta.variant === "primary"
                  ? "inline-flex items-center gap-2 rounded-full border border-hero-fg/40 bg-brand-gradient px-5 py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-fg lg:gap-sm lg:px-edge lg:py-btn-y"
                  : "inline-flex items-center rounded-full border border-hero-border px-5 py-3 hover:bg-hero-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-fg lg:px-edge lg:py-btn-y"
              }
            >
              {cta.label}
              {cta.variant === "primary" && <Dot />}
            </Link>
          </Inview>
        ))}
      </div>
      </div>

      {/* Display outro (Figma y=624, bottom-right) — word-by-word reveal, one
          TextEngine per line so "the two-week wait" starts line 2. */}
      <p className="absolute bottom-[4%] right-[2.222%] hidden w-head text-display font-light tracking-tight lg:block">
        <TextEngine
          tag="span"
          mode="once"
          wordOut={WORD_OUT}
          wordIn={WORD_IN}
          wordStagger={90}
          wordConfig={SOFT}
          delayIn={520}
          key={revealed ? "o1a-on" : "o1a-off"}
          className="flex flex-wrap justify-end text-hero-dim"
        >
          {outro.lead}
        </TextEngine>
        <TextEngine
          tag="span"
          mode="once"
          wordOut={WORD_OUT}
          wordIn={WORD_IN}
          wordStagger={90}
          wordConfig={SOFT}
          delayIn={640}
          key={revealed ? "o1b-on" : "o1b-off"}
          className="flex flex-wrap justify-end"
        >
          {outro.trail}
        </TextEngine>
      </p>
    </section>
  );
};

/** Small white outline ring used as a button indicator (no fill). */
const Dot = () => (
  <span
    aria-hidden
    className="size-1.5 rounded-full border border-hero-fg lg:size-dot"
  />
);
