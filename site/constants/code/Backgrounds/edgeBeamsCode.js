import code from '@content/Backgrounds/EdgeBeams/EdgeBeams.jsx?raw';
import css from '@content/Backgrounds/EdgeBeams/EdgeBeams.css?raw';
import tailwind from '@tailwind/Backgrounds/EdgeBeams/EdgeBeams.jsx?raw';
import tsCode from '@ts-default/Backgrounds/EdgeBeams/EdgeBeams.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/EdgeBeams/EdgeBeams.tsx?raw';

export const edgeBeams = {
  dependencies: `ogl`,
  usage: `import EdgeBeams from './EdgeBeams';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <EdgeBeams
    speed={2.5}
    rayColor1="#EAB308"
    rayColor2="#96c8ff"
    intensity={2}
    spread={2}
    origin="top-right"
    tilt={0}
    saturation={1.5}
    blend={0.75}
    falloff={1.6}
    opacity={1.0}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
