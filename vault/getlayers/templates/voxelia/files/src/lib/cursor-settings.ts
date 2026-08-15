/**
 * Attitude of the 3D cursor's hover variant.
 *
 * The values below were dialled in by hand against the live render through a
 * temporary slider panel, which has since been removed — so they are a chosen
 * composition, not a derivation. Do not "tidy" them: the trailing digits are an
 * artefact of the slider's step grid, and the angles are far enough from the
 * obvious round numbers that guessing a replacement will not land in the same
 * place.
 *
 * Still a store rather than three constants, because that is what let the
 * panel exist at all and what would let one exist again — the hover pointer is
 * only on screen *while* something interactive is under the cursor, so it can
 * only be tuned by watching it change under your hand, never by reloading.
 *
 * Read with `getState()` inside the render loop, never a selector: the cursor
 * canvas is not a React tree.
 *
 * 📖 Docs: obsidian/frontend/components/common.md
 */

import { create } from "zustand";

export interface CursorAngles {
  /** Turns the hand toward the camera. At 0 the model is nearly edge-on. */
  pitch: number;
  yaw: number;
  /** Screen-plane rotation. Applied on a group outside the other two. */
  roll: number;
}

export const DEFAULT_CURSOR_ANGLES: CursorAngles = {
  pitch: -2.25159265358979,
  yaw: -1.97159265358979,
  roll: -2.19159265358979,
};

interface CursorSettingsStore extends CursorAngles {
  set: <K extends keyof CursorAngles>(key: K, value: CursorAngles[K]) => void;
  reset: () => void;
}

export const useCursorSettings = create<CursorSettingsStore>()((set) => ({
  ...DEFAULT_CURSOR_ANGLES,
  set: (key, value) => set({ [key]: value } as Pick<CursorAngles, typeof key>),
  reset: () => set({ ...DEFAULT_CURSOR_ANGLES }),
}));
