import code from '@content/Animations/PhotoSatellites/PhotoSatellites.jsx?raw';
import css from '@content/Animations/PhotoSatellites/PhotoSatellites.css?raw';
import tailwind from '@tailwind/Animations/PhotoSatellites/PhotoSatellites.jsx?raw';
import tsCode from '@ts-default/Animations/PhotoSatellites/PhotoSatellites.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/PhotoSatellites/PhotoSatellites.tsx?raw';

export const photoSatellites = {
  dependencies: `motion`,
  usage: `// Component created by Dominik Koch
// https://x.com/dominikkoch

import PhotoSatellites from './PhotoSatellites'

const images = [
  "https://picsum.photos/300/300?grayscale&random=1",
  "https://picsum.photos/300/300?grayscale&random=2",
  "https://picsum.photos/300/300?grayscale&random=3",
  "https://picsum.photos/300/300?grayscale&random=4",
  "https://picsum.photos/300/300?grayscale&random=5",
  "https://picsum.photos/300/300?grayscale&random=6",
];

<PhotoSatellites
  images={images}
  shape="ellipse"
  radiusX={340}
  radiusY={80}
  rotation={-8}
  duration={30}
  itemSize={80}
  responsive={true}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};