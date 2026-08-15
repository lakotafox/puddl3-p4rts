import { create } from "zustand";

/**
 * Coordinates the intro preloader with the hero reveal: the `<Preloader>` flips
 * `revealed` true as it starts leaving, and the hero holds every entrance
 * animation until then (so nothing plays behind the loader).
 */
interface PreloaderState {
  revealed: boolean;
  reveal: () => void;
}

export const usePreloader = create<PreloaderState>((set) => ({
  revealed: false,
  reveal: () => set({ revealed: true }),
}));
