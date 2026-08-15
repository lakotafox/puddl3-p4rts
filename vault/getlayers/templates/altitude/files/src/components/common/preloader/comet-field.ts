// 📖 Docs: obsidian/frontend/animation-system.md

import type { Rgb01 } from "@/utils/color";

interface Comet {
  /** Head position, in CSS pixels. */
  x: number;
  y: number;
  /** Pixels per second. */
  speed: number;
  /** Tail length in pixels. */
  length: number;
  width: number;
  alpha: number;
}

/**
 * Direction of travel — down and to the **left**, matching the meteors in the
 * hero video, which enter high on the right and fall away to the lower left.
 */
const ANGLE = Math.PI * 0.28;
const DIRECTION_X = -Math.cos(ANGLE);
const DIRECTION_Y = Math.sin(ANGLE);

const random = (min: number, max: number) => min + Math.random() * (max - min);

export interface CometField {
  resize(): void;
  draw(deltaSeconds: number): void;
}

/**
 * A drifting field of comets on a 2D canvas.
 *
 * Not spring-driven, and deliberately so: this is ambient scenery with no
 * interaction to respond to, the same category as the hero's fluid solver
 * (ADR-0017). It runs off the shared ticker like everything else, and the
 * caller owns the loop.
 *
 * Each comet is a tapered gradient streak with a bright head; when one leaves
 * the frame it re-enters from the opposite side with fresh randomised values, so
 * the field never visibly loops.
 */
export const createCometField = (
  canvas: HTMLCanvasElement,
  colour: Rgb01,
  count = 14,
): CometField | null => {
  const context = canvas.getContext("2d");
  if (!context) return null;

  const [r, g, b] = colour.map((channel) => Math.round(channel * 255));
  const comets: Comet[] = [];

  const spawn = (comet: Comet, initial: boolean): void => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Travelling down-left, so fresh comets are seeded above the frame and off
    // to the right — the band they drift in from. Spreading the entry across
    // `width + a slice of height` keeps the field even instead of raining out of
    // one corner.
    comet.x = initial
      ? random(0, width)
      : random(0, width + height * Math.abs(DIRECTION_X));
    comet.y = initial ? random(0, height) : -random(0.05, 0.7) * height;
    comet.speed = random(260, 620);
    comet.length = random(90, 320);
    comet.width = random(0.6, 1.6);
    comet.alpha = random(0.25, 0.9);
  };

  for (let i = 0; i < count; i++) {
    const comet: Comet = { x: 0, y: 0, speed: 0, length: 0, width: 0, alpha: 0 };
    spawn(comet, true);
    comets.push(comet);
  }

  const resize = (): void => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
    const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
    if (canvas.width === width && canvas.height === height) return;

    canvas.width = width;
    canvas.height = height;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const draw = (deltaSeconds: number): void => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    context.clearRect(0, 0, width, height);
    context.lineCap = "round";

    for (const comet of comets) {
      comet.x += DIRECTION_X * comet.speed * deltaSeconds;
      comet.y += DIRECTION_Y * comet.speed * deltaSeconds;

      const tailX = comet.x - DIRECTION_X * comet.length;
      const tailY = comet.y - DIRECTION_Y * comet.length;

      const gradient = context.createLinearGradient(tailX, tailY, comet.x, comet.y);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${comet.alpha})`);

      context.strokeStyle = gradient;
      context.lineWidth = comet.width;
      context.beginPath();
      context.moveTo(tailX, tailY);
      context.lineTo(comet.x, comet.y);
      context.stroke();

      // The tail trails up and to the right of the head, so the comet is only
      // fully gone once the *tail* has cleared the left or bottom edge.
      if (tailX < 0 || tailY > height) spawn(comet, false);
    }
  };

  resize();

  return { resize, draw };
};
