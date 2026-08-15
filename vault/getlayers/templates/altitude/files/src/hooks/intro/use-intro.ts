// 📖 Docs: obsidian/frontend/animation-system.md

import { create } from "zustand";

interface IntroState {
  /** True once the preloader has finished counting and begun revealing the page. */
  isComplete: boolean;
  complete: () => void;
}

/**
 * The gate between the preloader and the hero's entrance animations.
 *
 * Everything in the hero stays mounted the whole time — the copy is in the DOM
 * for crawlers from the first paint — and simply holds its "out" state until
 * this flips. `<Spring enabled>` and `<TextEngine enabled>` both take it
 * directly, so nothing needs to be conditionally rendered.
 *
 * It flips when the counter reaches 100, *not* when the overlay finishes
 * clearing, so the hero animates in through the opening rather than after it.
 */
export const useIntro = create<IntroState>((set) => ({
  isComplete: false,
  complete: () => set({ isComplete: true }),
}));
