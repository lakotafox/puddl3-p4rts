import code from '@content/Animations/SoftEntrance/SoftEntrance.jsx?raw';
import tailwind from '@tailwind/Animations/SoftEntrance/SoftEntrance.jsx?raw';
import tsCode from '@ts-default/Animations/SoftEntrance/SoftEntrance.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/SoftEntrance/SoftEntrance.tsx?raw';

export const softEntrance = {
  usage: `import SoftEntrance from './SoftEntrance'
  
<SoftEntrance blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
  {/* Anything placed inside this container will be fade into view */}
</SoftEntrance>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
