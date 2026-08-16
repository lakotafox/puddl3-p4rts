import code from '@content/TextAnimations/IntoFocus/IntoFocus.jsx?raw';
import css from '@content/TextAnimations/IntoFocus/IntoFocus.css?raw';
import tailwind from '@tailwind/TextAnimations/IntoFocus/IntoFocus.jsx?raw';
import tsCode from '@ts-default/TextAnimations/IntoFocus/IntoFocus.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/IntoFocus/IntoFocus.tsx?raw';

export const intoFocus = {
  dependencies: `gsap`,
  usage: `import IntoFocus from './IntoFocus';

<IntoFocus
  baseOpacity={0}
  enableBlur={true}
  baseRotation={5}
  blurStrength={10}
>
  When does a man die? When he is hit by a bullet? No! When he suffers a disease?
  No! When he ate a soup made out of a poisonous mushroom?
  No! A man dies when he is forgotten!
</IntoFocus>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
