import code from '@content/Backgrounds/StormBolts/StormBolts.jsx?raw';
import css from '@content/Backgrounds/StormBolts/StormBolts.css?raw';
import tailwind from '@tailwind/Backgrounds/StormBolts/StormBolts.jsx?raw';
import tsCode from '@ts-default/Backgrounds/StormBolts/StormBolts.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/StormBolts/StormBolts.tsx?raw';

export const stormBolts = {
  usage: `import StormBolts from './StormBolts';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <StormBolts
    hue={220}
    xOffset={0}
    speed={1}
    intensity={1}
    size={1}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
