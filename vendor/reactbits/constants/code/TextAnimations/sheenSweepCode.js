import code from '@content/TextAnimations/SheenSweep/SheenSweep.jsx?raw';
import css from '@content/TextAnimations/SheenSweep/SheenSweep.css?raw';
import tailwind from '@tailwind/TextAnimations/SheenSweep/SheenSweep.jsx?raw';
import tsCode from '@ts-default/TextAnimations/SheenSweep/SheenSweep.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/SheenSweep/SheenSweep.tsx?raw';

export const sheenSweep = {
  dependencies: `motion`,
  usage: `import SheenSweep from './SheenSweep';

<SheenSweep
  text="✨ Shiny Text Effect"
  speed={2}
  delay={0}
  color="#b5b5b5"
  shineColor="#ffffff"
  spread={120}
  direction="left"
  yoyo={false}
  pauseOnHover={false}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
