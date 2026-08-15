import { Card } from "@/components/ui/card";
import { RingDot } from "@/components/ui/ring-dot";

import { WordsIn } from "./animated-text";

export interface CopyCardProps {
  title: string;
  body: string;
  /** Delay (ms) for the card's own text reveals. */
  delay?: number;
  className?: string;
}

/** Bottom-row card: a short positioning statement. */
export const CopyCard = ({
  title,
  body,
  delay = 0,
  className = "",
}: CopyCardProps) => (
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

    <WordsIn
      tag="p"
      className="mt-[1.875rem] w-[15.875rem] text-small leading-copy"
      delay={delay + 120}
    >
      {body}
    </WordsIn>
  </Card>
);
