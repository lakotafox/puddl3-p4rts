import code from '@content/TextAnimations/SharpenType/SharpenType.jsx?raw';
import tailwind from '@tailwind/TextAnimations/SharpenType/SharpenType.jsx?raw';
import tsCode from '@ts-default/TextAnimations/SharpenType/SharpenType.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/SharpenType/SharpenType.tsx?raw';

export const sharpenType = {
  dependencies: 'motion',
  usage: `import SharpenType from "./SharpenType";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

<SharpenType
  text="Isn't this so cool?!"
  delay={150}
  animateBy="words"
  direction="top"
  onAnimationComplete={handleAnimationComplete}
  className="text-2xl mb-8"
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
