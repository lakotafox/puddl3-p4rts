import code from '@content/Animations/BlobFusion/BlobFusion.jsx?raw';
import css from '@content/Animations/BlobFusion/BlobFusion.css?raw';
import tailwind from '@tailwind/Animations/BlobFusion/BlobFusion.jsx?raw';
import tsCode from '@ts-default/Animations/BlobFusion/BlobFusion.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/BlobFusion/BlobFusion.tsx?raw';

export const blobFusion = {
  dependencies: `ogl`,
  usage: `import BlobFusion from './BlobFusion';

<BlobFusion
  color="#ffffff"
  cursorBallColor="#ffffff"
  cursorBallSize={2}
  ballCount={15}
  animationSize={30}
  enableMouseInteraction={true}
  enableTransparency={true}
  hoverSmoothness={0.05}
  clumpFactor={1}
  speed={0.3}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
