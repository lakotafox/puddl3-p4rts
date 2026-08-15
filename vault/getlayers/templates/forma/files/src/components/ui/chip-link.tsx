// 📖 Docs: obsidian/frontend/components/ui.md
import Link from "next/link";

import { RingDot } from "./ring-dot";

export interface ChipLinkProps {
  href: string;
  label: string;
  className?: string;
}

/**
 * Pill-shaped link with a leading marker dot. Figma node 706:489.
 *
 * Hover inverts it — the white pill goes to the accent and the label with it.
 * That reads on the dark card the two arrow controls sit on, where a plain
 * opacity change would barely register.
 */
export const ChipLink = ({ href, label, className = "" }: ChipLinkProps) => (
  <Link
    href={href}
    className={`group flex shrink-0 items-center justify-center gap-[0.5rem] rounded-chip bg-surface-raised px-[1rem] py-[0.625rem] text-small leading-copy text-foreground transition-colors duration-[var(--duration-normal)] ease-entrance hover:bg-accent hover:text-foreground-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground-inverse ${className}`}
  >
    <RingDot className="text-accent transition-colors duration-[var(--duration-normal)] ease-entrance group-hover:text-foreground-inverse" />
    {label}
  </Link>
);
