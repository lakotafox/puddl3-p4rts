import code from '@content/Animations/FlockPointer/FlockPointer.jsx?raw';
import css from '@content/Animations/FlockPointer/FlockPointer.css?raw';
import tailwind from '@tailwind/Animations/FlockPointer/FlockPointer.jsx?raw';
import tsCode from '@ts-default/Animations/FlockPointer/FlockPointer.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/FlockPointer/FlockPointer.tsx?raw';

export const flockPointer = {
  dependencies: `ogl`,
  usage: `import FlockPointer from './FlockPointer';

<div style={{ position: 'relative', width: '100%', height: '450px' }}>
  <FlockPointer
    color="#ffffff"
    accentColor="#ffffff"
    count={10}
    size={10}
    speed={2.5}
    spread={100}
    wander={0.25}
    trail={0.75}
    scatterOnClick
  >
    {/* Your content here */}
  </FlockPointer>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
