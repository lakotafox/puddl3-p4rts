import code from '@content/Components/SparkTiles/SparkTiles.jsx?raw';
import css from '@content/Components/SparkTiles/SparkTiles.css?raw';
import tailwind from '@tailwind/Components/SparkTiles/SparkTiles.jsx?raw';
import tsCode from '@ts-default/Components/SparkTiles/SparkTiles.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/SparkTiles/SparkTiles.tsx?raw';

export const sparkTiles = {
  dependencies: `gsap`,
  usage: `import SparkTiles from './SparkTiles'

<SparkTiles 
  textAutoHide={true}
  enableStars={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableTilt={true}
  enableMagnetism={true}
  clickEffect={true}
  spotlightRadius={300}
  particleCount={12}
  glowColor="132, 0, 255"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
