import code from '@content/Backgrounds/SunShafts/SunShafts.jsx?raw';
import css from '@content/Backgrounds/SunShafts/SunShafts.css?raw';
import tailwind from '@tailwind/Backgrounds/SunShafts/SunShafts.jsx?raw';
import tsCode from '@ts-default/Backgrounds/SunShafts/SunShafts.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/SunShafts/SunShafts.tsx?raw';

export const sunShafts = {
  dependencies: `ogl`,
  usage: `import SunShafts from './SunShafts';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <SunShafts
    raysOrigin="top-center"
    raysColor="#00ffff"
    raysSpeed={1.5}
    lightSpread={0.8}
    rayLength={1.2}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0.1}
    distortion={0.05}
    className="custom-rays"
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
