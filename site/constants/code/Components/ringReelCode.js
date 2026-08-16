import css from '@content/Components/RingReel/RingReel.css?raw';
import code from '@content/Components/RingReel/RingReel.jsx?raw';
import tailwind from '@tailwind/Components/RingReel/RingReel.jsx?raw';
import tsCode from '@ts-default/Components/RingReel/RingReel.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/RingReel/RingReel.tsx?raw';

export const ringReel = {
  dependencies: `ogl`,
  usage: `import RingReel from './RingReel'

<div style={{ height: '600px', position: 'relative' }}>
  <RingReel
    bend={3}
    textColor="#ffffff"
    borderRadius={0.05}
    scrollEase={0.02}
    // Optionally load a custom font for the labels.
    // Accepts a stylesheet URL (e.g. Google Fonts) or a direct font file.
    fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
    font="bold 30px Orbitron"
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
