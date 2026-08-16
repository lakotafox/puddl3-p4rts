import code from '@content/TextAnimations/ParallaxLift/ParallaxLift.jsx?raw';
import css from '@content/TextAnimations/ParallaxLift/ParallaxLift.css?raw';
import tailwind from '@tailwind/TextAnimations/ParallaxLift/ParallaxLift.jsx?raw';
import tsCode from '@ts-default/TextAnimations/ParallaxLift/ParallaxLift.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/ParallaxLift/ParallaxLift.tsx?raw';

export const parallaxLift = {
  dependencies: `gsap`,
  usage: `import ParallaxLift from './ParallaxLift';

<ParallaxLift
  animationDuration={1}
  ease='back.inOut(2)'
  scrollStart='center bottom+=50%'
  scrollEnd='bottom bottom-=40%'
  stagger={0.03}
>
  PUDDL3 P4RTS
</ParallaxLift>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
