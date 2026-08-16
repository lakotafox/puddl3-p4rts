import code from '@content/Animations/TapBurst/TapBurst.jsx?raw';
import tailwind from '@tailwind/Animations/TapBurst/TapBurst.jsx?raw';
import tsCode from '@ts-default/Animations/TapBurst/TapBurst.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/TapBurst/TapBurst.tsx?raw';

export const tapBurst = {
  usage: `import TapBurst from './TapBurst';

<TapBurst
  sparkColor='#fff'
  sparkSize={10}
  sparkRadius={15}
  sparkCount={8}
  duration={400}
>
  {/* Your content here */}
</TapBurst>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
