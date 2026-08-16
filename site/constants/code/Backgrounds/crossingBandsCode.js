import code from '@content/Backgrounds/CrossingBands/CrossingBands.jsx?raw';
import css from '@content/Backgrounds/CrossingBands/CrossingBands.css?raw';
import tailwind from '@tailwind/Backgrounds/CrossingBands/CrossingBands.jsx?raw';
import tsCode from '@ts-default/Backgrounds/CrossingBands/CrossingBands.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/CrossingBands/CrossingBands.tsx?raw';

export const crossingBands = {
  dependencies: `three @react-three/fiber @react-three/drei`,
  usage: `import CrossingBands from './CrossingBands';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <CrossingBands
    beamWidth={2}
    beamHeight={15}
    beamNumber={12}
    lightColor="#ffffff"
    speed={2}
    noiseIntensity={1.75}
    scale={0.2}
    rotation={0}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
