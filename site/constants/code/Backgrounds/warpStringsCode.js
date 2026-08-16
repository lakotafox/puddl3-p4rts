import code from '@content/Backgrounds/WarpStrings/WarpStrings.jsx?raw';
import css from '@content/Backgrounds/WarpStrings/WarpStrings.css?raw';
import tailwind from '@tailwind/Backgrounds/WarpStrings/WarpStrings.jsx?raw';
import tsCode from '@ts-default/Backgrounds/WarpStrings/WarpStrings.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/WarpStrings/WarpStrings.tsx?raw';

export const warpStrings = {
  dependencies: `ogl`,
  usage: `import WarpStrings from './WarpStrings';
  
<WarpStrings
  speed={0.3}
  innerLineCount={32}
  outerLineCount={36}
  warpIntensity={1.0}
  rotation={-45}
  edgeFadeWidth={0.0}
  colorCycleSpeed={1.0}
  brightness={0.2}
  color1="#ffffff"
  color2="#ffffff"
  color3="#ffffff"
  enableMouseInteraction={true}
  mouseInfluence={2.0}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
