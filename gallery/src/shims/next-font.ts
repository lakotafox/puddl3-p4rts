// every next/font/google export is a function returning a font object
const font = () => ({ className: "", variable: "", style: { fontFamily: "inherit" } });
export default new Proxy({}, { get: () => font });
// named exports (Inter, Geist, ...) resolve through the same proxy at runtime
// via import-namespace access; for direct named imports vite needs real names:
export const Inter = font, Geist = font, Geist_Mono = font, Manrope = font,
  Space_Grotesk = font, Instrument_Serif = font, IBM_Plex_Mono = font,
  Bricolage_Grotesque = font, Syne = font, Sora = font, Outfit = font,
  Archivo = font, Inter_Tight = font, JetBrains_Mono = font, DM_Sans = font,
  Playfair_Display = font, Cormorant_Garamond = font, Unbounded = font;
export const localFont = font;
