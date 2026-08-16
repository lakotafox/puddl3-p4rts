import code from '@content/TextAnimations/ArcType/ArcType.jsx?raw';
import css from '@content/TextAnimations/ArcType/ArcType.css?raw';
import tailwind from '@tailwind/TextAnimations/ArcType/ArcType.jsx?raw';
import tsCode from '@ts-default/TextAnimations/ArcType/ArcType.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/ArcType/ArcType.tsx?raw';

export const arcType = {
  dependencies: `motion`,
  usage: `import ArcType from './ArcType';
  
<ArcType
  text="REACT*BITS*COMPONENTS*"
  onHover="speedUp"
  spinDuration={20}
  className="custom-class"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
