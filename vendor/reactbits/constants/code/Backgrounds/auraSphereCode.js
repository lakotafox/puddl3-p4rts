import code from '@content/Backgrounds/AuraSphere/AuraSphere.jsx?raw';
import css from '@content/Backgrounds/AuraSphere/AuraSphere.css?raw';
import tailwind from '@tailwind/Backgrounds/AuraSphere/AuraSphere.jsx?raw';
import tsCode from '@ts-default/Backgrounds/AuraSphere/AuraSphere.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/AuraSphere/AuraSphere.tsx?raw';

export const auraSphere = {
  dependencies: `ogl`,
  usage: `import AuraSphere from './AuraSphere';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <AuraSphere
    hoverIntensity={0.5}
    rotateOnHover={true}
    hue={0}
    forceHoverState={false}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
