import code from '@content/TextAnimations/StaticType/StaticType.jsx?raw';
import css from '@content/TextAnimations/StaticType/StaticType.css?raw';
import tailwind from '@tailwind/TextAnimations/StaticType/StaticType.jsx?raw';
import tsCode from '@ts-default/TextAnimations/StaticType/StaticType.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/StaticType/StaticType.tsx?raw';

export const staticType = {
  usage: `import StaticType from './StaticType';
  
<StaticType
  speed={1}
  enableShadows={true}
  enableOnHover={true}
  className='custom-class'
>
  foxbits
</StaticType>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
