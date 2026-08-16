import code from '@content/Components/MirrorPane/MirrorPane.jsx?raw';
import css from '@content/Components/MirrorPane/MirrorPane.css?raw';
import tailwind from '@tailwind/Components/MirrorPane/MirrorPane.jsx?raw';
import tsCode from '@ts-default/Components/MirrorPane/MirrorPane.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/MirrorPane/MirrorPane.tsx?raw';

export const mirrorPane = {
  dependencies: `lucide-react`,
  usage: `import MirrorPane from './MirrorPane';

<div style={{ height: '600px', position: 'relative' }}>
  <MirrorPane
    overlayColor="rgba(0, 0, 0, 0.2)"
    blurStrength={10}
    glassDistortion={15}
    metalness={0.8}
    roughness={0.5}
    displacementStrength={25}
    noiseScale={1.5}
    specularConstant={2.0}
    grayscale={0.5}
    color="#ffffff"
  />
</div>
`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
