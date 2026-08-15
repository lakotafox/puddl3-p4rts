/**
 * The 3D pointer that replaces the native cursor.
 *
 * A second, very small WebGL context (64 CSS px square) rather than a corner of
 * the main scene's canvas: the cursor has to sit above every other layer
 * including the controls panel, and it has to follow the pointer with no lag,
 * which means moving a DOM element — not a mesh inside a full-screen canvas.
 *
 * An **orthographic** camera, because a cursor under perspective distorts as it
 * turns and stops reading as a flat pointer.
 *
 * `cursor.glb` carries both variants as sibling nodes, `normal` and `hover`.
 * Only the normal one spins — `hover` is held at a fixed three-quarter attitude
 * instead, so it still reads as a solid object rather than a flat icon.
 *
 * 📖 Docs: obsidian/frontend/components/common.md
 */

import {
  AmbientLight,
  Box3,
  DirectionalLight,
  Group,
  Object3D,
  OrthographicCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { subscribeToTicker } from "@/lib/animation/ticker";
import { useCursorSettings, type CursorAngles } from "@/lib/cursor-settings";
import { DRACO_DECODER_PATH } from "@/lib/scene/chess-defaults";

export const CURSOR_MODEL_URL = "/t/voxelia/assets/cursor.glb";
/**
 * Canvas edge in CSS pixels. Square, because the model sweeps as it turns.
 *
 * The hotspot is stored as a *fraction* of this, so growing the cursor does not
 * need the offset re-measured.
 */
export const CURSOR_CANVAS_SIZE = 104;

/** Fraction of the viewport height the model occupies — leaves room for the sweep. */
const MODEL_FIT = 0.62;
/** Lean, in radians. A real pointer is tilted; a vertical one reads as an arrow icon. */
const TILT = 0.32;
/** Turns per second about the model's own axis. */
const SPIN = 0.45;
/**
 * The hover variant's attitude lives in `lib/cursor-settings.ts`, not here.
 *
 * `pitch` and `yaw` turn the hand *toward* the camera — at zero it sits nearly
 * edge-on, covering barely a fifth of the pixels it does at the default pair.
 * `roll` is the screen-plane rotation and is applied on a group **outside**
 * those two: Euler order is XYZ, so as the third component of the same
 * `rotation` it would turn about an axis that no longer faces the camera, and
 * winding it produces almost no visible change (−0.8 and −1.15 render nearly
 * identically). On its own group it is a true screen roll and composes with
 * `TILT`.
 */

export interface CursorSceneHandle {
  setHovered: (hovered: boolean) => void;
  dispose: () => void;
}

/** Recentre a loaded variant on its own bounding box and normalise its height. */
const fit = (variant: Object3D): void => {
  const box = new Box3().setFromObject(variant);
  const centre = box.getCenter(new Vector3());
  const size = box.getSize(new Vector3());

  variant.position.sub(centre);
  const height = size.y || 1;
  variant.scale.multiplyScalar(MODEL_FIT / height);
};

const disposeTree = (root: Object3D): void => {
  root.traverse((child) => {
    const mesh = child as { geometry?: { dispose: () => void }; material?: unknown };
    mesh.geometry?.dispose();
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    materials.forEach((material) => {
      (material as { dispose?: () => void } | undefined)?.dispose?.();
    });
  });
};

export const createCursorScene = async (
  canvas: HTMLCanvasElement,
  reducedMotion: boolean,
): Promise<CursorSceneHandle> => {
  const draco = new DRACOLoader().setDecoderPath(DRACO_DECODER_PATH);
  const loader = new GLTFLoader().setDRACOLoader(draco);

  let gltf;
  try {
    gltf = await loader.loadAsync(CURSOR_MODEL_URL);
  } finally {
    draco.dispose();
  }

  const normal = gltf.scene.getObjectByName("normal");
  const hover = gltf.scene.getObjectByName("hover");
  if (!normal || !hover) throw new Error("cursor.glb is missing a normal/hover node");

  fit(normal);
  fit(hover);
  hover.visible = false;
  const hoverRoll = new Group();
  hoverRoll.add(hover);

  const applyAngles = ({ pitch, yaw, roll }: CursorAngles): void => {
    hover.rotation.set(pitch, yaw, 0);
    hoverRoll.rotation.z = roll;
  };
  applyAngles(useCursorSettings.getState());

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(CURSOR_CANVAS_SIZE, CURSOR_CANVAS_SIZE, false);

  const scene = new Scene();
  const camera = new OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.01, 10);
  camera.position.z = 4;

  scene.add(new AmbientLight(0xffffff, 1.6));
  const keyLight = new DirectionalLight(0xffffff, 2.6);
  keyLight.position.set(1.4, 2, 3);
  scene.add(keyLight);

  // Outer group holds the lean; the inner one turns inside it, so the spin is
  // about the model's own (already-leaned) axis rather than the world vertical.
  const lean = new Group();
  const spin = new Group();
  spin.add(normal, hoverRoll);
  lean.add(spin);
  lean.rotation.z = TILT;
  scene.add(lean);

  let hovered = false;

  const render = (): void => renderer.render(scene, camera);
  render();

  // The hover pointer is static, so nothing would redraw it while an angle is
  // being dragged — the panel's change has to push a frame itself.
  const unsubscribeAngles = useCursorSettings.subscribe((state) => {
    applyAngles(state);
    if (hovered) render();
  });

  const unsubscribe = reducedMotion
    ? null
    : subscribeToTicker((time) => {
        // `hover` is intentionally static — only the normal pointer turns.
        spin.rotation.y = hovered ? 0 : time * 0.001 * SPIN * Math.PI * 2;
        render();
      }, () => 0);

  return {
    setHovered: (next) => {
      if (next === hovered) return;
      hovered = next;
      normal.visible = !next;
      hover.visible = next;
      if (next) spin.rotation.y = 0;
      render();
    },

    dispose: () => {
      unsubscribe?.();
      unsubscribeAngles();
      disposeTree(gltf.scene);
      renderer.dispose();
    },
  };
};
