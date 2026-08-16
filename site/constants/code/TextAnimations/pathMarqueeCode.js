import code from '@content/TextAnimations/PathMarquee/PathMarquee.jsx?raw';
import css from '@content/TextAnimations/PathMarquee/PathMarquee.css?raw';
import tailwind from '@tailwind/TextAnimations/PathMarquee/PathMarquee.jsx?raw';
import tsCode from '@ts-default/TextAnimations/PathMarquee/PathMarquee.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/PathMarquee/PathMarquee.tsx?raw';

export const pathMarquee = {
  dependencies: `gsap`,
  usage: `import PathMarquee from './PathMarquee';

<PathMarquee
  text="React ✦ Bits"
  shape="wave"
  speed={90}
  direction="forward"
  separator="✦"
  curviness={90}
  fontSize={46}
  fontWeight={800}
  letterSpacing={2}
  uppercase
  color="#ffffff"
  ribbon
  ribbonColor="#5227FF"
  ribbonWidth={86}
  pauseOnHover
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
