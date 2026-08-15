import code from '@content/Backgrounds/RetroFlurry/RetroFlurry.jsx?raw';
import css from '@content/Backgrounds/RetroFlurry/RetroFlurry.css?raw';
import tailwind from '@tailwind/Backgrounds/RetroFlurry/RetroFlurry.jsx?raw';
import tsCode from '@ts-default/Backgrounds/RetroFlurry/RetroFlurry.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/RetroFlurry/RetroFlurry.tsx?raw';

export const retroFlurry = {
  dependencies: `three`,
  usage: `import RetroFlurry from './RetroFlurry';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <RetroFlurry 
    color="#ffffff"
    flakeSize={0.01}
    minFlakeSize={1.25}
    pixelResolution={200}
    speed={1.25}
    density={0.3}
    direction={125}
    brightness={1}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
