/**
 * Small client-side UI stores (zustand) shared across the page.
 *
 * - useRequestModal — the "Start streaming" request modal open/close state.
 * - useNavMenu      — the full-screen navigation overlay open/close state.
 * - useIntro        — the intro gate: flipped to `ready` once the page loader
 *   finishes its exit, so above-the-fold reveal animations wait for it.
 */
import { create } from "zustand";

export interface RequestModalState {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useRequestModal = create<RequestModalState>((set) => ({
  open: false,
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),
}));

export interface NavMenuState {
  open: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

export const useNavMenu = create<NavMenuState>((set) => ({
  open: false,
  openMenu: () => set({ open: true }),
  closeMenu: () => set({ open: false }),
  toggleMenu: () => set((state) => ({ open: !state.open })),
}));

export interface IntroState {
  /** True once the loader has fully left the screen. */
  ready: boolean;
  setReady: (ready: boolean) => void;
}

export const useIntro = create<IntroState>((set) => ({
  ready: false,
  setReady: (ready) => set({ ready }),
}));
