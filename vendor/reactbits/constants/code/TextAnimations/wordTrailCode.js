import code from '@content/TextAnimations/WordTrail/WordTrail.jsx?raw';
import css from '@content/TextAnimations/WordTrail/WordTrail.css?raw';
import tailwind from '@tailwind/TextAnimations/WordTrail/WordTrail.jsx?raw';
import tsCode from '@ts-default/TextAnimations/WordTrail/WordTrail.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/WordTrail/WordTrail.tsx?raw';

export const wordTrail = {
  dependencies: `motion`,
  usage: `import WordTrail from './WordTrail';

<WordTrail
  text="Hello!"
  spacing={80}
  followMouseDirection={true}
  randomFloat={true}
  exitDuration={0.3}
  removalInterval={20}
  maxPoints={10}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
