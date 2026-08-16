import code from '@content/TextAnimations/BlurRelay/BlurRelay.jsx?raw';
import css from '@content/TextAnimations/BlurRelay/BlurRelay.css?raw';
import tailwind from '@tailwind/TextAnimations/BlurRelay/BlurRelay.jsx?raw';
import tsCode from '@ts-default/TextAnimations/BlurRelay/BlurRelay.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/BlurRelay/BlurRelay.tsx?raw';

export const blurRelay = {
  dependencies: `motion`,
  usage: `import BlurRelay from './BlurRelay';

<BlurRelay 
sentence="True Focus"
manualMode={false}
blurAmount={5}
borderColor="red"
animationDuration={2}
pauseBetweenAnimations={1}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
