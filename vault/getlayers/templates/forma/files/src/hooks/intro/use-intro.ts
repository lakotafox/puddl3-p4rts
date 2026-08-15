// 📖 Docs: obsidian/frontend/hooks.md

import { create } from "zustand";

export interface UseIntro {
  /**
   * True once the preloader has finished and uncovered the page. Every hero
   * reveal gates on this, so the whole entrance starts from one flag rather
   * than each component guessing a delay.
   */
  hasEntered: boolean;
  enter: () => void;
}

export const useIntro = create<UseIntro>((set) => ({
  hasEntered: false,
  enter: () => set({ hasEntered: true }),
}));
