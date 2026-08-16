import code from '@content/Components/SwipeReel/SwipeReel.jsx?raw';
import css from '@content/Components/SwipeReel/SwipeReel.css?raw';
import tailwind from '@tailwind/Components/SwipeReel/SwipeReel.jsx?raw';
import tsCode from '@ts-default/Components/SwipeReel/SwipeReel.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/SwipeReel/SwipeReel.tsx?raw';

export const swipeReel = {
  dependencies: `motion`,
  usage: `import SwipeReel from './SwipeReel'

<div style={{ height: '600px', position: 'relative' }}>
  <SwipeReel
    baseWidth={300}
    autoplay={true}
    autoplayDelay={3000}
    pauseOnHover={true}
    loop={true}
    round={false}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
