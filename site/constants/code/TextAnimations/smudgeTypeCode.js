import code from '@content/TextAnimations/SmudgeType/SmudgeType.jsx?raw';
import css from '@content/TextAnimations/SmudgeType/SmudgeType.css?raw';
import tailwind from '@tailwind/TextAnimations/SmudgeType/SmudgeType.jsx?raw';
import tsCode from '@ts-default/TextAnimations/SmudgeType/SmudgeType.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/SmudgeType/SmudgeType.tsx?raw';

export const smudgeType = {
  dependencies: `gsap`,
  usage: `// Component inspired by Tom Miller from the GSAP community
// https://codepen.io/creativeocean/pen/NPWLwJM

import SmudgeType from './SmudgeType';
  
<SmudgeType
  className="scrambled-text-demo"
  radius={100}
  duration={1.2}
  speed={0.5}
  scrambleChars={.:}
>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
  Similique pariatur dignissimos porro eius quam doloremque 
  et enim velit nobis maxime.
</SmudgeType>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
