import code from '@content/TextAnimations/LiquidLetters/LiquidLetters.jsx?raw';
import css from '@content/TextAnimations/LiquidLetters/LiquidLetters.css?raw';
import tailwind from '@tailwind/TextAnimations/LiquidLetters/LiquidLetters.jsx?raw';
import tsCode from '@ts-default/TextAnimations/LiquidLetters/LiquidLetters.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/LiquidLetters/LiquidLetters.tsx?raw';

export const liquidLetters = {
  dependencies: `ogl`,
  usage: `import LiquidLetters from './LiquidLetters';

<LiquidLetters
  text="Bend the moment"
  color="#f8f5ff"
  warpStrength={0.08}
  warpScale={1.7}
  speed={0.55}
  pointerInfluence={0.42}
  pointerStrength={0.38}
  refraction={0.018}
  ripple
  fontSize="clamp(3rem, 10vw, 9rem)"
  fontWeight={800}
  style={{ height: '320px' }}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
