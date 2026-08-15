import code from '@content/Backgrounds/RainbowDrift/RainbowDrift.jsx?raw';
import css from '@content/Backgrounds/RainbowDrift/RainbowDrift.css?raw';
import tailwind from '@tailwind/Backgrounds/RainbowDrift/RainbowDrift.jsx?raw';
import tsCode from '@ts-default/Backgrounds/RainbowDrift/RainbowDrift.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/RainbowDrift/RainbowDrift.tsx?raw';

export const rainbowDrift = {
  dependencies: `three`,
  usage: `import RainbowDrift from './RainbowDrift';
  
<RainbowDrift
  colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
  rotation={90}
  speed={0.2}
  scale={1}
  frequency={1}
  warpStrength={1}
  mouseInfluence={1}
  noise={0.15}
  parallax={0.5}
  iterations={1}
  intensity={1.5}
  bandWidth={6}
  transparent
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
