import code from '@content/Animations/SpringFabric/SpringFabric.jsx?raw';
import css from '@content/Animations/SpringFabric/SpringFabric.css?raw';
import tailwind from '@tailwind/Animations/SpringFabric/SpringFabric.jsx?raw';
import tsCode from '@ts-default/Animations/SpringFabric/SpringFabric.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/SpringFabric/SpringFabric.tsx?raw';

export const springFabric = {
  dependencies: `ogl`,
  usage: `import SpringFabric from './SpringFabric';

<div style={{ width: 480, height: 320 }}>
  <SpringFabric color1="#4F46E5" color2="#0EA5E9" />
</div>

<div style={{ width: 480, height: 320 }}>
  <SpringFabric
    image="https://picsum.photos/seed/elastic/800/600"
    interaction="drag"
    tilt={16}
    shading={1}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
