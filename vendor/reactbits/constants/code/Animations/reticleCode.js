import code from '@content/Animations/Reticle/Reticle.jsx?raw';
import tailwind from '@tailwind/Animations/Reticle/Reticle.jsx?raw';
import tsCode from '@ts-default/Animations/Reticle/Reticle.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/Reticle/Reticle.tsx?raw';

export const reticle = {
  dependencies: `gsap`,
  usage: `import { useRef } from 'react';
import Reticle from './Reticle';

const Component = () => {
const containerRef = useRef(null);

return (
  <div ref={containerRef} style={{ height: '300px', overflow: 'hidden' }}>
    <Reticle containerRef={containerRef} color='#ffffff'/> // containerRef defaults to "window" if not provided
  </div>
)
};`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
