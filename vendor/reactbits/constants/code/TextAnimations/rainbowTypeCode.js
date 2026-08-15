import code from '@content/TextAnimations/RainbowType/RainbowType.jsx?raw';
import css from '@content/TextAnimations/RainbowType/RainbowType.css?raw';
import tailwind from '@tailwind/TextAnimations/RainbowType/RainbowType.jsx?raw';
import tsCode from '@ts-default/TextAnimations/RainbowType/RainbowType.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/RainbowType/RainbowType.tsx?raw';

export const rainbowType = {
  usage: `import RainbowType from './RainbowType'

// For a smoother animation, the gradient should start and end with the same color
  
<RainbowType
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class"
>
  Add a splash of color!
</RainbowType>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
