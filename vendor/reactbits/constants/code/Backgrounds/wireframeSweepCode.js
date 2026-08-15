import code from '@content/Backgrounds/WireframeSweep/WireframeSweep.jsx?raw';
import css from '@content/Backgrounds/WireframeSweep/WireframeSweep.css?raw';
import tailwind from '@tailwind/Backgrounds/WireframeSweep/WireframeSweep.jsx?raw';
import tsCode from '@ts-default/Backgrounds/WireframeSweep/WireframeSweep.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/WireframeSweep/WireframeSweep.tsx?raw';

export const wireframeSweep = {
  dependencies: `three face-api.js`,
  usage: `import WireframeSweep from './WireframeSweep';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <WireframeSweep
    sensitivity={0.55}
    lineThickness={1}
    linesColor="#2F293A"
    gridScale={0.1}
    scanColor="#FF9FFC"
    scanOpacity={0.4}
    enablePost
    bloomIntensity={0.6}
    chromaticAberration={0.002}
    noiseIntensity={0.01}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
