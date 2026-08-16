import code from '@content/Backgrounds/FluxPool/FluxPool.jsx?raw';
import css from '@content/Backgrounds/FluxPool/FluxPool.css?raw';
import tailwind from '@tailwind/Backgrounds/FluxPool/FluxPool.jsx?raw';
import tsCode from '@ts-default/Backgrounds/FluxPool/FluxPool.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/FluxPool/FluxPool.tsx?raw';

export const fluxPool = {
  dependencies: `ogl`,
  usage: `import FluxPool from './FluxPool';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <FluxPool
    colors={['#4F46E5', '#06B6D4', '#E0F2FE']}
    speed={0.5}
    scale={1}
    turbulence={1}
    fluidity={0.1}
    rimWidth={0.2}
    sharpness={3}
    shimmer={1}
    glow={2}
    flowDirection="down"
    opacity={1}
    mouseInteraction={true}
    mouseStrength={1}
    mouseRadius={0.3}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
