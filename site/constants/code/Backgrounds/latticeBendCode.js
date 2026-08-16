import code from '@content/Backgrounds/LatticeBend/LatticeBend.jsx?raw';
import css from '@content/Backgrounds/LatticeBend/LatticeBend.css?raw';
import tailwind from '@tailwind/Backgrounds/LatticeBend/LatticeBend.jsx?raw';
import tsCode from '@ts-default/Backgrounds/LatticeBend/LatticeBend.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/LatticeBend/LatticeBend.tsx?raw';

export const latticeBend = {
  dependencies: `three`,
  usage: `import LatticeBend from './LatticeBend';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <LatticeBend
    imageSrc="https://picsum.photos/1920/1080?grayscale"
    grid={10}
    mouse={0.1}
    strength={0.15}
    relaxation={0.9}
    className="custom-class"
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
