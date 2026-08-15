/**
 * Placeholder copy for the home experience — mirrors the static text in the
 * source `index.html`. Passed into the view via props; never imported directly
 * into a component (see component-conventions.md → Data rules).
 */

export interface ExperienceButton {
  label: string;
  /** Primary buttons render the circular arrow glyph; secondary do not. */
  withArrow: boolean;
}

export interface ExperienceCopy {
  eyebrow: string;
  /** Heading split into lines — each entry was a `<br>`-separated row. */
  titleLines: string[];
  subtitle: string;
  buttons: ExperienceButton[];
}

export interface StatCardContent {
  id: string;
  title: string;
  stat: string;
  description: string;
}

export interface HomeContent {
  hero: ExperienceCopy;
  cards: StatCardContent[];
  wave: ExperienceCopy;
  galaxy: ExperienceCopy;
}

export const homeContent: HomeContent = {
  hero: {
    eyebrow: "Payday, every second",
    titleLines: [
      "Wages that stream while",
      "you're still on the clock",
    ],
    subtitle:
      "PUDDL3 streams your pay second by second into a balance you can cash out any hour, any day — because money should move like you do.",
    buttons: [
      { label: "Start streaming", withArrow: true },
      { label: "See how it works", withArrow: false },
    ],
  },
  cards: [
    {
      id: "deployment",
      title: "Wages streamed",
      stat: "$4.2B+",
      description:
        "Streamed to workers in real time, second by second — in plain sight, no mystery.",
    },
    {
      id: "teams",
      title: "Workers paid live",
      stat: "310K+",
      description:
        "Clocking in across 40 states and watching their earnings tick up mid-shift.",
    },
    {
      id: "efficiency",
      title: "Cost to your employer",
      stat: "$0",
      description:
        "Zero cost to employers. Payroll runs exactly as before — it just works.",
    },
  ],
  wave: {
    eyebrow: "No paydays. No waiting.",
    titleLines: ["Every minute you work lands", "in your balance — live"],
    subtitle:
      "You clocked in at 6:04 AM. By first break you've already earned real money — yours to cash out mid-shift, any hour, any day, without asking anyone.",
    buttons: [
      { label: "Get paid in real time", withArrow: true },
      { label: "Watch a live demo", withArrow: false },
    ],
  },
  galaxy: {
    eyebrow: "The PUDDL3 ecosystem",
    titleLines: ["A payroll that never sleeps —", "already streaming"],
    subtitle:
      "PUDDL3 isn't one more payroll tool. It's a live stream of earned wages with you at the centre — employers, banks, and timecards orbiting in sync around you.",
    buttons: [
      { label: "Explore the ecosystem", withArrow: true },
      { label: "View integrations", withArrow: false },
    ],
  },
};
