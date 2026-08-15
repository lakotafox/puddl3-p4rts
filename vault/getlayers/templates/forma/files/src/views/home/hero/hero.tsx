import type { HomeHeroContent } from "@/data/mocks/home";

import { ContactForm } from "./contact-form";
import { CopyCard } from "./copy-card";
import { HeroHeading } from "./hero-heading";
import { HeroMedia } from "./hero-media";
import { IntroReveal } from "./intro-reveal";
import { MetricCard } from "./metric-card";
import { ShowcaseCard } from "./showcase-card";
import { SiteHeader } from "./site-header";

export interface HeroProps {
  content: HomeHeroContent;
}

/**
 * Entrance choreography, in ms after the preloader lifts.
 *
 * Read top-to-bottom it is the order the eye should travel: masthead, heading,
 * form, then the panel and cards settling in underneath. Every value is a delay
 * handed to a leaf — nothing here animates on its own, so the whole sequence
 * can be retimed from this one table.
 */
const CUE = {
  heading: 40,
  media: 110,
  form: 200,
  cards: 280,
  cardStagger: 75,
  /** Gap between a card arriving and its own copy reading in. */
  cardCopy: 90,
} as const;

/**
 * Full-viewport hero. Figma frame 610:510 (1440×800).
 *
 * **Vertically** the rhythm is fixed everywhere except the media panel: header,
 * heading row and card row keep their design heights, and the media panel is
 * the single `flex-1` row. That keeps the 30px gutter to all four screen edges
 * exact while the viewport height varies. Those offsets are the Figma pixel
 * values in rem against the adaptive grid's 1440 base (1rem = 16px).
 *
 * **Horizontally** the gutter is a fixed `rem` (so it matches the vertical
 * gutter above the card row — both are the design's 20px) and only the
 * *columns* flex, sharing what is left in the Figma ratio 350 : 350 : 640.
 * Fixed rem widths would leave the row short of the viewport on any display
 * wider than the design (a 480px gap at 1920, since the grid damps its font
 * scale-up on purpose) and would push the form off the 770px rail that the nav
 * and the wide card share.
 *
 * The `calc((100%_-_2.5rem)*n/1340)` widths outside the card row resolve to the
 * same columns: `2.5rem` is the two gutters, `1340` the columns' combined Figma
 * width. That is what keeps the nav, the form and the wide card on one rail.
 */
export const Hero = ({ content }: HeroProps) => (
  <section
    aria-label="Contact"
    className="flex min-h-lvh w-full flex-col px-[1.25rem] pt-[1.25rem] pb-[1.25rem] lg:h-lvh lg:px-[1.875rem] lg:pt-[1rem] lg:pb-[1.875rem]"
  >
    <SiteHeader
      brand={content.brand}
      nav={content.nav}
      contact={content.contact}
    />

    <div className="mt-[2.5rem] flex shrink-0 flex-col gap-[2rem] lg:mt-[4.375rem] lg:flex-row lg:items-end lg:justify-between lg:gap-0">
      <HeroHeading
        lead={content.headingLead}
        follow={content.headingFollow}
        delay={CUE.heading}
        className="w-full lg:w-[calc((100%_-_2.5rem)*664/1340)]"
      />
      <ContactForm
        delay={CUE.form}
        className="w-full lg:w-[calc((100%_-_2.5rem)*640/1340)]"
      />
    </div>

    <HeroMedia
      src={content.media.src}
      label={content.media.label}
      delay={CUE.media}
      className="mt-[1.5rem] min-h-[42vh] lg:mt-[2rem] lg:min-h-0"
    />

    <div className="mt-[1.25rem] flex shrink-0 flex-col gap-[1.25rem] lg:h-[8.8125rem] lg:flex-row">
      <IntroReveal delay={CUE.cards} className="w-full lg:flex-[350_1_0%]">
        <MetricCard
          title={content.metric.title}
          label={content.metric.label}
          value={content.metric.value}
          progress={content.metric.progress}
          delay={CUE.cards + CUE.cardCopy}
          className="min-h-[8.8125rem] w-full lg:h-full"
        />
      </IntroReveal>

      <IntroReveal
        delay={CUE.cards + CUE.cardStagger}
        className="w-full lg:flex-[350_1_0%]"
      >
        <CopyCard
          title={content.copy.title}
          body={content.copy.body}
          delay={CUE.cards + CUE.cardStagger + CUE.cardCopy}
          className="min-h-[8.8125rem] w-full lg:h-full"
        />
      </IntroReveal>

      <IntroReveal
        delay={CUE.cards + CUE.cardStagger * 2}
        className="w-full lg:flex-[640_1_0%]"
      >
        <ShowcaseCard
          title={content.showcase.title}
          image={content.showcase.image}
          cta={content.showcase.cta}
          actionLabel={content.showcase.actionLabel}
          delay={CUE.cards + CUE.cardStagger * 2 + CUE.cardCopy}
          className="min-h-[8.8125rem] w-full lg:h-full"
        />
      </IntroReveal>
    </div>
  </section>
);
