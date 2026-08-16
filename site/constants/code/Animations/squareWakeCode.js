import code from '@content/Animations/SquareWake/SquareWake.jsx?raw';
import css from '@content/Animations/SquareWake/SquareWake.css?raw';
import tailwind from '@tailwind/Animations/SquareWake/SquareWake.jsx?raw';
import tsCode from '@ts-default/Animations/SquareWake/SquareWake.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/SquareWake/SquareWake.tsx?raw';

export const squareWake = {
  dependencies: `three @react-three/fiber @react-three/drei`,
  usage: `import SquareWake from './SquareWake';

<div style={{ height: '500px', position: 'relative', overflow: 'hidden'}}>
  <SquareWake
    gridSize={50}
    trailSize={0.1}
    maxAge={250}
    interpolate={5}
    color="#fff"
    gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
