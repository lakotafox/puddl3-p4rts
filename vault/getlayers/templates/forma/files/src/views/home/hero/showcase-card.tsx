import Image from "next/image";

import { ArrowLinkButton } from "@/components/ui/arrow-link-button";
import { Card } from "@/components/ui/card";
import { ChipLink } from "@/components/ui/chip-link";
import type { NavLink } from "@/data/mocks/home";

import { WordsIn } from "./animated-text";
import { IntroReveal } from "./intro-reveal";

export interface ShowcaseCardProps {
  title: string;
  image: string;
  cta: NavLink;
  /** Accessible name for the icon-only arrow control. */
  actionLabel: string;
  /** Delay (ms) for the card's own reveals. */
  delay?: number;
  className?: string;
}

/**
 * Bottom-row wide card: light-trail artwork over the accent surface, with the
 * work CTA. The artwork is decorative, so it carries an empty alt.
 */
export const ShowcaseCard = ({
  title,
  image,
  cta,
  actionLabel,
  delay = 0,
  className = "",
}: ShowcaseCardProps) => (
  <Card
    className={`flex flex-col bg-surface-accent p-[1.1875rem] text-foreground-inverse ${className}`}
  >
    <Image
      src={image}
      alt=""
      fill
      sizes="40rem"
      priority
      className="object-cover"
      style={{ objectPosition: "52% 50%" }}
    />

    <WordsIn
      tag="h2"
      className="relative w-[17.5rem] text-heading leading-display"
      delay={delay}
    >
      {title}
    </WordsIn>

    <div className="relative mt-auto flex items-end justify-between">
      <IntroReveal delay={delay + 220} distance={14}>
        <ArrowLinkButton href={cta.href} label={actionLabel} />
      </IntroReveal>
      <IntroReveal delay={delay + 300} distance={14}>
        <ChipLink href={cta.href} label={cta.label} />
      </IntroReveal>
    </div>
  </Card>
);
