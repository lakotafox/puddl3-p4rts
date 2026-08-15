import code from '@content/Animations/WaterWarp/WaterWarp.jsx?raw';
import css from '@content/Animations/WaterWarp/WaterWarp.css?raw';
import tailwind from '@tailwind/Animations/WaterWarp/WaterWarp.jsx?raw';
import tsCode from '@ts-default/Animations/WaterWarp/WaterWarp.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/WaterWarp/WaterWarp.tsx?raw';

export const waterWarp = {
  dependencies: `ogl`,
  usage: `import WaterWarp from './WaterWarp';

<div style={{ width: '600px', height: '400px' }}>
  <WaterWarp
    src="/hero.jpg"
    brushSize={150}
    strength={0.2}
    swirl={1}
    rings={4}
    grayscale
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
