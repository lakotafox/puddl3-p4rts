import code from '@content/TextAnimations/StencilTitle/StencilTitle.jsx?raw';
import css from '@content/TextAnimations/StencilTitle/StencilTitle.css?raw';
import tailwind from '@tailwind/TextAnimations/StencilTitle/StencilTitle.jsx?raw';
import tsCode from '@ts-default/TextAnimations/StencilTitle/StencilTitle.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/StencilTitle/StencilTitle.tsx?raw';

export const stencilTitle = {
  dependencies: 'gsap',
  usage: `import StencilTitle from './StencilTitle';

<StencilTitle text="Designed in the details" src="/hero.jpg" />

<StencilTitle
  text="Shot on location"
  mediaType="video"
  src="/reel.mp4"
  poster="/reel-poster.jpg"
  fillScale={1.3}
  parallax={34}
  reveal="wipe"
  trigger="view"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
