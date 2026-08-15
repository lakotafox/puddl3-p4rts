// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * Team — Figma node `1558:410`.
 *
 * One full viewport. The order is the mockup's: the brand-green intro card
 * first (447 wide), then the portrait cards (332 wide) spaced 11px, running off
 * the right edge. A live progress bar sits under the rail — see [[TeamSlider]].
 *
 * `sticky`, so Contact rides up over it — the same flow-order trick About uses
 * on Services.
 */

import Image from "next/image";
import Link from "next/link";

import TextEngine from "spring-text-engine";

import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { TeamContent } from "@/data/mocks/home";
import { EYEBROW_MOTION } from "@/lib/motion/text-presets";

import { TeamSlider } from "./team-slider";

export interface TeamProps {
  content: TeamContent;
}

export const Team = ({ content }: TeamProps) => (
  // Full viewport, content vertically centred. The rail takes the height it is
  // given rather than a fixed rem, so the cards fill the screen the way the
  // 558-of-800 card does on the artboard.
  // `sticky` at every breakpoint — it is what lets the Contact block ride over
  // this one, and that transition is now kept on small screens too.
  <section
    id="team"
    className="sticky top-0 z-10 flex h-lvh flex-col justify-center bg-surface-section-deep pt-[18%] md:pt-[12%] lg:pt-[6%]"
  >
    <div className="flex h-[74%] flex-col lg:h-[86%]">
      <TeamSlider>
        <div className="flex h-full w-[80vw] max-w-[22rem] shrink-0 flex-col justify-between rounded-card bg-accent p-6 text-white lg:w-[27.9375rem] lg:max-w-none lg:p-8">
          <div className="flex flex-col gap-8">
            <TextEngine
              tag="p"
              className="text-sm leading-body font-medium uppercase opacity-70"
              {...EYEBROW_MOTION}
            >
              {content.eyebrow}
            </TextEngine>
            {/* Static: this heading lives inside a card on a draggable rail,
                where a reveal would replay every time the card scrolls back. */}
            <h2 className="text-[1.5rem] leading-display font-light lg:w-[21rem] lg:text-[2rem]">
              {content.title}
            </h2>
          </div>

          <ul className="flex gap-3">
            {content.socials.map((social) => (
              <li key={social.icon}>
                <Link
                  href={social.href}
                  aria-label={social.label}
                  className="block size-12 transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-80 lg:size-16"
                >
                  <Image
                    src={`/assets/icons/${social.icon}.svg`}
                    alt=""
                    width={64}
                    height={64}
                    className="size-full"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {content.members.map((member) => (
          <figure
            key={member.name}
            className="relative h-full w-[70vw] max-w-[20.75rem] shrink-0 overflow-hidden rounded-card lg:w-[20.75rem]"
          >
            <Image
              src={member.image}
              alt={`${member.name}, ${member.role}`}
              fill
              sizes="21rem"
              className="object-cover"
            />
            {/* `gap-2` is load-bearing: cap-height trimming removes the leading
                that would otherwise separate the two lines, so without it the
                name and the role collide. */}
            {/* Inset 32 on all three sides, matching the intro card's own
                padding — that is what lines the plates up with the social row
                across the rail. */}
            {/* `h-16` matches the intro card's 64px social buttons, so the
                plates and the social row read as one horizontal band across the
                rail. Content is centred both ways inside that fixed height. */}
            <figcaption className="absolute inset-x-8 bottom-8 flex h-16 flex-col items-center justify-center gap-3 rounded-panel bg-surface-glass px-5 text-center backdrop-blur-glass">
              <p className="text-base leading-body font-medium">
                {member.name}
              </p>
              <p className="text-sm leading-body font-light text-foreground-subtle">
                {member.role}
              </p>
            </figcaption>
          </figure>
        ))}

        {/* Lime tail card closing the rail — Figma node 1575:238. */}
        <Link
          href={content.more.href}
          className="flex h-full w-[70vw] max-w-[20.75rem] shrink-0 flex-col justify-between rounded-card border border-action-secondary-border bg-action-secondary p-6 text-action-secondary-foreground lg:w-[20.75rem] lg:p-8"
        >
          <p className="text-[1.5rem] leading-display font-light lg:text-[2rem]">
            {content.more.title}
          </p>
          <span className="flex items-end justify-between">
            <span className="text-base leading-body font-light">
              {content.more.cta}
            </span>
            <span className="grid size-[4.5rem] place-items-center rounded-full border border-current">
              <ArrowUpRightIcon className="size-[1.1875rem]" />
            </span>
          </span>
        </Link>
      </TeamSlider>
    </div>
  </section>
);
