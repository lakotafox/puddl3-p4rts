import code from '@content/Backgrounds/GeoLattice/GeoLattice.jsx?raw';
import css from '@content/Backgrounds/GeoLattice/GeoLattice.css?raw';
import tailwind from '@tailwind/Backgrounds/GeoLattice/GeoLattice.jsx?raw';
import tsCode from '@ts-default/Backgrounds/GeoLattice/GeoLattice.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/GeoLattice/GeoLattice.tsx?raw';

export const geoLattice = {
  usage: `import GeoLattice from './GeoLattice';
  
<GeoLattice 
speed={0.5} 
squareSize={40}
direction='diagonal' // up, down, left, right, diagonal
borderColor='#fff'
hoverFillColor='#222'
shape='square' // square, hexagon, circle, triangle
hoverTrailAmount={5} // number of trailing hovered shapes (0 = no trail)
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
