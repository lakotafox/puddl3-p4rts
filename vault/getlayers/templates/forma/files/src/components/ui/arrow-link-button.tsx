// 📖 Docs: obsidian/frontend/components/ui.md
import Link from "next/link";

export interface ArrowLinkButtonProps {
  href: string;
  /** Accessible name — the control is icon-only. */
  label: string;
  className?: string;
}

/**
 * Icon-only circular link with a hairline ring, for use on dark surfaces.
 * Ring and arrow inherit the inverse palette. Figma node 706:471.
 *
 * Hover fills the disc with the inverse colour and flips the arrow dark — the
 * same "flood on hover" language as the submit control, so the two read as one
 * family. Colour and opacity only, on token-backed timing (ADR-0014).
 */
export const ArrowLinkButton = ({
  href,
  label,
  className = "",
}: ArrowLinkButtonProps) => (
  <Link
    href={href}
    aria-label={label}
    className={`group block size-[2.25rem] shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground-inverse ${className}`}
  >
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className="size-full"
    >
      <circle cx="18" cy="18" r="17.5" stroke="var(--border-inverse-subtle)" />
      <circle
        cx="18"
        cy="18"
        r="17.5"
        fill="var(--foreground-inverse)"
        className="opacity-0 transition-opacity duration-[var(--duration-normal)] ease-entrance group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <path
        d="M23.3536 18.3536C23.5488 18.1583 23.5488 17.8417 23.3536 17.6464L20.1716 14.4645C19.9763 14.2692 19.6597 14.2692 19.4645 14.4645C19.2692 14.6597 19.2692 14.9763 19.4645 15.1716L22.2929 18L19.4645 20.8284C19.2692 21.0237 19.2692 21.3403 19.4645 21.5355C19.6597 21.7308 19.9763 21.7308 20.1716 21.5355L23.3536 18.3536ZM13 18V18.5H23V18V17.5H13V18Z"
        fill="var(--foreground-inverse)"
        className="transition-[fill] duration-[var(--duration-normal)] ease-entrance group-hover:[fill:var(--foreground)] group-focus-visible:[fill:var(--foreground)]"
      />
    </svg>
  </Link>
);
