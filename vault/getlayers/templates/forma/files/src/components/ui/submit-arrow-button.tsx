// 📖 Docs: obsidian/frontend/components/ui.md
export interface SubmitArrowButtonProps {
  /** Accessible name — the control is icon-only. */
  label: string;
  className?: string;
}

/**
 * Icon-only submit control: a 2px gradient ring around the page background,
 * with a north-east arrow. Figma node 706:474.
 *
 * On hover the ring's gradient floods the whole button and the arrow inverts —
 * the inner disc simply fades out, so the gradient behind it is revealed rather
 * than redrawn. Colour and opacity only, on token-backed timing (ADR-0014).
 */
export const SubmitArrowButton = ({
  label,
  className = "",
}: SubmitArrowButtonProps) => (
  <button
    type="submit"
    aria-label={label}
    // `block`, not the default inline-block: inside a block wrapper an
    // inline-block sits on a text baseline, and the line box adds ~6px of
    // descender space under it — which quietly made the form 63px tall
    // instead of the design's 57.
    className={`group block size-[3.5625rem] shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
  >
    <svg
      viewBox="0 0 57 57"
      fill="none"
      aria-hidden="true"
      className="size-full"
    >
      <circle cx="28.5" cy="28.5" r="28.5" fill="url(#forma-submit-ring)" />
      <circle
        cx="28.5"
        cy="28.5"
        r="26.5"
        fill="var(--background)"
        className="transition-opacity duration-[var(--duration-normal)] ease-entrance group-hover:opacity-0 group-focus-visible:opacity-0"
      />
      <path
        d="M37.249 20V37H35.749V21.8711L20.0566 37.5645L18.9961 36.5039L33.999 21.5H19.2725V20H37.249Z"
        fill="var(--foreground-strong)"
        className="transition-[fill] duration-[var(--duration-normal)] ease-entrance group-hover:[fill:var(--foreground-inverse)] group-focus-visible:[fill:var(--foreground-inverse)]"
      />
      <defs>
        <linearGradient
          id="forma-submit-ring"
          x1="0"
          y1="28.5"
          x2="57"
          y2="28.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--accent-ring-from)" />
          <stop offset="1" stopColor="var(--accent-ring-to)" />
        </linearGradient>
      </defs>
    </svg>
  </button>
);
