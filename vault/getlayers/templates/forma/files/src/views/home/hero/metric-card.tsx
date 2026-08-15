import { Card } from "@/components/ui/card";
import { RingDot } from "@/components/ui/ring-dot";

import { WordsIn } from "./animated-text";
import { IntroMeter } from "./intro-meter";

export interface MetricCardProps {
  title: string;
  label: string;
  value: string;
  /** Filled share of the meter, 0–1. */
  progress: number;
  /** Delay (ms) for the card's own text reveals. */
  delay?: number;
  className?: string;
}

/** Bottom-row card: a single headline metric over a gradient meter. */
export const MetricCard = ({
  title,
  label,
  value,
  progress,
  delay = 0,
  className = "",
}: MetricCardProps) => (
  <Card
    className={`flex flex-col bg-surface-raised p-[1.1875rem] ${className}`}
  >
    <div className="flex shrink-0 items-center justify-between">
      <WordsIn tag="h2" className="text-heading leading-display" delay={delay}>
        {title}
      </WordsIn>
      <RingDot className="text-accent" />
    </div>

    <hr className="mt-[0.875rem] shrink-0 border-t border-border-subtle" />

    <div className="mt-[1.6875rem] flex shrink-0 items-center justify-between text-body leading-copy">
      <WordsIn tag="span" delay={delay + 120}>
        {label}
      </WordsIn>
      <WordsIn tag="span" delay={delay + 180}>
        {value}
      </WordsIn>
    </div>

    <IntroMeter value={progress} label={label} className="mt-[0.75rem]" />
  </Card>
);
