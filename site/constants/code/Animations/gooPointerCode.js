import code from '@content/Animations/GooPointer/GooPointer.jsx?raw';
import css from '@content/Animations/GooPointer/GooPointer.css?raw';
import tailwind from '@tailwind/Animations/GooPointer/GooPointer.jsx?raw';
import tsCode from '@ts-default/Animations/GooPointer/GooPointer.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/GooPointer/GooPointer.tsx?raw';

export const gooPointer = {
  dependencies: `gsap`,
  usage: `import GooPointer from './GooPointer';

<GooPointer
  blobType="circle"
  fillColor="#5227FF"
  trailCount={3}
  sizes={[60, 125, 75]}
  innerSizes={[20, 35, 25]}
  innerColor="rgba(255,255,255,0.8)"
  opacities={[0.6, 0.6, 0.6]}
  shadowColor="rgba(0,0,0,0.75)"
  shadowBlur={5}
  shadowOffsetX={10}
  shadowOffsetY={10}
  filterStdDeviation={30}
  useFilter={true}
  fastDuration={0.1}
  slowDuration={0.5}
  zIndex={100}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
