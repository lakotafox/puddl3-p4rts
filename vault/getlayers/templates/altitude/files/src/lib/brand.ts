/**
 * Brand colours for the places that cannot read CSS custom properties: the
 * generated social images (`opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx`),
 * the web manifest, and the browser theme colour.
 *
 * Those run outside the document — Satori renders them on the server with no
 * stylesheet, so `var(--action-gradient)` means nothing there. Keep these values
 * in step with the Tier 1 primitives in `src/app/globals.css`.
 *
 * 📖 Docs: obsidian/frontend/design-system.md · obsidian/frontend/seo-metadata.md
 */

export const brandPalette = {
  /** The night sky behind the hero — browser chrome and social-card ground. */
  ink: "#050b16",
  onMedia: "#ffffff",
  /** The submit button's gradient stops. */
  actionFrom: "#ffe5ac",
  actionTo: "#97bdde",
  actionForeground: "#000000",
} as const;

/** The submit-button gradient, as a CSS value both Satori and the browser read. */
export const brandGradient = `linear-gradient(104.458deg, ${brandPalette.actionFrom} 10.028%, ${brandPalette.actionTo} 100%)`;
