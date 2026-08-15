import type { HeroContent } from "@/types/home";

// PUDDL3 hero copy — real-time wage streaming ("Payday, every second").
// Swap for real content / CMS data when available.
export const heroContent: HeroContent = {
  brand: "PUDDL3",
  navLinks: [
    { label: "Streaming", href: "#services" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Results", href: "#results" },
    { label: "Contacts", href: "#contacts" },
  ],
  headerCta: { label: "Start streaming", href: "#get-your-card" },
  title: { lead: "Payday, every", trail: "second" },
  description: [
    "Your wages accrue second by second —",
    "cash out any hour, any day, mid-shift.",
  ],
  features: ["No paydays. No waiting.", "Zero cost to employers"],
  ctas: [
    { label: "Start streaming", href: "#get-your-card", variant: "primary" },
    { label: "How it works", href: "#how-it-works", variant: "ghost" },
  ],
  outro: { lead: "The end of", trail: "the two-week wait" },
  card: { src: "/t/lumen/assets/card.png", alt: "PUDDL3 cash-out card" },
};
