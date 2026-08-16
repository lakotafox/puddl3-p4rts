import code from '@content/Backgrounds/BorealisGlow/BorealisGlow.jsx?raw';
import css from '@content/Backgrounds/BorealisGlow/BorealisGlow.css?raw';
import tailwind from '@tailwind/Backgrounds/BorealisGlow/BorealisGlow.jsx?raw';
import tsCode from '@ts-default/Backgrounds/BorealisGlow/BorealisGlow.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/BorealisGlow/BorealisGlow.tsx?raw';

export const borealisGlow = {
  dependencies: `ogl`,
  usage: `import BorealisGlow from './BorealisGlow';
  
<BorealisGlow
  speed={0.6}
  scale={1.5}
  brightness={1.0}
  color1="#f7f7f7"
  color2="#e100ff"
  noiseFrequency={2.5}
  noiseAmplitude={1.0}
  bandHeight={0.5}
  bandSpread={1.0}
  octaveDecay={0.1}
  layerOffset={0}
  colorSpeed={1.0}
  enableMouseInteraction={true}
  mouseInfluence={0.25}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
