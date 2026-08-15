import code from '@content/TextAnimations/MagneticInk/MagneticInk.jsx?raw';
import css from '@content/TextAnimations/MagneticInk/MagneticInk.css?raw';
import tailwind from '@tailwind/TextAnimations/MagneticInk/MagneticInk.jsx?raw';
import tsCode from '@ts-default/TextAnimations/MagneticInk/MagneticInk.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/MagneticInk/MagneticInk.tsx?raw';

export const magneticInk = {
  dependencies: `motion`,
  usage: `import { useRef } from 'react';
import MagneticInk from './MagneticInk';

const containerRef = useRef(null);

<div
ref={containerRef}
style={{position: 'relative'}}
>
  <MagneticInk
    label={'Hover me! And then star foxbits on GitHub, or else...'}
    className={'variable-proximity-demo'}
    fromFontVariationSettings="'wght' 400, 'opsz' 9"
    toFontVariationSettings="'wght' 1000, 'opsz' 40"
    containerRef={containerRef}
    radius={100}
    falloff='linear'
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
