"use client";

import { Meter } from "@/components/ui/meter";
import { useIntro } from "@/hooks/intro/use-intro";

export interface IntroMeterProps {
  value: number;
  label: string;
  className?: string;
}

/**
 * Feature glue: holds the meter empty until the preloader lifts, then lets it
 * fill. Keeps the store subscription out of both the generic `<Meter>` and the
 * server-rendered card.
 */
export const IntroMeter = ({ value, label, className }: IntroMeterProps) => {
  const hasEntered = useIntro((state) => state.hasEntered);

  return (
    <Meter
      value={value}
      label={label}
      play={hasEntered}
      className={className}
    />
  );
};
