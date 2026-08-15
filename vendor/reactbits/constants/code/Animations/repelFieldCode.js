import code from '@content/Animations/RepelField/RepelField.jsx?raw';
import tailwind from '@tailwind/Animations/RepelField/RepelField.jsx?raw';
import tsCode from '@ts-default/Animations/RepelField/RepelField.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/RepelField/RepelField.tsx?raw';

export const repelField = {
  dependencies: `three @react-three/fiber`,
  usage: `import RepelField from './RepelField';

<div style={{ width: '100%', height: '400px', position: 'relative' }}>
  <RepelField
    count={300}
    magnetRadius={6}
    ringRadius={7}
    waveSpeed={0.4}
    waveAmplitude={1}
    particleSize={1.5}
    lerpSpeed={0.05}
    color={'#FF9FFC'}
    autoAnimate={true}
    particleVariance={1}
  />
</div>
  `,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
