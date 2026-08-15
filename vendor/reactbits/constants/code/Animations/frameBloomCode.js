import code from '@content/Animations/FrameBloom/FrameBloom.jsx?raw';
import css from '@content/Animations/FrameBloom/FrameBloom.css?raw';
import tailwind from '@tailwind/Animations/FrameBloom/FrameBloom.jsx?raw';
import tsCode from '@ts-default/Animations/FrameBloom/FrameBloom.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/FrameBloom/FrameBloom.tsx?raw';

export const frameBloom = {
  usage: `import FrameBloom from './FrameBloom';

<FrameBloom
  src="/hero.jpg"
  alt="Product hero"
  title="Built to scale"
  scrollHint="Scroll"
  useWindowScroll
>
  <h2>Every pixel, everywhere</h2>
  <p>The frame opens up as you scroll and hands the whole stage to your media.</p>
</FrameBloom>

<div style={{ height: '520px' }}>
  <FrameBloom src="/hero.jpg" title="Built to scale" mediaZoom={1.35} />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
