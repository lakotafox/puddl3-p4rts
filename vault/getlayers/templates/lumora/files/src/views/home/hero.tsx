"use client";

import TextEngine from "spring-text-engine";
import { easings } from "@react-spring/web";
import { Inview } from "@/components/animation/springs/in-view";
import { LiquidReveal } from "@/components/common/liquid-reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";
import { StarIcon } from "@/components/ui/icons";
import { HeroCard } from "./hero-card";
import { Partners } from "./partners";
import { useIntro, useRequestModal } from "@/hooks/ui-store";
import { scrollTo } from "@/utils/scroll-to";
import type { homeContent } from "@/data/mocks/home";

export interface HeroProps {
  hero: (typeof homeContent)["hero"];
}

export const Hero = ({ hero }: HeroProps) => {
  const ready = useIntro((state) => state.ready);
  const openModal = useRequestModal((state) => state.openModal);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden rounded-b-card bg-hero-to"
    >
      {/* Full-bleed background — `before` shown, `after` revealed on a cursor trail */}
      <LiquidReveal
        beforeSrc="/assets/hero/after.jpg"
        afterSrc="/assets/hero/before.jpg"
        alt="Portrait of a PUDDL3 worker mid-shift"
        className="absolute inset-0 z-0"
        brushRadius={143}
      />

      {/* Legibility vignette — keeps the header / status bar readable over the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/35 via-transparent to-background/35"
      />

      {/* Giant brand watermark over the photo */}
      <Inview
        tag="span"
        mode="once"
        enabled={ready}
        from={{ opacity: 0, transform: "translateY(20px)" }}
        to={{ opacity: 0.4, transform: "translateY(0px)" }}
        config={{ tension: 120, friction: 30 }}
        delayIn={300}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[7rem] z-[1] select-none text-center font-bold leading-none text-watermark text-white/40"
      >
        {hero.brandWatermark}
      </Inview>

      <div className="relative z-20 mx-auto flex max-w-shell flex-col gap-8 px-5 pb-20 pt-28 sm:px-8 lg:grid lg:min-h-lvh lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-36">
        {/* Left — headline & CTAs */}
        <div className="relative z-10 order-1 flex flex-col gap-7 lg:order-none lg:col-span-7">
          <Inview
            tag="div"
            mode="once"
            enabled={ready}
            from={{ opacity: 0, transform: "translateY(10px)" }}
            to={{ opacity: 1, transform: "translateY(0px)" }}
            delayIn={200}
          >
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </Inview>

          {ready ? (
            <TextEngine
              tag="h1"
              id="hero-heading"
              mode="once"
              overflow
              lineIn={{ y: "0%", opacity: 1 }}
              lineOut={{ y: "100%", opacity: 0 }}
              lineStagger={120}
              lineConfig={{ duration: 900, easing: easings.easeOutCubic }}
              delayIn={250}
              className="max-w-[18ch] text-4xl font-semibold leading-[0.98] tracking-tight sm:text-5xl md:text-6xl"
            >
              {hero.headingLines.join(" ")}
            </TextEngine>
          ) : (
            <h1
              id="hero-heading"
              className="max-w-[18ch] text-4xl font-semibold leading-[0.98] tracking-tight opacity-0 sm:text-5xl md:text-6xl"
            >
              {hero.headingLines.join(" ")}
            </h1>
          )}

          <Inview
            tag="div"
            mode="once"
            enabled={ready}
            from={{ opacity: 0, transform: "translateY(10px)" }}
            to={{ opacity: 1, transform: "translateY(0px)" }}
            delayIn={650}
            className="flex items-center gap-3"
          >
            <span className="flex text-accent" aria-hidden>
              {Array.from({ length: hero.rating }).map((_, index) => (
                <StarIcon key={index} className="text-base" />
              ))}
            </span>
            <span className="text-sm font-medium text-foreground/70">
              {hero.customers}
            </span>
          </Inview>

          <Inview
            tag="div"
            mode="once"
            enabled={ready}
            from={{ opacity: 0, transform: "translateY(12px)" }}
            to={{ opacity: 1, transform: "translateY(0px)" }}
            delayIn={750}
            className="flex flex-wrap items-center gap-3"
          >
            <PillButton
              label={hero.primaryCta.label}
              onClick={openModal}
              variant="dark"
              withArrow
            />
            <PillButton
              label={hero.secondaryCta.label}
              onClick={() => scrollTo(hero.secondaryCta.href.replace("#", ""))}
              variant="outline"
            />
          </Inview>
        </div>

        {/* Right — explore card & partners */}
        <div className="relative z-10 order-2 flex w-full flex-col items-start gap-8 lg:col-span-5 lg:order-none lg:items-end">
          <HeroCard cards={hero.cards} enabled={ready} />
          <Partners
            label={hero.partnersLabel}
            partners={hero.partners}
            enabled={ready}
          />
        </div>
      </div>

      {/* Bottom status bar */}
      <Inview
        tag="div"
        mode="once"
        enabled={ready}
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        delayIn={900}
        className="relative z-20 mx-auto flex max-w-shell items-center justify-between gap-3 border-t border-foreground/10 px-5 py-5 text-xs font-medium uppercase tracking-wide text-foreground/60 sm:px-8"
      >
        <span>{hero.footer.left}</span>
        <span className="hidden sm:inline">{hero.footer.center}</span>
        <span className="inline-flex items-center gap-2">
          {hero.footer.right}
          <span aria-hidden>↓</span>
        </span>
      </Inview>
    </section>
  );
};
