import { Inview } from "@/components/animation/springs/in-view";
import { Hover } from "@/components/animation/springs/hover";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { CreateWord } from "@/data/mocks/home";

export interface CreateBandProps {
  words: CreateWord[];
}

const surfaceByVariant: Record<CreateWord["variant"], string> = {
  light: "bg-surface text-foreground",
  accent: "bg-gradient-to-br from-accent-from to-accent-to text-white",
  dark: "bg-ink text-white",
  ghost: "bg-surface/60 text-foreground/35",
};

export const CreateBand = ({ words }: CreateBandProps) => {
  return (
    <section aria-label="Work, stream, spend" className="bg-background">
      <ul className="mx-auto flex max-w-shell flex-col gap-3 px-5 py-10 sm:flex-row sm:gap-4 sm:px-8">
        {words.map((word, index) => (
          <li key={`${word.label}-${index}`} className="flex-1">
            <Inview
              tag="div"
              mode="once"
              from={{ opacity: 0, transform: "translateY(28px)" }}
              to={{ opacity: 1, transform: "translateY(0px)" }}
              config={{ tension: 200, friction: 22 }}
              delayIn={index * 120}
            >
              <Hover
                tag="div"
                from={{ transform: "scale(1)" }}
                to={{ transform: "scale(1.03)" }}
                config={{ tension: 300, friction: 18 }}
                className={`grid h-24 place-items-center rounded-pill text-3xl font-medium sm:h-40 sm:text-4xl ${surfaceByVariant[word.variant]}`}
              >
                {word.isArrow ? (
                  <ArrowRightIcon aria-hidden className="text-4xl sm:text-5xl" />
                ) : (
                  <span>{word.label}</span>
                )}
              </Hover>
            </Inview>
          </li>
        ))}
      </ul>
    </section>
  );
};
