import code from '@content/TextAnimations/OrigamiType/OrigamiType.jsx?raw';
import css from '@content/TextAnimations/OrigamiType/OrigamiType.css?raw';
import tailwind from '@tailwind/TextAnimations/OrigamiType/OrigamiType.jsx?raw';
import tsCode from '@ts-default/TextAnimations/OrigamiType/OrigamiType.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/OrigamiType/OrigamiType.tsx?raw';

export const origamiType = {
  dependencies: `gsap`,
  usage: `import OrigamiType from './OrigamiType';

<OrigamiType
  text="Launch with clarity"
  splitBy="char"
  hinge="top"
  trigger="scroll"
  duration={0.65}
  stagger={0.045}
  ease="power3.out"
  perspective={700}
  creaseShading={0.55}
  fontSize="clamp(3rem, 10vw, 7rem)"
  fontWeight={800}
  color="#f7f2e8"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
