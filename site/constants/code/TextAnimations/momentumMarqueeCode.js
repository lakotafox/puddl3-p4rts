import code from '@content/TextAnimations/MomentumMarquee/MomentumMarquee.jsx?raw';
import css from '@content/TextAnimations/MomentumMarquee/MomentumMarquee.css?raw';
import tailwind from '@tailwind/TextAnimations/MomentumMarquee/MomentumMarquee.jsx?raw';
import tsCode from '@ts-default/TextAnimations/MomentumMarquee/MomentumMarquee.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/MomentumMarquee/MomentumMarquee.tsx?raw';

export const momentumMarquee = {
  dependencies: `motion`,
  usage: `import MomentumMarquee from './MomentumMarquee';
  
<MomentumMarquee
  texts={['PUDDL3 P4RTS', 'Scroll Down']} 
  velocity={velocity} 
  className="custom-scroll-text"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
