import code from '@content/Animations/MotionWrap/MotionWrap.jsx?raw';
import tailwind from '@tailwind/Animations/MotionWrap/MotionWrap.jsx?raw';
import tsCode from '@ts-default/Animations/MotionWrap/MotionWrap.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/MotionWrap/MotionWrap.tsx?raw';

export const motionWrap = {
  dependencies: `gsap`,
  usage: `import MotionWrap from './MotionWrap'

<MotionWrap
  distance={150}
  direction="horizontal"
  reverse={false}
  duration={1.2}
  ease="bounce.out"
  initialOpacity={0.2}
  animateOpacity
  scale={1.1}
  threshold={0.2}
  delay={0.3}
>
  <div>Content to Animate</div>
</MotionWrap>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
