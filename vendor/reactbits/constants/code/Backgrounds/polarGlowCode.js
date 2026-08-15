import code from '@content/Backgrounds/PolarGlow/PolarGlow.jsx?raw';
import css from '@content/Backgrounds/PolarGlow/PolarGlow.css?raw';
import tailwind from '@tailwind/Backgrounds/PolarGlow/PolarGlow.jsx?raw';
import tsCode from '@ts-default/Backgrounds/PolarGlow/PolarGlow.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/PolarGlow/PolarGlow.tsx?raw';

export const polarGlow = {
  dependencies: `ogl`,
  usage: `import PolarGlow from './PolarGlow';
  
<PolarGlow
  colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
