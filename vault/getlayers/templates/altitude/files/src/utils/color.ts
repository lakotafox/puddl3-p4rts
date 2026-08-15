// 📖 Docs: obsidian/frontend/utils.md

/** An RGB colour with each channel normalised to 0–1 — the form WebGL wants. */
export type Rgb01 = readonly [number, number, number];

const FALLBACK: Rgb01 = [1, 1, 1];

/**
 * Parse a CSS hex colour (`#rgb` or `#rrggbb`) into 0–1 RGB channels.
 *
 * Exists so design tokens stay the single source of truth for colour even when
 * the consumer is a shader uniform rather than a class name: read the token with
 * `getComputedStyle`, pipe it through here, upload it to the GPU.
 *
 * Returns white for anything unparseable — a shader must never receive `NaN`.
 */
export const hexToRgb01 = (hex: string): Rgb01 => {
  const value = hex.trim().replace("#", "");

  const expanded =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value;

  if (!/^[0-9a-f]{6}$/i.test(expanded)) return FALLBACK;

  const int = parseInt(expanded, 16);

  return [
    ((int >> 16) & 255) / 255,
    ((int >> 8) & 255) / 255,
    (int & 255) / 255,
  ];
};

/**
 * Read a CSS custom property off an element (defaults to `:root`) and return it
 * as 0–1 RGB channels.
 */
export const readColorToken = (
  token: string,
  element?: HTMLElement | null,
): Rgb01 => {
  if (typeof window === "undefined") return FALLBACK;

  const target = element ?? document.documentElement;
  const raw = getComputedStyle(target).getPropertyValue(token);

  return hexToRgb01(raw);
};
