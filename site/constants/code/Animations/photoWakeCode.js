import code from '@content/Animations/PhotoWake/PhotoWake.jsx?raw';
import css from '@content/Animations/PhotoWake/PhotoWake.css?raw';
import tailwind from '@tailwind/Animations/PhotoWake/PhotoWake.jsx?raw';
import tsCode from '@ts-default/Animations/PhotoWake/PhotoWake.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/PhotoWake/PhotoWake.tsx?raw';

export const photoWake = {
  dependencies: `gsap`,
  usage: `import PhotoWake from './PhotoWake;'

<div style={{ height: '500px', position: 'relative', overflow: 'hidden'}}>
  <PhotoWake
    key={key}
    items={[
      'https://picsum.photos/id/287/300/300',
      'https://picsum.photos/id/1001/300/300',
      'https://picsum.photos/id/1025/300/300',
      'https://picsum.photos/id/1026/300/300',
      'https://picsum.photos/id/1027/300/300',
      'https://picsum.photos/id/1028/300/300',
      'https://picsum.photos/id/1029/300/300',
      'https://picsum.photos/id/1030/300/300',
      // ...
    ]}
    variant={1}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
