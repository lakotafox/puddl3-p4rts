// Placeholder content for the product explainer section. Original copy — swap for
// real product messaging (and a real card image) when available.
export interface ProductContent {
  labelId: string;
  heading: string;
  cta: string;
  description: string;
  cards: {
    grow: { title: string; body: string };
    liquid: { title: string; body: string };
    hands: { title: string; body: string };
  };
}

export const productContent: ProductContent = {
  labelId: "product-title",
  heading: "What is PUDDL3?",
  cta: "Explore now",
  description:
    "PUDDL3 is a real-time wage stream that pays you as you work — accruing second-by-second while staying liquid and yours to cash out.",
  cards: {
    grow: {
      title: "Pay that never pauses",
      body: "Your earnings tick up automatically from the first minute of every shift you work.",
    },
    liquid: {
      title: "Always liquid, always yours",
      body: "Cash out the moment you need it — fully earned, with no paydays or waiting.",
    },
    hands: {
      title: "It just works",
      body: "Nothing to manage. PUDDL3 syncs payroll in the background — zero cost to employers.",
    },
  },
};
