import code from '@content/TextAnimations/RibbonMarquee/RibbonMarquee.jsx?raw';
import css from '@content/TextAnimations/RibbonMarquee/RibbonMarquee.css?raw';
import tailwind from '@tailwind/TextAnimations/RibbonMarquee/RibbonMarquee.jsx?raw';
import tsCode from '@ts-default/TextAnimations/RibbonMarquee/RibbonMarquee.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/RibbonMarquee/RibbonMarquee.tsx?raw';

export const ribbonMarquee = {
  usage: `import RibbonMarquee from './RibbonMarquee';

// Basic usage
<RibbonMarquee marqueeText="Welcome to foxbits ✦" />

// With custom props
<RibbonMarquee 
  marqueeText="Be ✦ Creative ✦ With ✦ React ✦ Bits ✦"
  speed={3}
  curveAmount={500}
  direction="right"
  interactive={true}
  className="custom-text-style"
/>

// Non-interactive with slower speed
<RibbonMarquee 
  marqueeText="Smooth Curved Animation"
  speed={1}
  curveAmount={300}
  interactive={false}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
