import code from '@content/Backgrounds/DriftingWires/DriftingWires.jsx?raw';
import css from '@content/Backgrounds/DriftingWires/DriftingWires.css?raw';
import tailwind from '@tailwind/Backgrounds/DriftingWires/DriftingWires.jsx?raw';
import tsCode from '@ts-default/Backgrounds/DriftingWires/DriftingWires.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/DriftingWires/DriftingWires.tsx?raw';

export const driftingWires = {
  dependencies: `three`,
  usage: `import DriftingWires from './DriftingWires';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <DriftingWires 
    enabledWaves={['top', 'middle', 'bottom']}
    // Array - specify line count per wave; Number - same count for all waves
    lineCount={[10, 15, 20]}
    // Array - specify line distance per wave; Number - same distance for all waves
    lineDistance={[8, 6, 4]}
    bendRadius={5.0}
    bendStrength={-0.5}
    interactive={true}
    parallax={true}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
