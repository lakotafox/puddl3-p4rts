"use client";

import TextEngine from "spring-text-engine";
import { easings } from "@react-spring/web";
import Link from "next/link";
import { Inview } from "@/components/animation/springs/in-view";
import { Hover } from "@/components/animation/springs/hover";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";
import { GlobeIcon, XIcon, CircleDotIcon } from "@/components/ui/icons";
import type { homeContent } from "@/data/mocks/home";

export interface AboutProps {
  about: (typeof homeContent)["about"];
}

export const About = ({ about }: AboutProps) => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-background"
    >
      <div className="mx-auto grid max-w-shell grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
        {/* Left — globe */}
        <div className="relative min-h-[14rem] lg:min-h-[20rem]">
          <GlobeIcon
            aria-hidden
            className="absolute -left-4 top-1/2 -translate-y-1/2 text-[12rem] text-foreground/10 sm:text-[16rem] lg:-left-6 lg:text-[20rem]"
          />
          <Eyebrow className="relative">{about.eyebrow}</Eyebrow>
          <Inview
            tag="div"
            mode="once"
            from={{ opacity: 0, transform: "translateY(12px)" }}
            to={{ opacity: 1, transform: "translateY(0px)" }}
            className="absolute bottom-0 left-0 flex items-center gap-3 text-sm text-foreground/70"
          >
            <GlobeIcon className="text-2xl text-foreground" />
            <span className="max-w-[14rem]">{about.globeLabel}</span>
          </Inview>
        </div>

        {/* Right — statement */}
        <div className="flex flex-col gap-10">
          <TextEngine
            tag="h2"
            id="about-heading"
            mode="once"
            wordIn={{ y: 0, opacity: 1 }}
            wordOut={{ y: 24, opacity: 0 }}
            wordStagger={35}
            wordConfig={{ duration: 700, easing: easings.easeOutQuart }}
            className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl"
          >
            {about.statement.lead}
            <span className="text-muted">{about.statement.muted}</span>
          </TextEngine>

          <Inview
            tag="div"
            mode="once"
            from={{ opacity: 0, transform: "translateY(12px)" }}
            to={{ opacity: 1, transform: "translateY(0px)" }}
            delayIn={200}
            className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6"
          >
            <div className="flex flex-col gap-3">
              <p className="text-sm text-foreground/45">{about.socialLabel}</p>
              <ul className="flex items-center gap-2">
                {about.socials.map((social) => (
                  <li key={social.label}>
                    <Link
                      href={social.href}
                      aria-label={social.label}
                      className={`grid size-9 place-items-center rounded-pill text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        social.icon === "x"
                          ? "bg-accent text-white"
                          : "bg-surface text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      <Hover
                        tag="span"
                        from={{ transform: "scale(1)" }}
                        to={{ transform: "scale(1.18)" }}
                        config={{ tension: 320, friction: 16 }}
                        className="inline-flex"
                      >
                        {social.icon === "x" ? <XIcon /> : <CircleDotIcon />}
                      </Hover>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <PillButton
              label={about.cta.label}
              href={about.cta.href}
              variant="outline"
              withArrow
            />
          </Inview>
        </div>
      </div>
    </section>
  );
};
