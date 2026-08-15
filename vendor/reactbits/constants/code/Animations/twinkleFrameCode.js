import code from '@content/Animations/TwinkleFrame/TwinkleFrame.jsx?raw';
import css from '@content/Animations/TwinkleFrame/TwinkleFrame.css?raw';
import tailwind from '@tailwind/Animations/TwinkleFrame/TwinkleFrame.jsx?raw';
import tsCode from '@ts-default/Animations/TwinkleFrame/TwinkleFrame.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/TwinkleFrame/TwinkleFrame.tsx?raw';

export const twinkleFrame = {
  usage: `import TwinkleFrame from './TwinkleFrame'
  
<TwinkleFrame
  as="button"
  className="custom-class"
  color="cyan"
  speed="5s"
>
  // content
</TwinkleFrame>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
