import code from '@content/Animations/HazyMorph/HazyMorph.jsx?raw';
import tailwind from '@tailwind/Animations/HazyMorph/HazyMorph.jsx?raw';
import tsCode from '@ts-default/Animations/HazyMorph/HazyMorph.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/HazyMorph/HazyMorph.tsx?raw';

export const hazyMorph = {
  dependencies: `three`,
  usage: `import HazyMorph from './HazyMorph';

<div style={{position: 'relative', height: '500px', overflow: 'hidden'}}>
  <HazyMorph
    variation={0}
    pixelRatioProp={window.devicePixelRatio || 1}
    shapeSize={0.5}
    roundness={0.5}
    borderSize={0.05}
    circleSize={0.5}
    circleEdge={1}
  />
</div>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
