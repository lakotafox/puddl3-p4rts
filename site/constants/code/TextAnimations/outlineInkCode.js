import code from '@content/TextAnimations/OutlineInk/OutlineInk.jsx?raw';
import css from '@content/TextAnimations/OutlineInk/OutlineInk.css?raw';
import tailwind from '@tailwind/TextAnimations/OutlineInk/OutlineInk.jsx?raw';
import tsCode from '@ts-default/TextAnimations/OutlineInk/OutlineInk.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/OutlineInk/OutlineInk.tsx?raw';

export const outlineInk = {
  dependencies: `gsap`,
  usage: `import OutlineInk from './OutlineInk';

<OutlineInk
  text="Draw Attention"
  strokeColor="#A78BFA"
  fillColor="#F8FAFC"
  strokeWidth={1.4}
  drawDuration={1.6}
  fillDelay={0.2}
  stagger={0.05}
  ease="power2.out"
  trigger="mount"
  fillMode="wipe"
  fontSize={128}
  fontWeight={800}
  letterSpacing={-4}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
