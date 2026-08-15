/**
 * Loads the display face for `ImageResponse` (Satori) in the generated icon and
 * social-card routes.
 *
 * Resolved through `import.meta.url` rather than `path.join(process.cwd(), …)`:
 * the bundler can follow a static URL and trace the font into the build, while a
 * `cwd()` join is opaque to it and produces a warning plus a file that only
 * happens to be there because the server runs from the project root.
 *
 * Server-only — it reads from disk. Keep it out of anything a client component
 * imports.
 *
 * 📖 Docs: obsidian/frontend/seo-metadata.md
 */
import { readFile } from "node:fs/promises";

export const DISPLAY_FONT_NAME = "Gilda Display";

export const loadDisplayFont = () =>
  readFile(new URL("../app/fonts/GildaDisplay-Regular.ttf", import.meta.url));
