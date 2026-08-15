import code from '@content/Animations/VoxelCluster/VoxelCluster.jsx?raw';
import css from '@content/Animations/VoxelCluster/VoxelCluster.css?raw';
import tailwind from '@tailwind/Animations/VoxelCluster/VoxelCluster.jsx?raw';
import tsCode from '@ts-default/Animations/VoxelCluster/VoxelCluster.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/VoxelCluster/VoxelCluster.tsx?raw';

export const voxelCluster = {
  dependencies: `gsap`,
  usage: `// CREDIT
// Component inspired from Can Tastemel's original work for the lambda.ai landing page
// https://cantastemel.com
  
import VoxelCluster from './VoxelCluster'

<div style={{ height: '600px', position: 'relative' }}>
  <VoxelCluster 
    gridSize={8}
    maxAngle={60}
    radius={4}
    borderStyle="2px dashed #5227FF"
    faceColor="#1a1a2e"
    rippleColor="#ff6b6b"
    rippleSpeed={1.5}
    autoAnimate={true}
    rippleOnClick={true}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
