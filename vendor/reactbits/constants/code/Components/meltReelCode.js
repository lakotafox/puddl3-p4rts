import css from '@content/Components/MeltReel/MeltReel.css?raw';
import code from '@content/Components/MeltReel/MeltReel.jsx?raw';
import tailwind from '@tailwind/Components/MeltReel/MeltReel.jsx?raw';
import tsCode from '@ts-default/Components/MeltReel/MeltReel.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/MeltReel/MeltReel.tsx?raw';

export const meltReel = {
  dependencies: `ogl gsap`,
  usage: `import MeltReel from './MeltReel'

const items = [
  { image: 'https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=1600&auto=format&fit=crop', caption: 'One' },
  { image: 'https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=1600&auto=format&fit=crop', caption: 'Two' },
  { image: 'https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=1600&auto=format&fit=crop', caption: 'Three' }
]

<div style={{ height: '500px', position: 'relative' }}>
  <MeltReel
    items={items}
    transition="melt"
    intensity={0.55}
    aberration={0.35}
    drift={0.4}
    autoplay
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
