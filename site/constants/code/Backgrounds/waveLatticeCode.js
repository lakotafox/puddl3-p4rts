import code from '@content/Backgrounds/WaveLattice/WaveLattice.jsx?raw';
import tailwind from '@tailwind/Backgrounds/WaveLattice/WaveLattice.jsx?raw';
import tsCode from '@ts-default/Backgrounds/WaveLattice/WaveLattice.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/WaveLattice/WaveLattice.tsx?raw';

export const waveLattice = {
  dependencies: `ogl`,
  usage: `import WaveLattice from './WaveLattice';

<div style={{position: 'relative', height: '500px', overflow: 'hidden'}}>
  <WaveLattice
    enableRainbow={false}
    gridColor="#ffffff"
    rippleIntensity={0.05}
    gridSize={10}
    gridThickness={15}
    mouseInteraction={true}
    mouseInteractionRadius={1.2}
    opacity={0.8}
  />
</div>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
