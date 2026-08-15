import code from '@content/TextAnimations/RiffleType/RiffleType.jsx?raw';
import css from '@content/TextAnimations/RiffleType/RiffleType.css?raw';
import tailwind from '@tailwind/TextAnimations/RiffleType/RiffleType.jsx?raw';
import tsCode from '@ts-default/TextAnimations/RiffleType/RiffleType.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/RiffleType/RiffleType.tsx?raw';

export const riffleType = {
  dependencies: `gsap @gsap/react`,
  usage: `import RiffleType from './RiffleType';

<RiffleType
  text="Hello World"
  shuffleDirection="right"
  duration={0.35}
  animationMode="evenodd"
  shuffleTimes={1}
  ease="power3.out"
  stagger={0.03}
  threshold={0.1}
  triggerOnce={true}
  triggerOnHover={true}
  respectReducedMotion={true}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
